# Integrations Summary

## Contact form flow (current)

On form submit (`src/actions/contact.ts`), the system performs these steps:

1. Validate input with `contactSchema`.
2. If a file is attached:
   - Upload file to Supabase Storage bucket `kitchen-assets` (`leads/...` path).
   - Get public URL and keep it in context (`fileUrl`).
3. Send integrations independently (resilient `try/catch` per integration):
   - Pipedrive
   - Telegram
   - Slack
4. Save lead copy to Supabase table `leads`.
5. Return status message to UI.

Even if one integration fails (for example Pipedrive), others are still attempted, and the lead is still saved to Supabase.

## Pipedrive logic (Person -> Lead -> Note)

Current Pipedrive chain is:

1. **Create Person** (`POST /persons`)
   - Sends: `name`, `email[]` (if present), `phone[]`.
   - Stores returned `person_id`.

2. **Create Lead** (`POST /leads`)
   - Sends: `title`, `person_id`.
   - Stores returned `lead_id`.

3. **Create Note** (`POST /notes`)
   - Sends: `lead_id`, `content`.
   - `content` includes:
     - message text,
     - budget,
     - public file URL (if uploaded).

Important: we do **not** send `note` directly in lead payload, because that field is deprecated for lead creation in current API behavior.

## Telegram and Slack

Both channels receive:
- name,
- phone,
- email,
- budget,
- preferred contact,
- message,
- public file URL.

Slack message formats file as clickable link (`<url|...>`).

## Supabase `leads` insert fields

Current insert payload uses:
- `name`
- `phone`
- `email`
- `message`
- `preferred_contact`
- `budget`
- `file_url`

This keeps an internal copy even when external integrations are partially unavailable.
