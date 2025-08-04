/**
 * Pre-defined different types of HTTP responses for testing the LMError class.
 */

// Invalid structures
const RESPONSE_EMPTY = {};

const RESPONSE_WITHOUT_CODE_HEADERS_BODY = {
    notStatusCode : '200',
    notHeaders    : [
        { name: 'Content-Type'     , value: 'application/json' },
        { name: 'Content-Encoding' , value: 'gzip' }
    ],
    notBody       : {
        message: 'This is a message'
    }
};

const RESPONSE_HEADERS_NOT_ARRAY = {
    statusCode : '204',
    headers    : 'This is not an array of headers'
};

const RESPONSE_HEADERS_WITHOUT_NAME_VALUE = {
    statusCode : '204',
    headers    : [
        { name    : 'Date'   , value    : 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { notName : 'Server' , notValue : 'Apache/2.4.1 (Unix)' }
    ]
};

const RESPONSE_HEADERS_WITHOUT_NAME = {
    statusCode : '204',
    headers    : [
        { name    : 'Date'   , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { notName : 'Server' , value: 'Apache/2.4.1 (Unix)' }
    ]
};

const RESPONSE_HEADERS_WITHOUT_VALUE = {
    statusCode : '204',
    headers    : [
        { name: 'Date'   , value    : 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 'Server' , notValue : 'Apache/2.4.1 (Unix)' }
    ]
};

// Invalid data types
const RESPONSE_CODE_NOT_STRING = {
    statusCode : 404
};

const RESPONSE_CODE_EMPTY = {
    statusCode : ''
};

const RESPONSE_CODE_2DIGITS = {
    statusCode : '99'
};

const RESPONSE_CODE_4DIGITS = {
    statusCode : '1000'
};

const RESPONSE_CODE_NOT_DIGITS = {
    statusCode : 'ABC'
};

const RESPONSE_HEADERS_NAME_NOT_STRING = {
    statusCode : '204',
    headers    : [
        { name: 'Date'   , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 12345678 , value: 'Apache/2.4.1 (Unix)' }
    ]
};

const RESPONSE_HEADERS_VALUE_NOT_STRING = {
    statusCode : '204',
    headers    : [
        { name: 'Date'   , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 'Server' , value: 12345 }
    ]
};

const RESPONSE_HEADERS_NAME_VALUE_NOT_STRING = {
    statusCode : '204',
    headers    : [
        { name: 'Date' , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 12345  , value: 12345 }
    ]
};

const RESPONSE_HEADERS_NAME_EMPTY = {
    statusCode : '204',
    headers    : [
        { name: 'Date' , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: ''     , value: 'Apache/2.4.1 (Unix)' }
    ]
};

const RESPONSE_HEADERS_VALUE_EMPTY = {
    statusCode : '204',
    headers    : [
        { name: 'Date'  , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 'Server', value: '' }
    ]
};

const RESPONSE_HEADERS_NAME_VALUE_EMPTY = {
    statusCode : '204',
    headers    : [
        { name: 'Date' , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: ''     , value: '' }
    ]
};

// Valid
const RESPONSE_VALID = {
    statusCode : '200',
    headers    : [
        { name: 'Content-Type'     , value: 'application/json' },
        { name: 'Content-Encoding' , value: 'gzip' }
    ],
    body       : {message: 'This is a valid response'}
};

const RESPONSE_VALID_CODE = {
    statusCode : '204'
};

const RESPONSE_VALID_CODE_HEADERS = {
    statusCode : '204',
    headers    : [
        { name: 'Date'  , value: 'Tue, 29 Oct 2024 16:56:32 GMT' },
        { name: 'Server', value: 'Apache/2.4.1 (Unix)' }
    ]
};

const RESPONSE_VALID_CODE_HEADERS_EMPTY_ARRAY = {
    statusCode : '204',
    headers    : []
};

const RESPONSE_VALID_CODE_BODY = {
    statusCode : '200',
    body       : 'This is a valid response body'
};

// Exporting
export {
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
};
