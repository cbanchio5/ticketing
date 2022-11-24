import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;
beforeAll(async() => {
  process.env.JWT_KEY = 'asdfasdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
})


beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

jest.mock('../nats-wrapper');


afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});


global.signin = (id?: string) => {
  //build JWT payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }

  //Create JWT

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build Session Object

  const session = { jwt: token };

  // Turn that session into JSON

  const sessionJSON = JSON.stringify(session);

  // Take JSOn and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //Return a string
  return [`session=${base64}`];
}
