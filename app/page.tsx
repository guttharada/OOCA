import { AppShell } from "@/components/AppShell";
import { EntryScreen } from "@/components/EntryScreen";

export default function HomePage() {
  return (
    <AppShell footer="ไม่ใช่การวินิจฉัย · ไม่เก็บข้อมูลใดๆ ของคุณ">
      <EntryScreen />
    </AppShell>
  );
}
