import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

const baseUrl = new URL(siteConfig.url);

export const defaultMetadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-default.png"],
  },
};

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: canonical,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}
