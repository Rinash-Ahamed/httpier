export type InvoiceItem = {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  rate: number;
};

export type InvoiceDraft = {
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  billingAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  projectName: string;
  shortDescription: string;
  items: InvoiceItem[];
  discount: number;
  taxRate: number;
  amountPaid: number;
};

export type InvoicePaymentDetails = {
  upiId: string;
  payeeName: string;
  mobile: string;
};

export type InvoiceRecord = InvoiceDraft & {
  createdAt: string;
  payment: InvoicePaymentDetails;
};

export type InvoiceTotals = {
  subtotal: number;
  discount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
  paid: number;
  balance: number;
};

export function roundCurrency(value: number) {
  return Math.round((Number.isFinite(value) ? value : 0) * 100) / 100;
}

export function calculateInvoiceTotals(invoice: InvoiceDraft): InvoiceTotals {
  const subtotal = roundCurrency(
    invoice.items.reduce(
      (sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.rate),
      0,
    ),
  );
  const discount = roundCurrency(Math.min(Math.max(0, invoice.discount), subtotal));
  const taxableAmount = roundCurrency(Math.max(0, subtotal - discount));
  const taxAmount = roundCurrency(taxableAmount * (Math.max(0, invoice.taxRate) / 100));
  const total = roundCurrency(taxableAmount + taxAmount);
  const paid = roundCurrency(Math.max(0, invoice.amountPaid));
  const balance = roundCurrency(Math.max(0, total - paid));

  return { subtotal, discount, taxableAmount, taxAmount, total, paid, balance };
}

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatInvoiceDate(value: string) {
  if (!value) return "Not set";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function buildUpiPaymentUrl(invoice: InvoiceRecord) {
  const totals = calculateInvoiceTotals(invoice);
  if (!invoice.payment.upiId || totals.balance <= 0) return null;

  const params = new URLSearchParams({
    pa: invoice.payment.upiId,
    pn: invoice.payment.payeeName || "HTTPier",
    am: totals.balance.toFixed(2),
    cu: "INR",
    tn: `Invoice ${invoice.invoiceNumber}`,
  });

  return `upi://pay?${params.toString()}`;
}
