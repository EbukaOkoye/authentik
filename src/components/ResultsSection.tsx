"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Flag, Loader2, RotateCcw } from "lucide-react";

import { useScanSimulation } from "@/hooks/use-scan-simulation";
import {
  SCAN_RESULTS,
  SECTION_IDS,
  STATUS_LABELS,
  STATUS_TEXT_STYLES,
} from "@/lib/constants";

import { IosSpinner } from "./IosSpinner";
import { IphoneMockup } from "./IphoneMockup";
import { PhoneCameraView } from "./PhoneCameraView";
import { PhoneCodeEntry } from "./PhoneCodeEntry";
import { PhoneHistoryView } from "./PhoneHistoryView";
import { PhoneResultView } from "./PhoneResultView";
import { PhoneTabBar } from "./PhoneTabBar";
import { PhoneVerifyingView } from "./PhoneVerifyingView";
import { StatusIcon } from "./StatusIcon";

export const ResultsSection = () => {
  const {
    phase,
    activeTab,
    setActiveTab,
    record,
    checksDone,
    history,
    isBusy,
    reportState,
    torchOn,
    toggleTorch,
    scanCode,
    submitTypedCode,
    resetToCamera,
    reportCode,
  } = useScanSimulation();

  const onHistory = activeTab === "history";
  const onCamera = !onHistory && (phase === "idle" || phase === "scanning");
  const screenKey = onHistory ? "history" : phase === "scanning" ? "idle" : phase;

  return (
    <section id={SECTION_IDS.results} className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <h2 className="max-w-lg font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.1]">
            One scan, one clear answer.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Every result tells you what to do next — and if something looks
            wrong, you can report it from the same screen.
          </p>

          <ul className="mt-10 border-t border-border">
            {SCAN_RESULTS.map((item) => {
              const isCurrent = record?.code === item.sampleCode;
              const isChecking = isCurrent && isBusy;
              const isShowing = isCurrent && phase === "result" && !onHistory;

              return (
                <li key={item.status} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => scanCode(item.sampleCode)}
                    className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 px-3 py-5 text-left transition-colors ${
                      isShowing ? "bg-card" : "hover:bg-card/70"
                    }`}
                  >
                    <StatusIcon status={item.status} size={30} />
                    <span>
                      <span
                        className={`block font-heading text-base font-semibold uppercase tracking-wide ${
                          STATUS_TEXT_STYLES[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="mt-1 block max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <span className="mt-0.5 inline-flex min-w-[6.5rem] items-center justify-end gap-1.5 text-sm font-medium">
                      {isChecking && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-muted-foreground">Checking…</span>
                        </>
                      )}
                      {isShowing && (
                        <>
                          <Check className="h-4 w-4 text-success" />
                          <span className="text-foreground">On screen</span>
                        </>
                      )}
                      {!isChecking && !isShowing && (
                        <span className="text-primary opacity-80 transition-opacity group-hover:opacity-100">
                          Try it
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Example codes. You can also type{" "}
            <span className="tabular font-mono text-foreground">HTK-2026-8841</span>{" "}
            into the app.
          </p>
        </div>

        <div className="flex justify-center lg:col-span-5">
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
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col"
              >
                {onHistory && (
                  <PhoneHistoryView history={history} onOpen={submitTypedCode} />
                )}

                {onCamera && (
                  <PhoneCameraView
                    torchOn={torchOn}
                    detected={phase === "scanning"}
                    onToggleTorch={toggleTorch}
                    footer={
                      phase === "scanning" ? (
                        <div className="flex items-center justify-center gap-2 py-2.5">
                          <IosSpinner size="sm" tone="light" label="Reading code" />
                          <span className="text-[12px] text-white/80">Reading code</span>
                        </div>
                      ) : (
                        <PhoneCodeEntry onSubmitCode={submitTypedCode} />
                      )
                    }
                  />
                )}

                {!onHistory && phase === "verifying" && record && (
                  <PhoneVerifyingView checksDone={checksDone} code={record.code} />
                )}

                {!onHistory && phase === "result" && record && (
                  <PhoneResultView
                    record={record}
                    actions={
                      <>
                        {record.status !== "VERIFIED" && (
                          <button
                            type="button"
                            onClick={() => reportCode(record.code)}
                            disabled={reportState !== "idle"}
                            className={`flex w-full items-center justify-center gap-2 rounded-[12px] py-3 text-[14.5px] font-semibold transition-colors ${
                              reportState === "sent"
                                ? "bg-success-soft text-success"
                                : "bg-danger text-white disabled:opacity-80"
                            }`}
                          >
                            {reportState === "idle" && (
                              <>
                                <Flag className="h-4 w-4" />
                                Report this product
                              </>
                            )}
                            {reportState === "sending" && (
                              <>
                                <IosSpinner size="sm" tone="light" label="Sending report" />
                                Sending report…
                              </>
                            )}
                            {reportState === "sent" && (
                              <>
                                <Check className="h-4 w-4" strokeWidth={2.6} />
                                Report sent. Thank you.
                              </>
                            )}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={resetToCamera}
                          className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-white py-3 text-[14.5px] font-semibold text-primary"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Scan another
                        </button>
                      </>
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <PhoneTabBar
              activeTab={activeTab}
              tone={onCamera ? "dark" : "light"}
              onSelect={setActiveTab}
            />
          </IphoneMockup>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {phase === "result" && record ? `Result: ${STATUS_LABELS[record.status]}` : ""}
      </span>
    </section>
  );
};
