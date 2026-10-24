import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ถึงเวลาคุยกับใครสักคนหรือยัง? | ooca",
  description: "ตอบ 5 ข้อ ใช้เวลาประมาณ 2 นาที ไม่ต้องสมัคร ไม่เก็บข้อมูล",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00C4B3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
