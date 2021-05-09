import { SerializableError } from './SerializableError';

export class NotFoundError extends SerializableError {
  statusCode = 404;

  constructor() {
    super('Route not found.');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ msg: 'Not Found' }];
  }
}
