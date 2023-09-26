const excludedPaths = [
  "/api",
  "/login",
  "/register",
  "/confirm",
  "/extension",
  "/_next/static",
  "/_next/image",
  "/favicon.",
];

const testPaths = [
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

testPaths.forEach(path =>
{
  const isExcluded = excludedPaths.some(excludedPath => path.startsWith(excludedPath));
  console.log({ path, isExcluded });
})
