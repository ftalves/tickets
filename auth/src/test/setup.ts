import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

//import { app } from '@/app';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfg';

  mongo = new MongoMemoryServer();
  await mongo.start();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
