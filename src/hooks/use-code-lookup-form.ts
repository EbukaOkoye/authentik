"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CodeLookupFormData, codeLookupSchema } from "@/schemas/code-lookup";

export const useCodeLookupForm = (onValidCode: (code: string) => void) => {
  const form = useForm<CodeLookupFormData>({
    resolver: zodResolver(codeLookupSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (data: CodeLookupFormData): void => {
    onValidCode(data.code);
    form.reset();
  };

  return {
    ...form,
    handleLookupSubmit: form.handleSubmit(onSubmit),
  };
};

