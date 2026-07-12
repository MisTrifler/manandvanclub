/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/areas',
        destination: '/areas-covered',
        permanent: true,
      },
      {
        source: '/join',
        destination: '/apply-to-join',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
