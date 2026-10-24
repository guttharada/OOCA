import type { Answers, IconName, ResultLevel } from "./types";

/** A sentence split into parts so key words can be emphasised. */
export type RichText = { text: string; strong?: boolean }[];

export interface Reason {
  icon: IconName;
  text: RichText;
}

export type Outcome =
  | { kind: "crisis" }
  | { kind: "result"; level: ResultLevel; reasons: Reason[] };

const IMPACT_LABEL: Record<string, string> = {
  sleep: "การนอน",
  eat: "การกิน",
  work: "งาน",
  relationships: "ความสัมพันธ์",
};

const first = (a: Answers, k: keyof Answers) => a[k]?.[0];

/** Each answer that can explain a result, tagged with the level it points to. */
function collectSignals(a: Answers): { level: ResultLevel; reason: Reason }[] {
  const out: { level: ResultLevel; reason: Reason }[] = [];

  const mood = first(a, "mood");
  if (mood === "heavy")
    out.push({ level: 3, reason: { icon: "heart", text: [{ text: "ช่วงนี้ใจ" }, { text: "หนักมาก จนแทบไม่ไหว", strong: true }] } });
  if (mood === "moderate")
    out.push({ level: 2, reason: { icon: "heart", text: [{ text: "ช่วงนี้" }, { text: "หนักใจอยู่พอสมควร", strong: true }] } });
  if (mood === "light")
    out.push({ level: 1, reason: { icon: "heart", text: [{ text: "ตอนนี้ใจยัง" }, { text: "เบาๆ แค่เหนื่อยบ้าง", strong: true }] } });

  const duration = first(a, "duration");
  if (duration === "over2w")
    out.push({ level: 3, reason: { icon: "clock", text: [{ text: "คุณรู้สึกแบบนี้มา" }, { text: "เกิน 2 สัปดาห์", strong: true }, { text: "แล้ว" }] } });
  if (duration === "months")
    out.push({ level: 3, reason: { icon: "clock", text: [{ text: "คุณรู้สึกแบบนี้มา" }, { text: "หลายเดือน", strong: true }, { text: "แล้ว" }] } });
  if (duration === "1-2w")
    out.push({ level: 2, reason: { icon: "clock", text: [{ text: "คุณรู้สึกแบบนี้มา" }, { text: "1–2 สัปดาห์", strong: true }, { text: "แล้ว" }] } });
  if (duration === "days")
    out.push({ level: 1, reason: { icon: "clock", text: [{ text: "เพิ่งรู้สึกแบบนี้มา" }, { text: "ไม่กี่วัน", strong: true }] } });

  const impact = (a.impact ?? []).filter((v) => v !== "none");
  if (impact.length > 0) {
    const labels = impact.map((v) => IMPACT_LABEL[v]);
    const text: RichText = [{ text: "เริ่มกระทบ" }];
    labels.forEach((l, i) => {
      if (i > 0) text.push({ text: i === labels.length - 1 ? "และ" : ", " });
      text.push({ text: l, strong: true });
    });
    text.push({ text: "แล้ว" });
    out.push({ level: impact.length >= 2 ? 3 : 2, reason: { icon: "moon", text } });
  } else if (a.impact?.includes("none")) {
    out.push({ level: 1, reason: { icon: "moon", text: [{ text: "ยัง" }, { text: "ไม่กระทบ", strong: true }, { text: "ชีวิตประจำวัน" }] } });
  }

  const selfcare = first(a, "selfcare");
  if (selfcare === "worse")
    out.push({ level: 3, reason: { icon: "refresh", text: [{ text: "ลองดูแลตัวเองแล้ว แต่" }, { text: "แย่ลง", strong: true }] } });
  if (selfcare === "same")
    out.push({ level: 2, reason: { icon: "refresh", text: [{ text: "ลองดูแลตัวเองแล้ว แต่" }, { text: "ยังเหมือนเดิม", strong: true }] } });
  if (selfcare === "better")
    out.push({ level: 1, reason: { icon: "refresh", text: [{ text: "ดูแลตัวเองแล้ว" }, { text: "รู้สึกดีขึ้น", strong: true }] } });

  const support = first(a, "support");
  if (support === "none")
    out.push({ level: 3, reason: { icon: "people", text: [{ text: "ตอนนี้" }, { text: "ยังไม่มีใคร", strong: true }, { text: "ให้คุยเรื่องนี้ด้วย" }] } });
  if (support === "reluctant")
    out.push({ level: 2, reason: { icon: "people", text: [{ text: "มีคนใกล้ตัว แต่" }, { text: "ยังไม่อยากเล่า", strong: true }] } });
  if (support === "yes")
    out.push({ level: 1, reason: { icon: "people", text: [{ text: "มีคนที่" }, { text: "สบายใจจะเล่าให้ฟัง", strong: true }] } });

  return out;
}

/**
 * Rules are checked from the strongest signal down, so a single serious answer
 * is never averaged away by lighter ones. No scores are shown to the user.
 *   Crisis: Q1 = "รู้สึกไม่อยากอยู่แล้ว"
 *   L3: Q1 heavy · Q2 > 2 weeks / months · Q3 ≥ 2 areas · Q4 worse · Q5 no one
 *   L2: Q1 moderate · Q2 1–2 weeks · Q3 1 area · Q4 same · Q5 reluctant
 *   L1: everything else
 */
export function evaluate(answers: Answers): Outcome {
  if (first(answers, "mood") === "crisis") return { kind: "crisis" };

  const signals = collectSignals(answers);
  const level: ResultLevel = signals.some((s) => s.level === 3)
    ? 3
    : signals.some((s) => s.level === 2)
      ? 2
      : 1;

  // Explain with the answers that caused this level first, then fill to max 3.
  const primary = signals.filter((s) => s.level === level);
  const rest = signals.filter((s) => s.level !== level && (level === 1 ? true : s.level > 1));
  const reasons = [...primary, ...rest].slice(0, 3).map((s) => s.reason);

  return { kind: "result", level, reasons };
}

