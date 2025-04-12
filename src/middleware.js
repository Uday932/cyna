import appConfig from "@/utils/appConfig.js";
import protectedRoutes from "@/utils/protectedRoutes.js";
import routes from "@/utils/routes.js";
import { isJwtExpired, verifyJwtToken } from "@/utils/utils.js";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(appConfig.security.session.cookieName);

  const matched = protectedRoutes.find(({ path }) => pathname.startsWith(path));

  if (!matched) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(routes.signs.signIn(), request.url));
  }

  try {
    if (isJwtExpired(token.value)) {
      return NextResponse.redirect(new URL(routes.signs.signIn(), request.url));
    }

    const user = await verifyJwtToken(token.value);

    if (!matched.allowedRoles.includes(user?.role)) {
      return NextResponse.redirect(new URL(routes.home(), request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", user.userId);

    return response;
  } catch (error) {
    console.error("Error decoding JWT token:", error);

    return NextResponse.redirect(new URL(routes.signs.signIn(), request.url));
  }
}
