/** @type {import('next').NextConfig} */
import crypto from "node:crypto"
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


globalThis.crypto ??= crypto.webcrypto
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    }
};

export default withNextIntl(nextConfig);
