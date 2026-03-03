/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckfglykngzwzyjypqspa.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // 配置 Vercel 部署时包含的额外文件
  experimental: {
    outputFileTracingIncludes: {
      "/[locale]/trip/[slug]": ["./lib/trip/**/*"],
    },
  },
};

module.exports = withNextIntl(nextConfig);
