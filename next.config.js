// import { config } from 'dotenv';

// config({ path: './.env' });

const basePath = process.env.BASE_PATH || '';

console.log('basePath from env:', basePath);

const nextConfig = {
  /* config options here */
  basePath: '/my-app-test',
  assetPrefix: '/my-app-test/',
};
console.log('nextConfig:', nextConfig);

module.exports = nextConfig;

