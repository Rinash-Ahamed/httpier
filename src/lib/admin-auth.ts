import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/admin-session";
import { firebaseAuth, isAllowedAdmin, isFirebaseConfigured } from "@/lib/firebase-admin";

export const getAdminSession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token || !isFirebaseConfigured()) return { isAuthenticated: false, uid: null };
  try {
    const identity = await firebaseAuth().verifySessionCookie(token, true);
    return { isAuthenticated: isAllowedAdmin(identity), uid: identity.uid };
  } catch {
    return { isAuthenticated: false, uid: null };
  }
});

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session.isAuthenticated) {
    redirect("/login");
  }

  return session;
}
