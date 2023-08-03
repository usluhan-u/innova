import { NextResponse, type NextRequest } from 'next/server';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { getCustomData } from './api';

interface Redirect {
  from: string;
  to: {
    type: 'custom' | 'reference';
    url?: string;
    reference?: {
      value: {
        slug: string;
      };
    };
  };
}

export const middleware = async (request: NextRequest) => {
  const response = await getCustomData<PaginatedDocs<Redirect>>({
    endpoint: 'redirects'
  });

  const redirect = response.docs.find(
    (r) => r.from.replace('/', '') === request.nextUrl.pathname.replace('/', '')
  );

  if (redirect) {
    const { type, url, reference } = redirect.to;

    if (type === 'custom' && url) {
      return NextResponse.redirect(new URL(url, request.url));
    }

    if (type === 'reference' && reference) {
      return NextResponse.redirect(new URL(reference.value.slug, request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)'
  ]
};
