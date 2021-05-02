import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (_, res) => {
  res.send('Sign-in');
});

export { router as signInRouter };
