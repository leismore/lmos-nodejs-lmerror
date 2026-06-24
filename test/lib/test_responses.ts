/**
 * test_responses function - Test LMError class with different types of LMErrorRes-s
 */

import { EOL }                   from 'node:os';
import assert                    from 'node:assert/strict';
import test                      from 'node:test';
import { LMError }               from '../../src/index.js';
import type { LMErrorResHeader } from '../../src/index.js';
import { ALL as PRIMITIVE_ALL }  from '@leismore/lmos-nodejs-primitives';

import {
    ERROR_VALID as THE_VALID_ERROR
} from './errors.js';

import {
    VALID   as RESPONSE_VALID,
    INVALID as RESPONSE_INVALID
} from './responses.js';


function test_responses():void
{
    test('LMErrorRes-s', async t => {

        // Primitive values
        for (const value of PRIMITIVE_ALL) {
            await t.test(`LMErrorRes - ${String(value)}`, () => {
                if (value === undefined)
                {
                    const error = new LMError(THE_VALID_ERROR, value);
                    assert.ok(error instanceof LMError, 'Not instance of LMError');
                    assert.strictEqual(error.name, 'LMError', 'Error name not LMError');
                    assert.strictEqual(error.message, THE_VALID_ERROR.message, 'Incorrect error message');
                    assert.strictEqual(error.cause, undefined, 'Error cause not undefined');
                    assert.deepStrictEqual(error.error, THE_VALID_ERROR, 'Incorrect error property');
                    assert.strictEqual(error.response, undefined, 'Response property not undefined');
                    assert.strictEqual(error.previous, undefined, 'Previous property not undefined');
                    assert.ok(error.timestamp instanceof Date, 'Timestamp property not instance of Date');
                    assert.strictEqual(String(error), (
                        `${error.timestamp.toISOString()} / LMError`   + EOL +
                        `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL
                    ), 'Incorrect error string representation');
                } else {
                    assert.throws(() => {
                        // @ts-expect-error
                        new LMError(THE_VALID_ERROR, value);
                    }, Error, 'Error not thrown');
                }
            });
        }

        // Invalid objects
        for (const value of RESPONSE_INVALID)
        {
            await t.test(`LMErrorRes - ${JSON.stringify(value)}`, () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(THE_VALID_ERROR, value);
                }, Error, 'Error not thrown');
            });
        }

        // Valid objects
        for (const value of RESPONSE_VALID)
        {
            await t.test(`LMErrorRes - ${JSON.stringify(value)}`, () => {

                // Normalising test cases
                const statusCode:string = value.statusCode;
                let headers:(LMErrorResHeader[]|undefined) = undefined;
                let body:unknown = undefined;

                if (  'headers' in value === false                        ||
                    ( 'headers' in value && value.headers === undefined ) ||
                    ( 'headers' in value            &&
                       Array.isArray(value.headers) &&
                       value.headers.length === 0      )
                ) {
                    headers = undefined;
                } else {
                    headers = value.headers as LMErrorResHeader[];
                }

                if (   'body' in value === false ||
                     ( 'body' in value && value.body === undefined )
                )
                {
                    body = undefined;
                } else {
                    body = value.body;
                }

                // LMError instance
                const error = new LMError(THE_VALID_ERROR, value);

                // Testing JavaScript standard properties
                assert.ok(error instanceof LMError, 'Not instance of LMError');
                assert.strictEqual(error.name, 'LMError', 'Error name not LMError');
                assert.strictEqual(error.message, THE_VALID_ERROR.message, 'Incorrect error message');
                assert.strictEqual(error.cause, undefined, 'Error cause not undefined');

                // Testing LMError properties
                assert.deepStrictEqual(
                    error.error,
                    THE_VALID_ERROR,
                    'Incorrect error property'
                );

                assert.strictEqual(
                    error.response!.statusCode,
                    statusCode,
                    'Incorrect response property - status code'
                );

                if (headers === undefined)
                {
                    assert.strictEqual(
                        error.response!.headers,
                        undefined,
                        'Incorrect response property - headers not undefined'
                    );
                } else {
                    assert.deepStrictEqual(
                        error.response!.headers,
                        headers,
                        'Incorrect response property - headers'
                    );
                }

                if (body === undefined)
                {
                    assert.strictEqual(
                        error.response!.body,
                        undefined,
                        'Incorrect response property - body not undefined'
                    );
                } else {
                    assert.deepStrictEqual(
                        error.response!.body,
                        body,
                        'Incorrect response property - body'
                    );
                }

                assert.strictEqual(error.previous, undefined, 'Previous property not undefined');

                assert.ok(error.timestamp instanceof Date, 'Timestamp property not instance of Date');

                // LMError method - toString
                assert.strictEqual(

                    String(error),
                    
                    (
                      ( `${error.timestamp.toISOString()} / LMError`           + EOL ) +
                      ( `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL ) +

                      ( `HTTP ${statusCode}`                                   + EOL ) +
                      ( headers === undefined ? '' : ( headers.map(
                          ( header:LMErrorResHeader ) => {
                            return `${header.name}: ${header.value}`
                          }).join(EOL) + EOL )                                       ) +

                      ( body === undefined ? '' : ( String(body) + EOL )     )
                    ),

                    'Incorrect error string representation'
                );

            });
        }

    });
}

export { test_responses };
