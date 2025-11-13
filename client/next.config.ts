import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // For your product data
      {
        protocol: "https",
        hostname: "n6ky3pneh7v41k1z.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
