import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import path from 'path';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import { Home, Category, Media, Menu, Page, User } from './collections';
import { Script, ContactUs } from './globals';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  collections: [Home, Page, Menu, Media, Category, User],
  globals: [Script, ContactUs],
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
    // }),
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
    // }),
    nestedDocs({
      collections: [Page.slug],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, page) => page.title as string,
      generateURL: (pages) =>
        pages.reduce((url, page) => `${url}/${page.slug}`, '')
    })
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});
