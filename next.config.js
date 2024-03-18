/* eslint-disable @typescript-eslint/no-var-requires */
// const payload = require('payload');

require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
  openAnalyzer: false
})

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
    // const redirects = await payload.find({ collection: 'redirects' });

    return [
      // ...redirects.docs.map(({ from, to }) => ({
      //   source: `/${from.replace(/^\//, '')}`,
      //   destination: `/${to.reference.value.slug}`,
      //   permanent: true
      // })),
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/_error',
        destination: '/404',
        permanent: true
      }
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
