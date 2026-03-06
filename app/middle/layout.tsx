import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '중학교 전쟁',
  description: '전국 중학교 순위를 확인하세요! 우리 학교를 1등으로 만드는 학습 전쟁. 실시간 학교 랭킹, 학생 순위, 지역별 순위를 한눈에 확인!',
  keywords: ['중학교', '중학교 순위', '중학교 랭킹', '학교 전쟁', '대한민국 학교 퀴즈 전쟁', '중학생 게임', '학습 게임', '퀴즈', '중학교 대항전'],
  openGraph: {
    title: '중학교 전쟁 | 대한민국 학교 퀴즈 전쟁',
    description: '전국 중학교 순위를 확인하세요! 우리 학교를 1등으로!',
    url: 'https://schoolwar.kr/middle',
  },
  alternates: {
    canonical: 'https://schoolwar.kr/middle',
  },
};

export default function MiddleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
