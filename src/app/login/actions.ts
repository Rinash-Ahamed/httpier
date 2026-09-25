"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/admin-session";

export type LoginState = {
  error?: string;
};

function passwordsMatch(candidate: string, expected: string) {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const password = formData.get("password");

  if (!configuredPassword || !process.env.ADMIN_SESSION_SECRET) {
    return { error: "Admin access has not been configured on the server yet." };
  }

  if (typeof password !== "string" || !passwordsMatch(password, configuredPassword)) {
    return { error: "That password is not correct." };
  }

  const token = await createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });

  redirect("/admin/invoices");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
