/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import redirects from '@payloadcms/plugin-redirects';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import formBuilder from '@payloadcms/plugin-form-builder';
import {
  Category,
  EnBlog,
  Lottie,
  Media,
  Page,
  Post,
  PostGroup,
  TrBlog,
  User
} from './collections';
import { Footer, Menu, NotFound, SocialMedia } from './globals';
import { Logo } from './icons';
import { RichText } from './fields';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  graphQL: {
    disable: true
  },
  collections: [
    Category,
    PostGroup,
    Post,
    EnBlog,
    TrBlog,
    Page,
    Media,
    Lottie,
    User
  ],
  globals: [Menu, SocialMedia, Footer, NotFound],
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    fallback: true
  },
  i18n: {
    debug: false,
    supportedLngs: ['en', 'tr'],
    fallbackLng: 'tr'
  },
  upload: {
    limits: {
      fileSize: 20000000
    }
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
        fields: [
          RichText({
            name: 'leader',
            label: 'Leader Text',
            required: true
          }),
          {
            name: 'type',
            label: 'Type',
            type: 'radio',
            required: true,
            defaultValue: 'default',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Float',
                value: 'float'
              }
            ]
          },
          {
            name: 'floatButtonLabel',
            label: 'Float Button',
            type: 'text',
            required: true,
            localized: true,
            admin: {
              condition: (_, siblingData) => siblingData.type === 'float'
            }
          }
        ]
      },
      formSubmissionOverrides: {},
      redirectRelationships: [Page.slug]
    }),
    redirects({
      collections: [Post.slug, EnBlog.slug, TrBlog.slug, Page.slug]
    }),
    seo({
      collections: [Post.slug, EnBlog.slug, TrBlog.slug, Page.slug],
      generateTitle: ({ doc }: any) => `İnnova - ${doc.title.value}`,
      generateDescription: ({ doc }: any) => doc.excerpt.value
    }),
    nestedDocs({
      collections: [Post.slug, EnBlog.slug, TrBlog.slug, Page.slug],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      generateLabel: (_, page) => (page.name as string) || '',
      generateURL: (pages) =>
        pages.reduce((url, page) => `${url}/${page.slug}`, '')
    })
  ]
});
