import type { ProductFilterValue, ProductType } from '../types';

export const PRODUCT_FILTERS: { value: ProductFilterValue; label: string }[] = [
  { value: 'all', label: 'Alle produkter' },
  { value: 'video-ad', label: 'Video Ad' },
  { value: 'display-sponsorship', label: 'Visningsspons' },
  { value: 'pause-ad', label: 'Pause Ad' },
];

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  'video-ad': 'Video Ad',
  'display-sponsorship': 'Visningsspons',
  'pause-ad': 'Pause Ad',
};

export const PRODUCT_TYPE_INITIALS: Record<ProductType, string> = {
  'video-ad': 'VA',
  'display-sponsorship': 'VS',
  'pause-ad': 'PA',
};

export function getProductFilterLabel(value: ProductFilterValue): string {
  return PRODUCT_FILTERS.find((option) => option.value === value)?.label ?? value;
}

export function showPlannerFilter(productFilter: ProductFilterValue): boolean {
  return productFilter === 'all' || productFilter === 'video-ad';
}

export const ADWEB_OWNER = {
  responsible: 'Adweb',
  initials: 'AD',
  avatarColor: '#d9d8ed',
} as const;
