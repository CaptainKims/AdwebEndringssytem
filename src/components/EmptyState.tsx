import styles from './EmptyState.module.css';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'Det er ingen flere oppgaver idag.',
}: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <img
        src="/Empty.svg"
        alt=""
        className={styles.illustration}
        aria-hidden="true"
      />
      <p className={styles.text}>{message}</p>
    </div>
  );
}
