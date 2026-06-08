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
        source: '/house-cleaning',
        destination: '/',
        permanent: true,
      },
      {
        source: '/office-cleaning',
        destination: '/office-removals',
        permanent: true,
      },
      {
        source: '/end-of-tenancy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cleaning-services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/areas',
        destination: '/areas-covered',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
