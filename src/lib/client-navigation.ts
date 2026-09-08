/**
 * Handles links whose destination is already open without asking Next.js to
 * perform a no-op navigation. Hash links retain their intended section;
 * ordinary route links return to the top and clear any stale hash.
 */
export function scrollWithinCurrentPage(href: string): boolean {
  const destination = new URL(href, window.location.href);

  if (
    destination.origin !== window.location.origin ||
    destination.pathname !== window.location.pathname
  ) {
    return false;
  }

  const nextUrl = `${destination.pathname}${destination.search}${destination.hash}`;
  window.history.replaceState(window.history.state, "", nextUrl);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (destination.hash) {
        const targetId = decodeURIComponent(destination.hash.slice(1));
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  return true;
}
