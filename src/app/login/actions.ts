"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/admin-session";
import { firebaseAuth, isAllowedAdmin, isFirebaseConfigured } from "@/lib/firebase-admin";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  const email = formData.get("email");
  const password = formData.get("password");

  if (!apiKey || !isFirebaseConfigured()) {
    return { error: "Firebase admin access has not been configured on the server yet." };
  }

  if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || !password || password.length > 4096) {
    return { error: "Enter your admin email and password." };
  }

  let token: string;
  try {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(apiKey)}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password, returnSecureToken: true }),
      cache: "no-store", signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return { error: "Unable to sign in. Check your admin credentials and try again." };
    const result = await response.json() as { idToken?: string };
    if (!result.idToken) return { error: "Unable to sign in. Please try again." };
    const identity = await firebaseAuth().verifyIdToken(result.idToken, true);
    if (!isAllowedAdmin(identity) || Date.now() / 1000 - identity.auth_time > 300) {
      return { error: "This account does not have admin access." };
    }
    token = await firebaseAuth().createSessionCookie(result.idToken, { expiresIn: SESSION_DURATION_SECONDS * 1000 });
  } catch {
    return { error: "Unable to reach the sign-in service. Please try again shortly." };
  }
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });

  redirect("/admin/clients");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  cookieStore.delete(SESSION_COOKIE_NAME);
  if (token && isFirebaseConfigured()) {
    try {
      const identity = await firebaseAuth().verifySessionCookie(token);
      await firebaseAuth().revokeRefreshTokens(identity.uid);
    } catch { /* Expired sessions are already signed out locally. */ }
  }
  redirect("/login");
}
