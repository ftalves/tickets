import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, requestValidator } from '@ftickets/common';

import { Ticket } from '@/models/Ticket';

const router = express.Router();

const validationSchema = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
];

router.post(
  '/api/tickets',
  requireAuth,
  validationSchema,
  requestValidator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = new Ticket({ title, price, userId: req.currentUser!.id });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
