import express from 'express';

const router = express.Router();

router.get('/api/users/current', (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
