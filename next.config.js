/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {},
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  images: {
    domains: ['resource.lsyboy.cn'],
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
