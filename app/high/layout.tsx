import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고등학교 전쟁 | 대한민국 학교 퀴즈 전쟁",
  description: "전국 고등학교 순위와 학생 랭킹을 실시간으로 확인하세요!",
  icons: {
    icon: '/high.png',
    apple: '/high.png',
  },
};

export default function HighLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
