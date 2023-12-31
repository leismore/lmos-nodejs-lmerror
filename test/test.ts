import { assert }            from 'chai';
import { LMError, LMErrorErr as Err, LMErrorRes as Res } from '../src/index.js';

// Different Err-s

const err_valid:Err = {
    message: 'an error message',
    code:    'error_code_1984'
};

const err_invalid_message:Err = {
    message: '',
    code:    'valid_code_1984'
};

const err_invalid_code:Err = {
    message: 'an valid message',
    code:    'invalid code 1984'
};

const err_invalid_message_code:Err = {
    message: '',
    code:    'invalid code 1984'
};

// Different Res-es

const res_valid:Res = {
    statusCode: '500',
    headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': 'en-GB'
    },
    body: `<!DOCTYPE html>
           <html lang="en-GB">
             <head>
               <meta charset="UTF-8">
               <title>500 Internal Server Error</title>
             </head>
             <body>
               <h1>500 Internal Server Error</h1>
               <p>Don't cry over spilt milk</p>
             </body>
           </html>`
};

const res_invalid_statusCode:Res = {
    statusCode: '50',
    headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': 'en-GB'
    },
    body: `<!DOCTYPE html>
           <html lang="en-GB">
             <head>
               <meta charset="UTF-8">
               <title>500 Internal Server Error</title>
             </head>
             <body>
               <h1>500 Internal Server Error</h1>
               <p>Don't cry over spilt milk</p>
             </body>
           </html>`
};

const res_invalid_headers:Res = {
    statusCode: '500',
    headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Language': ''
    },
    body: `<!DOCTYPE html>
           <html lang="en-GB">
             <head>
               <meta charset="UTF-8">
               <title>500 Internal Server Error</title>
             </head>
             <body>
               <h1>500 Internal Server Error</h1>
               <p>Don't cry over spilt milk</p>
             </body>
           </html>`
};

const res_invalid_statusCode_headers:Res = {
    statusCode: '50',
    headers: {
        'Content-Type': '',
        'Content-Language': 'en-GB'
    },
    body: `<!DOCTYPE html>
           <html lang="en-GB">
             <head>
               <meta charset="UTF-8">
               <title>500 Internal Server Error</title>
             </head>
             <body>
               <h1>500 Internal Server Error</h1>
               <p>Don't cry over spilt milk</p>
             </body>
           </html>`
};

// Errors

const error    = new Error('standard Error');
const lmerror  = new LMError(err_valid, res_valid, error);

/**
 * 
 * Validating LMError properties
 * 
 * @param {LMError}  lmerror
 * @param {Err}      error 
 * @param {Res}      [response] 
 * @param {Error}    [previous]
 *  
 */
function validate_lmerror(lmerror:LMError, error:Err, response?:Res, previous?:Error):void
{
    // Check error-message & error-code
    assert(
        (lmerror.message === error.message && lmerror.error.message === error.message),
        'incorrect error message'
    );
    assert(
        (lmerror.error.code === error.code),
        'incorrect error code'
    );

    // Check HTTP response
    if (response === undefined)
    {
        assert(
            (lmerror.response === undefined),
            'incorrect HTTP response'
        );
    }
    else
    {
        if (lmerror.response === undefined)
        {
            assert(false, 'incorrect HTTP response');
        }
        else
        {
            // Check HTTP status code
            assert(
                (lmerror.response.statusCode === response.statusCode),
                'incorrect HTTP status code'
            );

            // Check HTTP headers
            if (response.headers === undefined)
            {
                assert(
                    (lmerror.response.headers === undefined),
                    'incorrect HTTP headers'
                );
            }
            else
            {
                if (lmerror.response.headers === undefined)
                {
                    assert(false, 'incorrect HTTP headers');
                }
                else
                {
                    assert(
                        ( Object.keys(lmerror.response.headers).length === Object.keys(response.headers).length ),
                        'incorrect HTTP headers'
                    );

                    for (let k in lmerror.response.headers)
                    {
                        let v = lmerror.response.headers[k];
                        assert(
                            (k in response.headers && response.headers[k] === v),
                            ('incorrect HTTP header: ' + k)
                        );
                    }
                }
            }

            // Check HTTP body
            assert(lmerror.response.body === response.body, 'incorrect HTTP body');
        }
    }

    // Check previous
    assert(lmerror.previous === previous, 'incorrect previous');

    // Check timestamp
    assert( lmerror.timestamp instanceof Date, 'incorrect timestamp' );
}

