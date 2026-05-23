import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .md and .mdx as page/component extensions
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
