export const clientStatuses = ["Lead", "In progress", "On hold", "Completed", "Archived"] as const;
export const paymentMethods = ["UPI", "Bank transfer", "Cash", "Other"] as const;
export type ClientStatus = (typeof clientStatuses)[number];
export type ClientRecord = {
  id: string; name: string; company: string; email: string; phone: string;
  billingAddress: string; projectName: string; status: ClientStatus; notes: string;
  agreedPaise: number; commissionPaise?: number; paidPaise: number; dueDate: string; createdAt: string; updatedAt: string;
};
export type PaymentRecord = {
  id: string; amountPaise: number; date: string; method: string; reference: string; notes: string; createdAt: string;
};
export type ClientActionState = { error?: string; success?: string };

export function parseInr(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{1,9}(\.\d{1,2})?$/.test(value.trim())) return null;
  const [whole, fraction = ""] = value.trim().split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}
export function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function paymentStatus(client: Pick<ClientRecord, "agreedPaise" | "paidPaise" | "dueDate">) {
  if (client.agreedPaise === 0) return "Not quoted";
  if (client.paidPaise >= client.agreedPaise) return "Paid";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (client.dueDate && client.dueDate < today) return "Overdue";
  return client.paidPaise > 0 ? "Part-paid" : "Unpaid";
}
