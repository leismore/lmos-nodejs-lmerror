/**
 * LMError - An Error class for LMOS for Node.js project
 *
 * Error
 *   invalid_error
 *   invalid_error_message
 *   invalid_error_code
 *   invalid_http_response
 *   invalid_http_statusCode
 *   invalid_http_header
 *   invalid_http_body
 *   invalid_previous
 */

import {EOL} from 'os';
import {ptnMessage, ptnCode, ptnStatusCode} from '@lib/patterns.js';
import {Err} from '@lib/type/Err.js';
import {Res, Header as ResHeader} from '@lib/type/Res.js';

class LMError extends Error
{
  public readonly error      :   Err;
  public readonly response?  :   Res;
  public readonly previous?  :   Error;
  public readonly timestamp  :   Date;

  /**
   * 
   * @throws Error
   *   invalid_error_message
   *   invalid_error_code
   *   invalid_http_statusCode
   *   invalid_http_header
   *   invalid_http_body
   *   invalid_previous
   * 
   */
  public constructor(error: Err, response?: Res, previous?: Error)
  {
    super(error.message);
    try
    {
      this.error = this.filterError(error);
      if (response!==undefined)
      {
        this.response   = this.filterResponse(response);
      }
      if (previous !== undefined)
      {
        this.previous = this.filterPrevious(previous);
      }
    }
    catch (e)
    {
      throw e;
    }
    this.timestamp = new Date();
  }

  public toString(): string
  {
    let text:string = (
      EOL + this.toStringPrefix() + EOL +
      this.toStringError()
    );
    if (this.toStringResponse() !== null)
    {
      text = text + EOL + this.toStringResponse();
    }
    if (this.toStringPrevious() !== null)
    {
      text = text + EOL + this.toStringPrevious();
    }
    text = text + EOL;
    return text;
  }

  private toStringPrefix(): string
  {
    let errorName = this.constructor.name;
    return (this.timestamp.toISOString() + ' / ' + errorName);
  }

  private toStringError(): string
  {
    return ( `${this.error.message} (${this.error.code})` );
  }

  private toStringResponse(): string | null
  {
    let text = '';
    if (this.response === undefined)
    {
      return null;
    }
    else
    {
      text = `HTTP ${this.response.statusCode}`;
      if (this.response.headers !== undefined)
      {
        for (let k in this.response.headers)
        {
          text = text + EOL + `${k}: ${this.response.headers[k]}`;
        }
      }
      if (this.response.body !== undefined)
      {
        text = text + EOL + String(this.response.body);
      }
      return text;
    }
  }

  private toStringPrevious(): string | null
  {
    if (this.previous === undefined)
    {
      return null;
    }
    else
    {
      return String(this.previous);
    }
  }

  /**
   * Test if the error is valid
   * 
   * @throws Error
   *   invalid_error
   *   invalid_error_message
   *   invalid_error_code
   */
  protected static filterError(error: unknown): Err
  {
    let validError : Err;
    let message    : string;
    let code       : string;

    // Check if the error matches the expected structure
    if (typeof error !== 'object' || error === null)
    {
      throw new Error('invalid_error');
    }

    if ('message' in error && typeof error.message === 'string')
    {
      message = error.message;
    }
    else
    {
      throw new Error('invalid_error_message');
    }

    if ('code' in error && typeof error.code === 'string')
    {
      code = error.code;
    }
    else
    {
      throw new Error('invalid_error_code');
    }
    
    // Check if the message and code match the patterns
    if (ptnMessage.test(message) === false)
    {
      throw new Error('invalid_error_message');
    }
    if (ptnCode.test(code) === false)
    {
      throw new Error('invalid_error_code');
    }

    // Return the valid error object
    validError = {
      message : message,
      code    : code
    };

    return validError;
  }

  /**
   * Test if the response is valid
   * 
   * @throws Error
   *   invalid_http_response
   *   invalid_http_statusCode
   *   invalid_http_header
   *   invalid_http_body
   */
  protected static filterResponse(response: unknown): Res
  {
    let validResponse: Res;
    let statusCode: string;
    let headers: (ResHeader[]|undefined);
    let body:any;

    // Check if the response matches the expected structure
    if (typeof response !== 'object' || response === null)
    {
      throw new Error('invalid_http_response');
    }

    if ('statusCode' in response && typeof response.statusCode === 'string')
    {
      statusCode = response.statusCode;
    }
    else
    {
      throw new Error('invalid_http_statusCode');
    }

    if (   'headers' in response            === false        ||
         ( 'headers' in response            === true  &&
            response.headers                === undefined )  ||
         ( 'headers' in response            === true  &&
            Array.isArray(response.headers) === true  &&
            response.headers.length         === 0         )
       )
    {
      headers = undefined;
    }
    else if ( 'headers' in response           &&
              Array.isArray(response.headers) &&
              response.headers.length > 0 )
    {
      headers = [];

      for (const e of response.headers)
      {
        if ( ( typeof e       !== 'object' || e              === null ) ||
             ( typeof e.name  !== 'string' || e.name.length  === 0    ) ||
             ( typeof e.value !== 'string' || e.value.length === 0    )
           )
        {
          throw new Error('invalid_http_header');
        }
        else {
          headers.push({
            name  : e.name,
            value : e.value
          });
        }
      }
    }
    else {
      throw new Error('invalid_http_header');
    }

    if ( 'body' in response === false ||
          response.body     === undefined )
    {
      body = undefined;
    } else {
      body = response.body;
    }

    // Check if the statusCode, headers, and body match the expected patterns
    if (ptnStatusCode.test(statusCode) === false)
    {
      throw new Error('invalid_http_statusCode');
    }

    // Return the valid response object
    validResponse = {
      statusCode : statusCode,
      headers    : headers,
      body       : body
    };
    return validResponse;
  }

  /**
   * Test if the previous is an Error instance
   * 
   * @throws Error
   *   invalid_previous
   */
  protected static filterPrevious(previous: unknown): Error
  {
    if (previous instanceof Error)
    {
      return previous;
    }
    else
    {
      throw new Error('invalid_previous');
    }
  }
}




export {LMError, Err, Res, ResHeader};
