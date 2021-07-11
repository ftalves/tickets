import request from 'supertest';

import { app } from '@/app';
import { signup } from '@/test/helpers';

it('Clears out auth cookie after signing out', async () => {
  const data = { email: 'test@test.com', password: 'pass' };

  await signup(data);
  const response = await request(app)
    .post('/api/users/signout')
    .send()
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
