import styles from './TypeBadge.module.css';

export type ItemBadgeKind = 'change' | 'campaign' | 'rejected' | 'clarification';

interface TypeBadgeProps {
  kind: ItemBadgeKind;
}

const LABELS: Record<ItemBadgeKind, string> = {
  campaign: 'Ny',
  change: 'Endring',
  rejected: 'Avslått',
  clarification: 'Avklaring',
};

export function TypeBadge({ kind }: TypeBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[kind]}`}>
      {LABELS[kind]}
    </span>
  );
}
