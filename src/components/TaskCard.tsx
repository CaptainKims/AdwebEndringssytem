import type { ChangeRequest } from '../types';
import { ChangeItemLine } from './ChangeItemLine';
import { ProductIcon } from './ProductIcon';
import { ChevronDown } from './icons';
import { ADWEB_OWNER } from '../constants/productTypes';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  request: ChangeRequest;
  expanded: boolean;
  onToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function TaskCard({ request, expanded, onToggle, onApprove, onReject }: TaskCardProps) {
  const isVideoWithPlanner =
    request.productType === 'video-ad' && request.planner;
  const avatarInitials = isVideoWithPlanner
    ? request.plannerInitials!
    : ADWEB_OWNER.initials;
  const avatarColor = isVideoWithPlanner ? undefined : ADWEB_OWNER.avatarColor;

  return (
    <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.header}>
        <button className={styles.titleBtn} onClick={onToggle}>
          <ProductIcon productType={request.productType} />
          <span className={styles.titleText}>
            <span className={styles.advertiser}>{request.advertiser}</span>
            <span className={styles.separator}> | </span>
            <span>{request.orderNumber}</span>
            <span className={styles.separator}> | </span>
            <span className={styles.campaign}>{request.campaign}</span>
          </span>
        </button>
        <div className={styles.meta}>
          <div
            className={styles.avatar}
            style={avatarColor ? { background: avatarColor } : undefined}
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

      {expanded && (
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Forespurt av:</span>
            <a href={request.requesterContactHref} className={styles.link}>
              {request.requesterName}
            </a>
          </div>
          {!isVideoWithPlanner && (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Ansvarlig:</span>
              <span>{ADWEB_OWNER.responsible}</span>
            </div>
          )}
          <h3 className={styles.sectionTitle}>Forespurte endringer</h3>
          <ul className={styles.changesList}>
            {request.changes.map((change) => (
              <li key={change.id}>
                <ChangeItemLine change={change} linkClassName={styles.link} />
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button className={styles.rejectBtn} onClick={onReject}>
              Avslå
            </button>
            <button className={styles.approveBtn} onClick={onApprove}>
              Godkjenn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
