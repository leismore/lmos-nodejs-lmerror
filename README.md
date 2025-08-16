# lmos-nodejs-lmerror

An Error class for [LMOS for Node.js](https://nodejs.lmos.leismore.org) project

## Features

* Error Message & Code
* HTTP-Response Integration
* Chained-Errors Support
* Timestamp

## Motivation

When I wrote my first commercial Node.js project in 2019, I had been struggling to design a general error-handling module with the standard JavaScript `Error` object.

Because in the widely-used ECMAScript 3, the standard `Error` object only supports a text error message. Meanwhile in a real world server-side environment, handling an error usually means:

1. Identifying the error by a error-message for human and a error-code for machine
2. Recording the whole related error chain, if necessary
3. Sending a proper HTTP response according to the error

To satisfy the requirement of the Node.js environment, I have decided to introduce the `LMError` class to simplify and standardise the error-handling process in Node.js or other server-side JavaScript environments.

`LMError` class is extended from the standard `Error` class. By integrating with the support of error message & error code, HTTP response, and error chain, now all errors can be processed by one error-handler under a unified procedure.

## Installation

`npm install @leismore/lmos-nodejs-lmerror`

## Test

`npm test`

## Build

`npm run build`

## Example

```typescript
import { LMError } from '@leismore/lmos-nodejs-lmerror';
import type { LMErrorErr, LMErrorRes, LMErrorResHeader } from '@leismore/lmos-nodejs-lmerror';

let error:LMErrorErr = { message: 'an error message', code: 'error_code_1984' };

let response:LMErrorRes = {
    statusCode: '500',
    headers: [
      { name: 'Content-Type'     , value: 'text/html; charset=utf-8' },
      { name: 'Content-Language' , value: 'en-GB'                    }
    ],
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

let previous = new Error('standard Error');

throw new LMError(error, response, previous);
```

## LMError Class

### Data Types

```typescript
type LMErrorErr = {
  readonly message : string,         // Message for human
  readonly code    : string          // Code for machine
};

type LMErrorResHeader = {            // HTTP Header
  readonly name  : string,
  readonly value : string
};

type LMErrorRes = {                            // HTTP response
  readonly statusCode  :  string,              // HTTP response status code
  readonly headers?    :  LMErrorResHeader[],  // HTTP headers
  readonly body?       :  any                  // HTTP body
};
```

### Properties

```typescript
public readonly error      :   LMErrorErr;
public readonly response?  :   LMErrorRes;
public readonly previous?  :   Error;
public readonly timestamp  :   Date;
```

### Methods

```typescript
/**
  * @throws {Error}
  *   invalid_error
  *   invalid_error_message
  *   invalid_error_code
  *   invalid_http_response
  *   invalid_http_statusCode
  *   invalid_http_header
  *   invalid_http_body
  *   invalid_previous
  */
public constructor(error: LMErrorErr, response?: LMErrorRes, previous?: Error)

public toString(): string
```

## License

© [Leismore](https://www.leismore.co) 2025

[MIT License](https://choosealicense.com/licenses/mit)

## Authors

* [Kyle Chine / Kai Qin / 秦凯](https://kyle.chine.leismore.org) since 02 July 2019

## Credits

* Inspired greatly by [http-errors](https://www.npmjs.com/package/http-errors)
* Obsoleted package: [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror)




------------------------------------------------------------------------------

Product of [Leismore OpenSource](https://lmos.leismore.org) Project

Supported by [Leismore](https://www.leismore.co) (Australian Business Number: 25 935 862 619)
