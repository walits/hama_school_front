import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "중학교 전쟁 | 대한민국 학교 퀴즈 전쟁",
  description: "전국 중학교 순위와 학생 랭킹을 실시간으로 확인하세요!",
  icons: {
    icon: '/mid.png',
    apple: '/mid.png',
  },
};

export default function MiddleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
