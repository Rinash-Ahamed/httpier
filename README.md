# HTTPier - Better Web, By Design.

Production-ready marketing website for HTTPier, a web engineering studio.

## Stack

- **Next.js 16.3** (App Router, Turbopack, RSC)
- **React 19.2**
- **TypeScript** (strict)
- **Tailwind CSS 4.3** (CSS-based `@theme`, no config file needed)
- **Motion 13.1** (`motion/react`) for animation
- **Geist Sans / Geist Mono** - local font files, no external font fetch at build time

All versions above were the latest stable releases on npm at the time this
project was generated, and are mutually compatible (verified with a clean
`next build`).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint      # eslint
```

## Structure

```
src/
  app/                 routes (App Router)
    page.tsx            home
    services/            services listing
    work/                 work listing + [slug] case study template
    about/                about
    contact/              contact form
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, twitter-image.tsx
  components/
    layout/              Header, Footer
    home/                 home-page sections
    sections/             shared cross-page sections (PageHero, WorkCard, ContactForm...)
    ui/                    Button, Reveal, AmbientBackground, CustomCursor, ScrollProgress...
  lib/
    data.ts               all site content - services, projects, process, tech, copy
```

## Content

Nearly all copy and structured data (services, portfolio projects, process
steps, tech stack, metrics) lives in `src/lib/data.ts`. Edit that file to
update site content without touching components. Portfolio projects in
`work/[slug]` are placeholders - replace with real case studies as projects
launch (the array in `data.ts` drives `generateStaticParams`, so adding a
project automatically creates its route).

## Notes

- The contact form posts to `/api/contact`, which sends through Gmail SMTP.
  Set `SMTP_USER`, `SMTP_PASS` (a Google App Password, not your account
  password), and `CONTACT_TO_EMAIL` in `.env.local` and Vercel's environment
  variables. Redeploy after adding or changing Vercel variables. Do not use
  `NEXT_PUBLIC_` prefixes. The sender is the authenticated Gmail account;
  Reply-To is the visitor's validated email. The HTML/plain-text template is
  in `src/lib/contact-email.ts`. Success means Gmail accepted the message,
  not a guarantee of inbox placement. Per-instance request throttling and a
  honeypot provide basic abuse protection; use Vercel Firewall rate limits
  for protection shared across serverless instances.
- `privacy` and `terms` pages contain placeholder copy - replace before
  launch.
- The custom cursor and magnetic button effects are desktop/fine-pointer
  only and respect `prefers-reduced-motion`.
- Update `siteConfig` in `src/lib/data.ts` (URL, email, social links) before
  deploying.
