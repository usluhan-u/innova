/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  }
});
