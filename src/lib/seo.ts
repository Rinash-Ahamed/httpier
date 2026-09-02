import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
