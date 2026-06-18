import type { CampaignSummary } from '../types';
import styles from './CampaignSummaryView.module.css';

interface CampaignSummaryViewProps {
  summary: CampaignSummary;
  clarificationComment?: string;
  clarificationTimestamp?: string;
  onAcknowledge: () => void;
  onRequestClarification: () => void;
}

export function CampaignSummaryView({
  summary,
  clarificationComment,
  clarificationTimestamp,
  onAcknowledge,
  onRequestClarification,
}: CampaignSummaryViewProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.metaGroup}>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>KampanjeID:</span>
            <span className={styles.metaValue}>{summary.campaignId}</span>
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaLabel}>Annonsør:</span>
            <span className={styles.metaValue}>{summary.advertiserName}</span>
          </span>
        </div>
      </div>

      <h3 className={styles.campaignName}>{summary.campaignName}</h3>

      <div className={styles.details}>
        <DetailRow label="Tidsperiode:" value={summary.period} />
        <DetailRow label="Budsjett (netto):" value={`${summary.budgetNet} NOK`} />
        <DetailRow label="Rekvisisjonsnummer:" value={summary.requisitionNumber} />
        <DetailRow label="Vedlegg:" value={summary.attachments} />
        <DetailRow label="Kommentar:" value={summary.comment} />
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <span>Navn</span>
          <span>Linjereferanse</span>
          <span>Tidsperiode</span>
          <span>Produkt</span>
          <span>CPT</span>
          <span>Est. visninger</span>
          <span>Budsjett (netto)</span>
        </div>
        {summary.orderLines.map((line) => (
          <div key={line.id} className={styles.tableRow}>
            <div className={styles.lineName}>
              <span>{line.name}</span>
              <span className={styles.lineSub}>Rekvis. nr: {line.requisitionNumber}</span>
            </div>
            <span>{line.lineReference}</span>
            <span>{line.period}</span>
            <span>{line.product}</span>
            <span>{line.cpt}</span>
            <span>{line.estimatedViews}</span>
            <span>{line.budgetNet} NOK</span>
          </div>
        ))}
        <div className={styles.tableSum}>
          <span>Sum ordrelinjer</span>
          <span />
          <span>{summary.totalPeriod}</span>
          <span />
          <span />
          <span>{summary.totalViews}</span>
          <span>{summary.totalBudget} NOK</span>
        </div>
      </div>

      {clarificationComment && (
        <div className={styles.clarificationSection}>
          <h3 className={styles.clarificationTitle}>Avklaringsmelding</h3>
          {clarificationTimestamp && (
            <p className={styles.clarificationMeta}>Sendt: {clarificationTimestamp}</p>
          )}
          <p className={styles.clarificationMessage}>{clarificationComment}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.clarifyBtn} onClick={onRequestClarification}>
          Trenger avklaring
        </button>
        <button type="button" className={styles.confirmBtn} onClick={onAcknowledge}>
          Bekreft lest
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
}
