/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // Generic catch-all for any other cleaning related pages if necessary
    ];
  },
};

export default nextConfig;
