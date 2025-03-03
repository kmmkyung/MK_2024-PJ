import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {hostname: "avatars.githubusercontent.com"},
      {hostname: "lh3.googleusercontent.com"},
      {hostname: "k.kakaocdn.net"},
    ]
  }
};

export default nextConfig;
