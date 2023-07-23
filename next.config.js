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
    domains: [process.env.IMAGE_DOMAIN]
  },
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
    localeDetection: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/404',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
