"use client";

import { useCallback, useEffect, useState } from "react";

import {
  HOW_IT_WORKS_STEP_DURATIONS_MS,
  HOW_IT_WORKS_STEPS,
  VERIFY_CHECK_MS,
  VERIFY_CHECKS,
} from "@/lib/constants";

const RESULT_STEP_INDEX = 2;

export const useHowItWorksDemo = (isActive: boolean) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [torchOn, setTorchOn] = useState(false);
  const [checksDone, setChecksDone] = useState(0);

  const totalSteps = HOW_IT_WORKS_STEPS.length;
  const isVerifying =
    activeStep === RESULT_STEP_INDEX && checksDone < VERIFY_CHECKS.length + 1;

  // Auto-advance through the steps while the section is on screen.
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % totalSteps);
      setCycle((prev) => prev + 1);
    }, HOW_IT_WORKS_STEP_DURATIONS_MS[activeStep]);
    return () => clearTimeout(timer);
  }, [activeStep, cycle, isActive, totalSteps]);

  // On the result step, play the verification checklist before the answer.
  useEffect(() => {
    if (activeStep !== RESULT_STEP_INDEX) return;
    const timers = Array.from({ length: VERIFY_CHECKS.length + 1 }).map(
      (_, idx) =>
        setTimeout(() => setChecksDone(idx + 1), VERIFY_CHECK_MS * (idx + 1))
    );
    return () => {
      timers.forEach(clearTimeout);
      setChecksDone(0);
    };
  }, [activeStep, cycle]);

  const selectStep = useCallback((index: number): void => {
    setActiveStep(index);
    setCycle((prev) => prev + 1);
  }, []);

  const toggleTorch = useCallback((): void => {
    setTorchOn((prev) => !prev);
  }, []);

  return {
    activeStep,
    cycle,
    torchOn,
    checksDone,
    isVerifying,
    selectStep,
    toggleTorch,
    stepDurationMs: HOW_IT_WORKS_STEP_DURATIONS_MS[activeStep],
  };
};

