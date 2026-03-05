import Link from "next/link";

import { Container } from "@/components/site/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <div className="flex flex-1 items-center" aria-hidden="true" />
        <nav className="hidden flex-1 items-center justify-center gap-6 text-md text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
