/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {},
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  async rewrites() {
    return [
      // {
      //   source: '/api/',
      //   destination: 'http://localhost:3300/',
      // },
    ];
  },
};

module.exports = nextConfig;
