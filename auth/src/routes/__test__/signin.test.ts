import request from 'supertest';

import { app } from '@/app';

const sendRequest = (data: any) =>
  request(app).post('/api/users/signin').send(data);

it('Returns a 400 for a non existing account', async () => {
  await sendRequest({ email: 'test@test.com', password: 'pass' }).expect(400);
});

it('Returns a 400 for incorrect credentials', async () => {
  const data = { email: 'test@test.com', password: 'pass' };

  await request(app).post('/api/users/signup').send(data).expect(201);
  await sendRequest({ ...data, password: 'invalid' }).expect(400);
  await sendRequest({ ...data, email: 'invalid@test.com' }).expect(400);
});

it('Returns a 200 and cookie for correct credentials', async () => {
  const data = { email: 'test@test.com', password: 'pass' };

  await request(app).post('/api/users/signup').send(data).expect(201);
  const response = await sendRequest(data).expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
