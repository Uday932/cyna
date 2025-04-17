import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dkp8jwnzh/image/upload/**"),
    ],
  },
};

export default withNextIntl(nextConfig);
