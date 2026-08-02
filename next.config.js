/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Static export only for GitHub Pages (basePath set).
// On Vercel (no basePath) we run as a full Next.js app so API routes work.
const isStaticExport = Boolean(basePath);

const nextConfig = {
  ...(isStaticExport && { output: "export" }),
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: isStaticExport,
  },
};

module.exports = nextConfig;
