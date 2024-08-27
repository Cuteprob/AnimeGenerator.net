/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.animegenerator.net']
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;