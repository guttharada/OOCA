"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { Mooca } from "./Mooca";
import { LINKS, MOOCA } from "@/lib/config";
import styles from "./CrisisScreen.module.css";

/**
 * Calm, single centred column. No gradient, no motion, the 1323 call is the
 * most prominent element. Rendered both inside the quiz and at /help.
 */
export function CrisisScreen() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <div className={styles.halo}>
          <Mooca pose={MOOCA.crisis} width={160} priority />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
          ความรู้สึกนี้ไม่ควรแบกไว้คนเดียว
        </h1>
        <p className={styles.body}>
          ขอบคุณที่บอกนะ ตอนนี้มีคนที่พร้อมฟังคุณอยู่
          <br />
          คุยได้ทันที ไม่ต้องเตรียมอะไร
        </p>
      </div>

      <div className={styles.actions}>
        <a className={styles.call} href={LINKS.mentalHealthHotline}>
          <span className={styles.callIcon}>
            <Icon name="phone" size={26} strokeWidth={2} />
          </span>
          <span className={styles.callText}>
            <span className={styles.callTitle}>โทรสายด่วนสุขภาพจิต 1323</span>
            <span className={styles.callSub}>ฟรี · ตลอด 24 ชั่วโมง</span>
          </span>
        </a>
        <a
          className="btn btn-outline btn-block"
          href={LINKS.oocaBooking}
          target="_blank"
          rel="noopener noreferrer"
        >
          คุยกับนักจิตวิทยา ooca
          <span className="visually-hidden"> (เปิดในแท็บใหม่)</span>
        </a>
      </div>

      <p className={styles.emergency}>
        ถ้าคุณหรือคนใกล้ตัวอยู่ในอันตรายตอนนี้ โทร <a href={LINKS.emergency}>1669</a> (เหตุฉุกเฉินทางการแพทย์)
      </p>
    </div>
  );
}
