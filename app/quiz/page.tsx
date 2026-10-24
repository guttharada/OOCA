import type { Metadata } from "next";
import { QuizFlow } from "@/components/QuizFlow";

export const metadata: Metadata = {
  title: "ตอบ 5 ข้อ | ถึงเวลาคุยกับใครสักคนหรือยัง?",
};

export default function QuizPage() {
  return <QuizFlow />;
}
