import { MessageModal } from './MessageModal';

interface RejectModalProps {
  onCancel: () => void;
  onSend: (message: string) => void;
}

export function RejectModal({ onCancel, onSend }: RejectModalProps) {
  return (
    <MessageModal
      title="Endringsforespørsel avslått"
      label="Skriv årsaken til avslag"
      inputId="reject-reason"
      emptyWarning="Du må skrive en årsak til avslag."
      onCancel={onCancel}
      onSend={onSend}
    />
  );
}
