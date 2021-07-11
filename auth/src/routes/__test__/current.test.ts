import request from 'supertest';

import { app } from '@/app';
import { signup } from '@/test/helpers';

it('Responds with details about the current user', async () => {
  const data = { email: 'test@test.com', password: 'pass' };

  const cookie = await signup(data);

  const response = await request(app)
    .get('/api/users/current')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(data.email);
});

it('Returns null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/current')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
