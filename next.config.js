/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'petsworldapi.dev.vilhena.ifro.edu.br',
        pathname: '/imagem/**',
      },
    ],
  },
};

module.exports = nextConfig;