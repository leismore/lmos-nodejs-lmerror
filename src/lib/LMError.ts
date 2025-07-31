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
import {Res} from '@lib/type/Res.js';

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
   * 
   * @throws Error
   *   invalid_http_statusCode
   *   invalid_http_header
   *   invalid_http_body
   * 
   */
  private filterResponse(response: Res): Res
  {
    if (ptnStatusCode.test(response.statusCode) === false)
    {
      throw new Error('invalid_http_statusCode');
    }

    if (response.headers !== undefined && typeof response.headers !== 'object')
    {
      throw new Error('invalid_http_header');
    }
    else if (
      response.headers !== undefined && Object.keys(response.headers).length !== 0
    )
    {
      for (let k in response.headers)
      {
        if (k.length === 0 || response.headers[k].length === 0)
        {
          throw new Error('invalid_http_header');
        }
      }
    }
    else
    {
      response.headers = undefined;
    }

    return response;
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




export {LMError, Err, Res};
