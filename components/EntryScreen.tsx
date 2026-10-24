import Link from "next/link";
import { Icon } from "./Icon";
import { Mooca } from "./Mooca";
import { MOOCA } from "@/lib/config";
import styles from "./EntryScreen.module.css";

export function EntryScreen() {
  return (
    <div className={`${styles.layout} fade-in`}>
      <div className={styles.art}>
        <Mooca pose={MOOCA.entry} width={360} priority />
      </div>
      <div className={styles.copy}>
        <div className={styles.bubble}>
          <h1 className={styles.title}>เคยสงสัยไหมว่า ควรคุยกับใครสักคนหรือยัง?</h1>
        </div>
        <p className={styles.sub}>ตอบ 5 ข้อ ใช้เวลาประมาณ 2 นาที ไม่ต้องสมัคร ไม่เก็บข้อมูล</p>
        <Link href="/quiz" className={`btn btn-primary ${styles.cta}`}>
          เริ่มเลย
          <Icon name="next" size={20} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
