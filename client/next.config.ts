import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // --- THIS IS THE FIX ---
      // We are removing the old "placehold.co"
      // and adding the new, high-quality image provider
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // --- END FIX ---
      {
        protocol: "https",
        hostname: "**", // The double asterisk is a wildcard
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
