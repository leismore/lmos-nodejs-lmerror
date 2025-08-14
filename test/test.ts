import { EOL }                  from 'os';
import assert                   from 'node:assert/strict';
import test                     from 'node:test';
import { LMError }              from '@src/index.js';
import { ALL as PRIMITIVE_ALL } from '@leismore/lmos-nodejs-primitives';
import {
    VALID       as ERROR_VALID,
    INVALID     as ERROR_INVALID,
    ERROR_VALID as THE_VALID_ERROR
} from '@test/lib/errors.js';


// Test LMErrorErr-s
test('LMErrorErr-s', async (t) => {

    // Primitive values
    for (const value of PRIMITIVE_ALL) {
        await t.test(`LMErrorErr - ${String(value)}`, () => {
            assert.throws(() => {
                // @ts-expect-error
                new LMError(value);
            }, Error);
        });
    }

    // Invalid objects
    for (const value of ERROR_INVALID) {
        await t.test(`LMErrorErr - ${JSON.stringify(value)}`, () => {
            assert.throws(() => {
                // @ts-expect-error
                new LMError(value);
            }, Error);
        });
    }

    // Valid objects
    for (const value of ERROR_VALID) {
        await t.test(`LMErrorErr - ${JSON.stringify(value)}`, () => {
            const error = new LMError(value);
            assert.ok(error instanceof LMError, String(error));
            assert.strictEqual(error.name, 'LMError', error.name);
            assert.strictEqual(error.message, value.message, error.message);
            assert.deepStrictEqual(error.error, value, JSON.stringify(error.error));
            assert.strictEqual(String(error), (
                `${error.timestamp.toISOString()} / LMError`   + EOL +
                `${error.error.message} (${error.error.code})` + EOL
            ), String(error));
        });
    }

});

