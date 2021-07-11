import request from 'supertest';

import { app } from '@/app';

const sendRequest = (data: any) =>
  request(app).post('/api/users/signup').send(data);

it('Returns a 201 on successful signup', async () => {
  await sendRequest({ email: 'test@test.com', password: 'pass' }).expect(201);
});

it('Returns a 400 with an invalid email', async () => {
  return sendRequest({ email: 'invalid', password: 'pass' }).expect(400);
});

it('Returns a 400 with an invalid password', async () => {
  await sendRequest({ email: 'test@test.com', password: 'qwe' }).expect(400);
  await sendRequest({
    email: 'test@test.com',
    password: 'qwertyuiopasdfghjklxc',
  }).expect(400);
});

it('Returns a 400 with missing credentials', async () => {
  await sendRequest({}).expect(400);
  await sendRequest({ email: 'test@test.com', password: '' }).expect(400);
  await sendRequest({ email: '', password: 'pass' }).expect(400);
});

it('Disallows duplicate emails', async () => {
  await sendRequest({ email: 'test@test.com', password: 'pass' }).expect(201);
  await sendRequest({ email: 'test@test.com', password: 'pass' }).expect(400);
});

it('Sets a cookie after successfull signup', async () => {
  const response = await sendRequest({
    email: 'test@test.com',
    password: 'pass',
  }).expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
