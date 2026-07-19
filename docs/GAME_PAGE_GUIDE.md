# 🎮 게임전쟁 페이지 구현 가이드 (`/game`)

## 개요

`https://schoolwar.kr/game` 페이지를 새로 만들어야 합니다.  
게임 점수와 퀴즈 점수는 **같은 `totalScore`에 누적**됩니다. 별도 게임 전용 점수 없음.

---

## 무엇을 만드나

- **URL**: `https://schoolwar.kr/game`
- **파일 위치**: `app/game/page.tsx` (Next.js App Router 기준)
- **목적**: 학교별/플레이어별 통합 점수 순위 표시 + 게임 앱 진입 링크
- **색상 테마**: 주황색 (orange) — 기존 `/elementary` 페이지와 동일 계열

---

## API 명세

기존 초등 랭킹 API를 그대로 사용합니다. **새로 만든 API 없음.**

### Base URL
```
https://api.schoolwar.kr
```

### 1. 전국 학교 순위

```
GET /schools/ranking/national?limit=N
```

**응답 예시**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "id": 42,
      "name": "서울초등학교",
      "region1": "서울",
      "region2": "강남구",
      "totalScore": 18450,
      "scoreMultiplier": 1.5
    }
  ]
}
```

---

### 2. 전국 플레이어 순위

```
GET /users/ranking/national?limit=N
```

**응답 예시**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "id": 5,
      "nickname": "홍길동",
      "totalScore": 3200,
      "level": 4,
      "school": {
        "id": 42,
        "name": "서울초등학교",
        "region1": "서울"
      }
    }
  ]
}
```

---

### 3. 특정 학교 플레이어 순위

```
GET /progress/school-ranking/:schoolId?limit=N
```

---

## 페이지 구성 (권장 레이아웃)

```
┌─────────────────────────────────────────────────────────┐
│  🎮 대한민국 게임전쟁        [게임 플레이하러 가기 →]      │
│  퀴즈 + 게임 통합 점수 순위                               │
├─────────────────────────────────────────────────────────┤
│  [학교 순위]  [플레이어 순위]  ← 탭                       │
├─────────────────────────────────────────────────────────┤
│  1위  서울초등학교   서울 강남구   18,450점          [▼]  │
│       └── 1위 홍길동 3,200점 / 2위 김철수 2,100점        │
│  2위  부산초등학교   ...                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 구현 코드 스케치

```tsx
// app/game/page.tsx
'use client'

import { useState, useEffect } from 'react'

const API_BASE = 'https://api.schoolwar.kr'

interface SchoolRankEntry {
  rank: number
  id: number
  name: string
  region1: string
  region2: string
  totalScore: number
}

interface PlayerRankEntry {
  rank: number
  id: number
  nickname: string
  totalScore: number
  level: number
  school: { id: number; name: string; region1: string }
}

type Tab = 'school' | 'player'

