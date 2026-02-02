import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🦛</div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  하마스쿨
                </div>
                <div className="text-xs text-purple-600 font-semibold -mt-1">초등학교 전쟁</div>
              </div>
            </div>
            <Link
              href="/admin/login"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
            >
              관리자 로그인
            </Link>
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
                전국 초등학교가 참여하는 학습 전쟁!
              </div>

              <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  우리 학교가
                </span>
                <br />
                <span className="text-gray-900">1등이다!</span>
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                하루 30문제, 3초의 타임어택!<br />
                문제를 풀면 우리 학교 점수가 올라가요 🚀
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

              <div className="mt-12 flex items-center justify-center gap-4">
                <button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  📱 앱 다운로드
                </button>
                <Link
                  href="#how-it-works"
                  className="rounded-full border-2 border-purple-600 px-8 py-4 text-lg font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  게임 방식 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">어떻게 놀까요?</h2>
              <p className="mt-4 text-lg text-gray-600">간단하지만 중독성 있는 게임 방식!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-8 border-2 border-purple-100">
                  <div className="text-6xl mb-4">1️⃣</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">학교 선택</h3>
                  <p className="text-gray-600">
                    우리 학교를 선택하고<br />
                    전쟁에 참여하세요!
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-8 border-2 border-pink-100">
                  <div className="text-6xl mb-4">2️⃣</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">문제 풀기</h3>
                  <p className="text-gray-600">
                    하루 30문제!<br />
                    3-5초 안에 정답을 맞춰요 ⚡
                  </p>
                  <div className="mt-4 flex gap-2 text-sm">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">한자</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-semibold">영어</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold">수학</span>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-8 border-2 border-indigo-100">
                  <div className="text-6xl mb-4">3️⃣</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">학교 랭킹 상승</h3>
                  <p className="text-gray-600">
                    내 점수가 학교 점수!<br />
                    전국 1등 학교를 향해 🏆
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tier System */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">학교 티어 시스템</h2>
              <p className="mt-4 text-lg text-gray-600">점수를 모아 상위 티어로 올라가세요!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-amber-200 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Bronze</h3>
                <p className="text-3xl font-bold text-amber-700 mb-1">0+</p>
                <p className="text-sm text-gray-600">시작 단계</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-300 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Silver</h3>
                <p className="text-3xl font-bold text-gray-600 mb-1">100+</p>
                <p className="text-sm text-gray-600">초급 학교</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-300 hover:scale-105 transition-transform ring-4 ring-yellow-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-4xl shadow-xl mb-4 animate-pulse">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">Gold</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">500+</p>
                <p className="text-sm text-gray-600">중급 학교</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-200 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Platinum</h3>
                <p className="text-3xl font-bold text-gray-600 mb-1">1000+</p>
                <p className="text-sm text-gray-600">고급 학교</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-cyan-300 hover:scale-105 transition-transform">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 flex items-center justify-center text-4xl shadow-xl mb-4">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2">Diamond</h3>
                <p className="text-3xl font-bold text-cyan-600 mb-1">2000+</p>
                <p className="text-sm text-gray-600">최강 학교</p>
              </div>
            </div>
          </div>
        </section>

        {/* School Rankings Preview */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">전국 학교 랭킹</h2>
              <p className="mt-4 text-lg text-gray-600">우리 학교는 몇 등일까요?</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 mb-4 border-2 border-yellow-300 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🥇</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">서울초등학교</div>
                      <div className="text-sm text-gray-600">서울특별시</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-600">2,847점</div>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 flex items-center justify-center text-lg">
                        🛡️
                      </div>
                      <span className="text-sm font-semibold text-cyan-700">Diamond</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-3 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🥈</div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">부산초등학교</div>
                      <div className="text-sm text-gray-600">부산광역시</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">2,156점</div>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600 flex items-center justify-center text-sm">
                        🛡️
                      </div>
                      <span className="text-xs font-semibold text-cyan-700">Diamond</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 mb-3 border border-orange-200 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">🥉</div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">대구초등학교</div>
                      <div className="text-sm text-gray-600">대구광역시</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">1,834점</div>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-sm">
                        🛡️
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Platinum</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  전체 랭킹 보기 →
                </button>
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
              <div className="flex items-center justify-center gap-4">
                <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-purple-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  📱 Android 다운로드
                </button>
                <button className="rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-colors">
                  더 알아보기
                </button>
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
              <div className="text-2xl">🦛</div>
              <div>
                <div className="text-xl font-bold text-gray-900">하마스쿨</div>
                <div className="text-xs text-gray-500">초등학교 전쟁</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 하마스쿨. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
