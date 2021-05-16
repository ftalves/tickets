import 'module-alias/register';
import 'express-async-errors';
import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares';
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { NotFoundError } from './errors';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
