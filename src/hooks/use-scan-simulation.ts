"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  REPORT_SEND_MS,
  SCAN_DETECT_MS,
  SCAN_HISTORY_LIMIT,
  VERIFY_CHECK_MS,
  VERIFY_CHECKS,
} from "@/lib/constants";
import {
  PhoneTab,
  ReportState,
  SampleCodeRecord,
  ScanPhase,
} from "@/types";
import { pushToHistory, resolveCodeRecord } from "@/utils/scan";

type Timer = ReturnType<typeof setTimeout>;

export const useScanSimulation = () => {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [activeTab, setActiveTab] = useState<PhoneTab>("scan");
  const [record, setRecord] = useState<SampleCodeRecord | null>(null);
  const [checksDone, setChecksDone] = useState(0);
  const [torchOn, setTorchOn] = useState(false);
  const [history, setHistory] = useState<SampleCodeRecord[]>([]);
  const [reportStates, setReportStates] = useState<Record<string, ReportState>>(
    {}
  );

  const flowTimers = useRef<Timer[]>([]);
  const reportTimers = useRef<Timer[]>([]);

  const clearFlowTimers = useCallback((): void => {
    flowTimers.current.forEach(clearTimeout);
    flowTimers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number): void => {
    flowTimers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const reports = reportTimers.current;
    return () => {
      clearFlowTimers();
      reports.forEach(clearTimeout);
    };
  }, [clearFlowTimers]);

  const runVerification = useCallback(
    (next: SampleCodeRecord, startAt: number): void => {
      schedule(() => {
        setChecksDone(0);
        setPhase("verifying");
      }, startAt);

      VERIFY_CHECKS.forEach((_, idx) => {
        schedule(
          () => setChecksDone(idx + 1),
          startAt + VERIFY_CHECK_MS * (idx + 1)
        );
      });

      schedule(() => {
        setPhase("result");
        setHistory((prev) => pushToHistory(prev, next, SCAN_HISTORY_LIMIT));
      }, startAt + VERIFY_CHECK_MS * (VERIFY_CHECKS.length + 1));
    },
    [schedule]
  );

  /** Simulates pointing the camera at a pack: detect → verify → result. */
  const scanCode = useCallback(
    (code: string): void => {
      clearFlowTimers();
      const next = resolveCodeRecord(code);
      setActiveTab("scan");
      setRecord(next);
      setChecksDone(0);
      setPhase("scanning");
      runVerification(next, SCAN_DETECT_MS);
    },
    [clearFlowTimers, runVerification]
  );

  /** Typed-in code skips the camera and goes straight to verification. */
  const submitTypedCode = useCallback(
    (code: string): void => {
      clearFlowTimers();
      const next = resolveCodeRecord(code);
      setActiveTab("scan");
      setRecord(next);
      runVerification(next, 0);
    },
    [clearFlowTimers, runVerification]
  );

  const resetToCamera = useCallback((): void => {
    clearFlowTimers();
    setPhase("idle");
    setChecksDone(0);
  }, [clearFlowTimers]);

  const reportCode = useCallback((code: string): void => {
    setReportStates((prev) => ({ ...prev, [code]: "sending" }));
    reportTimers.current.push(
      setTimeout(() => {
        setReportStates((prev) => ({ ...prev, [code]: "sent" }));
      }, REPORT_SEND_MS)
    );
  }, []);

  const toggleTorch = useCallback((): void => {
    setTorchOn((prev) => !prev);
  }, []);

  const isBusy = phase === "scanning" || phase === "verifying";
  const reportState: ReportState = record
    ? reportStates[record.code] ?? "idle"
    : "idle";

  return {
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
  };
};
