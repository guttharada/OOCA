import { LINKS, MOOCA } from "./config";
import type { MoocaPose, ResultLevel } from "./types";

export interface NextStep {
  title: string;
  body: string;
  /** Primary steps get the tinted card and a filled button. */
  primary?: boolean;
  action?: { label: string; href?: string; restart?: boolean; icon?: "chat" | "arrow" };
}

export interface ResultCopy {
  pose: MoocaPose;
  eyebrow: string;
  title: string;
  lead: string;
  /** One sentence tying the reasons together. */
  summary: string;
  steps: NextStep[];
}

export const RESULT_COPY: Record<ResultLevel, ResultCopy> = {
  1: {
    pose: MOOCA.level1,
    eyebrow: "สิ่งที่น่าจะเหมาะกับคุณตอนนี้",
    title: "ตอนนี้ลองดูแลตัวเอง\nแบบนี้ก่อน",
    lead: "การหยุดถามใจตัวเองแบบนี้\nเป็นจุดเริ่มต้นที่ดีมากแล้ว",
    summary:
      "ความรู้สึกยังเบา ยังไม่นาน และยังไม่กระทบชีวิตมากนัก การดูแลตัวเองเล็กๆ อย่างสม่ำเสมอช่วยได้จริง",
    steps: [
      {
        title: "ลองทำอย่างหนึ่งคืนนี้",
        body: "วางมือถือก่อนนอน 30 นาที แล้วหายใจเข้าช้าๆ 4 วินาที ผ่อนออก 6 วินาที สัก 5 รอบ",
        primary: true,
      },
      {
        title: "กลับมาเช็กใหม่ได้เสมอ",
        body: "ถ้าผ่านไป 2 สัปดาห์แล้วยังรู้สึกแบบเดิม หรือหนักขึ้น ลองกลับมาตอบอีกครั้งนะ",
        action: { label: "เริ่มทำใหม่", restart: true, icon: "arrow" },
      },
    ],
  },
  2: {
    pose: MOOCA.level2,
    eyebrow: "สิ่งที่น่าจะเหมาะกับคุณตอนนี้",
    title: "ลองคุยกับ\nใครสักคนดูนะ",
    lead: "ความรู้สึกที่สะสมมาสักพัก\nมักเบาลงเมื่อได้เล่าออกมา",
    summary:
      "เมื่อความหนักใจเริ่มอยู่นาน หรือวิธีเดิมไม่ค่อยช่วย การได้พูดออกมาจะช่วยให้เห็นทางไปต่อชัดขึ้น",
    steps: [
      {
        title: "คุยกับคนที่คุณไว้ใจ",
        body: "เริ่มง่ายๆ ก็ได้ เช่น “ช่วงนี้เราเหนื่อยๆ ขอเล่าให้ฟังหน่อยได้ไหม”",
      },
      {
        title: "หรือคุยกับนักจิตวิทยา ooca ก็ได้",
        body: "ไม่ต้องรอให้หนักก่อน คุยเพื่อทำความเข้าใจใจตัวเองได้เลย",
        primary: true,
        action: { label: "คุยกับนักจิตวิทยา ooca", href: LINKS.oocaBooking, icon: "chat" },
      },
    ],
  },
  3: {
    pose: MOOCA.level3,
    eyebrow: "สิ่งที่น่าจะเหมาะกับคุณตอนนี้",
    title: "ถึงเวลาคุยกับ\nผู้เชี่ยวชาญแล้ว",
    lead: "การมาถึงตรงนี้ไม่ได้แปลว่าคุณอ่อนแอ\nแต่แปลว่าคุณกำลังฟังใจตัวเองอยู่",
    summary:
      "เมื่อความหนักใจอยู่นานและเริ่มกระทบหลายเรื่อง การมีคนที่เข้าใจเรื่องใจโดยตรงช่วยฟัง จะทำให้คุณไม่ต้องหาทางออกอยู่คนเดียว",
    steps: [
      {
        title: "คุยกับนักจิตวิทยา ooca",
        body: "ไม่ต้องรอให้หนักกว่านี้ก่อน ค่อยๆ เริ่มได้เลย",
        primary: true,
        action: { label: "คุยกับนักจิตวิทยา ooca", href: LINKS.oocaBooking, icon: "chat" },
      },
      {
        title: "ดูว่าคุยครั้งแรกเป็นยังไง",
        body: "ยังไม่พร้อมก็ไม่เป็นไร ลองดูก่อนว่าการคุยครั้งแรกเป็นแบบไหน",
        action: { label: "อ่านต่อ", href: LINKS.firstSession, icon: "arrow" },
      },
    ],
  },
};

export const DISCLAIMER = "นี่ไม่ใช่การวินิจฉัย เป็นแค่จุดเริ่มต้นให้คุณรู้จักใจตัวเอง";
