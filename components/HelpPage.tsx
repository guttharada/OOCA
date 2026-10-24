"use client";

import { useRouter } from "next/navigation";
import { AppShell, BackButton } from "./AppShell";
import { CrisisScreen } from "./CrisisScreen";
import { DISCLAIMER } from "@/lib/resultContent";

/** Stand-alone /help route (shareable, also works when opened directly). */
export function HelpPage() {
  const router = useRouter();
  const back = () => (window.history.length > 1 ? router.back() : router.push("/"));
  return (
    <AppShell calm right={<BackButton onClick={back} />} footer={DISCLAIMER}>
      <CrisisScreen />
    </AppShell>
  );
}
