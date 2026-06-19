import type { RecentItem } from '../types';
import type { ItemBadgeKind } from './TypeBadge';
import { CampaignSummaryView } from './CampaignSummaryView';
import { ChangeItemLine } from './ChangeItemLine';
import { EmptyState } from './EmptyState';
import { ProductIcon } from './ProductIcon';
import { TypeBadge } from './TypeBadge';
import { ChevronDown } from './icons';
import { ADWEB_OWNER } from '../constants/productTypes';
import styles from './RecentChanges.module.css';

function getBadgeKind(item: RecentItem): ItemBadgeKind {
  if (item.kind === 'campaign' && item.status === 'needs-clarification') {
    return 'clarification';
  }
  return item.kind;
}

interface RecentItemCardProps {
  item: RecentItem;
  expanded: boolean;
  onToggle: () => void;
  onAcknowledge?: () => void;
  onRequestClarification?: () => void;
}

function RecentItemCard({
  item,
  expanded,
  onToggle,
  onAcknowledge,
  onRequestClarification,
}: RecentItemCardProps) {
  const isVideoWithPlanner = item.productType === 'video-ad' && item.planner;
  const avatarInitials = isVideoWithPlanner ? item.initials : ADWEB_OWNER.initials;
  const avatarColor = isVideoWithPlanner ? item.avatarColor : ADWEB_OWNER.avatarColor;

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.header}>
        <button className={styles.titleBtn} onClick={onToggle}>
          <TypeBadge kind={getBadgeKind(item)} />
          <ProductIcon productType={item.productType} />
          <span className={styles.titleText}>
            <span className={styles.advertiser}>{item.advertiser}</span>
            <span className={styles.separator}> | </span>
            <span>{item.orderNumber}</span>
            <span className={styles.separator}> | </span>
            <span className={styles.campaign}>{item.campaign}</span>
          </span>
        </button>
        <div className={styles.meta}>
          <div
            className={styles.avatar}
            style={{ background: avatarColor }}
          >
            {avatarInitials}
          </div>
          <button
            className={`${styles.chevronBtn} ${expanded ? styles.chevronUp : ''}`}
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? 'Minimer' : 'Utvid'}
          >
            <ChevronDown />
          </button>
        </div>
      </div>

      {expanded && item.kind === 'change' && (
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Ansvarlig:</span>
            <span>{item.responsible}</span>
            <span className={styles.metaDivider}>·</span>
            <span className={styles.metaLabel}>Behandlet:</span>
            <span>{item.timestamp}</span>
          </div>
          <h3 className={styles.sectionTitle}>Gjennomførte endringer</h3>
          <ul className={styles.changesList}>
            {item.changes.map((change) => (
              <li key={change.id}>
                <ChangeItemLine change={change} linkClassName={styles.link} />
              </li>
            ))}
          </ul>
          {onAcknowledge && (
            <div className={styles.acknowledgeActions}>
              <button type="button" className={styles.confirmBtn} onClick={onAcknowledge}>
                Bekreft lest
              </button>
            </div>
          )}
        </div>
      )}

      {expanded && item.kind === 'rejected' && (
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Ansvarlig:</span>
            <span>{item.responsible}</span>
            <span className={styles.metaDivider}>·</span>
            <span className={styles.metaLabel}>Behandlet:</span>
            <span>{item.timestamp}</span>
          </div>
          <h3 className={styles.sectionTitle}>Forespurte endringer</h3>
          <ul className={styles.changesList}>
            {item.changes.map((change) => (
              <li key={change.id}>
                <ChangeItemLine change={change} linkClassName={styles.link} />
              </li>
            ))}
          </ul>
          <h3 className={styles.sectionTitle}>Avslagsmelding</h3>
          <p className={styles.rejectionMessage}>{item.rejectionMessage}</p>
          {onAcknowledge && (
            <div className={styles.acknowledgeActions}>
              <button type="button" className={styles.confirmBtn} onClick={onAcknowledge}>
                Bekreft lest
              </button>
            </div>
          )}
        </div>
      )}

      {expanded && item.kind === 'campaign' && onAcknowledge && onRequestClarification && (
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Mottatt:</span>
            <span>{item.timestamp}</span>
            <span className={styles.metaDivider}>·</span>
            <span className={styles.metaLabel}>Kilde:</span>
            <span>Eksternt bookingsystem</span>
          </div>
          <CampaignSummaryView
            summary={item.summary}
            clarificationComment={item.clarificationComment}
            clarificationTimestamp={item.clarificationTimestamp}
            onAcknowledge={onAcknowledge}
            onRequestClarification={onRequestClarification}
          />
        </div>
      )}
    </div>
  );
}

interface RecentChangesProps {
  items: RecentItem[];
  count: number;
  expandedId: string | null;
  onToggle: (id: string) => void;
  onAcknowledge: (id: string) => void;
  onRequestClarification: (id: string) => void;
}

export function RecentChanges({
  items,
  count,
  expandedId,
  onToggle,
  onAcknowledge,
  onRequestClarification,
}: RecentChangesProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Siste endringer</h2>
        <span className={styles.count}>
          {count} {count === 1 ? 'oppføring' : 'oppføringer'}
        </span>
      </div>
      <div className={styles.list}>
        {items.length === 0 ? (
          <EmptyState message="Det finnes ingen flere endringer idag" />
        ) : (
          items.map((item) => (
            <RecentItemCard
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => onToggle(item.id)}
              onAcknowledge={() => onAcknowledge(item.id)}
              onRequestClarification={
                item.kind === 'campaign' ? () => onRequestClarification(item.id) : undefined
              }
            />
          ))
        )}
      </div>
    </section>
  );
}
