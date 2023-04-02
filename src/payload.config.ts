import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Category, Media, Menu, Page, User } from './collections';
import path from 'path';
import seo from '@payloadcms/plugin-seo';
import redirects from '@payloadcms/plugin-redirects';
import formBuilder from '@payloadcms/plugin-form-builder';
import nestedDocs from '@payloadcms/plugin-nested-docs';

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
