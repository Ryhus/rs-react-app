import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    domains: ['cdn2.thedogapi.com'],
  },

  webpack(config) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
