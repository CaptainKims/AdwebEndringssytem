import { MessageModal } from './MessageModal';

interface ClarificationModalProps {
  onCancel: () => void;
  onSend: (message: string) => void;
}

export function ClarificationModal({ onCancel, onSend }: ClarificationModalProps) {
  return (
    <MessageModal
      title="Trenger avklaring"
      label="Beskriv hva som må avklares"
      inputId="clarification-reason"
      emptyWarning="Du må beskrive hva som må avklares."
      onCancel={onCancel}
      onSend={onSend}
    />
  );
}
