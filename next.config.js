/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["tsx"],
};

module.exports = nextConfig;
