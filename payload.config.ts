import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';

import { Logo } from './assets/Logo';
import { Icon } from './assets/icon';

import Page from './collections/Page';
import Media from './collections/Media';
import Awards from './collections/Awards';
import News from './collections/News';
import Blog from './collections/Blog';
import Story from './collections/Stories';
import Category from './collections/Category';


dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Page,
    Blog,
    Story,
    Awards,
    Media,
  ],
  admin: {
    meta: {
      titleSuffix: '- İnnova',
      favicon: '/assets/icon.svg',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
 },
 localization: {
  locales: [
    'tr-TR',
    'en-US',
  ],
  defaultLocale: 'tr-TR',
  fallback: true,
},
});
