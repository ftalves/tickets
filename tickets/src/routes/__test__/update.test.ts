import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '@/app';
import { signin } from '@/test/helpers';
import { Ticket } from '@/models/Ticket';

it('Returns 401 if the user is not signed in', async () => {
  const validId = mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .put(`/api/tickets/${validId}`)
    .send({ title: 'sdfdsfsdf', price: 20 });

  expect(response.status).toEqual(401);
});

it('Returns 404 if the provided id does not exist', async () => {
  const validId = mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .put(`/api/tickets/${validId}`)
    .set('Cookie', signin())
    .send({ title: 'sdfdsfsdf', price: 20 });

  expect(response.status).toEqual(404);
});

it('Returns 401 if the user does not own the ticket', async () => {
  const firstUserId = mongoose.Types.ObjectId().toHexString();
  const secondUserId = mongoose.Types.ObjectId().toHexString();

  const ticket = new Ticket({ title: 'Title', price: 20, userId: firstUserId });
  await ticket.save();

  const response = await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set(
      'Cookie',
      signin({ id: secondUserId, email: 'user2@mail.com', password: '1234' })
    )
    .send({ title: 'sdfdsfsdf', price: 20 });

  expect(response.status).toEqual(401);
});

it('Returns 400 if the user provides invalid inputs', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const ticket = new Ticket({ title: 'Title', price: 20, userId });
  await ticket.save();

  const invalidTitleResponse = await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set(
      'Cookie',
      signin({ id: userId, email: 'user@mail.com', password: '1234' })
    )
    .send({ title: '', price: 20 });

  const invalidPriceResponse = await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set(
      'Cookie',
      signin({ id: userId, email: 'user@mail.com', password: '1234' })
    )
    .send({ title: 'sadasdasdasd', price: -20 });

  expect(invalidTitleResponse.status).toEqual(400);
  expect(invalidPriceResponse.status).toEqual(400);
});

it('Updates the ticket', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const ticket = new Ticket({ title: 'Title', price: 20, userId });
  await ticket.save();

  const newTitle = 'Updated Title';
  const newPrice = 25;

  const response = await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set(
      'Cookie',
      signin({ id: userId, email: 'user@mail.com', password: '1234' })
    )
    .send({ title: newTitle, price: newPrice });

  const newTicket = await Ticket.findById(ticket.id);

  expect(response.status).toEqual(200);
  expect(newTicket?.title).toEqual(newTitle);
  expect(newTicket?.price).toEqual(newPrice);
});
