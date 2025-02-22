/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
    async rewrites() {
      return [
        {
          source: '/api/momo-payment',
          destination: 'https://test-payment.momo.vn/v2/gateway/api/create', 
        },
        {
          source: '/api/momo-result',
          destination: 'https://test-payment.momo.vn/v2/gateway/api/refund/query', 
        }
      ];
    },
    async headers() {
      return [
        {
          // Apply CORS headers to the /api/momo-payment endpoint
          source: '/api/momo-payment',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // Allow all origins, modify as needed
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, DELETE, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type, Authorization',
            },
          ],
        },
      ];
    },
  };

export default nextConfig;
