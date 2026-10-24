"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { Mooca } from "./Mooca";
import { RESULT_COPY, type NextStep } from "@/lib/resultContent";
import type { Reason } from "@/lib/result";
import type { ResultLevel } from "@/lib/types";
import styles from "./ResultScreen.module.css";

function StepCard({ step, onRestart }: { step: NextStep; onRestart: () => void }) {
  const a = step.action;
  const isExternal = a?.href?.startsWith("http");
  const actionEl = a ? (
    a.restart ? (
      <button type="button" className={`btn btn-outline ${styles.stepBtn}`} onClick={onRestart}>
        {a.label}
      </button>
    ) : (
      <a
        href={a.href}
        className={`btn ${step.primary ? "btn-primary" : "btn-outline"} ${styles.stepBtn}`}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {a.icon === "chat" && <Icon name="chat" size={20} strokeWidth={2} />}
        {a.label}
        {a.icon === "arrow" && <Icon name="arrow" size={18} strokeWidth={2} />}
        {isExternal && <span className="visually-hidden"> (เปิดในแท็บใหม่)</span>}
      </a>
    )
  ) : null;

  return (
    <div className={`${styles.step} ${step.primary ? styles.stepPrimary : ""}`}>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepBody}>{step.body}</p>
      {actionEl}
    </div>
  );
}

export function ResultScreen({
  level,
  reasons,
  onRestart,
  onBack,
}: {
  level: ResultLevel;
  reasons: Reason[];
  onRestart: () => void;
  onBack: () => void;
}) {
  const copy = RESULT_COPY[level];
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  return (
    <div className={`${styles.wrap} fade-in`}>
      <button type="button" className={styles.back} onClick={onBack}>
        <Icon name="back" size={20} strokeWidth={2} />
        กลับไปแก้คำตอบ
      </button>

      <div className={styles.layout}>
        <div className={styles.hero}>
          <Mooca pose={copy.pose} width={230} className={styles.mooca} priority />
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
            {copy.title}
          </h1>
          <p className={styles.lead}>{copy.lead}</p>
        </div>

        <div className={styles.side}>
          <section aria-labelledby="why" className={styles.why}>
            <h2 id="why" className={styles.whyTitle}>
              เพราะอะไร
            </h2>
            <ul className={styles.reasons}>
              {reasons.map((r, i) => (
                <li key={i} className={styles.reason}>
                  <span className={styles.reasonIcon}>
                    <Icon name={r.icon} size={22} />
                  </span>
                  <span>
                    {r.text.map((p, j) => (p.strong ? <b key={j}>{p.text}</b> : <span key={j}>{p.text}</span>))}
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.summary}>{copy.summary}</p>
          </section>

          <section aria-labelledby="next" className={styles.next}>
            <h2 id="next" className={styles.nextTitle}>
              ก้าวต่อไป
            </h2>
            <div className={styles.steps}>
              {copy.steps.map((s) => (
                <StepCard key={s.title} step={s} onRestart={onRestart} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {level !== 1 && (
        <div className={styles.bottom}>
          {/* Keep users on ooca: the booking CTA above is the main path. L3 alone gets a
              quiet, in-app safety net (the /help page has 1323 / 1669). */}
          {level === 3 ? (
            <p className={styles.hotline}>
              <Icon name="heart" size={18} />
              <span>
                ถ้ารู้สึกไม่ปลอดภัยตอนนี้ <Link href="/help">ดูช่องทางช่วยเหลือทันที</Link>
              </span>
            </p>
          ) : (
            <span />
          )}
          <button type="button" className={styles.restart} onClick={onRestart}>
            เริ่มทำใหม่
          </button>
        </div>
      )}
    </div>
  );
}
