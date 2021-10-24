import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '@/app';
import { Ticket } from '@/models/Ticket';

it('Returns error 404 if the ticket is not found', async () => {
  const validId = mongoose.Types.ObjectId().toHexString();
  const response = await request(app).get(`/api/tickets/${validId}`).send();

  expect(response.status).toEqual(404);
});

it('Returns the ticket if it is found', async () => {
  const title = 'Test';
  const price = 20;
  const ticket = new Ticket({ title, price, userId: 'testid' });
  await ticket.save();

  const response = await request(app).get(`/api/tickets/${ticket.id}`).send();

  expect(response.status).toEqual(200);
  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
