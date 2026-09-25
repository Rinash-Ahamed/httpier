export function shouldHideSiteChrome(pathname: string) {
  return (
    pathname === "/login" ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/invoice/")
  );
}
