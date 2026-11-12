import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  companyName: z.string().min(2, "Please enter your company or organisation"),
  email: z.string().email("Please enter a valid work email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  productCategory: z.enum([
    "pharmaceuticals",
    "food-beverage",
    "cosmetics",
    "agrochemicals",
    "other",
  ]),
  message: z
    .string()
    .min(10, "Tell us briefly about your products or batch volume"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Please confirm we may contact you regarding Huthentic",
  }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

