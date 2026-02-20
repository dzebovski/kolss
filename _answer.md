# Requested Artifacts (English)

## 1) Current folder structure for `src/components`, `src/lib`, `src/actions`

Command requested:

```bash
tree src/components src/lib src/actions -I "node_modules"
```

Result in this environment:

```text
tree: command not found
```

Equivalent fallback (`find src/components src/lib src/actions -print | sort`):

```text
src/actions
src/actions/contact.ts
src/components
src/components/animations
src/components/animations/fade-in.tsx
src/components/cards
src/components/cards/kitchen-card.tsx
src/components/forms
src/components/forms/contact-form.tsx
src/components/layout
src/components/layout/language-switcher.tsx
src/components/sections
src/components/sections/video-section.tsx
src/components/ui
src/components/ui/button.tsx
src/components/ui/dialog.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/textarea.tsx
src/lib
src/lib/mock-data
src/lib/mock-data/mock-data.ts
src/lib/projects
src/lib/projects/projects.ts
src/lib/supabase
src/lib/supabase/admin.ts
src/lib/supabase/browser.ts
src/lib/supabase/env.ts
src/lib/supabase/server.ts
src/lib/utils
src/lib/utils/format.ts
src/lib/utils/slugify.ts
src/lib/validation
src/lib/validation/contact.ts
src/lib/validation/lead.ts
```

## 2) Full code of `src/actions/contact.ts`

```ts
'use server';

import {createAdminClient} from '@/src/lib/supabase/admin';
import {contactSchema, type ContactFormValues} from '@/src/lib/validation/contact';

type ContactActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

type IntegrationContext = {
  fileUrl: string | null;
};

type IntegrationStatus = {
  pipedrive: boolean;
  telegram: boolean;
  slack: boolean;
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? '';
}

function buildMessage(payload: ContactFormValues, fileUrl: string | null) {
  return [
    'Нова заявка з сайту',
    `Імʼя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Email: ${payload.email || '—'}`,
    `Бюджет: ${payload.budget || '—'}`,
    `Канал звʼязку: ${payload.preferredContact}`,
    `Повідомлення: ${payload.message}`,
    `Файл: ${fileUrl || '—'}`
  ].join('\n');
}

async function uploadFileToStorage(file: File) {
  console.log('[contact] upload start');
  const supabase = createAdminClient();
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const path = `leads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const {error: uploadError} = await supabase.storage.from('kitchen-assets').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false
  });

  if (uploadError) {
    throw new Error(`Storage upload error: ${uploadError.message}`);
  }

  const {data: publicData} = supabase.storage.from('kitchen-assets').getPublicUrl(path);
  console.log('[contact] file uploaded:', publicData.publicUrl);
  return publicData.publicUrl;
}

async function sendToPipedrive(payload: ContactFormValues, context: IntegrationContext) {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  if (!apiToken) {
    console.log('[contact] pipedrive skipped: missing API token');
    return;
  }

  const baseUrl = process.env.PIPEDRIVE_API_URL ?? 'https://api.pipedrive.com/v1';
  const personUrl = `${baseUrl}/persons?api_token=${apiToken}`;
  const leadUrl = `${baseUrl}/leads?api_token=${apiToken}`;
  const noteUrl = `${baseUrl}/notes?api_token=${apiToken}`;

  console.log('[contact] pipedrive person create start');
  const personResponse = await fetch(personUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email
        ? [
            {
              value: payload.email,
              primary: true
            }
          ]
        : undefined,
      phone: payload.phone
        ? [
            {
              value: payload.phone,
              primary: true
            }
          ]
        : undefined
    })
  });

  if (!personResponse.ok) {
    const text = await personResponse.text();
    throw new Error(`Pipedrive person error: ${personResponse.status} ${text}`);
  }

  const personData = (await personResponse.json()) as {data?: {id?: number}};
  const personId = personData.data?.id;

  if (!personId) {
    throw new Error('Pipedrive person created without ID');
  }

  console.log(`[contact] Pipedrive person created ID: ${personId}`);

  console.log('[contact] pipedrive lead create start');
  const leadResponse = await fetch(leadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: `Заявка з сайту: ${payload.name} (${payload.phone})`,
      person_id: personId
    })
  });

  if (!leadResponse.ok) {
    const text = await leadResponse.text();
    throw new Error(`Pipedrive error: ${leadResponse.status} ${text}`);
  }

  const leadData = (await leadResponse.json()) as {data?: {id?: string}};
  const leadId = leadData.data?.id;

  if (!leadId) {
    throw new Error('Pipedrive lead created without ID');
  }

  console.log(`[contact] Лід створено ID: ${leadId}`);

  const noteContent = [
    `Повідомлення: ${payload.message}`,
    `Бюджет: ${payload.budget || '—'}`,
    `Файл: ${context.fileUrl || '—'}`
  ].join('\n');

  console.log('[contact] pipedrive note create start');
  const noteResponse = await fetch(noteUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lead_id: leadId,
      content: noteContent
    })
  });

  if (!noteResponse.ok) {
    const text = await noteResponse.text();
    throw new Error(`Pipedrive notes error: ${noteResponse.status} ${text}`);
  }

  console.log('[contact] Нотатку додано');
}

