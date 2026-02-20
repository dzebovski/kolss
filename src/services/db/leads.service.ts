import {type ContactFormValues} from '@/src/lib/validation/contact';
import {createAdminClient} from '@/src/lib/supabase/admin';
import {type IntegrationContext} from '@/src/services/integrations/types';

function toError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallbackMessage);
}

export async function saveLeadToDatabase(
  payload: ContactFormValues,
  context: IntegrationContext
): Promise<void> {
  try {
    console.log('[leads.service] supabase insert start');

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

    console.log('[leads.service] lead inserted');
  } catch (error) {
    const normalizedError = toError(error, 'Unknown leads insert error');
    console.error('[leads.service] failed:', normalizedError);
    throw normalizedError;
  }
}
