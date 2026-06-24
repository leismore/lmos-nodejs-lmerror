/**
 * Regular Expressions for:
 *   1. ptnMessage        = error message
 *   2. ptnCode           = error code
 *   3. ptnStatusCode     = HTTP response status code
 *   4. ptnHTTPHeaderName = HTTP header name
 */

const ptnMessage        = /^[\w\u0020]+$/;
const ptnCode           = /^\w+$/;
const ptnStatusCode     = /^\d{3}$/;
const ptnHTTPHeaderName = /^[\w\-]+$/;

export { ptnMessage, ptnCode, ptnStatusCode, ptnHTTPHeaderName };
