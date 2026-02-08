export type KitchenStyle = 'Modern' | 'Classic' | 'Loft' | 'Scandi' | 'Minimalism';
export type KitchenLayout = 'Linear' | 'L-Shape' | 'U-Shape' | 'Island';
export type PriceCategory = 'Economy' | 'Standard' | 'Premium';
export type AppLocale = 'uk' | 'pl' | 'en';
export type LocalizedText = Record<AppLocale, string>;

export interface KitchenProject {
    id: string;
    title: LocalizedText;
    slug: string;
    description: LocalizedText;
    priceStart?: number; // Ціна від (за погонний метр)
    priceCategory: PriceCategory;
    style: KitchenStyle;
    layout: KitchenLayout;
    materials: {
        facade: LocalizedText;
        countertop: LocalizedText;
        hardware: LocalizedText;
    };
    images: string[];
    isFeature: boolean; // Чи показувати на головній
}
