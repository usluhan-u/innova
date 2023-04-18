/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import formBuilder from '@payloadcms/plugin-form-builder';
import { Category, Media, Page, User } from './collections';
import { Footer, Menu, NotFound, SocialMedia } from './globals';
import { Logo } from './icons';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  collections: [Category, Page, Media, User],
  globals: [SocialMedia, Footer, Menu, NotFound],
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
        Icon: Logo
      }
    }
  },
  plugins: [
    formBuilder({
      formOverrides: {
        admin: {
          group: 'Content'
        }
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Admin'
        }
      },
      redirectRelationships: [Page.slug]
    }),
    redirects({
      collections: [Page.slug],
      overrides: { admin: { group: 'Admin' } }
    }),
    seo({
      collections: [Page.slug],
      generateTitle: ({ doc }: any) => `İnnova - ${doc.title.value}`,
      generateDescription: ({ doc }: any) => doc.excerpt.value
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
