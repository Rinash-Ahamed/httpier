import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-session";

export const getAdminSession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  return { isAuthenticated };
});

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session.isAuthenticated) {
    redirect("/login");
  }

  return session;
}
