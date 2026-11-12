"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, QrCode, ShieldCheck, X } from "lucide-react";

import { BRAND, NAV_ITEMS } from "@/lib/constants";

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/92 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2.5 text-foreground focus:outline-none"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-navy-primary shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            {BRAND.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.items && item.items.length > 0);
            const isOpen = openDropdown === item.name;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.name}
                  {hasDropdown && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  )}
                </a>

                <AnimatePresence>
                  {hasDropdown && isOpen && item.items && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute left-0 top-full w-72 pt-2"
                    >
                      <div className="rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-elevated)]">
                        {item.items.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                          >
                            <p className="font-heading text-sm font-semibold text-foreground">
                              {sub.name}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {sub.description}
                            </p>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#results"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <QrCode className="h-4 w-4 text-primary" />
            Verify a code
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-navy hover:text-navy-foreground"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-card lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href="#results"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground"
                >
                  <QrCode className="h-4 w-4 text-primary" />
                  Verify a code
                </a>
                <a
                  href="#get-started"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

