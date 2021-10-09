import { ValidationError } from 'express-validator';

import { SerializableError } from './SerializableError';

export class RequestValidationError extends SerializableError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request parameter');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { msg: err.msg, field: err.param };
    });
  }
}
