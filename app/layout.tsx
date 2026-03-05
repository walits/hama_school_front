import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://schoolwar.kr'),
  title: {
    default: "대한민국 학교 전쟁 | 전국 초중고 학교 랭킹",
    template: "%s | 대한민국 학교 전쟁"
  },
  description: "전국 초등학교, 중학교, 고등학교가 참여하는 학습 전쟁! 하루 최대 100문제, 10초의 타임어택으로 우리 학교를 1등으로 만들어보세요. 실시간 학교 순위, 학생 랭킹, 지역별 순위를 확인하세요!",
  keywords: ["대한민국 학교 전쟁", "학교 전쟁", "초등학교 순위", "중학교 순위", "고등학교 순위", "학교 랭킹", "학습게임", "퀴즈", "하마스쿨", "전국 순위", "학교 대항전", "학생 순위", "교육 게임", "학습 앱"],
  authors: [{ name: "하마스쿨" }],
  creator: "하마스쿨",
  publisher: "하마스쿨",
  openGraph: {
    title: "대한민국 학교 전쟁 | 전국 초중고 학교 랭킹",
    description: "전국 학교가 참여하는 학습 전쟁! 우리 학교를 1등으로 만들어보세요. 실시간 순위 확인!",
    url: "https://schoolwar.kr",
    siteName: "대한민국 학교 전쟁",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '대한민국 학교 전쟁',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "대한민국 학교 전쟁",
    description: "전국 학교가 참여하는 학습 전쟁! 우리 학교를 1등으로!",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://schoolwar.kr',
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console에서 받은 코드로 교체
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2024783465189046"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
