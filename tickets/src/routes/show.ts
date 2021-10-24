import express, { Request, Response } from 'express';
import { NotFoundError } from '@ftickets/common';

import { Ticket } from '@/models/Ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      res.send(ticket);
    } else {
      throw new NotFoundError();
    }
  } catch (e) {
    throw new NotFoundError();
  }
});

export { router as showTicketRouter };
