import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.cookies.get('wakcraft_access_token')?.value as string;

      if (token === undefined) {
         req.nextUrl.pathname = '/login';
         return NextResponse.redirect(req.nextUrl);
      }

      try {
         await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
         return NextResponse.next();
      } catch (e) {
         req.nextUrl.pathname = '/login';
         return NextResponse.redirect(req.nextUrl);
      }
   }

   if (req.nextUrl.pathname.startsWith('/login')) {
      const token = req.cookies.get('wakcraft_access_token')?.value as string;

      try {
         await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
         req.nextUrl.pathname = '/admin';
         return NextResponse.redirect(req.nextUrl);
      } catch (e) {
         return NextResponse.next();
      }
   }
}

export const config = {
   matcher: ['/admin/:path*', '/login'],
};
