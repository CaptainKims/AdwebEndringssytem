import { useState } from 'react';
import styles from './RejectModal.module.css';

interface MessageModalProps {
  title: string;
  label: string;
  inputId: string;
  emptyWarning: string;
  onCancel: () => void;
  onSend: (message: string) => void;
}

export function MessageModal({
  title,
  label,
  inputId,
  emptyWarning,
  onCancel,
  onSend,
}: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [warning, setWarning] = useState('');

  function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) {
      setWarning(emptyWarning);
      return;
    }
    onSend(trimmed);
  }

  function handleChange(value: string) {
    setMessage(value);
    if (warning) setWarning('');
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby={`${inputId}-title`}>
      <form
        className={styles.modal}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <h2 id={`${inputId}-title`} className={styles.title}>
          {title}
        </h2>
        <div className={styles.field}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          <input
            id={inputId}
            type="text"
            className={`${styles.input} ${warning ? styles.inputError : ''}`}
            value={message}
            onChange={(e) => handleChange(e.target.value)}
            aria-invalid={warning ? true : undefined}
            aria-describedby={warning ? `${inputId}-warning` : undefined}
            autoFocus
          />
          {warning && (
            <p id={`${inputId}-warning`} className={styles.warning} role="alert">
              {warning}
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Avbryt
          </button>
          <button type="submit" className={styles.sendBtn}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
