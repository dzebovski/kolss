export type KitchenStyle = 'Modern' | 'Classic' | 'Loft' | 'Scandi' | 'Minimalism';
export type KitchenLayout = 'Linear' | 'L-Shape' | 'U-Shape' | 'Island';
export type PriceCategory = 'Economy' | 'Standard' | 'Premium';

export interface KitchenProject {
    id: string;
    title: string;
    slug: string;
    description: string;
    priceStart?: number; // Ціна від (за погонний метр)
    priceCategory: PriceCategory;
    style: KitchenStyle;
    layout: KitchenLayout;
    materials: {
        facade: string;
        countertop: string;
        hardware: string;
    };
    images: string[];
    isFeature: boolean; // Чи показувати на головній
}