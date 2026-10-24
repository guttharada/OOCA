"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop shortcuts on question screens:
 *   1–N   pick / toggle option N
 *   Enter go next (when allowed)
 *   Esc   go back
 */
export function useQuizKeyboard({
  enabled,
  optionCount,
  onPick,
  onNext,
  onBack,
}: {
  enabled: boolean;
  optionCount: number;
  onPick: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  // Keep the latest handlers without re-binding the listener on every render.
  const ref = useRef({ optionCount, onPick, onNext, onBack });
  ref.current = { optionCount, onPick, onNext, onBack };

  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "TEXTAREA" || (tag === "INPUT" && (target as HTMLInputElement).type === "text")) return;

      const { optionCount, onPick, onNext, onBack } = ref.current;

      if (/^[1-9]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < optionCount) {
          e.preventDefault();
          onPick(i);
        }
        return;
      }
      if (e.key === "Enter") {
        // Buttons and links already handle Enter themselves.
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onBack();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
