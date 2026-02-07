import {KitchenProject} from '@/src/types';

export const kitchenProjects: KitchenProject[] = [
  {
    id: 'k1',
    title: 'Nordic Light',
    slug: 'nordic-light',
    description: 'Світла Scandi-кухня з акцентом на практичність і зберігання.',
    priceStart: 780,
    priceCategory: 'Standard',
    style: 'Scandi',
    layout: 'L-Shape',
    materials: {
      facade: 'МДФ фарбований',
      countertop: 'Кварц',
      hardware: 'Blum'
    },
    images: ['/kitchens/nordic-light.svg'],
    isFeature: true
  },
  {
    id: 'k2',
    title: 'Loft Steel',
    slug: 'loft-steel',
    description: 'Контрастна кухня в стилі Loft з металевими деталями.',
    priceStart: 920,
    priceCategory: 'Premium',
    style: 'Loft',
    layout: 'Island',
    materials: {
      facade: 'Ламінат HPL',
      countertop: 'Керамограніт',
      hardware: 'Hettich'
    },
    images: ['/kitchens/loft-steel.svg'],
    isFeature: true
  },
  {
    id: 'k3',
    title: 'Minimal Oak',
    slug: 'minimal-oak',
    description: 'Мінімалістична кухня з теплими текстурами натурального дуба.',
    priceStart: 860,
    priceCategory: 'Standard',
    style: 'Minimalism',
    layout: 'Linear',
    materials: {
      facade: 'Шпон дуба',
      countertop: 'Акриловий камінь',
      hardware: 'Grass'
    },
    images: ['/kitchens/minimal-oak.svg'],
    isFeature: true
  },
  {
    id: 'k4',
    title: 'Classic Ivory',
    slug: 'classic-ivory',
    description: "Елегантна класика з фрезерованими фасадами та м'якими відтінками.",
    priceStart: 990,
    priceCategory: 'Premium',
    style: 'Classic',
    layout: 'U-Shape',
    materials: {
      facade: 'МДФ плівковий',
      countertop: 'Натуральний камінь',
      hardware: 'Blum'
    },
    images: ['/kitchens/classic-ivory.svg'],
    isFeature: false
  }
];
