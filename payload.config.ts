import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Link, Menu, Page, User } from './src/collections';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  admin: {
    user: User.slug
  },
  collections: [Link, Menu, Page, User]
});
