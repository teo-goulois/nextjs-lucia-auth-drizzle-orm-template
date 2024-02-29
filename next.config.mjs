/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    }
};

export default nextConfig;
