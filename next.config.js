/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    // https://github.com/vercel/next.js/discussions/19042
    // additionalData: `@import "@/styles/mixin.scss";`,
    prependData: `@import "@/styles/global.scss";`, // 根据sass-loader版本选择additionalData和prependData
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    // console.log(config, 'kkkkk');
    console.log(config.optimization, 'kkkkk');
    config.optimization.splitChunks = {
      cacheGroups: {
        defaultVendors: {
          // 重写默认的defaultVendors
          chunks: 'initial',
          maxSize: 100 * 1024,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
        default: {
          // 重写默认的default
          chunks: 'all',
          maxSize: 100 * 1024,
          minChunks: 2, // 至少被minChunks个入口文件引入了minChunks次。
          priority: -10,
        },
      },
    };
    return config;
  },
  env: {
    PROJECT_NAME: require('./package.json').name,
    PROJECT_VERSION: require('./package.json').version,
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
