import express, { Response } from 'express';
import { Ticket } from '@/models/Ticket';

const router = express.Router();

router.get('/api/tickets', async (_, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { router as showAllTicketsRouter };
