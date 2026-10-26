import type { ContactEnquiry } from "@/lib/contact";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

/** Table layout and inline styles keep the template readable in email clients. */
export function createContactEmail(enquiry: ContactEnquiry) {
  const fields = [
    ["Client", enquiry.name],
    ["Company", enquiry.company || "Not provided"],
    ["Email", enquiry.email],
    ["Project type", enquiry.projectType],
    ["Timeline", enquiry.timeline || "Not specified"],
  ];
  const paragraphs = (text: string) => escapeHtml(text).replace(/\r?\n/g, "<br>");
  const replyUrl = `mailto:${encodeURIComponent(enquiry.email)}?subject=${encodeURIComponent("Your HTTPier project enquiry")}`;

  return {
    subject: `New HTTPier enquiry - ${enquiry.projectType}`,
    text: [
      "HTTPier - Better Web, By Design.",
      "NEW PROJECT ENQUIRY",
      "",
      ...fields.map(([label, value]) => `${label}: ${value}`),
      "",
      "WHAT THEY WANT TO BUILD",
      enquiry.goal,
      "",
      "ADDITIONAL DETAILS",
      enquiry.details || "No additional details provided.",
      "",
      "Privacy Policy acknowledged by the visitor.",
      "Reply to this email to contact the client directly.",
    ].join("\n"),
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New HTTPier enquiry</title></head>
<body style="margin:0;padding:0;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;color:#0a0e1a">
<div style="display:none;max-height:0;overflow:hidden">A new ${escapeHtml(enquiry.projectType)} enquiry from ${escapeHtml(enquiry.name)}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fc"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e4eaf3;border-radius:20px;overflow:hidden">
<tr><td style="padding:28px 24px;background:#0b1220;color:#ffffff;border-bottom:4px solid #2563eb">
<img src="cid:httpier-logo" alt="" width="32" height="32" style="display:inline-block;vertical-align:middle;margin-right:8px;border:0"><span style="font-size:24px;font-weight:700;vertical-align:middle;letter-spacing:-1px">HTTPier</span>
<p style="margin:12px 0 0;font-size:12px;letter-spacing:1px;color:#a5e9f4">BETTER WEB, BY DESIGN.</p></td></tr>
<tr><td style="padding:28px 24px">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;font-weight:700;color:#2563eb">NEW PROJECT ENQUIRY</p>
<h1 style="margin:0 0 12px;font-size:26px;line-height:1.25;letter-spacing:-0.6px">A new idea starts here.</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#384156">${escapeHtml(enquiry.name)} has reached out through the HTTPier website. Here is their project brief.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;table-layout:fixed">
${fields.map(([label, value]) => `<tr><td width="32%" style="padding:12px 8px 12px 0;border-bottom:1px solid #e4eaf3;font-size:12px;color:#64748b;vertical-align:top">${label}</td><td style="padding:12px 0;border-bottom:1px solid #e4eaf3;font-size:14px;line-height:1.6;word-break:break-word;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}
</table>
<h2 style="margin:28px 0 10px;font-size:16px">What they want to build</h2>
<p style="margin:0;padding:16px;background:#eff6ff;border-left:3px solid #2563eb;border-radius:8px;font-size:14px;line-height:1.8;word-break:break-word;overflow-wrap:anywhere">${paragraphs(enquiry.goal)}</p>
${enquiry.details ? `<h2 style="margin:24px 0 10px;font-size:16px">Additional details</h2><p style="margin:0;font-size:14px;line-height:1.8;color:#384156;word-break:break-word;overflow-wrap:anywhere">${paragraphs(enquiry.details)}</p>` : ""}
<table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:28px"><tr><td style="border-radius:24px;background:#2563eb"><a href="${escapeHtml(replyUrl)}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700">Reply to ${escapeHtml(enquiry.name)}</a></td></tr></table>
<p style="margin:16px 0 0;font-size:12px;line-height:1.7;color:#64748b">You can also reply directly to this email. The visitor acknowledged the Privacy Policy when submitting.</p>
</td></tr>
<tr><td style="padding:18px 24px;border-top:1px solid #e4eaf3;background:#f8fafc;font-size:12px;line-height:1.7;color:#64748b"><strong style="color:#0a0e1a">HTTPier</strong> &nbsp; / &nbsp; <a href="https://httpier.in" style="color:#2563eb;text-decoration:none">httpier.in</a><br>Website enquiry notification</td></tr>
</table></td></tr></table></body></html>`,
  };
}
