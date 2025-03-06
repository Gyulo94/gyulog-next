import type { NextConfig } from "next";
const removeImports = require("next-remove-imports")();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.patterns.dev",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "b1490832.smushcdn.com",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
      },
    ],
    domains: ["localhost"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default removeImports(nextConfig);
