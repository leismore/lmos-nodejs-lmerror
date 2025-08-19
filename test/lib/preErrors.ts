/**
 * Predefined different types of error objects as previous errors for testing the LMError class.
 */

import { LMError } from '../../src/index.js';

// Non-Error objects
const PREVIOUS_EMPTY = {};

const PREVIOUS_NOT_ERROR = {
    message : 'This is not an Error object',
    code    : 'not_error',
};

// Error objects
const PREVIOUS_ERROR_WITHOUT_CAUSE = new Error('This is an Error object without cause');

const PREVIOUS_ERROR_WITH_CAUSE = new Error('This is an Error object with cause', {
    cause: new Error('This is the cause of the error')
});

// LMError objects
const PREVIOUS_LMERROR_ERROR = new LMError(
    {
        message : 'This is a LMError object',
        code    : 'lmerror_01'
    }
);

const PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS = new LMError(
    {
        message : 'This is a LMError object with response',
        code    : 'lmerror_02'
    },
    {
        statusCode: '404'
    }
);

const PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS = new LMError(
    {
        message : 'This is a LMError object with response status code and headers',
        code    : 'lmerror_03'
    },
    {
        statusCode: '404',
        headers: [
            { name: 'Date'   , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
            { name: 'Server' , value: 'Apache/2.4.1 (Unix)' }
        ]
    }
);

const PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_BODY = new LMError(
    {
        message : 'This is a LMError object with response status code and body',
        code    : 'lmerror_04'
    },
    {
        statusCode : '404',
        body       : 'not found'
    }
);

const PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS_BODY = new LMError(
    {
        message : 'This is a LMError object with response status code, headers and body',
        code    : 'lmerror_05'
    },
    {
        statusCode : '404',
        headers    : [
            { name: 'Content-Type' , value: 'application/json' },
            { name: 'Date'         , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
            { name: 'Server'       , value: 'Apache/2.4.1 (Unix)' }
        ],
        body       : {
            error: 'not found'
        }
    }
);

const PREVIOUS_LMERROR_PRE_ERROR = new LMError(
    {
        message : 'This is a LMError object with previous error',
        code    : 'lmerror_06'
    },
    {
        statusCode: '404',
        headers: [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'Date'        , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
            { name: 'Server'      , value: 'Apache/2.4.1 (Unix)' }
        ],
        body: {
            error: 'not found'
        }
    },
    new Error('This is the previous error', {
        cause: new Error('This is the cause of the previous error')
    })
);

const PREVIOUS_LMERROR_PRE_LMERROR = new LMError(
    {
        message : 'This is a LMError object with previous LMError',
        code    : 'lmerror_07'
    },
    {
        statusCode: '500',
        headers: [
            { name: 'Content-Type', value: 'application/json' },
            { name: 'Date'        , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
            { name: 'Server'      , value: 'Apache/2.4.1 (Unix)' }
        ],
        body: {
            error: 'internal server error'
        }
    },
    new LMError(
        {
            message : 'This is the previous LMError',
            code    : 'lmerror_08'
        },
        {
            statusCode: '404',
            headers: [
                { name: 'Content-Type', value: 'application/json' },
                { name: 'Date'        , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
                { name: 'Server'      , value: 'Apache/2.4.1 (Unix)' }
            ],
            body: {
                error: 'not found'
            }
        }
    )
);

// All Error objects
const ALL = [
    PREVIOUS_EMPTY,
    PREVIOUS_NOT_ERROR,
    PREVIOUS_ERROR_WITHOUT_CAUSE,
    PREVIOUS_ERROR_WITH_CAUSE,
    PREVIOUS_LMERROR_ERROR,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_BODY,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS_BODY,
    PREVIOUS_LMERROR_PRE_ERROR,
    PREVIOUS_LMERROR_PRE_LMERROR
];

// Invalid Error objects
const INVALID = [
    PREVIOUS_EMPTY,
    PREVIOUS_NOT_ERROR
];

// Valid Error objects
const VALID = [
    PREVIOUS_ERROR_WITHOUT_CAUSE,
    PREVIOUS_ERROR_WITH_CAUSE,
    PREVIOUS_LMERROR_ERROR,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_BODY,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS_BODY,
    PREVIOUS_LMERROR_PRE_ERROR,
    PREVIOUS_LMERROR_PRE_LMERROR
];

// Exporting
export {
    PREVIOUS_EMPTY,
    PREVIOUS_NOT_ERROR,
    PREVIOUS_ERROR_WITHOUT_CAUSE,
    PREVIOUS_ERROR_WITH_CAUSE,
    PREVIOUS_LMERROR_ERROR,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_BODY,
    PREVIOUS_LMERROR_ERROR_RESPONSE_STATUS_HEADERS_BODY,
    PREVIOUS_LMERROR_PRE_ERROR,
    PREVIOUS_LMERROR_PRE_LMERROR,
    ALL, INVALID, VALID
};
