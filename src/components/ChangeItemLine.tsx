import type { ChangeItem } from '../types';

interface ChangeItemLineProps {
  change: ChangeItem;
  linkClassName: string;
}

export function ChangeItemLine({ change, linkClassName }: ChangeItemLineProps) {
  return (
    <>
      {change.text}
      {change.linkText && (
        <a href="#" className={linkClassName} onClick={(e) => e.preventDefault()}>
          {change.linkText}
        </a>
      )}
      {change.textAfter}
      {change.linkText2 && (
        <a href="#" className={linkClassName} onClick={(e) => e.preventDefault()}>
          {change.linkText2}
        </a>
      )}
      {change.textAfter2}
    </>
  );
}
