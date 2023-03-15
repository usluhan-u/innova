require('dotenv').config();
const { sizes } = require('./blocks/Image/sizes.json');

module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      'localhost',
      'https://p01--innova-panel--wqf7yvvlslgm.code.run/',
      // Your domain(s) here
    ],
    deviceSizes: sizes,
  },
};
