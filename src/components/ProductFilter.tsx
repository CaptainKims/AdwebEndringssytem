import { useState, useRef, useEffect } from 'react';
import { PRODUCT_FILTERS, getProductFilterLabel } from '../constants/productTypes';
import type { ProductFilterValue } from '../types';
import { ChevronDown } from './icons';
import styles from './PlannerFilter.module.css';

interface ProductFilterProps {
  value: ProductFilterValue;
  onChange: (value: ProductFilterValue) => void;
}

export function ProductFilter({ value, onChange }: ProductFilterProps) {
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
        <span className={styles.value}>{getProductFilterLabel(value)}</span>
        <span className={styles.chevronBtn}>
          <ChevronDown />
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {PRODUCT_FILTERS.map((option) => (
            <li key={option.value}>
              <button
                className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
