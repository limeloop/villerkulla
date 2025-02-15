import type { NextConfig } from "next";
import { config } from 'dotenv';

config({ path: './.env' });

const basePath = process.env.BASE_PATH || '';
console.log('basePath:', basePath);
const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: basePath+'/',
};

export default nextConfig;
