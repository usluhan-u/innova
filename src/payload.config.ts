/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import { Page, User } from './collections';
import { Footer, SocialMedia } from './globals';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  globals: [SocialMedia, Footer],
  collections: [User, Page],
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  },
  admin: {
    user: User.slug
  },
  plugins: [redirects({ collections: [Page.slug] })]
});
