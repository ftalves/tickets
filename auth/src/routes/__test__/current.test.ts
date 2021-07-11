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
