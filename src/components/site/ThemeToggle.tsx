"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  React.useEffect(() => {
    let stored: Theme | null = null;
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      stored = value === "dark" || value === "light" ? value : null;
    } catch {
      stored = null;
    }

    const initial = stored ?? getSystemTheme();
    setTheme(initial);
    applyTheme(initial);

    if (stored) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => {
      const next = event.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const label = theme === "dark" ? "Dark" : "Light";

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures (private mode, disabled storage, etc.).
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      className="rounded-full px-3 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="sr-only">{label} mode</span>
    </Button>
  );
}
