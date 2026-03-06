import { defineConfig } from 'next';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'src' directory during production builds
  },
  images: {
    domains: ['example.com'], // Replace with your allowed image domains
  },
  publicRuntimeConfig: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
});