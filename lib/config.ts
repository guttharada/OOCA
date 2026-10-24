import type { MoocaPose } from "./types";

/**
 * External links. Confirm the final URLs with the ooca team before launch.
 */
export const LINKS = {
  oocaBooking: "https://www.ooca.co/",
  firstSession: "https://www.ooca.co/",
  mentalHealthHotline: "tel:1323",
  emergency: "tel:1669",
} as const;

/** How long the "mooca กำลังอ่านคำตอบ" step stays on screen before the result. */
export const LOADING_MS = 1200;

/**
 * Which mooca illustration each screen uses. Files live in /public/mooca and were
 * cropped from the official mooca sheet. Swap a pose here if ooca supplies a
 * better-matching one (e.g. a real wave or head-tilt pose).
 */
export const MOOCA: Record<
  "entry" | "question" | "loading" | "level1" | "level2" | "level3" | "crisis",
  MoocaPose
> = {
  entry: "happy",
  question: "chat",
  loading: "chat",
  level1: "happy",
  level2: "chat",
  level3: "wai",
  crisis: "hug",
};

export const moocaSrc = (pose: MoocaPose) => `/mooca/${pose}.png`;

/** Pixel sizes of the PNGs (3x upscales of the sheet crops); used for aspect ratio. */
export const MOOCA_SIZE: Record<MoocaPose, { width: number; height: number }> = {
  happy: { width: 834, height: 651 },
  chat: { width: 702, height: 570 },
  wai: { width: 546, height: 561 },
  hug: { width: 720, height: 648 },
  sad: { width: 726, height: 615 },
};
