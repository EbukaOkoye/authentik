"use client";

import { CheckCircle2, Loader2, Mail, Smartphone } from "lucide-react";

import { useInquiryForm } from "@/hooks/use-inquiry-form";
import {
  APP_DOWNLOAD,
  BRAND,
  PRODUCT_CATEGORY_OPTIONS,
  SECTION_IDS,
} from "@/lib/constants";

import { AppStoreBadges } from "./AppStoreBadges";

export const GetStartedSection = () => {
  const {
    register,
    handleFormSubmit,
    formState: { errors, isSubmitting },
    submittedData,
    submitError,
    resetSubmission,
  } = useInquiryForm();

  return (
    <section
      id={SECTION_IDS.getStarted}
      className="border-t border-border bg-card py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.1]">
              Ready to get started?
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted-foreground">
              Tell us about your products and batch volume. Our team will reach
              out within 24 hours to set up your manufacturer table.
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Support
              </p>
              <a
                href={`mailto:${BRAND.supportEmail}`}
                className="mt-2 inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                {BRAND.supportEmail}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border bg-background p-6 sm:p-8">
              {submittedData ? (
                <div className="py-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                    Request received for {submittedData.companyName}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Thank you, {submittedData.fullName}. We will reply to{" "}
                    <span className="font-mono text-foreground">
                      {submittedData.email}
                    </span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetSubmission}
                    className="mt-6 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Full name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        {...register("fullName")}
                        placeholder="Chidinma Nwosu"
                        className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-danger">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Company or organisation
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        {...register("companyName")}
                        placeholder="Medilane Pharmaceuticals Ltd"
                        className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-danger">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Work email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="qa@company.com"
                        className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-danger">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="+234 803 000 0000"
                        className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-danger">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="productCategory"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Product category
                    </label>
                    <select
                      id="productCategory"
                      {...register("productCategory")}
                      className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {PRODUCT_CATEGORY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Products and estimated batch volume
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      {...register("message")}
                      placeholder="Share how many product types (PUINs) or packs per batch you plan to protect..."
                      className="mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-danger">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span>
                        I agree that Huthentic may contact me regarding product
                        verification and manufacturer onboarding.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-danger">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-xs text-danger">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a6f80] disabled:cursor-wait disabled:opacity-80"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Sending request…" : "Send inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Consumer mobile app download strip below the form */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-background p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Smartphone className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                {APP_DOWNLOAD.heading}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {APP_DOWNLOAD.description}
              </p>
            </div>
          </div>

          <AppStoreBadges />
        </div>
      </div>
    </section>
  );
};