async function sendToTelegram(payload: ContactFormValues, context: IntegrationContext) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log('[contact] telegram skipped: missing token/chat id');
    return;
  }

  console.log('[contact] telegram send start');
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(payload, context.fileUrl)
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram error: ${response.status} ${body}`);
  }

  console.log('[contact] telegram sent');
}

async function sendToSlack(payload: ContactFormValues, context: IntegrationContext) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[contact] slack skipped: missing webhook');
    return;
  }

  console.log('[contact] slack send start');
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: `Нова заявка: ${payload.name} (${payload.phone})`,
      blocks: [
        {
          type: 'section',
          text: {type: 'mrkdwn', text: '*Нова заявка з сайту*'}
        },
        {
          type: 'section',
          fields: [
            {type: 'mrkdwn', text: `*Імʼя*\n${payload.name}`},
            {type: 'mrkdwn', text: `*Телефон*\n${payload.phone}`},
            {type: 'mrkdwn', text: `*Email*\n${payload.email || '—'}`},
            {type: 'mrkdwn', text: `*Бюджет*\n${payload.budget || '—'}`},
            {type: 'mrkdwn', text: `*Канал*\n${payload.preferredContact}`}
          ]
        },
        {
          type: 'section',
          text: {type: 'mrkdwn', text: `*Повідомлення*\n${payload.message}`}
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Файл*\n${context.fileUrl ? `<${context.fileUrl}|Відкрити файл>` : '—'}`
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack error: ${response.status} ${body}`);
  }

  console.log('[contact] slack sent');
}

async function saveLeadToDatabase(
  payload: ContactFormValues,
  context: IntegrationContext,
  integrations: IntegrationStatus
) {
  console.log('[contact] integration status:', integrations);
  console.log('[contact] supabase insert start');
  const supabase = createAdminClient();

  const {error} = await supabase.from('leads').insert({
    name: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    message: payload.message,
    preferred_contact: payload.preferredContact,
    budget: payload.budget || null,
    file_url: context.fileUrl
  });

  if (error) {
    throw new Error(`Leads insert error: ${error.message}`);
  }

  console.log('[contact] В базу записано');
}

export async function submitContact(values: ContactFormValues): Promise<ContactActionState> {
  try {
    const validated = contactSchema.safeParse(values);

    if (!validated.success) {
      return {
        success: false,
        message: 'Перевірте правильність заповнення форми',
        errors: validated.error.flatten().fieldErrors
      };
    }

    const payload = validated.data;
    let fileUrl: string | null = null;

    if (payload.file) {
      console.info('[contact] file attached:', {
        name: payload.file.name,
        size: payload.file.size,
        type: payload.file.type
      });
      fileUrl = await uploadFileToStorage(payload.file);
    } else {
      console.info('[contact] no file attached');
    }

    const context: IntegrationContext = {fileUrl};
    const integrationStatus: IntegrationStatus = {
      pipedrive: false,
      telegram: false,
      slack: false
    };

    try {
      await sendToPipedrive(payload, context);
      integrationStatus.pipedrive = true;
    } catch (error) {
      console.error('[contact] pipedrive integration error:', error);
    }

    try {
      await sendToTelegram(payload, context);
      integrationStatus.telegram = true;
    } catch (error) {
      console.error('[contact] telegram integration error:', error);
    }

    try {
      await sendToSlack(payload, context);
      integrationStatus.slack = true;
    } catch (error) {
      console.error('[contact] slack integration error:', error);
    }

    await saveLeadToDatabase(payload, context, integrationStatus);

    if (!integrationStatus.pipedrive || !integrationStatus.telegram || !integrationStatus.slack) {
      return {
        success: false,
        message: 'Заявку збережено, але частина інтеграцій недоступна. Менеджер перевірить вручну.'
      };
    }

    return {
      success: true,
      message: 'Дякуємо! Менеджер звʼяжеться з вами'
    };
  } catch (error) {
    console.error('[contact] submit failed:', error);
    return {
      success: false,
      message: 'Сталася помилка при відправці заявки. Спробуйте ще раз.'
    };
  }
}

export async function submitContactFromFormData(formData: FormData): Promise<ContactActionState> {
  try {
    const fileCandidate = formData.get('file');
    const file = fileCandidate instanceof File && fileCandidate.size > 0 ? fileCandidate : null;

    return await submitContact({
      name: normalizeText(formData.get('name')?.toString()),
      phone: normalizeText(formData.get('phone')?.toString()),
      email: normalizeText(formData.get('email')?.toString()),
      message: normalizeText(formData.get('message')?.toString()),
      preferredContact: normalizeText(formData.get('preferredContact')?.toString()) as
        | 'phone'
        | 'telegram'
        | 'email',
      budget: normalizeText(formData.get('budget')?.toString()),
      file
    });
  } catch (error) {
    console.error('[contact] formData transform failed:', error);
    return {
      success: false,
      message: 'Невалідні дані форми. Перевірте поля і спробуйте ще раз.'
    };
  }
}
```

## 3) Supabase DB structure for `projects` and `leads` (DDL or TS interfaces)

No SQL migration/DDL files for these tables were found in this repository. Using TypeScript interfaces from code + inferred lead shape from insert payload and project state docs:

```ts
// projects table row shape (exact from src/lib/projects/projects.ts)
export type ProjectRow = {
  id: string;
  slug: string | null;
  title_uk: string | null;
  title_pl: string | null;
  title_en: string | null;
  description_uk: string | null;
  description_pl: string | null;
  description_en: string | null;
  price_start: number | null;
  image_url: string | null;
  is_featured: boolean | null;
};

// leads table row shape (inferred from src/actions/contact.ts insert + PROJECT_STATE.md columns)
export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  budget: string | null;
  message: string;
  preferred_contact: "phone" | "telegram" | "email";
  file_url: string | null;
  created_at: string; // timestamp
};
```

## 4) `next.config.ts`

```ts
import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
```
