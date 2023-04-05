/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL
  },
  images: {
    domains: ['localhost']
  },
  async exportPathMap(defaultPathMap) {
    const paths = {
      '/': { page: '/home' }
    };

    const locales = ['en', 'tr'];

    locales.forEach((locale) => {
      paths[`/${locale}`] = { page: '/home' };
      paths[`/${locale}`].query = {
        __nextLocale: locale,
        __nextDefaultLocale: 'tr'
      };
    });

    return paths;
  },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    localeDetection: false
  }
};

module.exports = nextConfig;
