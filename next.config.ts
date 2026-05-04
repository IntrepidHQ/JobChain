import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://hansturner.com https://www.hansturner.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
