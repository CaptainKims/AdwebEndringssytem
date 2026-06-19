import { PRODUCT_TYPE_LABELS, showPlannerFilter } from '../constants/productTypes';
import type { ProductFilterValue, ProductType } from '../types';

interface FilterableItem {
  productType: ProductType;
  planner?: string;
}

export function matchesFilters(
  item: FilterableItem,
  productFilter: ProductFilterValue,
  plannerFilter: string,
): boolean {
  if (productFilter !== 'all' && item.productType !== productFilter) {
    return false;
  }

  if (
    showPlannerFilter(productFilter) &&
    plannerFilter !== 'Alle planleggere'
  ) {
    if (item.productType !== 'video-ad') {
      return false;
    }
    return item.planner === plannerFilter;
  }

  return true;
}

export function formatProductBreakdown(items: FilterableItem[]): string | null {
  const counts: Partial<Record<ProductType, number>> = {};

  for (const item of items) {
    counts[item.productType] = (counts[item.productType] ?? 0) + 1;
  }

  const parts = (Object.keys(PRODUCT_TYPE_LABELS) as ProductType[])
    .filter((type) => (counts[type] ?? 0) > 0)
    .map((type) => `${counts[type]} ${PRODUCT_TYPE_LABELS[type]}`);

  return parts.length > 1 ? parts.join(' · ') : null;
}
