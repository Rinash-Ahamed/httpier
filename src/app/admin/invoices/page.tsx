import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";

export default async function InvoicesPage() {
  await requireAdmin();
  redirect("/admin/invoices/new");
}