// Test Started

describe('LMError Object Initialisation', function(){

    // Creating with valid parameters
    it('With all parameters', function(){
        let lme = new LMError(err_valid, res_valid, lmerror);
        validate_lmerror(lme, err_valid, res_valid, lmerror);
    });
    it('With err only', function(){
        let lme = new LMError(err_valid);
        validate_lmerror(lme, err_valid);
    });
    it('With err and res', function(){
        let lme = new LMError(err_valid, res_valid);
        validate_lmerror(lme, err_valid, res_valid);
    });
    it('With err and previous', function(){
        let lme = new LMError(err_valid, undefined, lmerror);
        validate_lmerror(lme, err_valid, undefined, lmerror);
    });

    // Creating with invalid Err-s
    it('With invalid err (message)', function(){
        assert.throws(function(){
            new LMError(err_invalid_message, res_valid, lmerror);
        }, Error, 'invalid_error_message');
    });
    it('With invalid err (code)', function(){
        assert.throws(function(){
            new LMError(err_invalid_code, res_valid, lmerror);
        }, Error, 'invalid_error_code');
    });
    it('With invalid err (message & code)', function(){
        assert.throws(function(){
            new LMError(err_invalid_message_code, res_valid, lmerror);
        }, Error);
    });

    // Creating with invalid Res-es
    it('With invalid res (statusCode)', function(){
        assert.throws(function(){
            new LMError(err_valid, res_invalid_statusCode, lmerror);
        }, Error, 'invalid_http_statusCode');
    });
    it('With invalid res (headers)', function(){
        assert.throws(function(){
            new LMError(err_valid, res_invalid_headers, lmerror);
        }, Error, 'invalid_http_header');
    });
    it('With invalid res ( statusCode & headers)', function(){
        assert.throws(function(){
            new LMError(err_valid, res_invalid_statusCode_headers, lmerror);
        }, Error);
    });

    // Creating with invalid Err & Res
    it('With invalid err & res', function(){
        assert.throws(function(){
            new LMError(err_invalid_message_code, res_invalid_statusCode_headers, lmerror);
        }, Error);
    });
});

describe('LMError: Adding a previous error', function(){
    it('With a standard error', function(done){
        let e = new LMError(err_valid, res_valid);
        let old_timestamp = e.timestamp.getTime();
        setTimeout(() => {
            e.addPrevious(error);
            validate_lmerror(e, err_valid, res_valid, error);
            assert( (e.timestamp.getTime() > old_timestamp), 'timestamp is not re-generated' );
            done();
        }, 1);
    });
    it('With a LMError', function(done){
        let e = new LMError(err_valid, res_valid);
        let old_timestamp = e.timestamp.getTime();
        setTimeout(() => {
            e.addPrevious(lmerror);
            validate_lmerror(e, err_valid, res_valid, lmerror);
            assert( (e.timestamp.getTime() > old_timestamp), 'timestamp is not re-generated' );
            done();
        }, 1);
    });
    it('A previous error already exists', function(){
        assert.throws(function(){
            let e = new LMError(err_valid, res_valid, lmerror);
            e.addPrevious(error);
        }, Error, 'previous_exists');
    });
});

describe('LMError: toString', function(){
    it('With err, res, and previous', function(){
        let e = new LMError(err_valid, res_valid, lmerror);
        let t = String(e);
        console.log(t);
        assert((typeof t === 'string' && t.length > 0), 'invalid LMError text');
    });
    it('With err only', function(){
        let e = new LMError(err_valid);
        let t = String(e);
        console.log(t);
        assert((typeof t === 'string' && t.length > 0), 'invalid LMError text');
    });
    it('With err & res', function(){
        let e = new LMError(err_valid, res_valid);
        let t = String(e);
        console.log(t);
        assert((typeof t === 'string' && t.length > 0), 'invalid LMError text');
    });
    it('With err & previous', function(){
        let e = new LMError(err_valid, undefined, lmerror);
        let t = String(e);
        console.log(t);
        assert((typeof t === 'string' && t.length > 0), 'invalid LMError text');
    });
});
