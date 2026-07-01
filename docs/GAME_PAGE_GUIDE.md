# 🎮 게임전쟁 페이지 구현 가이드 (`/game`)

## 개요

`https://schoolwar.kr/game` 페이지를 새로 만들어야 합니다.  
기존 퀴즈 전쟁 순위와 **완전히 별도**인 **게임 전쟁 순위** 페이지입니다.

---

## 무엇을 만드나

- **URL**: `https://schoolwar.kr/game`
- **파일 위치**: `app/game/page.tsx` (Next.js App Router 기준)
- **목적**: 학교별 게임 점수(`gameTotalScore`) 순위를 보여줌
- **색상 테마**: 주황색 (orange) — 기존 `/elementary` 페이지와 동일 계열

---

## 기존 퀴즈 순위와의 차이점

| 항목 | 퀴즈 순위 (`/elementary` 등) | 게임 순위 (`/game`) |
|------|-------------------------------|----------------------|
| 점수 컬럼 | `totalScore` | `gameTotalScore` |
| 학생 테이블 | `users` | `game_players` |
| 학교 학급 구분 | 초/중/고 분리 | 분리 없음 (초등 전용) |
| 학생 티어 | 있음 (level 기반) | 없음 (점수만) |
| 인증 필요 | 없음 (조회) | 없음 (조회) |

---

## API 명세

### Base URL
```
https://api.schoolwar.kr
```

---

### 1. 학교 게임 순위 조회

```
GET /game-progress/school-ranking?limit=N
```

**인증 불필요** (공개 API)

**Query Parameter**
| 이름 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| limit | number | 10 | 조회할 학교 수 (최대 권장: 100) |

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
      "gameTotalScore": 18450
    },
    {
      "rank": 2,
      "id": 87,
      "name": "부산초등학교",
      "region1": "부산",
      "region2": "해운대구",
      "gameTotalScore": 15200
    }
  ]
}
```

**주의**: `gameTotalScore`가 0인 학교는 응답에 포함되지 않습니다. 게임 플레이한 학교만 나옵니다.

---

### 2. 전체 플레이어 순위 조회 (전국)

```
GET /game-progress/player-ranking?limit=N
```

**인증 불필요** (공개 API)

**Query Parameter**
| 이름 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| limit | number | 50 | 조회할 플레이어 수 |

**응답 예시**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "id": 5,
      "username": "홍길동",
      "totalGameScore": 3200,
      "school": {
        "id": 42,
        "name": "서울초등학교",
        "region1": "서울"
      }
    },
    {
      "rank": 2,
      "id": 12,
      "username": "김철수",
      "totalGameScore": 2800,
      "school": {
        "id": 87,
        "name": "부산초등학교",
        "region1": "부산"
      }
    }
  ]
}
```

**주의**: `totalGameScore`가 0인 플레이어는 응답에 포함되지 않습니다.

---

### 3. 특정 학교 플레이어 순위 조회

```
GET /game-progress/school-ranking/:schoolId/players?limit=N
```

**인증 불필요** (공개 API)

**Path Parameter**
| 이름 | 타입 | 설명 |
|------|------|------|
| schoolId | number | 학교 ID |

**Query Parameter**
| 이름 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| limit | number | 20 | 조회할 플레이어 수 |

**응답 예시**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "id": 5,
      "username": "홍길동",
      "totalGameScore": 3200
    },
    {
      "rank": 2,
      "id": 12,
      "username": "김철수",
      "totalGameScore": 2100
    }
  ]
}
```

---

## 페이지 구성 (권장 레이아웃)

```
┌─────────────────────────────────────────────────────────┐
│  🎮 대한민국 게임전쟁        [게임 플레이하러 가기 →]      │
│  전국 초등학교 게임 점수 실시간 순위                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🏆 학교 순위                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  1위  서울초등학교   서울 강남구   18,450점       │   │
│  │  2위  부산초등학교   부산 해운대구  15,200점  [▼] │   │
│  │       └── 플레이어 순위 (클릭시 펼침)              │   │
│  │           1위  홍길동   3,200점                   │   │
│  │           2위  김철수   2,100점                   │   │
│  │  3위  ...                                         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

학교 행을 클릭하면 해당 학교 플레이어 순위가 펼쳐지는 **아코디언** 방식을 권장합니다.

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
  gameTotalScore: number
}

interface PlayerRankEntry {
  rank: number
  id: number
  username: string
  totalGameScore: number
}

