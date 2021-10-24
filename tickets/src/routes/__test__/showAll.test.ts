import request from 'supertest';

import { app } from '@/app';
import { Ticket } from '@/models/Ticket';

it('Returns an empty array if no tickets exist', async () => {
  const response = await request(app).get('/api/tickets').send();

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(0);
});

it('Returns all existing tickets', async () => {
  await new Ticket({ title: 'Test1', price: 20 }).save();
  await new Ticket({ title: 'Test2', price: 40 }).save();
  await new Ticket({ title: 'Test3', price: 60 }).save();

  const response = await request(app).get('/api/tickets').send();

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(3);
});
