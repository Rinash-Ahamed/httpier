import "server-only";
import { requireAdmin } from "@/lib/admin-auth";
import { firestore } from "@/lib/firebase-admin";
import type { ClientRecord, PaymentRecord } from "@/lib/client-records";

export async function listClients() {
  await requireAdmin();
  const result = await firestore().collection("clients").orderBy("updatedAt", "desc").limit(200).get();
  return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as ClientRecord);
}
export async function getClient(id: string) {
  await requireAdmin();
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) return null;
  const doc = await firestore().collection("clients").doc(id).get();
  return doc.exists ? { ...doc.data(), id: doc.id } as ClientRecord : null;
}
export async function getPayments(id: string) {
  await requireAdmin();
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) return [];
  const result = await firestore().collection("clients").doc(id).collection("payments").orderBy("date", "desc").limit(200).get();
  return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as PaymentRecord);
}
