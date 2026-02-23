import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "대한민국 학교 전쟁 | 하마스쿨",
  description: "전국 초등학교, 중학교, 고등학교가 참여하는 학습 전쟁! 하루 최대 100문제, 10초의 타임어택으로 우리 학교를 1등으로 만들어보세요.",
  keywords: ["학교 전쟁", "초등학교", "중학교", "고등학교", "학습게임", "퀴즈", "하마스쿨", "학교 랭킹", "전국 순위"],
  openGraph: {
    title: "대한민국 학교 전쟁 | 하마스쿨",
    description: "전국 학교가 참여하는 학습 전쟁! 우리 학교를 1등으로!",
    url: "https://schoolwar.kr",
    siteName: "하마스쿨",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
