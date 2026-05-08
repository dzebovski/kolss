"use client";

import { useMemo, useRef, useState } from "react";

import type {
  ContactFieldErrors,
  ContactPayload,
  ContactResponse,
} from "@/lib/validation/contact";

type FormState = "idle" | "submitting" | "success" | "error";

const initialPayload: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  location: "",
  projectType: "",
  message: "",
  website: "",
  attachments: [],
};

function fileListToMeta(files: FileList | null) {
  if (!files || files.length === 0) return [];
  return Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type || undefined,
  }));
}

export function ContactForm({
  projectTypes,
}: {
  projectTypes: readonly string[];
}) {
  const [payload, setPayload] = useState<ContactPayload>(initialPayload);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [state, setState] = useState<FormState>("idle");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const attachmentsHint = useMemo(() => {
    const count = payload.attachments?.length ?? 0;
    if (count === 0) return "Rzut, wizualizacja albo zdjęcia";
    if (count === 1) return payload.attachments?.[0]?.name ?? "1 plik";
    return `${count} pliki`;
  }, [payload.attachments]);

  const setField = <K extends keyof ContactPayload>(
    key: K,
    value: ContactPayload[K],
  ) => {
    setPayload((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState("submitting");
    setFormError(undefined);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ContactResponse;

      if (response.ok && data.ok) {
        setState("success");
        setPayload(initialPayload);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setState("error");
      if (!data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(data.formError);
      } else {
        setFormError("Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch {
      setState("error");
      setFormError("Nie udało się wysłać formularza. Spróbuj ponownie.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="kolss-form grid gap-5 rounded-lg border border-background/18 bg-background p-5 text-foreground shadow-[0_20px_52px_rgba(30,36,33,0.18)] sm:p-6"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Imię i nazwisko
          <input
            value={payload.name}
            onChange={(e) => setField("name", e.target.value)}
            type="text"
            autoComplete="name"
            aria-invalid={fieldErrors.name ? "true" : undefined}
            className="min-h-12 px-3 text-base font-normal"
          />
          {fieldErrors.name ? (
            <span className="text-xs font-semibold text-red-600">
              {fieldErrors.name}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Telefon
          <input
            value={payload.phone ?? ""}
            onChange={(e) => setField("phone", e.target.value)}
            type="tel"
            autoComplete="tel"
            aria-invalid={fieldErrors.phone ? "true" : undefined}
            className="min-h-12 px-3 text-base font-normal"
          />
          {fieldErrors.phone ? (
            <span className="text-xs font-semibold text-red-600">
              {fieldErrors.phone}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          E-mail
          <input
            value={payload.email}
            onChange={(e) => setField("email", e.target.value)}
            type="email"
            autoComplete="email"
            aria-invalid={fieldErrors.email ? "true" : undefined}
            className="min-h-12 px-3 text-base font-normal"
          />
          {fieldErrors.email ? (
            <span className="text-xs font-semibold text-red-600">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Miasto / lokalizacja inwestycji
          <input
            value={payload.location ?? ""}
            onChange={(e) => setField("location", e.target.value)}
            type="text"
            autoComplete="address-level2"
            aria-invalid={fieldErrors.location ? "true" : undefined}
            className="min-h-12 px-3 text-base font-normal"
          />
          {fieldErrors.location ? (
            <span className="text-xs font-semibold text-red-600">
              {fieldErrors.location}
            </span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Jakiego zakresu dotyczy projekt?
        <select
          value={payload.projectType ?? ""}
          onChange={(e) => setField("projectType", e.target.value)}
          className="min-h-12 px-3 text-base font-normal"
        >
          <option value="" disabled>
            Wybierz zakres
          </option>
          {projectTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {fieldErrors.projectType ? (
          <span className="text-xs font-semibold text-red-600">
            {fieldErrors.projectType}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Opis projektu
        <textarea
          value={payload.message ?? ""}
          onChange={(e) => setField("message", e.target.value)}
          rows={5}
          aria-invalid={fieldErrors.message ? "true" : undefined}
          className="px-3 py-3 text-base font-normal"
        />
        {fieldErrors.message ? (
          <span className="text-xs font-semibold text-red-600">
            {fieldErrors.message}
          </span>
        ) : null}
      </label>

      {/* Honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={payload.website ?? ""}
        onChange={(e) => setField("website", e.target.value)}
        aria-hidden="true"
        className="sr-only"
      />

      <label className="grid gap-2 text-sm font-semibold">
        Dodaj plik
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border border-dashed border-border bg-surface px-3 py-3 text-left text-sm font-normal transition hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span className="inline-flex w-fit rounded-xl bg-kolss-lime px-4 py-2 text-sm font-semibold text-kolss-charcoal">
            Wybierz pliki
          </span>
          <span className="mt-2 text-muted sm:mt-0">{attachmentsHint}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) =>
            setField("attachments", fileListToMeta(e.target.files))
          }
        />
        <p className="text-xs leading-[1.45] text-muted">
          Pliki są tymczasowo niedostępne w wysyłce. Zapiszemy tylko ich nazwę i
          rozmiar, a w kolejnym kroku dodamy upload.
        </p>
      </label>

      {formError ? (
        <p className="text-sm font-semibold text-red-600">{formError}</p>
      ) : null}

      {state === "success" ? (
        <p className="text-sm font-semibold text-kolss-muted-green">
          Dziękujemy! Wiadomość została wysłana.
        </p>
      ) : null}

      <button
        type="submit"
        className="hero-cta hero-cta-primary w-full disabled:opacity-60"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Wysyłanie..." : "Wyślij do wstępnej analizy"}
      </button>
      <p className="text-sm leading-[1.45] text-muted">
        Odpowiemy w godzinach pracy. Przesłanie projektu nie zobowiązuje do
        zamówienia.
      </p>
    </form>
  );
}
