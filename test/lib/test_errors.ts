/**
 * test_errors function - Test LMError class with different types of LMErrorErr-s
 */

import { EOL }                  from 'node:os';
import assert                   from 'node:assert/strict';
import test                     from 'node:test';
import { LMError }              from '../../src/index.js';
import { ALL as PRIMITIVE_ALL } from '@leismore/lmos-nodejs-primitives';
import {
    VALID    as ERROR_VALID,
    INVALID  as ERROR_INVALID
} from './errors.js';

function test_errors():void
{
    test('LMErrorErr-s', async (t) => {
    
        // Primitive values
        for (const value of PRIMITIVE_ALL) {
            await t.test(`LMErrorErr - ${String(value)}`, () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(value);
                }, Error, 'Error not thrown');
            });
        }
    
        // Invalid objects
        for (const value of ERROR_INVALID) {
            await t.test(`LMErrorErr - ${JSON.stringify(value)}`, () => {
                assert.throws(() => {
                    // @ts-expect-error
                    new LMError(value);
                }, Error, 'Error not thrown');
            });
        }
    
        // Valid objects
        for (const value of ERROR_VALID) {
            await t.test(`LMErrorErr - ${JSON.stringify(value)}`, () => {
                const error = new LMError(value);
                assert.ok(error instanceof LMError, 'Not instance of LMError');
                assert.strictEqual(error.name, 'LMError', 'Error name not LMError');
                assert.strictEqual(error.message, value.message, 'Incorrect error message');
                assert.strictEqual(error.cause, undefined, 'Error cause not undefined');
                assert.deepStrictEqual(error.error, value, 'Incorrect error property');
                assert.strictEqual(error.response, undefined, 'Response property not undefined');
                assert.strictEqual(error.previous, undefined, 'Previous property not undefined');
                assert.ok(error.timestamp instanceof Date, 'Timestamp property not instance of Date');
                assert.strictEqual(String(error), (
                    `${error.timestamp.toISOString()} / LMError`   + EOL +
                    `${value.message} (${value.code})` + EOL
                ), 'Incorrect error string representation');
            });
        }
    
    });
}

export { test_errors };
