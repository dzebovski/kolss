/**
 * Application initialization
 * This file should be imported at the top of your root layout or instrumentation file
 * to validate environment variables at startup
 */

import {validateEnv} from './env.validation';

// Validate environment variables at module load time
// This ensures the app fails fast with descriptive errors if config is invalid
if (typeof window === 'undefined') {
  // Only validate on server-side to avoid exposing server secrets
  try {
    validateEnv();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Failed to start application due to invalid environment configuration');
    throw error;
  }
}

export {};
