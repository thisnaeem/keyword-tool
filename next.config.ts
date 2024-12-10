/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@supabase/supabase-js'],
  images: {
    domains: ["images.unsplash.com", "127.0.0.1"],
  },
  /* config options here */
}

module.exports = nextConfig
