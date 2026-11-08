import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export function isFirebaseConfigured() {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}
function getFirebaseApp() {
  const existing = getApps().find((app) => app.name === "httpier-admin");
  if (existing) return existing;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) throw new Error("Firebase server credentials are not configured.");
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId }, "httpier-admin");
}
export function firebaseAuth() { return getAuth(getFirebaseApp()); }
export function firestore() { return getFirestore(getFirebaseApp()); }
export function isAllowedAdmin(identity: { uid: string; email?: string }) {
  const uid = process.env.FIREBASE_ADMIN_UID?.trim();
  const email = (process.env.FIREBASE_ADMIN_EMAIL || "ahamedrinash@gmail.com").trim().toLowerCase();
  return uid ? identity.uid === uid : Boolean(email && identity.email?.toLowerCase() === email);
}
