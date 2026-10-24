"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, BackButton, HelpLink, ProgressBar } from "./AppShell";
import { CrisisScreen } from "./CrisisScreen";
import { LoadingScreen } from "./LoadingScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";
import { useQuizKeyboard } from "@/hooks/useQuizKeyboard";
import { LOADING_MS } from "@/lib/config";
import { QUESTIONS } from "@/lib/questions";
import { DISCLAIMER } from "@/lib/resultContent";
import { evaluate } from "@/lib/result";
import type { Answers, Question } from "@/lib/types";

type View =
  | { type: "question"; index: number }
  | { type: "loading" }
  | { type: "result" }
  | { type: "crisis"; returnTo: View };

const TOTAL = QUESTIONS.length;
const LAST = TOTAL - 1;

/** Apply a pick to the current selection, honouring single/multi and exclusive options. */
function nextSelection(q: Question, current: string[], optionId: string): string[] {
  if (!q.multi) return [optionId];
  if (current.includes(optionId)) return current.filter((v) => v !== optionId);
  if (q.exclusiveId && optionId === q.exclusiveId) return [optionId];
  return [...current.filter((v) => v !== q.exclusiveId), optionId];
}

/**
 * The whole check-in lives in this component's memory: no login, no storage,
 * nothing sent anywhere. Refreshing the page clears every answer.
 */
export function QuizFlow() {
  const router = useRouter();
  const [view, setView] = useState<View>({ type: "question", index: 0 });
  const [answers, setAnswers] = useState<Answers>({});

  const question = view.type === "question" ? QUESTIONS[view.index] : null;
  const selected = question ? (answers[question.id] ?? []) : [];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  // Short pause before the result so it feels considered, not instant.
  useEffect(() => {
    if (view.type !== "loading") return;
    const t = window.setTimeout(() => setView({ type: "result" }), LOADING_MS);
    return () => window.clearTimeout(t);
  }, [view.type]);

  const toggle = useCallback(
    (optionId: string) => {
      if (!question) return;
      setAnswers((a) => ({ ...a, [question.id]: nextSelection(question, a[question.id] ?? [], optionId) }));
    },
    [question],
  );

  const goNext = useCallback(() => {
    if (view.type !== "question" || selected.length === 0) return;
    if (question?.id === "mood" && selected[0] === "crisis") {
      setView({ type: "crisis", returnTo: view });
      return;
    }
    setView(view.index === LAST ? { type: "loading" } : { type: "question", index: view.index + 1 });
  }, [view, selected, question]);

  const goBack = useCallback(() => {
    if (view.type === "question") {
      if (view.index === 0) router.push("/");
      else setView({ type: "question", index: view.index - 1 });
    } else if (view.type === "result") {
      setView({ type: "question", index: LAST });
    } else if (view.type === "crisis") {
      setView(view.returnTo);
    }
  }, [view, router]);

  const restart = useCallback(() => {
    setAnswers({});
    setView({ type: "question", index: 0 });
  }, []);

  const openHelp = useCallback(() => {
    if (view.type !== "crisis") setView({ type: "crisis", returnTo: view });
  }, [view]);

  useQuizKeyboard({
    enabled: view.type === "question",
    optionCount: question?.options.length ?? 0,
    onPick: (i) => question && toggle(question.options[i].id),
    onNext: goNext,
    onBack: goBack,
  });

  const outcome = useMemo(() => (view.type === "result" ? evaluate(answers) : null), [view.type, answers]);

  if (view.type === "crisis") {
    return (
      <AppShell calm right={<BackButton onClick={goBack} />} footer={DISCLAIMER}>
        <CrisisScreen />
      </AppShell>
    );
  }

  return (
    <AppShell
      center={view.type === "question" ? <ProgressBar current={view.index + 1} total={TOTAL} /> : undefined}
      right={<HelpLink onOpen={openHelp} />}
      footer={view.type === "result" ? DISCLAIMER : "ไม่ต้องสมัคร ไม่เก็บข้อมูล · คำตอบหายไปเมื่อปิดหน้านี้"}
    >
      {question && view.type === "question" && (
        <QuestionScreen
          key={question.id}
          question={question}
          selected={selected}
          onToggle={toggle}
          onNext={goNext}
          onBack={goBack}
          isLast={view.index === LAST}
        />
      )}
      {view.type === "loading" && <LoadingScreen />}
      {outcome?.kind === "crisis" && <CrisisScreen />}
      {outcome?.kind === "result" && (
        <ResultScreen level={outcome.level} reasons={outcome.reasons} onRestart={restart} onBack={goBack} />
      )}
    </AppShell>
  );
}
