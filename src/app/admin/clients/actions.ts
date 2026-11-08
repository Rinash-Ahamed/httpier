"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { firestore } from "@/lib/firebase-admin";
import { clientStatuses, paymentMethods, parseInr, validDate, type ClientActionState } from "@/lib/client-records";

function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  if (typeof value !== "string" || value.length > max) throw new Error("Please check the length of your details.");
  return value.trim();
}

export async function saveClientAction(_state: ClientActionState, form: FormData): Promise<ClientActionState> {
  const session = await requireAdmin();
  let savedId: string;
  try {
    const id = text(form, "id", 128);
    if (id && !/^[a-zA-Z0-9_-]+$/.test(id)) return { error: "Invalid client." };
    const name = text(form, "name", 120);
    const email = text(form, "email", 254);
    const status = text(form, "status", 40);
    const agreedPaise = parseInr(form.get("agreedAmount"));
    const commissionInput = form.get("commissionAmount");
    const commissionPaise = parseInr(commissionInput === null || commissionInput === "" ? "0" : commissionInput);
    if (commissionPaise === null) return { error: "Enter a valid commission amount of zero or more, with up to two decimal places." };
    const dueDate = text(form, "dueDate", 10);
    if (!name || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !clientStatuses.some((item) => item === status) || agreedPaise === null || (dueDate && !validDate(dueDate))) {
      return { error: "Enter a name, valid email, status, fee and due date." };
    }
    const data = {
      name, email, status, agreedPaise, commissionPaise, dueDate,
      company: text(form, "company", 160), phone: text(form, "phone", 40),
      billingAddress: text(form, "billingAddress", 1200), projectName: text(form, "projectName", 200),
      notes: text(form, "notes", 4000), updatedAt: new Date().toISOString(), updatedBy: session.uid,
    };
    const ref = id ? firestore().collection("clients").doc(id) : firestore().collection("clients").doc();
    if (id) {
      await firestore().runTransaction(async (transaction) => {
        const existing = await transaction.get(ref);
        if (!existing.exists) throw new Error("Client not found");
        if (agreedPaise < (existing.data()?.paidPaise ?? 0)) throw new Error("The agreed fee cannot be lower than the payments already recorded.");
        transaction.update(ref, data);
      });
    } else {
      await ref.create({ ...data, paidPaise: 0, createdAt: data.updatedAt, createdBy: session.uid });
    }
    savedId = ref.id;
  } catch (error) {
    return { error: error instanceof Error && error.message.startsWith("The agreed fee") ? error.message : "Unable to save. Check Firebase configuration and Firestore access, then try again." };
  }
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${savedId}`);
  redirect(`/admin/clients/${savedId}`);
}

export async function recordPaymentAction(_state: ClientActionState, form: FormData): Promise<ClientActionState> {
  const session = await requireAdmin();
  let id: string;
  try {
    id = text(form, "clientId", 128);
    const paymentId = text(form, "paymentId", 80);
    const amountPaise = parseInr(form.get("amount"));
    const date = text(form, "date", 10);
    const method = text(form, "method", 40);
    const reference = text(form, "reference", 200);
    const notes = text(form, "notes", 1500);
    if (!/^[a-zA-Z0-9_-]+$/.test(id) || !/^[a-zA-Z0-9_-]{16,80}$/.test(paymentId) || !amountPaise || !validDate(date) || !paymentMethods.some((item) => item === method)) return { error: "Enter a valid amount, payment date and method." };
    const ref = firestore().collection("clients").doc(id);
    await firestore().runTransaction(async (transaction) => {
      const paymentRef = ref.collection("payments").doc(paymentId);
      const [client, previous] = await Promise.all([transaction.get(ref), transaction.get(paymentRef)]);
      if (previous.exists) return; // Retrying a submission never counts a payment twice.
      if (!client.exists) throw new Error("Client not found");
      const data = client.data()!;
      if (amountPaise > data.agreedPaise - data.paidPaise) throw new Error("Payment exceeds the outstanding balance.");
      const now = new Date().toISOString();
      transaction.create(paymentRef, { amountPaise, date, method, reference, notes, createdAt: now, createdBy: session.uid });
      transaction.update(ref, { paidPaise: data.paidPaise + amountPaise, updatedAt: now, updatedBy: session.uid });
    });
  } catch (error) {
    return { error: error instanceof Error && error.message === "Payment exceeds the outstanding balance." ? error.message : "Unable to record this payment. Please check Firestore access and try again." };
  }
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${id}`);
  return { success: "Payment recorded." };
}
