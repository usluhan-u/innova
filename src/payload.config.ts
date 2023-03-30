import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Link, Media, Menu, Page, User } from './collections';
import path from 'path';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  admin: {
    user: User.slug
    // components: {
    //   beforeLogin: [BeforeLogin]
    // }
  },
  collections: [Link, Media, Menu, Page, User],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});
