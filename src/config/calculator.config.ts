// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface CalculatorItem {
  readonly id: string;
  readonly translationKey: string;
  readonly price: number;
  readonly imagePath: string;
}

export interface CalculatorItemGroup {
  readonly items: readonly CalculatorItem[];
  readonly selectionMode: 'single' | 'multiple';
}

// ─── ID Tuples (source of truth for Zod enums) ────────────────────────────────

export const SIZE_IDS = ['size_small', 'size_medium', 'size_large'] as const;
export type SizeId = (typeof SIZE_IDS)[number];

export const LAYOUT_IDS = [
  'layout_linear',
  'layout_l_shaped',
  'layout_u_shaped',
  'layout_island',
] as const;
export type LayoutId = (typeof LAYOUT_IDS)[number];

export const COLOR_IDS = [
  'color_classic_white',
  'color_natural_wood',
  'color_graphite_grey',
  'color_anthracite',
] as const;
export type ColorId = (typeof COLOR_IDS)[number];

export const WORKTOP_IDS = [
  'worktop_laminate',
  'worktop_quartz',
  'worktop_granite',
] as const;
export type WorktopId = (typeof WORKTOP_IDS)[number];

export const PLUMBING_IDS = ['plumbing_standard', 'plumbing_premium'] as const;
export type PlumbingId = (typeof PLUMBING_IDS)[number];

export const APPLIANCE_IDS = [
  'appliance_hob',
  'appliance_oven',
  'appliance_dishwasher',
  'appliance_fridge',
] as const;
export type ApplianceId = (typeof APPLIANCE_IDS)[number];

export const INSTALLATION_IDS = [
  'install_basic',
  'install_standard',
  'install_premium',
] as const;
export type InstallationId = (typeof INSTALLATION_IDS)[number];

// ─── Config Object ────────────────────────────────────────────────────────────

export const CALCULATOR_CONFIG = {
  step1_size: {
    items: [
      {
        id: 'size_small',
        translationKey: 'wizard.size.small',
        price: 0,
        imagePath: '/images/calculator/sizes/small.svg',
      },
      {
        id: 'size_medium',
        translationKey: 'wizard.size.medium',
        price: 2000,
        imagePath: '/images/calculator/sizes/medium.svg',
      },
      {
        id: 'size_large',
        translationKey: 'wizard.size.large',
        price: 5000,
        imagePath: '/images/calculator/sizes/large.svg',
      },
    ],
    selectionMode: 'single',
  },

  step1_layout: {
    items: [
      {
        id: 'layout_linear',
        translationKey: 'wizard.layout.linear',
        price: 0,
        imagePath: '/images/calculator/layouts/linear.svg',
      },
      {
        id: 'layout_l_shaped',
        translationKey: 'wizard.layout.l_shaped',
        price: 800,
        imagePath: '/images/calculator/layouts/l-shaped.svg',
      },
      {
        id: 'layout_u_shaped',
        translationKey: 'wizard.layout.u_shaped',
        price: 1500,
        imagePath: '/images/calculator/layouts/u-shaped.svg',
      },
      {
        id: 'layout_island',
        translationKey: 'wizard.layout.island',
        price: 2500,
        imagePath: '/images/calculator/layouts/island.svg',
      },
    ],
    selectionMode: 'single',
  },

  step2_colors: {
    items: [
      {
        id: 'color_classic_white',
        translationKey: 'wizard.colors.classic_white',
        price: 0,
        imagePath: '/images/calculator/colors/classic-white.avif',
      },
      {
        id: 'color_natural_wood',
        translationKey: 'wizard.colors.natural_wood',
        price: 400,
        imagePath: '/images/calculator/colors/natural-wood.avif',
      },
      {
        id: 'color_graphite_grey',
        translationKey: 'wizard.colors.graphite_grey',
        price: 300,
        imagePath: '/images/calculator/colors/graphite-grey.avif',
      },
      {
        id: 'color_anthracite',
        translationKey: 'wizard.colors.anthracite',
        price: 500,
        imagePath: '/images/calculator/colors/anthracite.avif',
      },
    ],
    selectionMode: 'single',
  },

  step3_equipment: {
    worktops: {
      items: [
        {
          id: 'worktop_laminate',
          translationKey: 'wizard.equipment.worktops.laminate',
          price: 0,
          imagePath: '/images/calculator/worktops/laminate.avif',
        },
        {
          id: 'worktop_quartz',
          translationKey: 'wizard.equipment.worktops.quartz',
          price: 1200,
          imagePath: '/images/calculator/worktops/quartz.avif',
        },
        {
          id: 'worktop_granite',
          translationKey: 'wizard.equipment.worktops.granite',
          price: 1800,
          imagePath: '/images/calculator/worktops/granite.avif',
        },
      ],
      selectionMode: 'single',
    },
    plumbing: {
      items: [
        {
          id: 'plumbing_standard',
          translationKey: 'wizard.equipment.plumbing.standard',
          price: 0,
          imagePath: '/images/calculator/plumbing/standard.svg',
        },
        {
          id: 'plumbing_premium',
          translationKey: 'wizard.equipment.plumbing.premium',
          price: 600,
          imagePath: '/images/calculator/plumbing/premium.svg',
        },
      ],
      selectionMode: 'single',
    },
    appliances: {
      items: [
        {
          id: 'appliance_hob',
          translationKey: 'wizard.equipment.appliances.hob',
          price: 800,
          imagePath: '/images/calculator/appliances/hob.svg',
        },
        {
          id: 'appliance_oven',
          translationKey: 'wizard.equipment.appliances.oven',
          price: 600,
          imagePath: '/images/calculator/appliances/oven.svg',
        },
        {
          id: 'appliance_dishwasher',
          translationKey: 'wizard.equipment.appliances.dishwasher',
          price: 700,
          imagePath: '/images/calculator/appliances/dishwasher.svg',
        },
        {
          id: 'appliance_fridge',
          translationKey: 'wizard.equipment.appliances.fridge',
          price: 900,
          imagePath: '/images/calculator/appliances/fridge.svg',
        },
      ],
      selectionMode: 'multiple',
    },
  },

  step4_installation: {
    items: [
      {
        id: 'install_basic',
        translationKey: 'wizard.installation.basic',
        price: 810,
        imagePath: '/images/calculator/installation/basic.svg',
      },
      {
        id: 'install_standard',
        translationKey: 'wizard.installation.standard',
        price: 1200,
        imagePath: '/images/calculator/installation/standard.svg',
      },
      {
        id: 'install_premium',
        translationKey: 'wizard.installation.premium',
        price: 2000,
        imagePath: '/images/calculator/installation/premium.svg',
      },
    ],
    selectionMode: 'single',
  },
} as const satisfies {
  step1_size: CalculatorItemGroup;
  step1_layout: CalculatorItemGroup;
  step2_colors: CalculatorItemGroup;
  step3_equipment: {
    worktops: CalculatorItemGroup;
    plumbing: CalculatorItemGroup;
    appliances: CalculatorItemGroup;
  };
  step4_installation: CalculatorItemGroup;
};
