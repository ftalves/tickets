import jwt from 'jsonwebtoken';

// Returns a valid auth cookie for testing purposes
export const signin = (
  payload = { email: 'test@test.com', password: '1234' }
) => {
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const sessionJson = JSON.stringify({ jwt: token });
  const base64 = Buffer.from(sessionJson).toString('base64');

  return `express:sess=${base64}`;
};
