/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/dkp8jwnzh/image/upload/services/**`,
      },
    ],
  },
};

export default nextConfig;
