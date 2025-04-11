import type { NextConfig } from "next";
const removeImports = require("next-remove-imports")();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default removeImports(nextConfig);
