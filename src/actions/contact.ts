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
  return publicData.publicUrl;
}

async function sendToPipedrive(payload: ContactFormValues, context: IntegrationContext) {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  if (!apiToken) {
    return;
  }

  const baseUrl = process.env.PIPEDRIVE_API_URL ?? 'https://api.pipedrive.com/v1';
  const createType = process.env.PIPEDRIVE_CREATE_TYPE === 'deal' ? 'deals' : 'leads';
  const url = `${baseUrl}/${createType}?api_token=${apiToken}`;
  const note = buildMessage(payload, context.fileUrl);

  const body =
    createType === 'deals'
      ? {
          title: `Заявка з сайту: ${payload.name}`,
          person_name: payload.name,
          phone: payload.phone,
          email: payload.email || undefined,
          note
        }
      : {
          title: `Заявка з сайту: ${payload.name}`,
          person_name: payload.name,
          phone: payload.phone,
          email: payload.email || undefined,
          note
        };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Pipedrive error: ${response.status} ${text}`);
  }
}

async function sendToTelegram(payload: ContactFormValues, context: IntegrationContext) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return;
  }

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
}

async function sendToSlack(payload: ContactFormValues, context: IntegrationContext) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

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
          text: {type: 'mrkdwn', text: `*Файл*\n${context.fileUrl || '—'}`}
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Slack error: ${response.status} ${body}`);
  }
}

async function saveLeadToDatabase(
  payload: ContactFormValues,
  context: IntegrationContext,
  integrations: IntegrationStatus
) {
  const supabase = createAdminClient();

  const {error} = await supabase.from('leads').insert({
    name: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    message: payload.message,
    preferred_contact: payload.preferredContact,
    budget: payload.budget || null,
    file_url: context.fileUrl,
    pipedrive_synced: integrations.pipedrive,
    telegram_synced: integrations.telegram,
    slack_synced: integrations.slack
  });

  if (error) {
    throw new Error(`Leads insert error: ${error.message}`);
  }
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

    const results = await Promise.allSettled([
      sendToPipedrive(payload, context),
      sendToTelegram(payload, context),
      sendToSlack(payload, context)
    ]);

    const integrationStatus: IntegrationStatus = {
      pipedrive: results[0].status === 'fulfilled',
      telegram: results[1].status === 'fulfilled',
      slack: results[2].status === 'fulfilled'
    };

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const name = index === 0 ? 'pipedrive' : index === 1 ? 'telegram' : 'slack';
        console.error(`[contact] ${name} integration error:`, result.reason);
      }
    });

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
