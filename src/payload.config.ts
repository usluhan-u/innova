/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import formBuilder from '@payloadcms/plugin-form-builder';
import path from 'path';
import {
  BlogPost,
  Category,
  Media,
  NewsPost,
  Page,
  SuccessStoryPost,
  User
} from './collections';
import { Footer, Menu, NotFound, SocialMedia } from './globals';
import { Logo } from './icons';
import payloadConfig from './payload.config.json';

dotenv.config();

const { localization, cors } = payloadConfig;

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors,
  graphQL: {
    disable: true
  },
  collections: [
    Category,
    BlogPost,
    SuccessStoryPost,
    NewsPost,
    Page,
    Media,
    User
  ],
  globals: [SocialMedia, Footer, Menu, NotFound],
  localization,
  i18n: {
    debug: false,
    supportedLngs: localization.locales,
    fallbackLng: localization.defaultLocale
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
      formOverrides: {},
      formSubmissionOverrides: {},
      redirectRelationships: [
        Page.slug,
        BlogPost.slug,
        NewsPost.slug,
        SuccessStoryPost.slug
      ]
    }),
    redirects({
      collections: [
        Page.slug,
        BlogPost.slug,
        NewsPost.slug,
        SuccessStoryPost.slug
      ]
    }),
    seo({
      collections: [
        Page.slug,
        BlogPost.slug,
        NewsPost.slug,
        SuccessStoryPost.slug
      ],
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
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});
