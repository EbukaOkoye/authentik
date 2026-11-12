"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { INQUIRY_SUBMIT_MS } from "@/lib/constants";
import { InquiryFormData, inquirySchema } from "@/schemas/inquiry";
import { wait } from "@/utils/format";

export const useInquiryForm = () => {
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(
    null
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      productCategory: "pharmaceuticals",
      message: "",
      consent: false,
    },
  });

  // No backend exists yet; this simulates the network round-trip so the
  // loading state is visible. Swap `wait` for an axiosBase call when the API lands.
  const onSubmit = async (data: InquiryFormData): Promise<void> => {
    setSubmitError(null);
    try {
      await wait(INQUIRY_SUBMIT_MS);
      setSubmittedData(data);
    } catch (error) {
      console.error("Inquiry submission failed", error);
      setSubmitError("We couldn't send your request. Please try again.");
    }
  };

  const resetSubmission = (): void => {
    setSubmittedData(null);
    form.reset();
  };

  return {
    ...form,
    submittedData,
    submitError,
    handleFormSubmit: form.handleSubmit(onSubmit),
    resetSubmission,
  };
};
