/**
 * Prefix a public asset path with the deployment base path.
 * On GitHub Pages: /himyog/images/... (NEXT_PUBLIC_BASE_PATH=/himyog)
 * On Vercel / local: /images/...       (NEXT_PUBLIC_BASE_PATH not set)
 */
export const assetPath = (src: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