export default function GamePage() {
  const [schools, setSchools] = useState<SchoolRankEntry[]>([])
  const [expandedSchoolId, setExpandedSchoolId] = useState<number | null>(null)
  const [players, setPlayers] = useState<Record<number, PlayerRankEntry[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/game-progress/school-ranking?limit=50`)
      .then(r => r.json())
      .then(res => {
        setSchools(res.data ?? [])
        setLoading(false)
      })
  }, [])

  const handleExpand = async (schoolId: number) => {
    if (expandedSchoolId === schoolId) {
      setExpandedSchoolId(null)
      return
    }
    setExpandedSchoolId(schoolId)
    if (!players[schoolId]) {
      const res = await fetch(`${API_BASE}/game-progress/school-ranking/${schoolId}/players?limit=20`)
      const json = await res.json()
      setPlayers(prev => ({ ...prev, [schoolId]: json.data ?? [] }))
    }
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">🎮 대한민국 게임전쟁</h1>
            <p className="text-sm text-orange-500 mt-1">전국 초등학교 게임 점수 실시간 순위</p>
          </div>
          <a
            href="https://game.schoolwar.kr"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            게임 플레이 →
          </a>
        </div>

        {/* 학교 순위 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-orange-500 text-white px-4 py-3 font-bold text-sm">
            🏆 학교 순위 TOP 50
          </div>
          {loading ? (
            <div className="text-center py-12 text-orange-400">불러오는 중...</div>
          ) : schools.length === 0 ? (
            <div className="text-center py-12 text-gray-400">아직 게임 기록이 없습니다</div>
          ) : (
            <ul>
              {schools.map(school => (
                <li key={school.id} className="border-b border-orange-50 last:border-b-0">
                  <button
                    className="w-full flex items-center px-4 py-3 hover:bg-orange-50 transition-colors text-left"
                    onClick={() => handleExpand(school.id)}
                  >
                    <span className={`w-8 text-center font-bold text-sm mr-3 ${
                      school.rank === 1 ? 'text-yellow-500' :
                      school.rank === 2 ? 'text-gray-400' :
                      school.rank === 3 ? 'text-amber-600' : 'text-gray-500'
                    }`}>
                      {school.rank === 1 ? '🥇' : school.rank === 2 ? '🥈' : school.rank === 3 ? '🥉' : school.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">{school.name}</div>
                      <div className="text-xs text-gray-400">{school.region1} {school.region2}</div>
                    </div>
                    <div className="text-orange-600 font-bold text-sm mr-2">
                      {school.gameTotalScore.toLocaleString()}점
                    </div>
                    <span className="text-gray-300 text-xs">
                      {expandedSchoolId === school.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* 플레이어 서브 목록 */}
                  {expandedSchoolId === school.id && (
                    <ul className="bg-orange-50 px-4 py-2">
                      {(players[school.id] ?? []).length === 0 ? (
                        <li className="text-center py-3 text-gray-400 text-sm">플레이어 없음</li>
                      ) : (
                        (players[school.id] ?? []).map(player => (
                          <li key={player.id} className="flex items-center py-1.5 text-sm">
                            <span className="w-6 text-center text-gray-400 mr-3">{player.rank}</span>
                            <span className="flex-1 text-gray-700">{player.username}</span>
                            <span className="text-orange-500 font-semibold">
                              {player.totalGameScore.toLocaleString()}점
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
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
```

---

## 메인 페이지 네비게이션 추가

`app/page.tsx` 의 기존 내비게이션 링크(초등학교/중학교/고등학교) 옆에 게임전쟁 링크를 추가하세요.

```tsx
{/* 기존 nav 아이콘들 옆에 추가 */}
<Link href="/game" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-100 hover:bg-orange-200 transition-colors">
  <span className="text-3xl">🎮</span>
  <span className="text-sm font-semibold text-orange-700">게임전쟁</span>
</Link>
```

---

## 실제 게임 URL

게임 자체(Phaser 앱)는 별도 배포입니다:

| 환경 | URL |
|------|-----|
| 프로덕션 | `https://game.schoolwar.kr` |
| 로컬 개발 | `http://localhost:3900` |

`/game` 페이지의 "게임 플레이" 버튼은 위 URL로 새 탭 이동합니다.

---

## 주의사항

1. **점수 컬럼 혼동 금지**  
   - 퀴즈: `totalScore` / 게임: `gameTotalScore` — 완전히 별개입니다.
   - `/schools/ranking/national` (퀴즈 순위)와 `/game-progress/school-ranking` (게임 순위)를 혼동하지 마세요.

2. **인증 불필요**  
   - `/game-progress/school-ranking*` 엔드포인트는 Bearer 토큰 없이 호출 가능합니다.
   - 게임 로그인 기능은 이 페이지에 포함하지 않아도 됩니다 (게임 앱에서 처리).

3. **데이터 없을 때**  
   - 초기에는 게임 플레이 데이터가 없어 빈 목록이 반환됩니다. 빈 상태 UI("아직 게임 기록이 없습니다")를 꼭 넣어주세요.

4. **`gameTotalScore`는 항상 정수**  
   - 백엔드에서 `Math.floor()` 처리해서 반환하므로 소수점 처리 불필요.

---

## 체크리스트

- [ ] `app/game/page.tsx` 생성
- [ ] 학교 순위 목록 (`GET /game-progress/school-ranking`)
- [ ] 전체 플레이어 순위 탭 (`GET /game-progress/player-ranking`)
- [ ] 학교 클릭 시 해당 학교 플레이어 서브 순위 펼치기 (`GET /game-progress/school-ranking/:id/players`)
- [ ] "게임 플레이" 버튼 → `https://game.schoolwar.kr` (새 탭)
- [ ] 빈 상태 UI
- [ ] `app/page.tsx` 메인 네비게이션에 `/game` 링크 추가
- [ ] 모바일 대응 (기존 페이지 패턴 따르기)

---

## 관련 파일

- **백엔드 API 전체 가이드**: `docs/API_GUIDE.md`
- **게임 앱 프로젝트**: `hama_school_game/docs/OVERVIEW.md`
- **참고할 기존 페이지**: `app/elementary/page.tsx` (구조 패턴 동일하게)
