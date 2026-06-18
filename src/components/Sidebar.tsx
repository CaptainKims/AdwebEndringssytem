import { ChevronLeft } from './icons';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { label: 'Kampanjer', active: false },
  { label: 'Oppgaver', active: true },
  { label: 'Rapporter', active: false },
  { divider: true },
  { label: 'Annonsører', active: false },
  { label: 'Mediebyråer', active: false },
  { label: 'Faktura', active: false },
  { label: 'Inntektsrapport', active: false },
  { label: 'Brukere', active: false },
  { label: 'Kreativer', active: false },
  { label: 'Varelager', active: false },
  { label: 'Priser', active: false },
] as const;

const FOOTER_ITEMS = ['Kontakt oss', 'Personvernserklæring'];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item, i) =>
          'divider' in item ? (
            <hr key={i} className={styles.divider} />
          ) : (
            <div
              key={item.label}
              className={`${styles.item} ${item.active ? styles.active : ''}`}
            >
              {item.active && <span className={styles.indicator} />}
              <span className={styles.label}>{item.label}</span>
            </div>
          ),
        )}
      </nav>
      <div className={styles.footer}>
        {FOOTER_ITEMS.map((label) => (
          <div key={label} className={styles.item}>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
      <button className={styles.collapseBtn} aria-label="Skjul sidemeny">
        <ChevronLeft />
      </button>
    </aside>
  );
}
