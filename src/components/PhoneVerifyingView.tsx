import { Check } from "lucide-react";

import { VERIFY_CHECKS } from "@/lib/constants";

import { IosSpinner } from "./IosSpinner";

interface PhoneVerifyingViewProps {
  checksDone: number;
  code: string;
}

export const PhoneVerifyingView = ({ checksDone, code }: PhoneVerifyingViewProps) => {
  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7] px-4 pt-[64px]">
      <div className="flex flex-col items-center pt-10 text-center">
        <IosSpinner size="lg" label="Checking code" />
        <p className="mt-5 text-[17px] font-semibold tracking-[-0.02em] text-black">
          Checking with the manufacturer
        </p>
        <p className="tabular mt-1 font-mono text-[12px] text-[#8e8e93]">{code}</p>
      </div>

      <ul className="mt-8 overflow-hidden rounded-[12px] bg-white">
        {VERIFY_CHECKS.map((label, idx) => {
          const done = checksDone > idx;
          const running = checksDone === idx;

          return (
            <li
              key={label}
              className="flex items-center gap-3 border-b border-black/[0.07] px-3.5 py-[11px] last:border-b-0"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {done && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
                {running && <IosSpinner size="sm" label={label} />}
                {!done && !running && (
                  <span className="h-[7px] w-[7px] rounded-full bg-[#c7c7cc]" />
                )}
              </span>
              <span
                className={`text-[14px] tracking-[-0.01em] ${
                  done || running ? "text-black" : "text-[#8e8e93]"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

