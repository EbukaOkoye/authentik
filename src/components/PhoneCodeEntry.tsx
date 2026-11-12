"use client";

import { Keyboard } from "lucide-react";

import { useCodeLookupForm } from "@/hooks/use-code-lookup-form";

interface PhoneCodeEntryProps {
  onSubmitCode: (code: string) => void;
}

export const PhoneCodeEntry = ({ onSubmitCode }: PhoneCodeEntryProps) => {
  const {
    register,
    handleLookupSubmit,
    formState: { errors },
  } = useCodeLookupForm(onSubmitCode);

  return (
    <form onSubmit={handleLookupSubmit} noValidate>
      <div className="flex items-center gap-2 rounded-[12px] bg-white/15 p-1.5 pl-3 backdrop-blur-xl">
        <Keyboard className="h-4 w-4 shrink-0 text-white/70" />
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Type the code instead"
          aria-label="Type the code printed on the pack"
          {...register("code")}
          className="min-w-0 flex-1 bg-transparent font-mono text-[12.5px] uppercase text-white placeholder:font-ios placeholder:normal-case placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-[8px] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-black"
        >
          Check
        </button>
      </div>
      {errors.code && (
        <p className="mt-1.5 text-center text-[11px] text-[#ffb4ab]">{errors.code.message}</p>
      )}
    </form>
  );
};

