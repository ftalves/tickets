import { SerializableError } from './SerializableError';

export class BadRequestError extends SerializableError {
  statusCode = 400;

  constructor(private errors: string[]) {
    super('Bad request.');
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return this.errors.map((errorMsg) => ({
      msg: errorMsg,
    }));
  }
}
