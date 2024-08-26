import { locales, defaultLocale } from "@/lib/i18n";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/workbench(.*)",
]);

const isApiRoute = createRouteMatcher(["/api(.*)"]);

// 这些 API 路由不需要登录
const publicApiRoutes = createRouteMatcher([
  "/api/animes/getAnimes",
  "/api/clerk-webhook",
]);

const PUBLIC_FILE = /\.(.*)$/;

const notNeedI18NRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const needI18NRouteRedirect = createRouteMatcher([
  "/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)",
]);

export default clerkMiddleware((auth, req) => {
  // auth
  if (isProtectedRoute(req)) {
    console.log("auth protect!!!");
    auth().protect();
  }
    // 检查是否为 API 路由，并排除公开的 API 路由
  if (isApiRoute(req) && !publicApiRoutes(req)) {
    const authObject = auth();
    if (!authObject.userId) {
      return new NextResponse("Unauthorized, please sign in.", { status: 401 });
    }
  }
  console.log("auth pass!!");

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    console.log("return!");
    return;
  }
  console.log("needI18NRouteRedirect pass!!");

  const { pathname } = req.nextUrl;
  const defaultLocale = "en"; // 这里可以根据需要设置默认的 locale

  // 新增：处理 /en 路径
  if (pathname === `/${defaultLocale}`) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 检查路径是否包含 locale 前缀
  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 如果路径是 `/en/{任意page}`，则重定向到 `/{任意page}`
  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const newPathname = pathname.replace(`/${defaultLocale}/`, "/");
    return NextResponse.redirect(new URL(newPathname, req.url));
  }

  // 如果路径不包含 locale 前缀，则内部重定向到 `/en/{非locale page}`
  if (!locale && !pathname.startsWith(`/${defaultLocale}`)) {
    console.log("does not contain locale, rewrite to /en: ", pathname);
    req.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  // 其他逻辑：根路径重定向等
  if (pathname === "/") {
    req.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  if (locale === defaultLocale && needI18NRouteRedirect(req)) {
    req.nextUrl.pathname = `/${locale}${req.nextUrl.pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)",
  ],
};