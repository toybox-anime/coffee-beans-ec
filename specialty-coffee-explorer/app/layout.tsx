// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 👈 追加したヘッダー

// フォントの設定（デフォルトのまま）
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Specialty Coffee Explorer",
  description: "最高のコーヒー豆を見つけよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* 🚨 Headerは必ず body タグの内側に入れます！ */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50`}
      >
        <Header /> {/* ✅ bodyの中の、一番上に配置 */}
        {children} {/* ✅ その下に各ページ(page.tsx)の中身が入る */}
      </body>
    </html>
  );
}