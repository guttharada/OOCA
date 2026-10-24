"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { Mooca } from "./Mooca";
import { OptionCard } from "./OptionCard";
import { MOOCA } from "@/lib/config";
import { QUESTION_PROMPT } from "@/lib/questions";
import type { Question } from "@/lib/types";
import styles from "./QuestionScreen.module.css";

export function QuestionScreen({
  question,
  selected,
  onToggle,
  onNext,
  onBack,
  isLast,
}: {
  question: Question;
  selected: string[];
  onToggle: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new question so screen readers announce it.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [question.id]);

  const multi = !!question.multi;
  const canNext = selected.length > 0;
  const reaction = canNext ? question.react(selected) : QUESTION_PROMPT;
  const count = question.options.length;
  const legendId = `${question.id}-legend`;

  return (
    <div className={`${styles.layout} fade-in`} key={question.id}>
      <div className={styles.voice}>
        <div className={styles.bubble}>
          <h1 ref={headingRef} tabIndex={-1} className={styles.question} id={`${question.id}-title`}>
            {question.title}
          </h1>
        </div>
        <div className={styles.moocaRow}>
          <div className={styles.avatar}>
            <Mooca pose={MOOCA.question} width={300} className={styles.moocaImg} priority />
          </div>
          <p className={styles.reaction} aria-live="polite">
            {reaction}
          </p>
        </div>
      </div>

      <form
        className={styles.answers}
        onSubmit={(e) => {
          e.preventDefault();
          if (canNext) onNext();
        }}
      >
        <fieldset className={styles.fieldset} aria-labelledby={`${question.id}-title ${legendId}`}>
          <legend id={legendId} className={styles.legend}>
            {multi ? "เลือกได้มากกว่า 1 ข้อ" : "เลือก 1 ข้อ"}
          </legend>
          <div className={styles.options}>
            {question.options.map((o, i) => (
              <OptionCard
                key={o.id}
                option={o}
                name={question.id}
                index={i}
                multi={multi}
                checked={selected.includes(o.id)}
                onChange={() => onToggle(o.id)}
              />
            ))}
          </div>
        </fieldset>

        <p className={styles.keyHint}>
          กด <kbd>1</kbd>–<kbd>{count}</kbd> เพื่อเลือก · <kbd>Enter</kbd> ไปต่อ · <kbd>Esc</kbd> ย้อนกลับ
        </p>

        <div className={styles.actions}>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <Icon name="back" size={20} strokeWidth={2} />
            ย้อนกลับ
          </button>
          <div className={styles.nextGroup}>
            <span className={styles.status} aria-live="polite">
              {canNext ? (multi ? `เลือกแล้ว ${selected.length} ข้อ` : "") : "เลือกอย่างน้อย 1 ข้อ"}
            </span>
            <button type="submit" className={`btn btn-primary ${styles.next}`} disabled={!canNext}>
              {isLast ? "ดูผลลัพธ์" : "ถัดไป"}
              <Icon name="next" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