export default function GamePage() {
  const [tab, setTab] = useState<Tab>('school')
  const [schools, setSchools] = useState<SchoolRankEntry[]>([])
  const [players, setPlayers] = useState<PlayerRankEntry[]>([])
  const [expandedSchoolId, setExpandedSchoolId] = useState<number | null>(null)
  const [schoolPlayers, setSchoolPlayers] = useState<Record<number, any[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/schools/ranking/national?limit=50`).then(r => r.json()),
      fetch(`${API_BASE}/users/ranking/national?limit=50`).then(r => r.json()),
    ]).then(([schoolRes, playerRes]) => {
      setSchools(schoolRes.data ?? [])
      setPlayers(playerRes.data ?? [])
      setLoading(false)
    })
  }, [])

  const handleExpand = async (schoolId: number) => {
    if (expandedSchoolId === schoolId) { setExpandedSchoolId(null); return }
    setExpandedSchoolId(schoolId)
    if (!schoolPlayers[schoolId]) {
      const res = await fetch(`${API_BASE}/progress/school-ranking/${schoolId}?limit=10`)
      const json = await res.json()
      setSchoolPlayers(prev => ({ ...prev, [schoolId]: json.data ?? [] }))
    }
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">🎮 대한민국 게임전쟁</h1>
            <p className="text-sm text-orange-500 mt-1">퀴즈 + 게임 통합 점수 순위</p>
          </div>
          <a
            href="https://game.schoolwar.kr"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full"
            target="_blank" rel="noopener noreferrer"
          >
            게임 플레이 →
          </a>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-4">
          {(['school', 'player'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                tab === t ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-200'
              }`}>
              {t === 'school' ? '🏫 학교 순위' : '👤 플레이어 순위'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-orange-400">불러오는 중...</div>
          ) : tab === 'school' ? (
            <ul>
              {schools.map(school => (
                <li key={school.id} className="border-b border-orange-50 last:border-b-0">
                  <button
                    className="w-full flex items-center px-4 py-3 hover:bg-orange-50 text-left"
                    onClick={() => handleExpand(school.id)}
                  >
                    <span className="w-8 text-center font-bold text-sm mr-3 text-gray-500">
                      {school.rank <= 3 ? ['🥇','🥈','🥉'][school.rank - 1] : school.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">{school.name}</div>
                      <div className="text-xs text-gray-400">{school.region1} {school.region2}</div>
                    </div>
                    <div className="text-orange-600 font-bold text-sm mr-2">
                      {school.totalScore.toLocaleString()}점
                    </div>
                    <span className="text-gray-300 text-xs">{expandedSchoolId === school.id ? '▲' : '▼'}</span>
                  </button>
                  {expandedSchoolId === school.id && (
                    <ul className="bg-orange-50 px-4 py-2">
                      {(schoolPlayers[school.id] ?? []).map((p: any) => (
                        <li key={p.id} className="flex items-center py-1.5 text-sm">
                          <span className="w-6 text-center text-gray-400 mr-3">{p.rank}</span>
                          <span className="flex-1 text-gray-700">{p.nickname}</span>
                          <span className="text-orange-500 font-semibold">{p.totalScore.toLocaleString()}점</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {players.map(player => (
                <li key={player.id} className="flex items-center px-4 py-3 border-b border-orange-50 last:border-b-0">
                  <span className="w-8 text-center font-bold text-sm mr-3 text-gray-500">
                    {player.rank <= 3 ? ['🥇','🥈','🥉'][player.rank - 1] : player.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800">{player.nickname}
                      <span className="ml-1 text-xs text-orange-400">Lv.{player.level}</span>
                    </div>
                    <div className="text-xs text-gray-400">{player.school.name}</div>
                  </div>
                  <div className="text-orange-600 font-bold text-sm">{player.totalScore.toLocaleString()}점</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
```

---

## 메인 페이지 네비게이션 추가

`app/page.tsx`의 기존 nav 옆에 추가:

```tsx
<Link href="/game" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-100 hover:bg-orange-200 transition-colors">
  <span className="text-3xl">🎮</span>
  <span className="text-sm font-semibold text-orange-700">게임전쟁</span>
</Link>
```

---

## 실제 게임 URL

| 환경 | URL |
|------|-----|
| 프로덕션 | `https://game.schoolwar.kr` |
| 로컬 개발 | `http://localhost:3900` |

---

## 체크리스트

- [ ] `app/game/page.tsx` 생성
- [ ] 학교 순위 탭 (`GET /schools/ranking/national`)
- [ ] 플레이어 순위 탭 (`GET /users/ranking/national`)
- [ ] 학교 클릭 시 학교별 플레이어 펼치기 (`GET /progress/school-ranking/:schoolId`)
- [ ] "게임 플레이" 버튼 → `https://game.schoolwar.kr` (새 탭)
- [ ] `app/page.tsx` 메인 네비게이션에 `/game` 링크 추가
- [ ] 모바일 대응

---

## 관련 파일

- **백엔드 API 전체 가이드**: `docs/API_GUIDE.md`
- **게임 앱 프로젝트**: `hama_school_game/docs/OVERVIEW.md`
- **참고할 기존 페이지**: `app/elementary/page.tsx`
