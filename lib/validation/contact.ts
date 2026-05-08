import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko."),
  email: z.string().trim().email("Podaj poprawny adres e-mail."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.length >= 7, {
      message: "Podaj poprawny numer telefonu.",
    }),
  location: z.string().trim().optional(),
  projectType: z.string().trim().optional(),
  message: z.string().trim().optional(),
  // Honeypot: should remain empty
  website: z.string().optional(),
  // Attachments are UI-only for now; we accept metadata optionally.
  attachments: z
    .array(
      z.object({
        name: z.string(),
        size: z.number().nonnegative(),
        type: z.string().optional(),
      }),
    )
    .optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ContactOkResponse = { ok: true };

export type ContactErrorResponse = {
  ok: false;
  fieldErrors?: ContactFieldErrors;
  formError?: string;
};

export type ContactResponse = ContactOkResponse | ContactErrorResponse;

export function zodErrorsToFieldErrors(
  error: z.ZodError<ContactPayload>,
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    if (key in fieldErrors) continue;
    (fieldErrors as Record<string, string>)[key] = issue.message;
  }

  return fieldErrors;
}
