import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: "mood",
    title: "ช่วงนี้ใจเป็นยังไงบ้าง?",
    options: [
      { id: "light", label: "เบาๆ แค่เหนื่อยบ้าง" },
      { id: "moderate", label: "หนักใจอยู่พอสมควร" },
      { id: "heavy", label: "หนักมาก แทบไม่ไหว" },
      { id: "crisis", label: "รู้สึกไม่อยากอยู่แล้ว" },
    ],
    react: ([v]) =>
      ({
        light: "เหนื่อยก็พักได้นะ ไม่ต้องรอให้หนักก่อน",
        moderate: "ขอบคุณที่บอกนะ หนักใจอยู่ใช่ไหม",
        heavy: "ฟังดูหนักมากเลย ค่อยๆ ไปด้วยกันนะ",
        crisis: "ขอบคุณที่บอกนะ ตอนนี้เราอยู่ตรงนี้",
      })[v] ?? "",
  },
  {
    id: "duration",
    title: "รู้สึกแบบนี้มานานแค่ไหนแล้ว?",
    options: [
      { id: "days", label: "ไม่กี่วัน" },
      { id: "1-2w", label: "1–2 สัปดาห์" },
      { id: "over2w", label: "เกิน 2 สัปดาห์" },
      { id: "months", label: "หลายเดือนแล้ว" },
    ],
    react: ([v]) =>
      ({
        days: "ดีที่สังเกตตัวเองตั้งแต่เนิ่นๆ นะ",
        "1-2w": "อยู่กับมันมาสักพักแล้วเนอะ",
        over2w: "นานพอสมควรเลย อดทนมาเยอะนะ",
        months: "หลายเดือนเลย ขอบคุณที่ยังมาถามใจตัวเองนะ",
      })[v] ?? "",
  },
  {
    id: "impact",
    title: "มันเริ่มกระทบเรื่องไหนบ้าง?",
    multi: true,
    exclusiveId: "none",
    options: [
      { id: "sleep", label: "การนอน", icon: "moon" },
      { id: "eat", label: "การกิน", icon: "utensils" },
      { id: "work", label: "งานหรือการเรียน", icon: "briefcase" },
      { id: "relationships", label: "ความสัมพันธ์", icon: "people" },
      { id: "none", label: "ยังไม่กระทบอะไร", icon: "smile" },
    ],
    react: (sel) => {
      if (sel.includes("none")) return "ดีเลยที่ยังไม่กระทบ แต่ความรู้สึกของคุณก็สำคัญนะ";
      if (sel.includes("sleep") && sel.length > 1)
        return "นอนไม่ค่อยหลับแล้วยังต้องรับมือเรื่องอื่นอีก เหนื่อยจริงๆ นะ";
      if (sel.includes("sleep")) return "นอนไม่ค่อยหลับนี่เหนื่อยจริงๆ นะ";
      if (sel.length > 1) return "หลายเรื่องเลยนะ ขอบคุณที่บอกตรงๆ";
      return "เข้าใจเลย ขอบคุณที่เล่านะ";
    },
  },
  {
    id: "selfcare",
    title: "ลองดูแลตัวเองแบบที่เคยทำแล้ว เป็นยังไงบ้าง?",
    options: [
      { id: "better", label: "ดีขึ้น" },
      { id: "same", label: "เหมือนเดิม" },
      { id: "worse", label: "แย่ลง" },
      { id: "notyet", label: "ยังไม่ได้ลอง" },
    ],
    react: ([v]) =>
      ({
        better: "ดีจังที่เจอวิธีที่ช่วยได้",
        same: "บางทีวิธีเดิมก็ไม่พอ ไม่ใช่ความผิดคุณนะ",
        worse: "ขอบคุณที่บอกนะ เดี๋ยวเรามาดูทางอื่นกัน",
        notyet: "ไม่เป็นไรเลย เดี๋ยวมีไอเดียให้ลองนะ",
      })[v] ?? "",
  },
  {
    id: "support",
    title: "มีใครที่คุยเรื่องนี้ด้วยได้ไหม?",
    options: [
      { id: "yes", label: "มี และสบายใจที่จะเล่า" },
      { id: "reluctant", label: "มี แต่ไม่อยากเล่า" },
      { id: "none", label: "ไม่มีเลย" },
    ],
    react: ([v]) =>
      ({
        yes: "ดีจังที่มีคนแบบนั้นอยู่ข้างๆ",
        reluctant: "เข้าใจเลย บางเรื่องก็เล่ายาก",
        none: "ไม่เป็นไรนะ เดี๋ยวเรามาหาทางด้วยกัน",
      })[v] ?? "",
  },
];

export const QUESTION_PROMPT = "ไม่มีคำตอบผิด ตอบตามที่รู้สึกเลยนะ";
