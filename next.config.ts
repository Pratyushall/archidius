/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Allows production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Allows production builds to succeed even with TS type errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
