// import { config } from 'dotenv';

// config({ path: './.env' });

const BASE_PREFIX_FOR_APP = process.env.BASE_PATH || '';
console.log('BASE_PREFIX_FOR_APP', BASE_PREFIX_FOR_APP);
// next.config.js
const conf = {
  basePath: BASE_PREFIX_FOR_APP,
  assetPrefix: BASE_PREFIX_FOR_APP+'/',
  async rewrites(){
    return [
      {
        /** ASSET PREFIX */
        source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
        destination: '/_next/:path*'
      },
      {
        /** IMAGE PREFIX */
        source: `${BASE_PREFIX_FOR_APP}/images/:query*`,
        destination: '/_next/image/:query*'
      },
      /** API PREFIX */
      {
        source: `${BASE_PREFIX_FOR_APP}/api/:path*`,
        destination: '/api/:path*'
      }
    ]
  }
}
console.log(conf);
module.exports = conf;