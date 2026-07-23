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
      {
        // Duplicate service page consolidated — canonical page is /furniture-delivery-service
        source: '/furniture-delivery',
        destination: '/furniture-delivery-service',
        permanent: true,
      },
      {
        // Duplicate town pages consolidated — canonical pages kept at the original slugs
        source: '/man-and-van-ashford-kent',
        destination: '/man-and-van-ashford',
        permanent: true,
      },
      {
        source: '/man-and-van-royal-tunbridge-wells',
        destination: '/man-and-van-tunbridge-wells',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
