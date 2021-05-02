import { Request, Response, NextFunction } from 'express';

import { SerializableError } from '@/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SerializableError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  res.status(500).send({
    message: 'Something went wrong.',
  });
};
