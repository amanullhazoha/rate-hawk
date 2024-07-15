/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["localhost", "https://cdn.worldota.net", "cdn.worldota.net"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cdn.worldota.net",
      },
      {
        protocol: "https",
        hostname: "travelmeester.nl",
      },
    ],
  },
};

export default nextConfig;
