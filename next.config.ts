import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{
      source: "/",
      destination: "/home",
      permanent: true,
    }]
  },
  output: "standalone",
};

export default nextConfig;
