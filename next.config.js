/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
};

module.exports = nextConfig;

// next.config.js
const withVideos = require('next-videos')

module.exports = withVideos()