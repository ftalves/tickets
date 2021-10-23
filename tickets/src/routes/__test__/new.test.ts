import request from 'supertest';

import { app } from '@/app';
import { signin } from '@/test/helpers';
import { Ticket } from '@/models/Ticket';

it('Has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('Returns error 401 if the user is not signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).toEqual(401);
});

it('Do not return error 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('Returns an error if an invalid title is provided', async () => {
  const undefinedTitleResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ price: 10 });
  const invalidTitleResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: '', price: 10 });

  expect(undefinedTitleResponse.status).toEqual(400);
  expect(invalidTitleResponse.status).toEqual(400);
});

it('Returns an error if an invalid price is provided', async () => {
  const undefinedPriceResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'Test' });
  const invalidPriceResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'Test', price: -10 });

  expect(undefinedPriceResponse.status).toEqual(400);
  expect(invalidPriceResponse.status).toEqual(400);
});

it('Creates a ticket with valid inputs', async () => {
  const initialTickets = await Ticket.find({});
  expect(initialTickets.length).toEqual(0);

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'Test', price: 20 });

  const finalTickets = await Ticket.find({});
  expect(finalTickets.length).toEqual(1);
  expect(response.status).toEqual(201);
});
