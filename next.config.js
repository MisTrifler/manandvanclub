/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/services/regular-house-cleaning",
        destination: "/services/domestic-cleaning",
        permanent: true
      },
      {
        source: "/services/airbnb-changeovers",
        destination: "/services/airbnb-cleaning",
        permanent: true
      }
    ];
  },
  experimental: {
    cpus: 1
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
