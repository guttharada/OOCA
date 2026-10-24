import Link from "next/link";
import { Icon } from "./Icon";
import styles from "./AppShell.module.css";

/** Placeholder until the official ooca logo file is added to /public. */
function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="ooca หน้าแรก">
      ooca
    </Link>
  );
}

/**
 * Persistent "ต้องการความช่วยเหลือตอนนี้" link. Inside the quiz, `onOpen` shows the
 * crisis screen in place so answers are kept; elsewhere it navigates to /help.
 */
export function HelpLink({ onOpen }: { onOpen?: () => void }) {
  return (
    <Link
      href="/help"
      className={styles.help}
      onClick={
        onOpen
          ? (e) => {
              e.preventDefault();
              onOpen();
            }
          : undefined
      }
    >
      <Icon name="heart" size={18} strokeWidth={2} />
      ต้องการความช่วยเหลือตอนนี้
    </Link>
  );
}

export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.progress}>
      <span className={styles.progressLabel}>
        ข้อ {current} จาก {total}
      </span>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={`ข้อ ${current} จาก ${total}`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div className={styles.fill} style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}

export function BackButton({ onClick, label = "ย้อนกลับ" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className={styles.backBtn} onClick={onClick}>
      <Icon name="back" size={20} strokeWidth={2} />
      {label}
    </button>
  );
}

/**
 * Page frame: logo left, optional centre slot (progress), help link right.
 * `calm` drops the gradient for the crisis screen.
 */
export function AppShell({
  center,
  right = <HelpLink />,
  footer,
  calm = false,
  children,
}: {
  center?: React.ReactNode;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  calm?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.page} ${calm ? styles.calm : ""}`}>
      <header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.center}>{center}</div>
        <div className={styles.right}>{right}</div>
      </header>
      <main className={styles.main}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}
