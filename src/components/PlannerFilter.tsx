import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from './icons';
import { PLANNERS } from '../data/mockData';
import styles from './PlannerFilter.module.css';

interface PlannerFilterProps {
  value: string;
  onChange: (planner: string) => void;
}

export function PlannerFilter({ value, onChange }: PlannerFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.dropdown}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={styles.value}>{value}</span>
        <span className={styles.chevronBtn}>
          <ChevronDown />
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {PLANNERS.map((planner) => (
            <li key={planner}>
              <button
                className={`${styles.option} ${planner === value ? styles.selected : ''}`}
                role="option"
                aria-selected={planner === value}
                onClick={() => {
                  onChange(planner);
                  setOpen(false);
                }}
              >
                {planner}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
