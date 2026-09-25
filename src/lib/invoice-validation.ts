import "server-only";

import type { InvoiceDraft, InvoiceItem } from "@/lib/invoice-types";

const MAX_ITEMS = 20;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function amount(value: unknown, max = 100_000_000) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(Math.max(0, parsed), max);
}

function sanitizeItem(value: unknown, index: number): InvoiceItem {
  const item = value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  return {
    id: text(item.id, 80) || `item-${index + 1}`,
    serviceName: text(item.serviceName, 120),
    description: text(item.description, 500),
    quantity: amount(item.quantity, 100_000),
    rate: amount(item.rate),
  };
}

export function sanitizeInvoiceDraft(value: unknown): InvoiceDraft {
  const invoice = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const rawItems = Array.isArray(invoice.items) ? invoice.items.slice(0, MAX_ITEMS) : [];

  return {
    clientName: text(invoice.clientName, 120),
    companyName: text(invoice.companyName, 160),
    phone: text(invoice.phone, 40),
    email: text(invoice.email, 180),
    billingAddress: text(invoice.billingAddress, 500),
    invoiceNumber: text(invoice.invoiceNumber, 80),
    invoiceDate: text(invoice.invoiceDate, 20),
    dueDate: text(invoice.dueDate, 20),
    projectName: text(invoice.projectName, 180),
    shortDescription: text(invoice.shortDescription, 1000),
    items: rawItems.map(sanitizeItem),
    discount: amount(invoice.discount),
    taxRate: amount(invoice.taxRate, 100),
    amountPaid: amount(invoice.amountPaid),
  };
}

export function validateInvoiceDraft(invoice: InvoiceDraft) {
  if (!invoice.clientName) return "Client name is required.";
  if (!invoice.invoiceNumber) return "Invoice number is required.";
  if (!invoice.invoiceDate) return "Invoice date is required.";
  if (!invoice.dueDate) return "Due date is required.";
  if (!invoice.projectName) return "Project name is required.";
  if (!invoice.items.length) return "Add at least one invoice item.";
  if (invoice.items.some((item) => !item.serviceName)) {
    return "Every invoice item needs a service name.";
  }
  if (invoice.items.some((item) => item.quantity <= 0)) {
    return "Every invoice item needs a quantity greater than zero.";
  }

  return null;
}
