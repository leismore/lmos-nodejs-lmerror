/**
 * test_preErrors function - Test LMError class with different types of previous Errors
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
    RESPONSE_VALID as THE_VALID_RESPONSE
} from './responses.js';

import {
    INVALID as PRE_ERROR_INVALID,
    VALID   as PRE_ERROR_VALID
} from './preErrors.js'


function test_preErrors():void
{
    test('Previous Errors', async t => {

        // Primitive values
        for (const value of PRIMITIVE_ALL)
        {
            await t.test(`Previous Error - ${String(value)}`, () => {

                if (value === undefined)
                {
                    // LMError instance
                    const error = new LMError(THE_VALID_ERROR, THE_VALID_RESPONSE, value);

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
                        THE_VALID_RESPONSE.statusCode,
                        error.response?.statusCode
                    );
                    assert.deepStrictEqual(
                        error.response.headers,
                        THE_VALID_RESPONSE.headers,
                        JSON.stringify(error.response.headers)
                    );
                    assert.deepStrictEqual(
                        error.response.body,
                        THE_VALID_RESPONSE.body,
                        JSON.stringify(error.response.body)
                    );
                    assert.strictEqual(error.previous, undefined, String(error.previous));

                    // LMError method - toString
                    assert.strictEqual(

                        String(error),
                    
                        (
                            ( `${error.timestamp.toISOString()} / LMError`           + EOL ) +
                            ( `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL ) +

                            ( `HTTP ${THE_VALID_RESPONSE.statusCode}`                + EOL ) +
                            ( THE_VALID_RESPONSE.headers.map((header:LMErrorResHeader) => {
                                return `${header.name}: ${header.value}`;
                            }).join(EOL)                                             + EOL ) +

                            (  JSON.stringify(THE_VALID_RESPONSE.body) + EOL      )
                        ),

                        String(error)
                    );

                } else {
                    assert.throws(() => {
                        // @ts-expect-error
                        new LMError(THE_VALID_ERROR, THE_VALID_RESPONSE, value);
                    }, Error);
                }

            });
        }

        // Invalid objects
        for (const value of PRE_ERROR_INVALID)
        {
            await t.test(`Previous Error - ${JSON.stringify(value)}`, () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(THE_VALID_ERROR, THE_VALID_RESPONSE, value);
                }, Error);
            });
        }

        // Valid objects
        for (const value of PRE_ERROR_VALID)
        {
            await t.test(`Previous Error - ${JSON.stringify(value)}`, () => {

                // LMError instance
                const error = new LMError(THE_VALID_ERROR, THE_VALID_RESPONSE, value);

                // Testing JavaScript standard properties
                assert.ok(error instanceof LMError, String(error));
                assert.strictEqual(error.name, 'LMError', error.name);
                assert.strictEqual(error.message, THE_VALID_ERROR.message, error.message);
                assert.strictEqual(error.cause, value, String(error.cause));

                // Testing LMError properties
                assert.deepStrictEqual(
                    error.error,
                    THE_VALID_ERROR,
                    JSON.stringify(error.error)
                );
                assert.strictEqual(
                    error.response?.statusCode,
                    THE_VALID_RESPONSE.statusCode,
                    error.response?.statusCode
                );
                assert.deepStrictEqual(
                    error.response.headers,
                    THE_VALID_RESPONSE.headers,
                    JSON.stringify(error.response.headers)
                );
                assert.deepStrictEqual(
                    error.response.body,
                    THE_VALID_RESPONSE.body,
                    JSON.stringify(error.response.body)
                );
                assert.strictEqual(error.previous, value, String(error.previous));

                // LMError method - toString
                assert.strictEqual(
                    String(error),
                    (
                        ( `${error.timestamp.toISOString()} / LMError`           + EOL ) +
                        ( `${THE_VALID_ERROR.message} (${THE_VALID_ERROR.code})` + EOL ) +

                        ( `HTTP ${THE_VALID_RESPONSE.statusCode}`                + EOL ) +

                        ( THE_VALID_RESPONSE.headers.map((header:LMErrorResHeader) => {
                            return `${header.name}: ${header.value}`;
                        }).join(EOL)                                             + EOL ) +
                        
                        (  JSON.stringify(THE_VALID_RESPONSE.body)               + EOL ) +

                        ( String(value).trimEnd() + EOL )
                    ),
                    String(error),
                );
            });
        }

    });
}

export { test_preErrors };
