'use client';

import RankingSection from "@/components/RankingSection";
import ActiveUsersNav from "@/components/ActiveUsersNav";
import Script from 'next/script';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "대한민국 학교 퀴즈 전쟁",
    "alternateName": ["대한민국 학교 퀴즈전쟁", "학교 퀴즈 전쟁", "학교 퀴즈전쟁"],
    "description": "전국 초등학교, 중학교, 고등학교가 참여하는 학습 퀴즈 전쟁! 하루 최대 100문제, 10초의 타임어택으로 우리 학교를 1등으로 만들어보세요.",
    "url": "https://schoolwar.kr",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1000"
    },
    "inLanguage": "ko-KR"
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                대한민국 학교 퀴즈 전쟁
              </div>
            </div>
            <div className="flex items-center gap-6">
              <ActiveUsersNav />
              <div className="flex items-center gap-4">
                <a href="/elementary" className="hover:opacity-80 transition-opacity cursor-pointer">
                  <img src="/elementary.png" alt="초등학교" className="h-12 w-12 object-contain" />
                </a>
                <a href="/middle" className="hover:opacity-80 transition-opacity cursor-pointer">
                  <img src="/mid.png" alt="중학교" className="h-12 w-12 object-contain" />
                </a>
                <a href="/high" className="hover:opacity-80 transition-opacity cursor-pointer">
                  <img src="/high.png" alt="고등학교" className="h-12 w-12 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                전국 학교가 참여하는 학습 전쟁!
              </div>

              <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  우리 학교가{' '}
                </span>
                <span className="text-gray-900">1등이다!</span>
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                하루 최대 100문제, 10초의 타임어택!!<br />
                문제를 풀면 우리 학교 점수가 올라가요{' '}
                <a href="/monitoring" className="inline-block hover:scale-125 transition-transform cursor-pointer" title="시스템 모니터링">
                  🚀
                </a>
              </p>

              {/* Tier Badges Preview */}
              <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Bronze</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Silver</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform animate-pulse">
                    🛡️
                  </div>
                  <span className="text-sm font-bold text-yellow-600">Gold</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Platinum</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <span className="text-sm font-semibold text-cyan-600">Diamond</span>
                </div>
              </div>

              <div id="ranking-board" className="mt-12 flex flex-col items-center justify-center gap-4 w-full max-w-2xl mx-auto">
                {/* 상세 순위 보드 박스 */}
                <div className="w-full bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-sm font-bold text-purple-700 mb-4">
                    상세 순위 보드
                  </div>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                      href="/elementary"
                      className="rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer inline-block"
                    >
                      🏫 초등학교 전쟁
                    </a>
                    <a
                      href="/middle"
                      className="rounded-full bg-gradient-to-r from-blue-500 to-sky-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer inline-block"
                    >
                      🏫 중학교 전쟁
                    </a>
                    <a
                      href="/high"
                      className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer inline-block"
                    >
                      🏫 고등학교 전쟁
                    </a>
                  </div>
                </div>

                {/* 앱 다운로드 박스 */}
                <div className="w-full bg-gray-900 border-2 border-gray-700 rounded-2xl p-6 shadow-lg">
                  <div className="text-sm font-bold text-gray-300 mb-4">
                    Android 앱 다운로드
                  </div>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href="https://play.google.com/store/apps/details?id=io.hama.hama_school_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white hover:bg-white/20 hover:scale-105 transition-all"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400 leading-none">Google Play</div>
                        <div className="text-sm font-bold leading-tight text-orange-400">초등학교 전쟁</div>
                      </div>
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=io.hama.hama_mid_school_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white hover:bg-white/20 hover:scale-105 transition-all"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400 leading-none">Google Play</div>
                        <div className="text-sm font-bold leading-tight text-blue-400">중학교 전쟁</div>
                      </div>
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=io.hama.hama_high_school_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white hover:bg-white/20 hover:scale-105 transition-all"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400 leading-none">Google Play</div>
                        <div className="text-sm font-bold leading-tight text-green-400">고등학교 전쟁</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Rankings Section */}
        <RankingSection />

        {/* Game Mechanics Section */}
        <section className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">⚔️ 게임 방식</h3>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg">📚 전과목 또는 영어만 선택해서 문제를 풀 수 있어요</p>
                <p className="text-lg">🎯 난이도 별로 <span className="font-bold text-purple-600">1, 2, 3점</span>을 획득하고 연속콤보에 따라 추가 점수!</p>
                <p className="text-lg">✅ 문제를 풀면 <span className="font-bold text-green-600">우리 학교 점수 획득!</span></p>
                <p className="text-lg">⚔️ 상대 학교를 선택하면 <span className="font-bold text-red-600">그 학교 점수 -10% 차감!</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Tier System */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">학교 티어 시스템</h2>
              <p className="mt-4 text-lg text-gray-600">학교 전체 학생들의 누적 점수로 티어가 결정됩니다!</p>
              <p className="mt-2 text-sm text-gray-500">💡 티어가 높을수록 더 많은 배지와 보상을 획득할 수 있어요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-amber-200 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🥉
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Bronze</h3>
                <p className="text-3xl font-bold text-amber-700 mb-1">0+</p>
                <p className="text-sm text-gray-600 mb-3">시작 단계</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 기본 배지 획득 가능</p>
                  <p>✓ 전국 랭킹 참여</p>
                  <p className="text-amber-700 font-semibold">모든 학교의 시작!</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🥈
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Silver</h3>
                <p className="text-3xl font-bold text-gray-600 mb-1">100,000+</p>
                <p className="text-sm text-gray-600 mb-3">활동적인 학교</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 은빛 배지 잠금 해제</p>
                  <p>✓ 지역 랭킹 강화</p>
                  <p className="text-gray-700 font-semibold">학생들이 열심히!</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-300 hover:scale-105 transition-transform ring-4 ring-yellow-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                  🥇
                </div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Gold</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">500,000+</p>
                <p className="text-sm text-gray-600 mb-3">경쟁력 있는 학교</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 금빛 배지 획득</p>
                  <p>✓ 전국 TOP 50 진입</p>
                  <p className="text-yellow-700 font-semibold">명문의 시작!</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-purple-200 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-300 to-purple-600 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🔷
                </div>
                <h3 className="text-xl font-bold text-purple-700 mb-2">Platinum</h3>
                <p className="text-3xl font-bold text-purple-600 mb-1">2,000,000+</p>
                <p className="text-sm text-gray-600 mb-3">상위권 학교</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 백금 배지 특전</p>
                  <p>✓ 전국 TOP 20 진입</p>
                  <p className="text-purple-700 font-semibold">최상위권 도전!</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-cyan-300 hover:scale-105 transition-transform ring-4 ring-cyan-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                  💎
                </div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2">Diamond</h3>
                <p className="text-3xl font-bold text-cyan-600 mb-1">5,000,000+</p>
                <p className="text-sm text-gray-600 mb-3">최강 학교</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 다이아몬드 배지</p>
                  <p>✓ 전국 TOP 10 진입</p>
                  <p className="text-cyan-700 font-semibold">전설의 학교!</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-400 hover:scale-105 transition-transform ring-4 ring-yellow-300">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                  👑
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">Master</h3>
                <p className="text-3xl font-bold text-orange-600 mb-1">10,000,000+</p>
                <p className="text-sm text-gray-600 mb-3">마스터 학교</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✓ 마스터 왕관 배지</p>
                  <p>✓ 전국 TOP 3 진입</p>
                  <p className="text-orange-700 font-semibold">진정한 1등!</p>
                </div>
              </div>
            </div>

            {/* 학생수 보너스 시스템 */}
            <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎁 학생수 보너스 시스템</h4>
              <p className="text-center text-gray-700 mb-6">학생수가 적은 학교일수록 추가 점수를 받아요!</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-white p-5 rounded-xl shadow-md">
                  <div className="text-center mb-3">
                    <span className="text-3xl">🏫</span>
                    <p className="font-bold text-green-900 mt-2">소규모 학교</p>
                  </div>
                  <p className="text-green-700 font-bold text-center mt-2">⭐ 높은 보너스!</p>
                  <p className="text-xs text-gray-500 text-center mt-2">작은 학교도 경쟁력 있게!</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                  <div className="text-center mb-3">
                    <span className="text-3xl">🏢</span>
                    <p className="font-bold text-blue-900 mt-2">중규모 학교</p>
                  </div>
                  <p className="text-blue-700 font-bold text-center mt-2">⭐ 적정 보너스</p>
                  <p className="text-xs text-gray-500 text-center mt-2">균형잡힌 경쟁</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md">
                  <div className="text-center mb-3">
                    <span className="text-3xl">🏛️</span>
                    <p className="font-bold text-purple-900 mt-2">대규모 학교</p>
                  </div>
                  <p className="text-purple-700 font-bold text-center mt-2">⭐ 기본 점수</p>
                  <p className="text-xs text-gray-500 text-center mt-2">참여자가 많으면 유리!</p>
                </div>
              </div>

              <div className="mt-6 bg-white p-5 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                  💡 <span className="font-semibold">공정한 경쟁을 위해</span> 학생수에 따라 자동으로 보너스 점수가 추가됩니다.
                  <br />학생이 적어도 열심히 하면 상위권 진입이 가능해요!
                </p>
              </div>
            </div>

            {/* 학생 티어 시스템 */}
            <div className="mt-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">학생 티어 시스템</h2>
                <p className="mt-4 text-lg text-gray-600">개인 점수로 동물 티어가 결정됩니다!</p>
                <p className="mt-2 text-sm text-gray-500">💡 더 높은 티어로 성장하면 특별한 칭호를 얻어요</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-200 hover:scale-105 transition-transform">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center text-4xl shadow-xl mb-4">
                    🐣
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-2">병아리</h3>
                  <p className="text-3xl font-bold text-yellow-700 mb-1">0+</p>
                  <p className="text-sm text-gray-600">처음 시작!</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-pink-200 hover:scale-105 transition-transform">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center text-4xl shadow-xl mb-4">
                    🐰
                  </div>
                  <h3 className="text-xl font-bold text-pink-900 mb-2">토끼</h3>
                  <p className="text-3xl font-bold text-pink-700 mb-1">2,500+</p>
                  <p className="text-sm text-gray-600">귀여운 토끼</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-orange-200 hover:scale-105 transition-transform">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-orange-400 flex items-center justify-center text-4xl shadow-xl mb-4">
                    🦊
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">여우</h3>
                  <p className="text-3xl font-bold text-orange-700 mb-1">10,000+</p>
                  <p className="text-sm text-gray-600">영리한 여우</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300 hover:scale-105 transition-transform">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center text-4xl shadow-xl mb-4">
                    🐺
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">늑대</h3>
                  <p className="text-3xl font-bold text-gray-700 mb-1">50,000+</p>
                  <p className="text-sm text-gray-600">강한 늑대</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-300 hover:scale-105 transition-transform ring-4 ring-yellow-200">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                    🦁
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900 mb-2">사자</h3>
                  <p className="text-3xl font-bold text-yellow-700 mb-1">150,000+</p>
                  <p className="text-sm text-gray-600">백수의 왕</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-red-300 hover:scale-105 transition-transform ring-4 ring-red-200">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-400 to-red-700 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                    🐉
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">용</h3>
                  <p className="text-3xl font-bold text-red-700 mb-1">500,000+</p>
                  <p className="text-sm text-gray-600">최강 전설</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-6">지금 바로 시작하세요!</h2>
              <p className="text-xl mb-8 text-purple-100">
                우리 학교를 전국 1등으로 만들어봐요 🏆
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=io.hama.hama_school_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 leading-none">Google Play</div>
                    <div className="text-base font-bold leading-tight text-orange-600">🏫 초등학교 전쟁</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=io.hama.hama_mid_school_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 leading-none">Google Play</div>
                    <div className="text-base font-bold leading-tight text-blue-600">🏫 중학교 전쟁</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=io.hama.hama_high_school_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.97.07l11.4-6.58-2.45-2.45-9.92 8.96zm-1.46-19.3C1.27 4.86 1 5.35 1 6v12c0 .65.27 1.14.72 1.54l.08.07 6.72-6.72v-.16L1.72 4.46zm16.9 8.32-2.28-1.32-2.72 2.72 2.72 2.72 2.3-1.33c.66-.38.66-1.41-.02-1.79zM4.15.49l11.4 6.6-2.45 2.45L3.18.58C3.5.46 3.85.49 4.15.67z"/></svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 leading-none">Google Play</div>
                    <div className="text-base font-bold leading-tight text-green-600">🏫 고등학교 전쟁</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xl font-bold text-gray-900">하마스쿨</div>
                <div className="text-xs text-gray-500">학교 전쟁</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 하마스쿨. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
