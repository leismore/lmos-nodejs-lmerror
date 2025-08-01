/**
 * Res type for describing HTTP response info.
 */

type Header = {
  readonly name  : string,
  readonly value : string
};

type Res = {                         // HTTP response
  readonly statusCode  :  string,    // HTTP response status code
  readonly headers?    :  Header[],  // HTTP headers
  readonly body?       :  any        // HTTP body
};

export {Res, Header};
