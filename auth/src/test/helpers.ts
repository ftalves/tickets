import request from 'supertest';

import { app } from '@/app';

export const signup = async (data = {}) => {
  const response = await request(app)
    .post('/api/users/signup')
    .send(data)
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
