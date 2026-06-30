'use client'

import { useState, useEffect } from 'react'

const API_BASE = 'https://api.schoolwar.kr'

interface SchoolRankEntry {
  rank: number
  id: number
  name: string
  region1: string
  region2: string
  gameTotalScore: number
}

interface PlayerRankEntry {
  rank: number
  id: number
  username: string
  totalGameScore: number
  school?: {
    id: number
    name: string
    region1: string
  }
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function GamePage() {
  const [schools, setSchools] = useState<SchoolRankEntry[]>([])
  const [players, setPlayers] = useState<PlayerRankEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/game-progress/school-ranking?limit=50`).then(r => r.json()).catch(() => ({ data: [] })),
      fetch(`${API_BASE}/game-progress/player-ranking?limit=50`).then(r => r.json()).catch(() => ({ data: [] })),
    ]).then(([schoolRes, playerRes]) => {
      setSchools(schoolRes.data ?? [])
      setPlayers(playerRes.data ?? [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-orange-50">
      {/* 네비 */}
      <nav className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <a href="/" className="text-orange-600 hover:text-orange-800 text-sm font-semibold transition-colors">
            ← 홈으로
          </a>
          <a
            href="https://game.schoolwar.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
          >
            🕹️ 게임 플레이 →
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* 타이틀 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            실시간 업데이트
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">🎮 대한민국 게임전쟁 순위</h1>
          <p className="text-lg text-gray-500">전국 초등학교 게임 점수 실시간 순위</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mr-3"></div>
            <span className="text-orange-400 text-lg">불러오는 중...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 학교 순위 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">🏫 학교 순위</h2>
                <p className="text-orange-100 text-sm mt-0.5">TOP 50</p>
              </div>
              {schools.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">🏫</div>
                  <p className="text-gray-400 font-semibold">아직 게임 기록이 없습니다</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                  {schools.map(school => (
                    <div
                      key={school.id}
                      className={`flex items-center px-5 py-4 ${
                        school.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400' : 'hover:bg-orange-50'
                      } transition-colors`}
                    >
                      <span className="w-10 text-center font-bold text-base mr-3 flex-shrink-0">
                        {MEDAL[school.rank] ?? <span className="text-gray-400 text-sm">{school.rank}위</span>}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 truncate">{school.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{school.region1} {school.region2}</div>
                      </div>
                      <div className="text-orange-600 font-bold text-sm flex-shrink-0">
                        {school.gameTotalScore.toLocaleString()}점
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 플레이어 순위 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">👾 플레이어 순위</h2>
                <p className="text-amber-100 text-sm mt-0.5">TOP 50</p>
              </div>
              {players.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">👾</div>
                  <p className="text-gray-400 font-semibold">아직 플레이어 기록이 없습니다</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                  {players.map(player => (
                    <div
                      key={player.id}
                      className={`flex items-center px-5 py-4 ${
                        player.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400' : 'hover:bg-orange-50'
                      } transition-colors`}
                    >
                      <span className="w-10 text-center font-bold text-base mr-3 flex-shrink-0">
                        {MEDAL[player.rank] ?? <span className="text-gray-400 text-sm">{player.rank}위</span>}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 truncate">{player.username}</div>
                        {player.school && (
                          <div className="text-xs text-gray-400 mt-0.5 truncate">{player.school.name} · {player.school.region1}</div>
                        )}
                      </div>
                      <div className="text-orange-600 font-bold text-sm flex-shrink-0">
                        {player.totalGameScore.toLocaleString()}점
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
