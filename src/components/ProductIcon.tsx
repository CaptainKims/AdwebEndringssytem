import { PRODUCT_TYPE_LABELS } from '../constants/productTypes';
import type { ProductType } from '../types';
import { DisplaySponsorshipIcon, PauseAdIcon, VideoAdIcon } from './icons';
import styles from './ProductIcon.module.css';

interface ProductIconProps {
  productType: ProductType;
}

const ICONS: Record<ProductType, typeof VideoAdIcon> = {
  'video-ad': VideoAdIcon,
  'display-sponsorship': DisplaySponsorshipIcon,
  'pause-ad': PauseAdIcon,
};

export function ProductIcon({ productType }: ProductIconProps) {
  const Icon = ICONS[productType];
  const label = PRODUCT_TYPE_LABELS[productType];

  return (
    <span className={styles.wrapper} aria-label={label} title={label}>
      <Icon className={styles.icon} />
    </span>
  );
}
