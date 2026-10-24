import { Icon } from "./Icon";
import type { Option } from "@/lib/types";
import styles from "./OptionCard.module.css";

/**
 * A large selectable card. It is a real <input> inside a <label>, so it works
 * with Tab, Space, arrow keys (radios) and screen readers out of the box.
 */
export function OptionCard({
  option,
  name,
  index,
  multi,
  checked,
  onChange,
}: {
  option: Option;
  name: string;
  index: number;
  multi: boolean;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={`${styles.card} ${checked ? styles.checked : ""}`}>
      <input
        className="visually-hidden"
        type={multi ? "checkbox" : "radio"}
        name={name}
        value={option.id}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.key} aria-hidden="true">
        {index + 1}
      </span>
      {option.icon && <Icon name={option.icon} className={styles.icon} />}
      <span className={styles.label}>{option.label}</span>
      <span className={multi ? styles.box : styles.radio} aria-hidden="true">
        {multi && <Icon name="check" size={16} strokeWidth={3} />}
      </span>
    </label>
  );
}
