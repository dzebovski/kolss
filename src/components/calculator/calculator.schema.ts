import {z} from 'zod';
import {
  APPLIANCE_IDS,
  COLOR_IDS,
  INSTALLATION_IDS,
  LAYOUT_IDS,
  PLUMBING_IDS,
  SIZE_IDS,
  WORKTOP_IDS,
} from '@/src/config/calculator.config';

// ─── Full 5-step schema ───────────────────────────────────────────────────────
// All single-select fields are required.
// applianceIds is optional (user may skip appliances entirely).

export const calculatorSchema = z.object({
  // Step 1: Size & Layout
  sizeId: z.enum(SIZE_IDS),
  layoutId: z.enum(LAYOUT_IDS),

  // Step 2: Colors / Finish
  colorId: z.enum(COLOR_IDS),

  // Step 3: Equipment
  worktopId: z.enum(WORKTOP_IDS),
  plumbingId: z.enum(PLUMBING_IDS),
  applianceIds: z.array(z.enum(APPLIANCE_IDS)).optional(),

  // Step 4: Installation
  installationId: z.enum(INSTALLATION_IDS),
});

export type CalculatorFormValues = z.infer<typeof calculatorSchema>;

// ─── Per-step field names (used by wizard to trigger partial validation) ───────

export const STEP_FIELDS: Readonly<
  Record<number, ReadonlyArray<keyof CalculatorFormValues>>
> = {
  1: ['sizeId', 'layoutId'],
  2: ['colorId'],
  3: ['worktopId', 'plumbingId'],
  4: ['installationId'],
} as const;

export const TOTAL_STEPS = 5;
