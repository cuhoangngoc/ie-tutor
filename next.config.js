/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@mui/icons-material',
    '@mui/x-date-pickers',
    'rrule',
    '@devexpress/dx-react-core',
    '@devexpress/dx-scheduler-core',
    '@devexpress/dx-react-scheduler-material-ui',
    '@devexpress/dx-react-scheduler',
    '@devexpress/dx-react-grid-material-ui',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
      },
    ],
  },

  env: {
    REST_API_ENDPOINT: process.env.REST_API_ENDPOINT,
  },
};

module.exports = nextConfig;
