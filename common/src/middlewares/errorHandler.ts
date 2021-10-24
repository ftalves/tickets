import { Request, Response, NextFunction } from 'express';

import { SerializableError } from '@/errors';

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof SerializableError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  console.error(err);
  res.status(500).send({
    message: 'Something went wrong.',
  });
};
