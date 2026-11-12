"use client";

import { Check } from "lucide-react";

import { useManufacturerConsole } from "@/hooks/use-manufacturer-console";
import {
  MANUFACTURER_CONTENT,
  MANUFACTURER_STEPS,
  SECTION_IDS,
} from "@/lib/constants";

import { ManufacturerConsole } from "./ManufacturerConsole";
import { TechNetworkBg } from "./TechNetworkBg";

export const ManufacturersSection = () => {
  const consoleState = useManufacturerConsole();
  const { activeStep, setActiveStep } = consoleState;

  return (
    <section
      id={SECTION_IDS.manufacturers}
      className="relative overflow-hidden bg-navy py-20 text-navy-foreground sm:py-28"
    >
      <TechNetworkBg variant="section" tone="dark" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="max-w-2xl text-balance font-heading text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
              {MANUFACTURER_CONTENT.heading}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-navy-foreground/80">
              {MANUFACTURER_CONTENT.description}
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-5">
            {MANUFACTURER_CONTENT.guarantees.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-navy-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-navy-primary" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ol className="border-t border-navy-border lg:col-span-5">
            {MANUFACTURER_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <li key={step.stepNumber} className="border-b border-navy-border">
                  <button
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    aria-current={isActive ? "step" : undefined}
                    className="grid w-full grid-cols-[2.5rem_1fr] gap-x-2 py-6 text-left"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs transition-colors ${
                        isActive
                          ? "bg-navy-primary text-navy"
                          : "border border-navy-border text-navy-muted"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span>
                      <span
                        className={`block font-heading text-lg font-semibold transition-colors ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1.5 block text-[15px] leading-relaxed transition-colors ${
                          isActive ? "text-navy-foreground/80" : "text-navy-muted/80"
                        }`}
                      >
                        {step.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="lg:col-span-7">
            <ManufacturerConsole console={consoleState} />
            <p className="mt-3 text-xs text-navy-muted">
              Demo console with sample data. Try the buttons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
