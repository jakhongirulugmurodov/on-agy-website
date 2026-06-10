/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactCompiler: true,
  // GitHub Pages uchun statik eksport: build natijasi out/ papkaga tushadi
  output: "export",
  images: { unoptimized: true },
  // Sayt jakhongirulugmurodov.github.io/on-agy-website/ ostida turadi;
  // o'z domeni ulansa bu ikki qatorni olib tashlash kerak
  basePath: isProd ? "/on-agy-website" : "",
  assetPrefix: isProd ? "/on-agy-website/" : undefined,
};

export default nextConfig;
