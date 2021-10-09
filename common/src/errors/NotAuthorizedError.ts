import { SerializableError } from './SerializableError';

export class NotAuthorizedError extends SerializableError {
  statusCode = 401;

  constructor() {
    super('Not authorized.');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ msg: 'Not authorized' }];
  }
}
