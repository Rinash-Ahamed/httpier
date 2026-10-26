import { projectTypes, timelines } from "@/lib/data";

export type ContactEnquiry = {
  name: string;
  company: string;
  email: string;
  goal: string;
  projectType: string;
  timeline: string;
  details: string;
};

export function parseContactEnquiry(value: unknown): ContactEnquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (input.privacyAccepted !== true) return null;

  const limits = { name: 120, company: 160, email: 254, goal: 3000, projectType: 80, timeline: 80, details: 6000 };
  const enquiry = {} as ContactEnquiry;
  for (const key of Object.keys(limits) as (keyof ContactEnquiry)[]) {
    const text = input[key] ?? "";
    if (typeof text !== "string" || text.length > limits[key] || /\0/.test(text)) return null;
    enquiry[key] = text.trim();
  }

  if (!enquiry.name || /[\r\n]/.test(enquiry.name) || !enquiry.goal) return null;
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(enquiry.email)) return null;
  if (!projectTypes.some((type) => type === enquiry.projectType)) return null;
  if (enquiry.timeline && !timelines.some((timeline) => timeline === enquiry.timeline)) return null;
  return enquiry;
}
