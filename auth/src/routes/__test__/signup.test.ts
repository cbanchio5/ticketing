import request from 'supertest';
import { app } from '../../app';

jest.setTimeout(30000);

it('returns a 201 on succesful signup', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: "test@test.com",
    password: "password"
  }).expect(201);
});
