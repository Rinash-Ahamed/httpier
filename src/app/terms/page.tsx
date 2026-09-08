import { PageHero } from "@/components/sections/PageHero";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Terms governing access to and use of the HTTPier website.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paragraphs: ["By accessing or using httpier.in, you agree to these Terms of Use and the Privacy Policy. If you do not agree, please do not use the website. You must be legally capable of agreeing to these terms for yourself or authorised to do so for the organisation you represent."],
  },
  {
    id: "website-use",
    title: "Website use",
    paragraphs: ["HTTPier provides this website to describe our capabilities, present selected work and receive project enquiries. You may view and use it for lawful personal or business purposes."],
    items: [
      "Do not attempt to gain unauthorised access to the website, its systems or information.",
      "Do not interfere with availability, security or normal operation, including through malicious code, automated abuse or excessive requests.",
      "Do not scrape, copy or republish substantial website content without written permission.",
      "Do not use the website to violate law, infringe another person's rights, misrepresent your identity or send unlawful material.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless stated otherwise, the HTTPier name, brand assets, website design, original text, graphics, animations, code presentation and other site content are owned by or licensed to HTTPier and are protected by applicable intellectual-property laws.",
      "You may not reproduce, modify, distribute, sell, license, reverse engineer or create derivative works from this website or its original content without prior written permission, except where applicable law expressly permits it.",
      "Client names, logos, screenshots and third-party technologies shown in the portfolio remain the property of their respective owners. They are presented to identify completed work or technologies and do not transfer any rights to visitors.",
    ],
  },
  {
    id: "project-enquiries",
    title: "Project enquiries",
    paragraphs: [
      "Information submitted through the contact form is treated as an enquiry only. A submission, acknowledgement, introductory call, preliminary discussion or estimate does not create a client relationship, partnership, exclusivity obligation or binding commitment to perform work.",
      "Please provide accurate information and do not submit confidential material that requires a non-disclosure agreement before such an agreement is signed. HTTPier may accept or decline an enquiry at its discretion.",
    ],
  },
  {
    id: "client-engagements",
    title: "Client engagements",
    paragraphs: [
      "Any project that proceeds will be governed by a separate written proposal, statement of work, service agreement or other contract covering scope, deliverables, fees, payment, responsibilities, timelines, intellectual-property ownership, confidentiality, support and termination.",
      "If these website terms conflict with a signed client agreement on a project matter, the signed client agreement controls for that engagement.",
    ],
  },
  {
    id: "website-information",
    title: "Website information and availability",
    paragraphs: [
      "We aim to keep website information accurate and useful, but examples, capabilities, availability, timelines and general descriptions may change. Website content is provided for general information and is not a guaranteed offer, professional advice or project commitment.",
      "We may update, suspend or withdraw any part of the website without notice. We do not guarantee uninterrupted access, compatibility with every device or freedom from every error, although we work to maintain a reliable and secure experience.",
    ],
  },
  {
    id: "third-party-websites",
    title: "Third-party websites",
    paragraphs: ["Links to client websites, social platforms and other third-party services are provided for reference or convenience. HTTPier does not control their content, availability, security, terms or privacy practices. Visiting a third-party website is at your own discretion and subject to that provider's terms."],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "To the extent permitted by law, the website is provided on an as-available basis without warranties of merchantability, fitness for a particular purpose, non-infringement or any guarantee that using its content will produce a particular business result.",
      "Nothing in these terms excludes a warranty, right or remedy that cannot lawfully be excluded.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, HTTPier will not be liable for indirect, incidental, special, consequential or punitive loss arising from use of, inability to use, or reliance on this website, including loss of profits, data, opportunity, goodwill or business interruption.",
      "HTTPier is not responsible for loss caused by third-party websites, visitor devices, internet failures, unauthorised activity outside our reasonable control, or information a visitor submits contrary to these terms. Liability arising from a paid client project is governed by the applicable signed client agreement, not this website provision.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    paragraphs: [
      "These terms are governed by the laws of India. Courts having jurisdiction at HTTPier's principal place of business in India will have jurisdiction over disputes relating solely to use of this website, subject to any mandatory rights or jurisdiction provided by applicable law.",
      "Before starting formal proceedings, both parties should make a reasonable effort to resolve the issue through good-faith written communication.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: ["We may revise these terms to reflect changes to the website, our business or applicable requirements. Updated terms take effect when published on this page unless a later date is stated. Continued use after an update means you accept the revised terms."],
  },
  {
    id: "general",
    title: "General provisions",
    paragraphs: ["If any provision is found unenforceable, the remaining provisions continue in effect. A delay in enforcing a provision is not a waiver. These terms, together with the Privacy Policy, form the entire agreement concerning general use of the website and do not replace a signed client agreement."],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: ["Questions about these terms can be submitted through httpier.in/contact or by calling +91 9489813846."],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" description="The ground rules for using the HTTPier website and starting a project conversation." />
      <LegalDocument
        updated="9 September 2026"
        introduction="These Terms of Use govern access to and use of httpier.in. They apply to the public website and project-enquiry process, while paid client work is governed by a separate written agreement."
        summary={[
          "The website may be used for lawful information and project-enquiry purposes.",
          "Submitting an enquiry does not create a client relationship or project commitment.",
          "HTTPier's original website content and brand assets may not be copied without permission.",
          "Client projects are governed by their own signed proposals or agreements.",
        ]}
        sections={sections}
      />
    </>
  );
}
