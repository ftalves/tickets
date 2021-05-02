export abstract class SerializableError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message); // For logging purposes

    Object.setPrototypeOf(this, SerializableError.prototype);
  }

  abstract serializeErrors(): {
    msg: string;
    field?: string;
  }[];
}
