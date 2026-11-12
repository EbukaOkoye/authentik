"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  FileSpreadsheet,
  Loader2,
  Lock,
} from "lucide-react";

import { ManufacturerConsoleState } from "@/hooks/use-manufacturer-console";
import {
  CONSOLE_BATCHES,
  CONSOLE_ORG,
  CONSOLE_PRODUCT,
  CONSOLE_UPLOAD,
  RECALL_TARGET_BATCH_ID,
} from "@/lib/constants";
import { formatCount } from "@/utils/format";

interface ManufacturerConsoleProps {
  console: ManufacturerConsoleState;
}

const NAV = ["Products", "Batches", "Recalls", "Audit log"] as const;
const STEP_NAV_INDEX = [0, 1, 1] as const;
const STEP_PATHS = ["products/new", `batches/${CONSOLE_UPLOAD.batchId}`, "batches"] as const;

export const ManufacturerConsole = ({ console: state }: ManufacturerConsoleProps) => {
  const {
    activeStep,
    registerState,
    uploadState,
    uploadProgress,
    validatedRows,
    batchState,
    auditLog,
    generatePuin,
    validateAndPublish,
    recallBatch,
    resetDemo,
  } = state;

  return (
    <div className="overflow-hidden rounded-lg bg-white text-foreground shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
      {/* Address bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[#f6f9fa] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-1.5 rounded bg-white px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate">
            console.huthentik.com/<span className="text-foreground">{STEP_PATHS[activeStep]}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">{CONSOLE_ORG.name}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-semibold text-navy-primary">
            {CONSOLE_ORG.initials}
          </span>
        </div>
      </div>

      <div className="flex min-h-[400px]">
        <aside className="hidden w-36 shrink-0 border-r border-border bg-[#fbfdfd] px-2 py-4 sm:block">
          {NAV.map((item, idx) => (
            <span
              key={item}
              className={`block rounded px-2.5 py-1.5 text-[13px] ${
                idx === STEP_NAV_INDEX[activeStep]
                  ? "bg-secondary font-medium text-secondary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item}
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeStep === 0 && (
                <div>
                  <h4 className="font-heading text-lg font-semibold">New product</h4>
                  <dl className="mt-4 space-y-3 text-sm">
                    {[
                      ["Product name", CONSOLE_PRODUCT.name],
                      ["Description", CONSOLE_PRODUCT.description],
                      ["NAFDAC reg. no.", CONSOLE_PRODUCT.nafdacNumber],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                        <dd className="mt-1 rounded border border-input bg-white px-3 py-2">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  {registerState === "done" ? (
                    <div className="mt-5 flex items-center justify-between gap-3 rounded border border-success/25 bg-success-soft/60 px-3 py-2.5 text-sm">
                      <span className="flex items-center gap-2 text-success">
                        <Check className="h-4 w-4" strokeWidth={2.6} /> PUIN generated
                      </span>
                      <span className="tabular font-mono text-xs text-foreground">{CONSOLE_PRODUCT.puin}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={generatePuin}
                      disabled={registerState === "generating"}
                      className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a6f80] disabled:cursor-wait disabled:opacity-80"
                    >
                      {registerState === "generating" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {registerState === "generating" ? "Generating PUIN…" : "Register product"}
                    </button>
                  )}
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <h4 className="font-heading text-lg font-semibold">
                    Batch <span className="tabular font-mono">{CONSOLE_UPLOAD.batchId}</span>
                  </h4>
                  <div className="mt-4 flex items-center gap-3 rounded border border-border px-3 py-3">
                    <FileSpreadsheet className="h-5 w-5 shrink-0 text-success" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-[13px]">{CONSOLE_UPLOAD.fileName}</p>
                      <p className="tabular text-xs text-muted-foreground">
                        {formatCount(CONSOLE_UPLOAD.totalRows)} serials
                      </p>
                    </div>
                  </div>

                  {uploadState === "idle" && (
                    <button
                      type="button"
                      onClick={validateAndPublish}
                      className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a6f80]"
                    >
                      Validate and publish
                    </button>
                  )}

                  {uploadState === "validating" && (
                    <div className="mt-5" role="status">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                          Validating rows
                        </span>
                        <span className="tabular font-mono text-muted-foreground">
                          {formatCount(validatedRows)} / {formatCount(CONSOLE_UPLOAD.totalRows)}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-[width] duration-75 ease-linear"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadState === "published" && (
                    <div className="mt-5 rounded border border-success/25 bg-success-soft/60 px-3 py-2.5 text-sm text-success">
                      <p className="flex items-center gap-2 font-medium">
                        <Check className="h-4 w-4" strokeWidth={2.6} />
                        All {formatCount(CONSOLE_UPLOAD.totalRows)} records valid. Published.
                      </p>
                      <p className="mt-0.5 pl-6 text-xs text-success/80">Codes are verifiable from now.</p>
                    </div>
                  )}

                  <p className="mt-4 text-xs text-muted-foreground">
                    If any row fails, nothing is loaded and you get the line numbers to fix.
                  </p>
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <h4 className="font-heading text-lg font-semibold">Batches</h4>
                  <table className="mt-3 w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-border text-xs text-muted-foreground">
                        <th className="py-2 font-medium">Batch</th>
                        <th className="hidden py-2 font-medium sm:table-cell">Packs</th>
                        <th className="py-2 font-medium">Status</th>
                        <th className="py-2" />
                      </tr>
                    </thead>
                    <tbody>
                      {CONSOLE_BATCHES.map((batch) => {
                        const isTarget = batch.id === RECALL_TARGET_BATCH_ID;
                        const recalled = isTarget && batchState === "recalled";

                        return (
                          <tr key={batch.id} className="border-b border-border last:border-b-0">
                            <td className="py-2.5">
                              <span className="tabular block font-mono">{batch.id}</span>
                              <span className="block text-xs text-muted-foreground">{batch.product}</span>
                            </td>
                            <td className="tabular hidden py-2.5 font-mono sm:table-cell">{formatCount(batch.packs)}</td>
                            <td className="py-2.5">
                              <span
                                className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                                  recalled ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
                                }`}
                              >
                                {recalled ? "RECALLED" : "LIVE"}
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              {isTarget && batchState !== "recalled" && (
                                <button
                                  type="button"
                                  onClick={recallBatch}
                                  disabled={batchState === "recalling"}
                                  className="inline-flex items-center gap-1.5 rounded border border-danger/30 px-2.5 py-1 text-xs font-semibold text-danger transition-colors hover:bg-danger hover:text-white disabled:cursor-wait disabled:hover:bg-transparent disabled:hover:text-danger"
                                >
                                  {batchState === "recalling" && <Loader2 className="h-3 w-3 animate-spin" />}
                                  {batchState === "recalling" ? "Recalling…" : "Recall"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">Audit log</p>
              <button
                type="button"
                onClick={resetDemo}
                className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Reset demo
              </button>
            </div>
            <ul className="mt-2 space-y-1.5">
              <AnimatePresence initial={false}>
                {auditLog.slice(0, 3).map((entry) => (
                  <motion.li
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 text-xs"
                  >
                    <span className="tabular shrink-0 font-mono text-muted-foreground">{entry.time}</span>
                    <span className="min-w-0 text-foreground/85">
                      <span className="text-muted-foreground">{entry.actor} · </span>
                      {entry.action}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

