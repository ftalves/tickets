import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

import { BadRequestError } from '@/errors';
import { User } from '@/models/User';
import { compare } from '@/helpers/password';
import { requestValidator } from '@/middlewares';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').normalizeEmail().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = (await User.findOne({ email })) as any;

    const passwordsMatch =
      existingUser && (await compare(existingUser.password, password));

    if (!existingUser || !passwordsMatch) {
      throw new BadRequestError([
        'The E-mail / Password combination does not have results',
      ]);
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };
    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
