import { z } from "zod";

export const codeLookupSchema = z.object({
  code: z
    .string()
    .trim()
    .min(4, "Enter the code printed on the pack")
    .max(24, "That code is too long"),
});

export type CodeLookupFormData = z.infer<typeof codeLookupSchema>;

