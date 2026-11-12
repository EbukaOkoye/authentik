import { ShieldCheck } from "lucide-react";

import { BRAND, NAV_ITEMS, SECTION_IDS } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="border-t border-navy-border bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#" className="inline-flex items-center gap-2.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-accent text-navy-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="font-heading text-xl font-bold tracking-tight">
                {BRAND.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-muted">
              {BRAND.tagline} Protecting Nigerian consumers, manufacturers, and
              regulators from counterfeit products.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-heading text-sm font-semibold text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-muted">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-navy-primary"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-heading text-sm font-semibold text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-muted">
              <li>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="font-mono text-xs transition-colors hover:text-navy-primary"
                >
                  {BRAND.supportEmail}
                </a>
              </li>
              <li>
                <a
                  href={`#${SECTION_IDS.getStarted}`}
                  className="inline-block text-navy-primary hover:underline"
                >
                  Manufacturer onboarding →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-navy-border pt-6 text-xs text-navy-muted sm:flex-row sm:items-center">
          <p>{BRAND.copyright}</p>
          <div className="flex items-center gap-6">
            <a href={`#${SECTION_IDS.privacy}`} className="hover:text-white">
              Privacy
            </a>
            <a href={`#${SECTION_IDS.getStarted}`} className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
