/*
     * Match all request paths starting with:
     * - api (API routes)
     * - login (login route)
     * - register (registration route)
     * - confirm (email confirmation route)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - extension (Caisy UI extension)
     */

const regex = new RegExp(
  "/(?!api|login|register|confirm|_next/static|_next/image|favicon.*|extension)"
);

const regex2 = new RegExp("^(?!api|login|register|confirm|_next/static|_next/image|favicon.*|extension)");

const regex3 = /^\/(api\/.*|login)$/;



const paths = [
  "/",
  "/register",
  "/login",
  "/api",
  "/api/trpc",
  "/api/trpc/register",
  "/favicon.ico",
  "/favicon.png",
  "/_next/something",
  "/a",
];

paths.forEach((path) => {
  console.log({ path, test: regex3.test(path) });
});
