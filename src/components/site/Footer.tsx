import { siteConfig } from "@/lib/config";
import { Container } from "@/components/site/Container";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Email", href: siteConfig.links.email },
];

export function Footer() {
  return (
    <footer className="mt-16">
      <Separator />
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <span>Built with Next.js and shadcn/ui.</span>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
