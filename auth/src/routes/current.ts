import express from 'express';

const router = express.Router();

router.get('/api/users/current', (_, res) => {
  res.send('Hi there!!');
});

export { router as currentUserRouter };
