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
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true
  //     }
  //   ];
  // },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    localeDetection: false
  }
};

module.exports = nextConfig;
