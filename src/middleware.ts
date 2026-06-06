import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

// Detects the browser language on first visit, remembers the choice in a cookie,
// and rewrites/redirects to the locale-prefixed path.
export default createMiddleware(routing);

export const config = {
  // Match all paths except: api routes, Next internals, generated metadata routes
  // (opengraph/twitter images, icon, sitemap, robots), and files with an extension.
  matcher: [
    '/((?!api|_next|_vercel|dashboard|opengraph-image|twitter-image|icon|sitemap|robots|.*\\..*).*)',
  ],
};
