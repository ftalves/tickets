import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  requestValidator,
  requireAuth,
  NotAuthorizedError,
} from '@ftickets/common';

import { Ticket } from '@/models/Ticket';

const router = express.Router();

const validationSchema = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
];

router.put(
  '/api/tickets/:id',
  requireAuth,
  validationSchema,
  requestValidator,
  async (req: Request, res: Response) => {
    let ticket = null;

    try {
      ticket = await Ticket.findById(req.params.id);
    } catch (e) {
      throw new NotFoundError();
    }

    if (ticket) {
      if (ticket.userId !== req.currentUser!.id) {
        // Shouldn't this validation happen before validationSchema?
        throw new NotAuthorizedError();
      }

      ticket.set({ title: req.body.title, price: req.body.price });
      await ticket.save();
      res.send(ticket);
    } else {
      throw new NotFoundError();
    }
  }
);

export { router as updateTicketRouter };
