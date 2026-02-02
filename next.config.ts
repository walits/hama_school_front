import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export for S3 deployment
  images: {
    unoptimized: true, // S3에서는 이미지 최적화 비활성화 필요
  },
  trailingSlash: true, // CloudFront에서 깔끔한 URL 라우팅을 위함
};

export default nextConfig;
