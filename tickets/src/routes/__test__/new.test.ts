import request from 'supertest';

import { app } from '@/app';
import { signin } from '@/test/helpers';

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

it('Returns an error if an invalid title is provided', async () => {});

it('Returns an error if an invalid price is provided', async () => {});

it('Creates a ticket with valid inputs', async () => {});
