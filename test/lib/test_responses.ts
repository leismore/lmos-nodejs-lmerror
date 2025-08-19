/**
 * test_responses function - Test LMError class with different types of LMErrorRes-s
 */

import { EOL }                   from 'os';
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
                    assert.ok(error instanceof LMError, String(error));
                    assert.strictEqual(error.name, 'LMError', error.name);
                    assert.strictEqual(error.message, THE_VALID_ERROR.message, error.message);
                    assert.strictEqual(error.cause, undefined, String(error.cause));
                    assert.deepStrictEqual(error.error, THE_VALID_ERROR,
                        JSON.stringify(error.error));
                    assert.strictEqual(error.response, undefined, JSON.stringify(error.response));
                    assert.strictEqual(error.previous, undefined, String(error.previous));
                    assert.strictEqual(String(error), (
                        `${error.timestamp.toISOString()} / LMError`   + EOL +
                        `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL
                    ), String(error));
                } else {
                    assert.throws(() => {
                        // @ts-expect-error
                        new LMError(THE_VALID_ERROR, value);
                    }, Error);
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
                }, Error);
            });
        }

        // Valid objects
        for (const value of RESPONSE_VALID)
        {
            await t.test(`LMErrorRes - ${JSON.stringify(value)}`, () => {

                // Normalising test cases
                const statusCode = value.statusCode;
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
                    // @ts-ignore
                    headers = value.headers;
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
                assert.ok(error instanceof LMError, String(error));
                assert.strictEqual(error.name, 'LMError', error.name);
                assert.strictEqual(error.message, THE_VALID_ERROR.message, error.message);
                assert.strictEqual(error.cause, undefined, String(error.cause));

                // Testing LMError properties
                assert.deepStrictEqual(
                    error.error,
                    THE_VALID_ERROR,
                    JSON.stringify(error.error)
                );

                assert.strictEqual(
                    error.response?.statusCode,
                    statusCode,
                    error.response?.statusCode
                );

                if (headers === undefined)
                {
                    assert.strictEqual(
                        error.response.headers,
                        undefined,
                        JSON.stringify(error.response.headers)
                    );
                } else {
                    assert.deepStrictEqual(
                        error.response.headers,
                        headers,
                        JSON.stringify(error.response.headers)
                    );
                }

                if (body === undefined)
                {
                    assert.strictEqual(
                        error.response.body,
                        undefined,
                        String(error.response.body)
                    );
                } else {
                    assert.deepStrictEqual(
                        error.response.body,
                        body,
                        String(error.response.body)
                    );
                }

                assert.strictEqual(error.previous, undefined, String(error.previous));

                // LMError method - toString
                assert.strictEqual(

                    String(error),
                    
                    (
                      ( `${error.timestamp.toISOString()} / LMError`           + EOL ) +
                      ( `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL ) +

                      ( `HTTP ${statusCode}`                                   + EOL ) +
                      ( headers === undefined ? '' : ( headers?.map(
                          ( header:LMErrorResHeader ) => {
                            return `${header.name}: ${header.value}`
                          }).join(EOL) + EOL )                                       ) +

                      ( body === undefined ? '' : ( JSON.stringify(body) + EOL )     )
                    ),

                    String(error)
                );

            });
        }

    });
}

export { test_responses };
