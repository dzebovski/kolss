import {describe, expect, it} from 'vitest';

import {leadFormSchema} from '@/src/lib/validation/lead';

describe('leadFormSchema', () => {
  it('accepts valid data', () => {
    const result = leadFormSchema.safeParse({
      name: 'Іван',
      phone: '+380671234567'
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid data', () => {
    const result = leadFormSchema.safeParse({
      name: 'І',
      phone: 'abc'
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name?.length).toBeGreaterThan(0);
      expect(result.error.flatten().fieldErrors.phone?.length).toBeGreaterThan(0);
    }
  });
});
