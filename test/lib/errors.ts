/**
 * Pre-defined different types of errors for testing the LMError class.
 */

// Invalid structures
const ERROR_EMPTY = {};

const ERROR_WITHOUT_MESSAGE_CODE = {
    notMessage : 'This is not a message',
    notCode    : 'This is not a code'
};

const ERROR_WITHOUT_MESSAGE = {
    notMessage : 'This is not a message',
    code       : 'This is a code'
};

const ERROR_WITHOUT_CODE = {
    message : 'This is a message',
    notCode : 'This is not a code'
};

// Invalid data types
const ERROR_MESSAGE_NOT_STRING = {
    message : 12345,
    code    : 'This is a code'
};

const ERROR_CODE_NOT_STRING = {
    message : 'This is a message',
    code    : 12345
};

const ERROR_MESSAGE_CODE_NOT_STRING = {
    message : 12345,
    code    : 12345
};

const ERROR_MESSAGE_EMPTY = {
    message : '',
    code    : 'This is a code'
};

const ERROR_CODE_EMPTY = {
    message : 'This is a message',
    code    : ''
};

const ERROR_MESSAGE_CODE_EMPTY = {
    message : '',
    code    : ''
};

const ERROR_CODE_SPECIAL_CHARACTERS = {
    message : 'This is a message',
    code    : 'This is a code with special characters !@#$%^&*()'
};

// Valid
const ERROR_VALID = {
    message : 'This is a message',
    code    : 'code_32'
};

// All
const ALL = [
    ERROR_EMPTY,
    ERROR_WITHOUT_MESSAGE_CODE,
    ERROR_WITHOUT_MESSAGE,
    ERROR_WITHOUT_CODE,
    ERROR_MESSAGE_NOT_STRING,
    ERROR_CODE_NOT_STRING,
    ERROR_MESSAGE_CODE_NOT_STRING,
    ERROR_MESSAGE_EMPTY,
    ERROR_CODE_EMPTY,
    ERROR_MESSAGE_CODE_EMPTY,
    ERROR_CODE_SPECIAL_CHARACTERS,
    ERROR_VALID
];

// Exporting
export {
    ERROR_EMPTY,
    ERROR_WITHOUT_MESSAGE_CODE,
    ERROR_WITHOUT_MESSAGE,
    ERROR_WITHOUT_CODE,
    ERROR_MESSAGE_NOT_STRING,
    ERROR_CODE_NOT_STRING,
    ERROR_MESSAGE_CODE_NOT_STRING,
    ERROR_MESSAGE_EMPTY,
    ERROR_CODE_EMPTY,
    ERROR_MESSAGE_CODE_EMPTY,
    ERROR_CODE_SPECIAL_CHARACTERS,
    ERROR_VALID,
    ALL
};
