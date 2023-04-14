/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import { Category, Media, Page, User } from './collections';
import { Footer, Menu, NotFound, SocialMedia } from './globals';
import { Logo, LogoIcon } from './icons';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  globals: [SocialMedia, Footer, Menu, NotFound],
  collections: [User, Page, Media, Category],
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  },
  admin: {
    user: User.slug,
    meta: {
      titleSuffix: '- İnnova',
      favicon: '/images/logo-icon.svg',
      ogImage: '/images/logo.svg'
    },
    components: {
      graphics: {
        Logo,
        Icon: LogoIcon
      }
    }
  },
  plugins: [
    redirects({ collections: [Page.slug] }),
    seo({
      collections: [Page.slug],
      generateTitle: ({ doc }) => `İnnova - ${doc.title.value}`,
      generateDescription: ({ doc }) => doc.excerpt.value
    }),
    nestedDocs({
      collections: [Page.slug],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, page) => (page.title as string) || '',
      generateURL: (pages) =>
        pages.reduce((url, page) => `${url}/${page.slug}`, '')
    })
  ]
});
