import { Tv2Logo } from './icons';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoGroup}>
        <Tv2Logo />
        <span className={styles.title}>Adweb</span>
      </div>
      <div className={styles.actions}>
        <div className={styles.langToggle}>
          <span className={styles.langInactive}>EN</span>
          <span className={styles.langDivider} />
          <span className={styles.langActive}>NO</span>
        </div>
        <div className={styles.avatar}>KS</div>
      </div>
    </header>
  );
}
