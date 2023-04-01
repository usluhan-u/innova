import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Category, Media, Menu, Page, User } from './collections';
import path from 'path';
import seo from '@payloadcms/plugin-seo';
import redirects from '@payloadcms/plugin-redirects';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  collections: [User, Media, Menu, Category, Page],
  globals: [],
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  },
  admin: {
    user: User.slug
    // meta: {
    //   titleSuffix: '- İnnova',
    //   favicon: '/assets/icon.svg',
    //   ogImage: '/assets/logo.svg'
    // },
    // components: {
    //   graphics: {
    //     Logo,
    //     Icon
    //   }
    // }
  },
  plugins: [
    // redirects({
    //   collections: [Page.slug]
    // })
    // seo({
    //   globals: [],
    //   collections: [
    //     Menu.slug,
    //     Media.slug,
    //     User.slug,
    //     Category.slug,
    //     Page.slug,
    //     Home.slug
    //   ],
    //   generateTitle: ({ doc }: { doc: any }) => `İnnova — ${doc.title.value}`,
    //   generateDescription: ({ doc }: { doc: any }) => doc.excerpt,
    // })
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});
