import { useState } from 'react';
import styles from './RejectModal.module.css';

interface ClarificationModalProps {
  onCancel: () => void;
  onSend: (message: string) => void;
}

export function ClarificationModal({ onCancel, onSend }: ClarificationModalProps) {
  const [message, setMessage] = useState('');

  function handleSend() {
    if (message.trim()) onSend(message.trim());
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="clarification-title">
      <div className={styles.modal}>
        <h2 id="clarification-title" className={styles.title}>
          Trenger avklaring
        </h2>
        <div className={styles.field}>
          <label htmlFor="clarification-reason" className={styles.label}>
            Beskriv hva som må avklares
          </label>
          <input
            id="clarification-reason"
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
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
