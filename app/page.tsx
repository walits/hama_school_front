import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">하마스쿨</div>
            <Link
              href="/admin/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              관리자 로그인
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            학교별 코딩 학습 플랫폼
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            학교별로 학생들의 학습 진도를 관리하고 문제 풀이 현황을 확인하세요
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              시작하기
            </Link>
            <Link
              href="/about"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              자세히 알아보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-4xl">📚</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                다양한 문제
              </h3>
              <p className="mt-2 text-gray-600">
                난이도별, 카테고리별로 분류된 코딩 문제를 풀어보세요
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-4xl">🏫</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                학교별 관리
              </h3>
              <p className="mt-2 text-gray-600">
                학교별로 학생들을 관리하고 진도를 확인할 수 있습니다
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-4xl">📊</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                통계 분석
              </h3>
              <p className="mt-2 text-gray-600">
                일일 문제 풀이 현황과 학교별 통계를 실시간으로 확인하세요
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2026 하마스쿨. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
