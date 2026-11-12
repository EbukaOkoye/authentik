"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { useHowItWorksDemo } from "@/hooks/use-how-it-works-demo";
import {
  HOW_IT_WORKS_STEPS,
  SAMPLE_CODE_RECORDS,
  SECTION_IDS,
} from "@/lib/constants";

import { IphoneMockup } from "./IphoneMockup";
import { PhoneCameraView } from "./PhoneCameraView";
import { PhoneHomeView } from "./PhoneHomeView";
import { PhoneResultView } from "./PhoneResultView";
import { PhoneTabBar } from "./PhoneTabBar";
import { PhoneVerifyingView } from "./PhoneVerifyingView";

const DEMO_RECORD = SAMPLE_CODE_RECORDS["HTK-2026-8841"];

export const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const {
    activeStep,
    cycle,
    torchOn,
    checksDone,
    isVerifying,
    selectStep,
    toggleTorch,
    stepDurationMs,
  } = useHowItWorksDemo(isInView);

  const onCamera = activeStep === 1;
  const screenKey =
    activeStep === 2 ? (isVerifying ? "verifying" : "result") : `step-${activeStep}`;

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.howItWorks}
      className="border-y border-border bg-card py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <h2 className="max-w-md font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.1]">
            Three steps. A few seconds.
          </h2>

          <ol className="mt-10 border-t border-border">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <li key={step.stepNumber} className="relative border-b border-border">
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    className="grid w-full grid-cols-[3rem_1fr] gap-x-2 py-6 text-left"
                  >
                    <span
                      className={`tabular font-mono text-sm transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground/70"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span>
                      <span
                        className={`block font-heading text-xl font-semibold transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1.5 block max-w-md text-[15px] leading-relaxed transition-colors ${
                          isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                        }`}
                      >
                        {step.description}
                      </span>
                    </span>
                  </button>

                  {isActive && (
                    <motion.span
                      key={`${activeStep}-${cycle}`}
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isInView ? 1 : 0 }}
                      transition={{ duration: stepDurationMs / 1000, ease: "linear" }}
                      className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-primary"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex justify-center lg:col-span-6">
          <IphoneMockup
            statusBarTone={onCamera ? "light" : "dark"}
            screenClassName={onCamera ? "bg-black" : "bg-[#f2f2f7]"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screenKey}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col"
              >
                {activeStep === 0 && <PhoneHomeView />}

                {activeStep === 1 && (
                  <PhoneCameraView
                    torchOn={torchOn}
                    detected={false}
                    onToggleTorch={toggleTorch}
                    footer={
                      <p className="text-center text-[11.5px] leading-snug text-white/70">
                        Low light? Tap the torch, or type the code in by hand.
                      </p>
                    }
                  />
                )}

                {activeStep === 2 && isVerifying && (
                  <PhoneVerifyingView checksDone={checksDone} code={DEMO_RECORD.code} />
                )}

                {activeStep === 2 && !isVerifying && (
                  <PhoneResultView record={DEMO_RECORD} />
                )}
              </motion.div>
            </AnimatePresence>

            <PhoneTabBar activeTab="scan" tone={onCamera ? "dark" : "light"} />
          </IphoneMockup>
        </div>
      </div>
    </section>
  );
};
