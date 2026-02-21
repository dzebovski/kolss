'use server';

import {getLocale, getTranslations} from 'next-intl/server';

import {getIntegrationStatus} from '@/src/lib/config/env.validation';
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
  warnings?: string[];
  integrationStatus?: {
    pipedrive: {enabled: boolean; success: boolean; error?: string};
    telegram: {enabled: boolean; success: boolean; error?: string};
    slack: {enabled: boolean; success: boolean; error?: string};
  };
};

function normalizeText(value: string | null | undefined) {
  return value?.trim() ?? '';
}

export async function submitContact(values: ContactFormValues): Promise<ContactActionState> {
  try {
    const locale = await getLocale();
    const t = await getTranslations({locale, namespace: 'ContactAction'});
    const validated = contactSchema.safeParse(values);

    if (!validated.success) {
      return {
        success: false,
        message: t('validation.invalidForm'),
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
    const configuredIntegrations = getIntegrationStatus();

    // Only attempt enabled integrations
    const integrationPromises = [];
    if (configuredIntegrations.pipedrive) {
      integrationPromises.push(sendToPipedrive(payload, context));
    }
    if (configuredIntegrations.telegram) {
      integrationPromises.push(sendToTelegram(payload, context));
    }
    if (configuredIntegrations.slack) {
      integrationPromises.push(sendToSlack(payload, context));
    }

    const results = await Promise.allSettled(integrationPromises);
    let idx = 0;

    // Build detailed integration status
    const integrationStatus = {
      pipedrive: {
        enabled: configuredIntegrations.pipedrive,
        success: configuredIntegrations.pipedrive ? results[idx++].status === 'fulfilled' : false,
        error: undefined as string | undefined
      },
      telegram: {
        enabled: configuredIntegrations.telegram,
        success: configuredIntegrations.telegram ? results[idx++].status === 'fulfilled' : false,
        error: undefined as string | undefined
      },
      slack: {
        enabled: configuredIntegrations.slack,
        success: configuredIntegrations.slack ? results[idx++].status === 'fulfilled' : false,
        error: undefined as string | undefined
      }
    };

    // Properly track errors for each integration
    idx = 0;
    if (configuredIntegrations.pipedrive) {
      const result = results[idx++];
      if (result.status === 'rejected') {
        const errorMsg = result.reason?.message || String(result.reason);
        integrationStatus.pipedrive.error = errorMsg;
        console.error('[contact] pipedrive integration error:', errorMsg);
      }
    }
    if (configuredIntegrations.telegram) {
      const result = results[idx++];
      if (result.status === 'rejected') {
        const errorMsg = result.reason?.message || String(result.reason);
        integrationStatus.telegram.error = errorMsg;
        console.error('[contact] telegram integration error:', errorMsg);
      }
    }
    if (configuredIntegrations.slack) {
      const result = results[idx++];
      if (result.status === 'rejected') {
        const errorMsg = result.reason?.message || String(result.reason);
        integrationStatus.slack.error = errorMsg;
        console.error('[contact] slack integration error:', errorMsg);
      }
    }

    console.log('[contact] integration status:', integrationStatus);
    await saveLeadToDatabase(payload, context);

    // Build warnings for failed integrations
    const warnings: string[] = [];
    const failedIntegrations: string[] = [];

    if (integrationStatus.pipedrive.enabled && !integrationStatus.pipedrive.success) {
      failedIntegrations.push('CRM');
    }
    if (integrationStatus.telegram.enabled && !integrationStatus.telegram.success) {
      failedIntegrations.push('Telegram');
    }
    if (integrationStatus.slack.enabled && !integrationStatus.slack.success) {
      failedIntegrations.push('Slack');
    }

    if (failedIntegrations.length > 0) {
      warnings.push(t('warnings.failedIntegrations', {integrations: failedIntegrations.join(', ')}));
    }

    // If no integrations are configured, warn about it
    const anyConfigured = Object.values(configuredIntegrations).some(v => v);
    if (!anyConfigured) {
      warnings.push(t('warnings.noIntegrations'));
    }

    // Success if saved to database, even if some integrations failed
    return {
      success: true,
      message: failedIntegrations.length > 0
        ? t('success.partial')
        : t('success.full'),
      warnings: warnings.length > 0 ? warnings : undefined,
      integrationStatus
    };
  } catch (error) {
    console.error('[contact] submit failed:', error);
    const locale = await getLocale().catch(() => 'en');
    const t = await getTranslations({locale, namespace: 'ContactAction'}).catch(() => null);

    return {
      success: false,
      message: t?.('errors.submitFailed') ?? 'Something went wrong while submitting the form. Please try again.'
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
    const locale = await getLocale().catch(() => 'en');
    const t = await getTranslations({locale, namespace: 'ContactAction'}).catch(() => null);

    return {
      success: false,
      message: t?.('errors.invalidFormData') ?? 'Invalid form data. Please check your fields and try again.'
    };
  }
}
