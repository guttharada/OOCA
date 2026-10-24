import Image from "next/image";
import { MOOCA_SIZE, moocaSrc } from "@/lib/config";
import type { MoocaPose } from "@/lib/types";
import styles from "./Mooca.module.css";

/**
 * The official mooca illustration. Decorative: every screen says the same thing
 * in text, so screen readers skip it (alt="").
 *
 * By default mooca pops in and then floats gently; pass animated={false} where the
 * screen supplies its own motion (e.g. the loading bob).
 */
export function Mooca({
  pose,
  width,
  className,
  priority,
  animated = true,
}: {
  pose: MoocaPose;
  width: number;
  className?: string;
  priority?: boolean;
  animated?: boolean;
}) {
  const s = MOOCA_SIZE[pose];
  return (
    <span className={`${styles.wrap} ${animated ? styles.animated : ""}`}>
      <Image
        src={moocaSrc(pose)}
        alt=""
        // Size the srcset to the rendered width (1x/2x), not the file's pixels.
        width={width}
        height={Math.round((width * s.height) / s.width)}
        // Flat cartoon art smears at the default lossy quality of 75.
        quality={95}
        style={{ width, height: "auto" }}
        className={className}
        priority={priority}
      />
    </span>
  );
}
