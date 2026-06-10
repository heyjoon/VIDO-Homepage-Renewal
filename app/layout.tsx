import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIDO | Media Art Platform",
  description:
    "Upload, manage, exhibit, and submit media artworks through VIDO.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
