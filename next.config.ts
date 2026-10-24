import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 95 is used for mooca: flat cartoon art smears at the default 75.
    qualities: [75, 95],
  },
};

export default nextConfig;
