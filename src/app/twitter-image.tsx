import { renderOgImage, ogSize, ogContentType, ogAlt } from '@/components/seo/OgImage';

// @vercel/og runs on the edge runtime (avoids a Node fileURLToPath issue at prerender).
export const runtime = 'edge';
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderOgImage();
}
