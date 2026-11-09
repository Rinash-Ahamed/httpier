"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { InvoiceDocument } from "@/components/invoice/InvoiceDocument";
import { InvoiceSupportFields } from "@/components/admin/InvoiceSupportFields";
import { validateInvoiceSupport } from "@/lib/invoice-support";
import type {
  InvoiceDraft,
  InvoiceItem,
  InvoicePaymentDetails,
  InvoiceRecord,
} from "@/lib/invoice-types";
import { calculateInvoiceTotals, formatInr } from "@/lib/invoice-types";

type InvoiceBuilderProps = {
  initialInvoice: InvoiceDraft;
  payment: InvoicePaymentDetails;
};

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 text-sm text-[var(--color-ink)] shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[var(--color-blue)] focus:outline-none focus:ring-4 focus:ring-blue-500/10";
const textareaClass = `${inputClass} h-auto min-h-24 resize-y py-3 leading-6`;

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold text-[var(--color-ink-soft)]">
      {children}
    </label>
  );
}

function FormSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-blue)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function InvoiceBuilder({ initialInvoice, payment }: InvoiceBuilderProps) {
  const [draft, setDraft] = useState(initialInvoice);
  const [notice, setNotice] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const totals = useMemo(() => calculateInvoiceTotals(draft), [draft]);
  const previewInvoice: InvoiceRecord = {
    ...draft,
    createdAt: new Date().toISOString(),
    payment,
  };

  function changeDraft(patch: Partial<InvoiceDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setNotice(null);
  }

  function updateText(field: keyof InvoiceDraft) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      changeDraft({ [field]: event.target.value });
    };
  }

  function updateNumber(field: "discount" | "taxRate" | "amountPaid") {
    return (event: ChangeEvent<HTMLInputElement>) => {
      changeDraft({ [field]: Math.max(0, Number(event.target.value) || 0) });
    };
  }

  function updateItem(id: string, patch: Partial<InvoiceItem>) {
    changeDraft({
      items: draft.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }

  function addItem() {
    changeDraft({
      items: [
        ...draft.items,
        {
          id: `item-${Date.now()}`,
          serviceName: "",
          description: "",
          quantity: 1,
          rate: 0,
        },
      ],
    });
  }

  function removeItem(id: string) {
    if (draft.items.length === 1) return;
    changeDraft({ items: draft.items.filter((item) => item.id !== id) });
  }

  async function downloadImage() {
    if (isExporting) return;
    const supportError = validateInvoiceSupport(draft.support);
    if (supportError) { setNotice(supportError); return; }
    const invoice = document.getElementById("invoice-document");
    if (!invoice) return;
    setIsExporting(true);
    setNotice(null);
    let clone: HTMLElement | undefined;
    try {
      const { toBlob } = await import("html-to-image");
      await document.fonts.ready;
      clone = invoice.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      Object.assign(clone.style, { position: "fixed", left: "-10000px", top: "0", width: "800px", height: "auto", boxShadow: "none", borderRadius: "0" });
      document.body.appendChild(clone);
      await Promise.all(Array.from(clone.querySelectorAll("img"), async (img) => {
        img.loading = "eager";
        await img.decode();
      }));
      const blob = await toBlob(clone, {
        backgroundColor: "#ffffff", pixelRatio: 2,
        width: 800, height: clone.scrollHeight,
        style: { position: "static", left: "auto", top: "auto" },
      });
      if (!blob) throw new Error("Image export failed");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `HTTPier-Invoice-${draft.invoiceNumber.replace(/[^a-zA-Z0-9_-]/g, "-") || "draft"}.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      setNotice("Invoice image downloaded.");
    } catch {
      setNotice("Unable to download the image. Please try again or use Download PDF.");
    } finally {
      clone?.remove();
      setIsExporting(false);
    }
  }

  const actionButton =
    "rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-wait disabled:opacity-50";

  return (
    <main>
      <div className="invoice-builder-heading mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono-tight text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-blue)]">
            New invoice
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Build it. Review it. Download it.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-soft)]">
            Your preview updates live. Download the finished invoice as a PDF or image. Invoices are not saved in the portal.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { const error = validateInvoiceSupport(draft.support); if (error) setNotice(error); else window.print(); }} className={actionButton} title="Choose Save as PDF in the print dialog">
            Download PDF
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={downloadImage}
            className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-blue)] disabled:cursor-wait disabled:opacity-50"
          >
            {isExporting ? "Preparing image..." : "Download as Image"}
          </button>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className={`invoice-builder-heading mb-5 rounded-xl border px-4 py-3 text-sm ${
            notice.toLowerCase().includes("required") || notice.toLowerCase().includes("must") || notice.toLowerCase().includes("unable")
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-blue-200 bg-blue-50 text-blue-800"
          }`}
        >
          {notice}
        </div>
      )}

      <div className="invoice-builder-layout grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(540px,1.08fr)] xl:items-start">
        <div className="invoice-builder-controls min-w-0 space-y-5">
          <FormSection eyebrow="01 - Client" title="Who is this invoice for?">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="clientName">Client name *</FieldLabel>
                <input id="clientName" value={draft.clientName} onChange={updateText("clientName")} className={inputClass} placeholder="Client name" />
              </div>
              <div>
                <FieldLabel htmlFor="companyName">Company name</FieldLabel>
                <input id="companyName" value={draft.companyName} onChange={updateText("companyName")} className={inputClass} placeholder="Company or brand" />
              </div>
              <div>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <input id="phone" type="tel" value={draft.phone} onChange={updateText("phone")} className={inputClass} placeholder="+91" />
              </div>
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input id="email" type="email" value={draft.email} onChange={updateText("email")} className={inputClass} placeholder="client@company.com" />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="billingAddress">Billing address</FieldLabel>
                <textarea id="billingAddress" value={draft.billingAddress} onChange={updateText("billingAddress")} className={textareaClass} placeholder="Billing address" />
              </div>
            </div>
          </FormSection>

          <FormSection eyebrow="02 - Invoice" title="Invoice and project details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="invoiceNumber">Invoice number *</FieldLabel>
                <input id="invoiceNumber" value={draft.invoiceNumber} onChange={updateText("invoiceNumber")} className={inputClass} />
              </div>
              <div>
                <FieldLabel htmlFor="projectName">Project name *</FieldLabel>
                <input id="projectName" value={draft.projectName} onChange={updateText("projectName")} className={inputClass} placeholder="Website development" />
              </div>
              <div>
                <FieldLabel htmlFor="invoiceDate">Invoice date *</FieldLabel>
                <input id="invoiceDate" type="date" value={draft.invoiceDate} onChange={updateText("invoiceDate")} className={inputClass} />
              </div>
              <div>
                <FieldLabel htmlFor="dueDate">Due date *</FieldLabel>
                <input id="dueDate" type="date" value={draft.dueDate} onChange={updateText("dueDate")} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="shortDescription">Short description</FieldLabel>
                <textarea id="shortDescription" value={draft.shortDescription} onChange={updateText("shortDescription")} className={textareaClass} placeholder="A concise summary of the work covered by this invoice." />
              </div>
            </div>
          </FormSection>

          <FormSection eyebrow="03 - Services" title="What are you billing for?">
            <div className="space-y-4">
              {draft.items.map((item, index) => (
                <article key={item.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold">Item {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={draft.items.length === 1}
                      className="text-xs font-medium text-[var(--color-ink-soft)] transition hover:text-red-600 disabled:pointer-events-none disabled:opacity-30"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor={`${item.id}-service`}>Service name *</FieldLabel>
                      <input
                        id={`${item.id}-service`}
                        value={item.serviceName}
                        onChange={(event) => updateItem(item.id, { serviceName: event.target.value })}
                        className={inputClass}
                        placeholder="Design and development"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor={`${item.id}-description`}>Description</FieldLabel>
                      <textarea
                        id={`${item.id}-description`}
                        value={item.description}
                        onChange={(event) => updateItem(item.id, { description: event.target.value })}
                        className={`${textareaClass} min-h-20`}
                        placeholder="Scope or deliverables"
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${item.id}-quantity`}>Quantity</FieldLabel>
                      <input
                        id={`${item.id}-quantity`}
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={item.quantity}
                        onChange={(event) => updateItem(item.id, { quantity: Math.max(0, Number(event.target.value) || 0) })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${item.id}-rate`}>Rate in INR</FieldLabel>
                      <input
                        id={`${item.id}-rate`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate || ""}
                        onChange={(event) => updateItem(item.id, { rate: Math.max(0, Number(event.target.value) || 0) })}
                        className={inputClass}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-right text-sm font-semibold">Amount: {formatInr(item.quantity * item.rate)}</p>
                </article>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="w-full rounded-xl border border-dashed border-blue-300 bg-blue-50/60 px-4 py-3 text-sm font-semibold text-[var(--color-blue)] transition hover:bg-blue-50"
              >
                + Add service item
              </button>
            </div>
          </FormSection>

          <FormSection eyebrow="04 - Totals" title="Finalise the amount">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel htmlFor="discount">Discount in INR</FieldLabel>
                <input id="discount" type="number" min="0" step="0.01" value={draft.discount || ""} onChange={updateNumber("discount")} className={inputClass} placeholder="0" />
              </div>
              <div>
                <FieldLabel htmlFor="taxRate">GST / tax %</FieldLabel>
                <input id="taxRate" type="number" min="0" max="100" step="0.01" value={draft.taxRate || ""} onChange={updateNumber("taxRate")} className={inputClass} placeholder="0" />
              </div>
              <div>
                <FieldLabel htmlFor="amountPaid">Advance Paid in INR</FieldLabel>
                <input id="amountPaid" type="number" inputMode="decimal" min="0" step="0.01" value={draft.amountPaid ?? 0} onChange={updateNumber("amountPaid")} className={inputClass} aria-describedby="advance-paid-help" />
                <p id="advance-paid-help" className="mt-1 text-xs text-[var(--color-ink-soft)]">Enter 0 if no advance has been received.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-[var(--color-ink)] p-4 text-white sm:grid-cols-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Subtotal</p>
                <p className="mt-1 font-semibold">{formatInr(totals.subtotal)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Tax</p>
                <p className="mt-1 font-semibold">{formatInr(totals.taxAmount)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Total</p>
                <p className="mt-1 font-semibold">{formatInr(totals.total)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cyan-300">Balance</p>
                <p className="mt-1 font-semibold text-cyan-200">{formatInr(totals.balance)}</p>
              </div>
            </div>
          </FormSection>

          <FormSection eyebrow="05 - Support" title="Post-delivery benefits">
            <InvoiceSupportFields support={draft.support} onChange={(support) => changeDraft({ support })} />
          </FormSection>
        </div>

        <aside className="invoice-preview-panel min-w-0 xl:sticky xl:top-28">
          <div className="invoice-builder-heading mb-3 flex items-center justify-between px-1">
            <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
              Live preview
            </p>
            <p className="text-[11px] text-[var(--color-ink-soft)]">Client view</p>
          </div>
          <InvoiceDocument invoice={previewInvoice} preview />
        </aside>
      </div>
    </main>
  );
}
