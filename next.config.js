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
    domains: [],
  },
  // eslint: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: 'https://hsslive.cn/prodapi/',
      },
    ];
  },
};

module.exports = nextConfig;
