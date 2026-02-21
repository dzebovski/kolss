# AGENTS.md

Shared rules for all AI agents working in this repository (Claude, Gemini, Codex, etc.).

## Internationalization (i18n) — ALWAYS enforce

This project supports 3 languages: **Ukrainian (`uk`)**, **Polish (`pl`)**, **English (`en`)**.
The default language for creating an interface is **English (`en`)**.

Translation files are located at:
- `src/i18n/messages/uk.json`
- `src/i18n/messages/pl.json`
- `src/i18n/messages/en.json`

### Rules

**ALWAYS apply these rules when working with translations or UI labels:**

0. **Reuse existing keys first** — before creating a new translation key, search only `en.json` for an existing key that fits the context (English is the source of truth for key names). Only create a new key when no suitable existing key exists in `en.json`. Avoid duplication. Do not scan all 3 files upfront to save context.

1. **Adding new labels or text** — add the key to ALL 3 files (`uk.json`, `pl.json`, `en.json`) in the same task. Never add a key to one file without adding it to the others.

2. **Editing existing labels** — update the key in ALL 3 files. Never edit one language without reviewing the others.

3. **After any change to translation files** — verify that all 3 files contain the same set of keys. No file should have keys that others don't have.

4. **Never hardcode UI text** — all user-facing strings must go through the i18n system using `useTranslations` or `getTranslations` from `next-intl`.

### Verification checklist

After adding or editing translations, confirm:
- [ ] Key exists in `uk.json`
- [ ] Key exists in `pl.json`
- [ ] Key exists in `en.json`
- [ ] All 3 translations are meaningful (not placeholder or copy-pasted from another language)

## Safety Rules

- **Destructive Commands**: Set `"rm -rf *": "deny"`. AI agents must strictly avoid running destructive commands like `rm -rf *` to prevent accidental data loss.

## Planning & Context Management

- **Complex Tasks**: For multi-step tasks or when explicitly asked to "plan", look for or create a tracking document in the `/plans/` directory.
- **Source of Truth**: The active plan file in `/plans/` is the single source of truth for the task status, context, and next steps. Always read it before starting work and update it after completing steps.
- **Naming**: Use `YYYY-MM-DD-task-slug.md` format.
