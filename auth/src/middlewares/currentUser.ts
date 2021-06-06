import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  const userJwt = req.session?.jwt;

  if (userJwt) {
    try {
      const payload = jwt.verify(userJwt, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
  }

  next();
};
