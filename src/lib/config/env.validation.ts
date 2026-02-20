import {z} from 'zod';

/**
 * Environment variable validation schema
 * Validates all required environment variables at startup
 */
const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z
    .string()
    .min(1, 'Supabase publishable key is required')
    .optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase anon key is required')
    .optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url('Invalid site URL').optional(),

  // Integrations (optional - contact form will gracefully degrade)
  PIPEDRIVE_API_TOKEN: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  SLACK_WEBHOOK_URL: z.string().url('Invalid Slack webhook URL').optional(),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
}).refine(
  (data) =>
    data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    message:
      'Either NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY must be provided',
    path: ['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'],
  }
);

export type ValidatedEnv = z.infer<typeof envSchema>;

/**
 * Validates environment variables and throws descriptive error if validation fails
 * Call this at application startup to fail fast
 */
export function validateEnv(): ValidatedEnv {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Environment variable validation failed:');
    console.error(result.error.format());
    throw new Error(
      `Environment variable validation failed: ${result.error.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')}`
    );
  }

  return result.data;
}

/**
 * Get validated environment variables
 * Returns a type-safe, validated environment object
 */
let cachedEnv: ValidatedEnv | null = null;

export function getValidatedEnv(): ValidatedEnv {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}

/**
 * Check if specific integrations are configured
 */
export function getIntegrationStatus() {
  const env = getValidatedEnv();

  return {
    pipedrive: !!(env.PIPEDRIVE_API_TOKEN),
    telegram: !!(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID),
    slack: !!(env.SLACK_WEBHOOK_URL),
  };
}
