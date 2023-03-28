require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL
  }
  // i18n: {
  //   locales: ['tr', 'en'],
  //   defaultLocale: 'tr'
  // }
};

module.exports = nextConfig;
