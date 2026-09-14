import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/Game-Sims",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
