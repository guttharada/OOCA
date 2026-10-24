import type { IconName } from "@/lib/types";

/** Line icons in the CI's regular style (24px, rounded caps). */
const PATHS: Record<IconName | "back" | "next" | "check" | "phone" | "arrow", string> = {
  moon: "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z",
  utensils: "M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 0-3 2-3 5s1 4 3 4v9",
  briefcase:
    "M5 7h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2zM9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18",
  people:
    "M9 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M17 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16 14.2A5 5 0 0121 19",
  smile: "M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 14a4 4 0 007 0M9 9.5h.01M15 9.5h.01",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  refresh: "M4 12a8 8 0 0114-5.3L20 9M20 4v5h-5M20 12a8 8 0 01-14 5.3L4 15M4 20v-5h5",
  heart: "M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z",
  chat: "M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z",
  back: "M15 5l-7 7 7 7",
  next: "M9 5l7 7-7 7",
  check: "M5 12.5l4.5 4.5L19 7.5",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export type AnyIcon = keyof typeof PATHS;

export function Icon({
  name,
  size = 24,
  strokeWidth = 1.75,
  className,
}: {
  name: AnyIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
