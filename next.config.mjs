/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
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
