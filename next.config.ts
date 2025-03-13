import type { NextConfig } from "next"

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com"
			}
		]
	}
}

export default nextConfig
