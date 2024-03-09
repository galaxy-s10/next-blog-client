const path = require('path');

const BilldHtmlWebpackPlugin = require('billd-html-webpack-plugin');

const pkg = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd
    ? `https://resource.hsslive.cn/${pkg.name}/${pkg.version}/`
    : undefined,
  reactStrictMode: false,
  env: {
    PROJECT_NAME: pkg.name,
    PROJECT_VERSION: pkg.version,
    PROJECT_LASTBUNDLE_TIME: new Date().toLocaleString(),
  },
  sassOptions: {
    // https://github.com/vercel/next.js/discussions/19042
    prependData: `@use 'billd-scss/src/index.scss' as *;`, // 根据sass-loader版本选择additionalData和prependData
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);

    config.plugins = [
      ...config.plugins,
      new BilldHtmlWebpackPlugin({ next12: true }),
    ];
    if (process.env.NODE_ENV === 'production') {
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
      // config.plugins.push(
      // );
    }

    return config;
  },

  images: {
    domains: [],
    unoptimized: true,
  },
  experimental: {},
  // eslint: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: 'https://api.hsslive.cn/prodapi/',
      },
    ];
  },
};

module.exports = nextConfig;
