export type InvoiceSupport = {
  version: 1;
  deliveryDate: string;
  durationDays: number;
  changeRequests: number;
  bugFixes: boolean;
  minorChanges: boolean;
  handover: boolean;
  guidance: boolean;
  customTerms: string;
};

export const supportDisclaimer = "Post-delivery support covers existing functionality only. New features, major redesigns, third-party charges, and additional change requests may incur separate charges.";

// Apply defaults only when creating a new invoice, never when reading old links.
export function createDefaultSupport(): InvoiceSupport {
  return { version: 1, deliveryDate: "", durationDays: 60, changeRequests: 2, bugFixes: true, minorChanges: true, handover: true, guidance: true, customTerms: "" };
}

export function supportExpiryDate(deliveryDate: string, days: number): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate) || !Number.isInteger(days) || days < 1 || days > 3650) return null;
  const date = new Date(`${deliveryDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== deliveryDate) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function sanitizeInvoiceSupport(value: unknown): InvoiceSupport | undefined {
  if (!value || typeof value !== "object") return undefined;
  const support = value as Record<string, unknown>;
  if (support.version !== 1) return undefined;
  return {
    version: 1,
    deliveryDate: typeof support.deliveryDate === "string" ? support.deliveryDate.trim().slice(0, 10) : "",
    durationDays: typeof support.durationDays === "number" ? support.durationDays : 60,
    changeRequests: typeof support.changeRequests === "number" ? support.changeRequests : 2,
    bugFixes: support.bugFixes === true, minorChanges: support.minorChanges === true,
    handover: support.handover === true, guidance: support.guidance === true,
    customTerms: typeof support.customTerms === "string" ? support.customTerms.trim().slice(0, 2000) : "",
  };
}

export function validateInvoiceSupport(support?: InvoiceSupport) {
  if (!support) return null;
  if (!Number.isInteger(support.durationDays) || support.durationDays < 1 || support.durationDays > 3650) return "Support duration must be between 1 and 3650 whole days.";
  if (!Number.isInteger(support.changeRequests) || support.changeRequests < 0 || support.changeRequests > 100) return "Complimentary change requests must be between 0 and 100.";
  if (support.deliveryDate && !supportExpiryDate(support.deliveryDate, support.durationDays)) return "Enter a valid project delivery date.";
  return null;
}

export function supportBenefits(support: InvoiceSupport) {
  const days = support.durationDays;
  return [
    ...(support.bugFixes ? [{ key: "bugFixes", title: `${days} Days of Free Bug Fixes`, text: "Free fixes for bugs and technical issues related to the delivered website, starting from the official project delivery date. Bug fixes do not count toward change requests." }] : []),
    ...(support.minorChanges && support.changeRequests > 0 ? [{ key: "minorChanges", title: `${support.changeRequests} Complimentary Minor Change Request${support.changeRequests === 1 ? "" : "s"}`, text: `Simple text, image, content, or minor layout adjustments, valid for ${days} days after delivery. Major redesigns, new features, and additional requests are chargeable.` }] : []),
    ...(support.handover ? [{ key: "handover", title: "Deployment & Handover Assistance", text: "Initial deployment verification and basic guidance on accessing and managing the delivered website." }] : []),
    ...(support.guidance ? [{ key: "guidance", title: "Post-Delivery Technical Guidance", text: "Basic assistance with existing features and reporting technical issues during the support period." }] : []),
  ];
}
