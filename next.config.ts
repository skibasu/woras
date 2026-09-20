import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "export",
    experimental: {
        cpus: 1,
        workerThreads: false,
    },
}

export default nextConfig
