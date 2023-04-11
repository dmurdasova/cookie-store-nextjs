/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_API: process.env.REACT_APP_API,
    }
};

module.exports = nextConfig;
