import {describe, expect, it} from 'vitest';

import {formatCurrency} from '@/src/lib/utils/format';
import {slugify} from '@/src/lib/utils/slugify';

describe('utils', () => {
  it('formats currency', () => {
    const result = formatCurrency(2500, 'en-US', 'USD');

    expect(result).toBe('$2,500');
  });

  it('generates slug', () => {
    const result = slugify('Modern Kitchen Pro 2026');

    expect(result).toBe('modern-kitchen-pro-2026');
  });
});
