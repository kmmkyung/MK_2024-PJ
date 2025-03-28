import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key:string]: boolean;
}

const publicOnlyUrls:Routes = {
  '/' : true,
  '/login' : true,
  '/sms' : true,
  '/create-account' : true,
  '/github/start': true,
  '/github/complete': true,
  '/github/error': true,
  '/google/start': true,
  '/google/complete': true,
  '/google/error': true,
  '/kakao/start': true,
  '/kakao/complete': true,
  '/kakao/error': true
}

export async function middleware(request: NextRequest){
  const session = await getSession()
  const exists = publicOnlyUrls[request.nextUrl.pathname]
  if(!session.id){ // login 안한 유저
    if(!exists) { // 위 경로가 아니면
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  else {
    if(exists) {
      return NextResponse.redirect(new URL('/products', request.url))
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|image/).*)"]
};