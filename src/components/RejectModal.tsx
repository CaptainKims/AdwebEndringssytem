import { useState } from 'react';
import styles from './RejectModal.module.css';

interface RejectModalProps {
  onCancel: () => void;
  onSend: (message: string) => void;
}

export function RejectModal({ onCancel, onSend }: RejectModalProps) {
  const [message, setMessage] = useState('');

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="reject-title">
      <div className={styles.modal}>
        <h2 id="reject-title" className={styles.title}>
          Endringsforespørsel avslått
        </h2>
        <div className={styles.field}>
          <label htmlFor="reject-reason" className={styles.label}>
            Skriv årsaken til avslag
          </label>
          <input
            id="reject-reason"
            type="text"
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Avbryt
          </button>
          <button className={styles.sendBtn} onClick={() => onSend(message)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
