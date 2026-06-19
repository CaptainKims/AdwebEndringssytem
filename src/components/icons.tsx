export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tv2Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#6704FF" />
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui">2</text>
    </svg>
  );
}

export function VideoAdIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="23" height="15" rx="1.5" stroke="currentColor" />
      <path d="M9 3V13L16 8L9 3Z" fill="currentColor" />
    </svg>
  );
}

export function DisplaySponsorshipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="23" height="15" rx="1.5" stroke="currentColor" />
      <path
        d="M9 3H12.799C13.4322 3 13.9911 3.13596 14.4757 3.40789C14.9604 3.67982 15.3356 4.06579 15.6013 4.56579C15.8671 5.06579 16 5.64474 16 6.30263C16 6.96053 15.8671 7.54386 15.6013 8.05263C15.3356 8.55263 14.9604 8.94298 14.4757 9.22368C13.9911 9.49561 13.4322 9.63158 12.799 9.63158H10.9464V13H9V3ZM12.7755 7.57895C13.1586 7.57895 13.4673 7.46053 13.7018 7.22368C13.9363 6.98684 14.0536 6.67982 14.0536 6.30263C14.0536 5.92544 13.9363 5.62281 13.7018 5.39474C13.4673 5.16667 13.1586 5.05263 12.7755 5.05263H10.9464V7.57895H12.7755Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PauseAdIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="23" height="15" rx="1.5" stroke="currentColor" />
      <path d="M11 3H8V13H11V3Z" fill="currentColor" />
      <path d="M16 3H13V13H16V3Z" fill="currentColor" />
    </svg>
  );
}
