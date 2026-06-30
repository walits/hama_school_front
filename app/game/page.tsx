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
}

const RANK_MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function GamePage() {
  const [schools, setSchools] = useState<SchoolRankEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSchoolId, setExpandedSchoolId] = useState<number | null>(null)
  const [players, setPlayers] = useState<Record<number, PlayerRankEntry[]>>({})
  const [playerLoading, setPlayerLoading] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/game-progress/school-ranking?limit=50`)
      .then(r => r.json())
      .then(res => setSchools(res.data ?? []))
      .catch(() => setSchools([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleExpand(schoolId: number) {
    if (expandedSchoolId === schoolId) {
      setExpandedSchoolId(null)
      return
    }
    setExpandedSchoolId(schoolId)
    if (!players[schoolId]) {
      setPlayerLoading(schoolId)
      try {
        const res = await fetch(`${API_BASE}/game-progress/school-ranking/${schoolId}/players?limit=20`)
        const json = await res.json()
        setPlayers(prev => ({ ...prev, [schoolId]: json.data ?? [] }))
      } catch {
        setPlayers(prev => ({ ...prev, [schoolId]: [] }))
      } finally {
        setPlayerLoading(null)
      }
    }
  }

  return (
    <main className="min-h-screen bg-orange-50">
      {/* 헤더 네비 */}
      <nav className="bg-white border-b border-orange-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-700 mb-2">🎮 대한민국 게임전쟁</h1>
          <p className="text-orange-500">전국 초등학교 게임 점수 실시간 순위</p>
        </div>

        {/* 학교 순위 */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-4">
            <h2 className="font-bold text-lg">🏆 학교 순위 TOP 50</h2>
            <p className="text-orange-100 text-xs mt-0.5">학교 행을 클릭하면 플레이어 순위를 볼 수 있어요</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
              <span className="text-orange-400">불러오는 중...</span>
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎮</div>
              <p className="text-gray-400 font-semibold">아직 게임 기록이 없습니다</p>
              <p className="text-gray-300 text-sm mt-1">첫 번째 게임 전사가 되어보세요!</p>
            </div>
          ) : (
            <ul className="divide-y divide-orange-50">
              {schools.map(school => (
                <li key={school.id}>
                  <button
                    className="w-full flex items-center px-5 py-4 hover:bg-orange-50 transition-colors text-left"
                    onClick={() => handleExpand(school.id)}
                  >
                    <span className="w-10 text-center font-bold text-base mr-3 flex-shrink-0">
                      {RANK_MEDAL[school.rank] ?? (
                        <span className="text-gray-400 text-sm">{school.rank}위</span>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">{school.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{school.region1} {school.region2}</div>
                    </div>
                    <div className="text-orange-600 font-bold text-sm mr-3 flex-shrink-0">
                      {school.gameTotalScore.toLocaleString()}점
                    </div>
                    <span className="text-orange-300 text-xs flex-shrink-0">
                      {expandedSchoolId === school.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* 플레이어 서브 목록 */}
                  {expandedSchoolId === school.id && (
                    <div className="bg-orange-50 border-t border-orange-100 px-5 py-3">
                      {playerLoading === school.id ? (
                        <div className="flex items-center justify-center py-4">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-400 mr-2"></div>
                          <span className="text-orange-400 text-sm">불러오는 중...</span>
                        </div>
                      ) : (players[school.id] ?? []).length === 0 ? (
                        <p className="text-center py-3 text-gray-400 text-sm">플레이어 기록이 없습니다</p>
                      ) : (
                        <ul className="space-y-1">
                          {(players[school.id] ?? []).map(player => (
                            <li key={player.id} className="flex items-center py-1.5 text-sm">
                              <span className="w-8 text-center text-gray-400 mr-3 flex-shrink-0">
                                {RANK_MEDAL[player.rank] ?? `${player.rank}위`}
                              </span>
                              <span className="flex-1 text-gray-700 font-medium">{player.username}</span>
                              <span className="text-orange-500 font-bold">
                                {player.totalGameScore.toLocaleString()}점
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
