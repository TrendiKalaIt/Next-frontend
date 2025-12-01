/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "trendikala.com",
          },
        ],
        destination: "https://www.trendikala.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
