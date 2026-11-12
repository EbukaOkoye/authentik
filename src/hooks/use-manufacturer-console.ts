"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  CONSOLE_ORG,
  CONSOLE_PUIN_MS,
  CONSOLE_RECALL_MS,
  CONSOLE_UPLOAD,
  INITIAL_AUDIT_LOG,
  RECALL_TARGET_BATCH_ID,
} from "@/lib/constants";
import {
  AuditLogEntry,
  BatchState,
  RegisterState,
  UploadState,
} from "@/types";
import { formatClockTime, formatCount } from "@/utils/format";

type Timer = ReturnType<typeof setTimeout>;

const createAuditEntry = (action: string): AuditLogEntry => {
  const now = new Date();
  return {
    id: `${now.getTime()}`,
    time: formatClockTime(now),
    actor: CONSOLE_ORG.operator,
    action,
  };
};

export const useManufacturerConsole = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [registerState, setRegisterState] = useState<RegisterState>("idle");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [batchState, setBatchState] = useState<BatchState>("active");
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOG);

  const timers = useRef<Timer[]>([]);
  const uploadInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      if (uploadInterval.current) clearInterval(uploadInterval.current);
    };
  }, []);

  const addAudit = useCallback((action: string): void => {
    setAuditLog((prev) => [createAuditEntry(action), ...prev].slice(0, 5));
  }, []);

  const generatePuin = useCallback((): void => {
    setRegisterState("generating");
    timers.current.push(
      setTimeout(() => {
        setRegisterState("done");
        addAudit("Registered product, PUIN generated");
      }, CONSOLE_PUIN_MS)
    );
  }, [addAudit]);

  const validateAndPublish = useCallback((): void => {
    setUploadState("validating");
    setUploadProgress(0);
    uploadInterval.current = setInterval(() => {
      setUploadProgress((prev) => {
        const next = Math.min(prev + CONSOLE_UPLOAD.tickPercent, 100);
        if (next === 100 && uploadInterval.current) {
          clearInterval(uploadInterval.current);
          uploadInterval.current = null;
          setUploadState("published");
          addAudit(
            `Published batch ${CONSOLE_UPLOAD.batchId} (${formatCount(
              CONSOLE_UPLOAD.totalRows
            )} codes)`
          );
        }
        return next;
      });
    }, CONSOLE_UPLOAD.tickMs);
  }, [addAudit]);

  const recallBatch = useCallback((): void => {
    setBatchState("recalling");
    timers.current.push(
      setTimeout(() => {
        setBatchState("recalled");
        addAudit(`Recalled batch ${RECALL_TARGET_BATCH_ID}`);
      }, CONSOLE_RECALL_MS)
    );
  }, [addAudit]);

  const resetDemo = useCallback((): void => {
    setRegisterState("idle");
    setUploadState("idle");
    setUploadProgress(0);
    setBatchState("active");
    setAuditLog(INITIAL_AUDIT_LOG);
  }, []);

  const validatedRows = Math.round(
    (uploadProgress / 100) * CONSOLE_UPLOAD.totalRows
  );

  return {
    activeStep,
    setActiveStep,
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
  };
};

export type ManufacturerConsoleState = ReturnType<typeof useManufacturerConsole>;

