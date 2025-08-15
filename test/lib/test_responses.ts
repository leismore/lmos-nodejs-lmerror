/**
 * test_responses function - Test LMError class with different types of LMErrorRes-s
 */

import { EOL }                  from 'os';
import assert                   from 'node:assert/strict';
import test                     from 'node:test';
import { LMError }              from '@src/index.js';
import { ALL as PRIMITIVE_ALL } from '@leismore/lmos-nodejs-primitives';

import {
    ERROR_VALID as THE_VALID_ERROR
} from '@test/lib/errors.js';

import {
    RESPONSE_EMPTY,
    RESPONSE_WITHOUT_CODE_HEADERS_BODY,
    RESPONSE_HEADERS_NOT_ARRAY,
    RESPONSE_HEADERS_WITHOUT_NAME_VALUE,
    RESPONSE_HEADERS_WITHOUT_NAME,
    RESPONSE_HEADERS_WITHOUT_VALUE,
    RESPONSE_CODE_NOT_STRING,
    RESPONSE_CODE_EMPTY,
    RESPONSE_CODE_2DIGITS,
    RESPONSE_CODE_4DIGITS,
    RESPONSE_CODE_NOT_DIGITS,
    RESPONSE_HEADERS_NAME_NOT_STRING,
    RESPONSE_HEADERS_VALUE_NOT_STRING,
    RESPONSE_HEADERS_NAME_VALUE_NOT_STRING,
    RESPONSE_HEADERS_NAME_EMPTY,
    RESPONSE_HEADERS_VALUE_EMPTY,
    RESPONSE_HEADERS_NAME_VALUE_EMPTY,
    RESPONSE_VALID,
    RESPONSE_VALID_CODE,
    RESPONSE_VALID_CODE_HEADERS,
    RESPONSE_VALID_CODE_HEADERS_EMPTY_ARRAY,
    RESPONSE_VALID_CODE_BODY
} from '@test/lib/responses.js';


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

        // RESPONSE_EMPTY
        await t.test(`LMErrorRes - ${JSON.stringify(RESPONSE_EMPTY)}`, () => {
            assert.throws(() => {
                // @ts-expect-error
                new LMError(THE_VALID_ERROR, RESPONSE_EMPTY);
            }, Error);
        });

        // RESPONSE_WITHOUT_CODE_HEADERS_BODY
        await t.test(`LMErrorRes - ${JSON.stringify(RESPONSE_WITHOUT_CODE_HEADERS_BODY)}`,
            () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(THE_VALID_ERROR, RESPONSE_WITHOUT_CODE_HEADERS_BODY);
                }, Error);
            }
        );

        // RESPONSE_HEADERS_NOT_ARRAY
        await t.test(`LMErrorRes - ${JSON.stringify(RESPONSE_HEADERS_NOT_ARRAY)}`,
            () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(THE_VALID_ERROR, RESPONSE_HEADERS_NOT_ARRAY);
                }, Error);
            }
        );

        // RESPONSE_HEADERS_WITHOUT_NAME_VALUE
        await t.test(`LMErrorRes - ${JSON.stringify(RESPONSE_HEADERS_WITHOUT_NAME_VALUE)}`,
            () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(THE_VALID_ERROR, RESPONSE_HEADERS_WITHOUT_NAME_VALUE);
                }, Error);
            }
        );

    });
}

export { test_responses };
