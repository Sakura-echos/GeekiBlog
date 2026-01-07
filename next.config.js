/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  // 配置 Vercel 部署时包含的额外文件
  experimental: {
    outputFileTracingIncludes: {
      "/[locale]/blog/[slug]": ["./lib/trip/**/*"],
    },
  },
};

module.exports = withNextIntl(nextConfig);
