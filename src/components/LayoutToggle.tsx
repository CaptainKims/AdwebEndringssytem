import styles from './LayoutToggle.module.css';

export type LayoutMode = 'stacked' | 'twoColumn';

interface LayoutToggleProps {
  value: LayoutMode;
  onChange: (mode: LayoutMode) => void;
}

export function LayoutToggle({ value, onChange }: LayoutToggleProps) {
  const isTwoColumn = value === 'twoColumn';

  return (
    <div className={styles.wrapper}>
      <span id="layout-toggle-label" className={styles.label}>
        To kolonner
      </span>
      <button
        type="button"
        role="switch"
        aria-labelledby="layout-toggle-label"
        aria-checked={isTwoColumn}
        className={`${styles.track} ${isTwoColumn ? styles.trackOn : ''}`}
        onClick={() => onChange(isTwoColumn ? 'stacked' : 'twoColumn')}
      >
        <span className={styles.knob} />
      </button>
    </div>
  );
}
