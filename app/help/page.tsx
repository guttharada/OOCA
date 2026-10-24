import type { Metadata } from "next";
import { HelpPage } from "@/components/HelpPage";

export const metadata: Metadata = {
  title: "ต้องการความช่วยเหลือตอนนี้ | ooca",
};

export default function Page() {
  return <HelpPage />;
}
