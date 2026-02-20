import {getValidatedEnv} from '@/src/lib/config/env.validation';

export function getSupabaseUrl() {
  const env = getValidatedEnv();
  return env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabasePublishableKey() {
  const env = getValidatedEnv();
  return (
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ''
  );
}

export function getSupabaseServiceRoleKey() {
  const env = getValidatedEnv();
  return env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}
