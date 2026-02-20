import {type ContactFormValues} from '@/src/lib/validation/contact';
import {type IntegrationContext} from '@/src/services/integrations/types';

function toError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
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

export async function sendToTelegram(
  payload: ContactFormValues,
  context: IntegrationContext
): Promise<void> {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    }

    console.log('[telegram.service] send start');
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

    console.log('[telegram.service] sent');
  } catch (error) {
    const normalizedError = toError(error, 'Unknown Telegram integration error');
    console.error('[telegram.service] failed:', normalizedError);
    throw normalizedError;
  }
}
