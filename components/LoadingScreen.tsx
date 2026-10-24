import { Mooca } from "./Mooca";
import { MOOCA } from "@/lib/config";
import styles from "./LoadingScreen.module.css";

export function LoadingScreen() {
  return (
    <div className={`${styles.wrap} fade-in`} role="status" aria-live="polite">
      <div className={styles.card}>
        <Mooca pose={MOOCA.loading} width={160} className={styles.mooca} animated={false} />
        <p className={styles.text}>mooca กำลังอ่านคำตอบของคุณ…</p>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}
