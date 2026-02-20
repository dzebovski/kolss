'use server';

import {contactSchema, type ContactFormValues} from '@/src/lib/validation/contact';
import {saveLeadToDatabase} from '@/src/services/db/leads.service';
import {sendToPipedrive} from '@/src/services/integrations/pipedrive.service';
import {sendToSlack} from '@/src/services/integrations/slack.service';
import {uploadFileToStorage} from '@/src/services/integrations/storage.service';
import {sendToTelegram} from '@/src/services/integrations/telegram.service';
import {type IntegrationContext} from '@/src/services/integrations/types';

type ContactActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

type IntegrationStatus = {
  pipedrive: boolean;
  telegram: boolean;
  slack: boolean;
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? '';
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
    const [pipedriveResult, telegramResult, slackResult] = await Promise.allSettled([
      sendToPipedrive(payload, context),
      sendToTelegram(payload, context),
      sendToSlack(payload, context)
    ]);

    const integrationStatus: IntegrationStatus = {
      pipedrive: pipedriveResult.status === 'fulfilled',
      telegram: telegramResult.status === 'fulfilled',
      slack: slackResult.status === 'fulfilled'
    };

    if (pipedriveResult.status === 'rejected') {
      console.error('[contact] pipedrive integration error:', pipedriveResult.reason);
    }
    if (telegramResult.status === 'rejected') {
      console.error('[contact] telegram integration error:', telegramResult.reason);
    }
    if (slackResult.status === 'rejected') {
      console.error('[contact] slack integration error:', slackResult.reason);
    }

    console.log('[contact] integration status:', integrationStatus);
    await saveLeadToDatabase(payload, context);

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
