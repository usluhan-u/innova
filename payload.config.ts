import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Users } from './src/collections/Users';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  admin: {
    user: Users.slug
  },
  collections: [Users]
});
