import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "export",
    experimental: {
        cpus: 1,
        workerThreads: false,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "px661515.pxcloud.pl",
                pathname: "/cms/wp-content/uploads/**",
            },
        ],
    },
}

export default nextConfig
