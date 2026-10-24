export type QuestionId = "mood" | "duration" | "impact" | "selfcare" | "support";

export type IconName =
  | "moon"
  | "utensils"
  | "briefcase"
  | "people"
  | "smile"
  | "clock"
  | "refresh"
  | "heart"
  | "chat";

export interface Option {
  id: string;
  label: string;
  icon?: IconName;
}

export interface Question {
  id: QuestionId;
  title: string;
  /** Multi-select (checkboxes) instead of single-select (radios). */
  multi?: boolean;
  /** In a multi-select, picking this option clears the others (and vice versa). */
  exclusiveId?: string;
  options: Option[];
  /** mooca's small reaction once the user has picked something. */
  react: (selected: string[]) => string;
}

export type Answers = Partial<Record<QuestionId, string[]>>;

export type ResultLevel = 1 | 2 | 3;

export type MoocaPose = "happy" | "chat" | "wai" | "hug" | "sad";
