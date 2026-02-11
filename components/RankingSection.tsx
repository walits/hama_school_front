'use client';

import { useState, useEffect } from 'react';

interface TierInfo {
  current: string;
  currentKorean: string;
  color: string;
  icon: string;
  nextTier: string | null;
  nextTierKorean: string | null;
  progress: number;
  remainingScore: number;
}

interface School {
  id: number;
  name: string;
  region1: string;
  region2: string;
  totalScore: number;
  studentCount: number;
  tier?: TierInfo;
}

interface Student {
  id: number;
  nickname: string;
  totalScore: number;
  level: number;
  tier?: TierInfo;
  school?: {
    name: string;
    region1: string;
    region2: string;
  };
}

type SchoolLevel = 'elementary' | 'middle' | 'high';

const SCHOOL_LABELS = {
  elementary: '초등학교',
  middle: '중학교',
  high: '고등학교'
};

const SCHOOL_PATHS = {
  elementary: 'schools',
  middle: 'mid-schools',
  high: 'high-schools'
};

export default function RankingSection() {
  const [rankings, setRankings] = useState<{
    elementary: School[];
    middle: School[];
    high: School[];
  }>({
    elementary: [],
    middle: [],
    high: []
  });
  const [studentRankings, setStudentRankings] = useState<{
    elementary: Student[];
    middle: Student[];
    high: Student[];
  }>({
    elementary: [],
    middle: [],
    high: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
    fetchStudentRankings();
  }, []);

  async function fetchRankings() {
    try {
      // 초등학교, 중학교, 고등학교 각각 TOP 10 가져오기
      const [elementaryRes, middleRes, highRes] = await Promise.all([
        fetch('https://api.schoolwar.kr/schools/ranking/national?limit=10'),
        fetch('https://api.schoolwar.kr/mid-schools/ranking/national?limit=10'),
        fetch('https://api.schoolwar.kr/high-schools/ranking/national?limit=10')
      ]);

      const [elementaryData, middleData, highData] = await Promise.all([
        elementaryRes.json(),
        middleRes.json(),
        highRes.json()
      ]);

      setRankings({
        elementary: elementaryData.data || elementaryData || [],
        middle: middleData.data || middleData || [],
        high: highData.data || highData || []
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
      setLoading(false);
    }
  }

  async function fetchStudentRankings() {
    try {
      // 초등학생, 중학생, 고등학생 각각 TOP 10 가져오기
      const [elementaryRes, middleRes, highRes] = await Promise.all([
        fetch('https://api.schoolwar.kr/users/ranking/national?limit=10'),
        fetch('https://api.schoolwar.kr/mid-users/ranking/national?limit=10'),
        fetch('https://api.schoolwar.kr/high-users/ranking/national?limit=10')
      ]);

      // 각 응답을 안전하게 처리 (404 등의 에러 대응)
      const parseResponse = async (res: Response) => {
        if (!res.ok) {
          console.warn(`API returned ${res.status}: ${res.url}`);
          return [];
        }
        try {
          const data = await res.json();
          return data.data || data || [];
        } catch {
          return [];
        }
      };

      const [elementaryData, middleData, highData] = await Promise.all([
        parseResponse(elementaryRes),
        parseResponse(middleRes),
        parseResponse(highRes)
      ]);

      setStudentRankings({
        elementary: elementaryData,
        middle: middleData,
        high: highData
      });
    } catch (error) {
      console.error('Failed to fetch student rankings:', error);
      // 에러 발생 시 빈 배열 유지
      setStudentRankings({
        elementary: [],
        middle: [],
        high: []
      });
    }
  }

  // 폴백용 티어 계산 (API에서 tier 정보가 없을 경우)
  const getFallbackTier = (score: number, isStudent: boolean = false) => {
    if (isStudent) {
      // 학생 티어
      if (score >= 50000) return { emoji: '🐉', name: 'DRAGON', nameKorean: '용', color: '#9C27B0' };
      if (score >= 15000) return { emoji: '🦁', name: 'LION', nameKorean: '사자', color: '#FFD700' };
      if (score >= 5000) return { emoji: '🐺', name: 'WOLF', nameKorean: '늑대', color: '#9E9E9E' };
      if (score >= 2000) return { emoji: '🦊', name: 'FOX', nameKorean: '여우', color: '#FF9800' };
      if (score >= 500) return { emoji: '🐰', name: 'RABBIT', nameKorean: '토끼', color: '#FFCCBC' };
      return { emoji: '🐣', name: 'CHICK', nameKorean: '병아리', color: '#FFF9C4' };
    } else {
      // 학교 티어
      if (score >= 500000) return { emoji: '👑', name: 'MASTER', nameKorean: '마스터', color: '#FFD700' };
      if (score >= 100000) return { emoji: '💎', name: 'DIAMOND', nameKorean: '다이아몬드', color: '#B9F2FF' };
      if (score >= 50000) return { emoji: '🔷', name: 'PLATINUM', nameKorean: '플래티넘', color: '#E5E4E2' };
      if (score >= 20000) return { emoji: '🥇', name: 'GOLD', nameKorean: '골드', color: '#FFD700' };
      if (score >= 5000) return { emoji: '🥈', name: 'SILVER', nameKorean: '실버', color: '#C0C0C0' };
      return { emoji: '🥉', name: 'BRONZE', nameKorean: '브론즈', color: '#CD7F32' };
    }
  };

  const renderStudentRankingList = (students: Student[], level: SchoolLevel) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>{SCHOOL_LABELS[level]} 학생</span>
        <span className="text-sm font-normal text-gray-500">TOP 10</span>
      </h3>

      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student, index) => {
            // API tier 정보 사용, 없으면 폴백
            const tierInfo = student.tier || getFallbackTier(student.totalScore, true);
            const tierEmoji = student.tier?.icon || tierInfo.emoji;
            const tierName = student.tier?.currentKorean || tierInfo.nameKorean;

            return (
              <div
                key={student.id}
                className={`p-4 rounded-xl transition-all hover:shadow-md ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' :
                  index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300' :
                  index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-gray-400'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}위`}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{student.nickname}</div>
                      <div className="text-sm text-gray-600">
                        {student.school ? `${student.school.name}` : `Lv.${student.level}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-lg">{tierEmoji}</span>
                      <span className="text-xs font-semibold" style={{ color: student.tier?.color || tierInfo.color }}>
                        {tierName}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{student.totalScore.toLocaleString()}점</div>
                  </div>
                </div>

                {/* 티어 진행도 바 */}
                {student.tier && student.tier.nextTier && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>다음: {student.tier.nextTierKorean} {student.tier.icon}</span>
                      <span>{student.tier.remainingScore.toLocaleString()}점 남음</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${student.tier.progress}%`,
                          backgroundColor: student.tier.color
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderRankingList = (schools: School[], level: SchoolLevel) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>{SCHOOL_LABELS[level]}</span>
        <span className="text-sm font-normal text-gray-500">TOP 10</span>
      </h3>

      {schools.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다
        </div>
      ) : (
        <div className="space-y-3">
          {schools.map((school, index) => {
            // API tier 정보 사용, 없으면 폴백
            const tierInfo = school.tier || getFallbackTier(school.totalScore, false);
            const tierEmoji = school.tier?.icon || tierInfo.emoji;
            const tierName = school.tier?.currentKorean || tierInfo.nameKorean;

            return (
              <div
                key={school.id}
                className={`p-4 rounded-xl transition-all hover:shadow-md ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' :
                  index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300' :
                  index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-gray-400'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}위`}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{school.name}</div>
                      <div className="text-sm text-gray-600">{school.region1} {school.region2}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-lg">{tierEmoji}</span>
                      <span className="text-xs font-semibold" style={{ color: school.tier?.color || tierInfo.color }}>
                        {tierName}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{school.totalScore.toLocaleString()}점</div>
                  </div>
                </div>

                {/* 티어 진행도 바 */}
                {school.tier && school.tier.nextTier && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>다음: {school.tier.nextTierKorean} {school.tier.icon}</span>
                      <span>{school.tier.remainingScore.toLocaleString()}점 남음</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${school.tier.progress}%`,
                          backgroundColor: school.tier.color
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">실시간 랭킹 불러오는 중...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단 제목 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            실시간 업데이트
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">전국 학교 전쟁 순위</h2>
        </div>

        {/* 초등학교 1등 하이라이트 */}
        {rankings.elementary.length > 0 && (
          <div className="mt-8 max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">👑</div>
                  <div className="text-left">
                    <div className="text-sm text-gray-600 mb-1">🏆 초등학교 전국 1등</div>
                    <div className="text-3xl font-bold text-gray-900">{rankings.elementary[0].name}</div>
                    <div className="text-sm text-gray-600">{rankings.elementary[0].region1} {rankings.elementary[0].region2}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-yellow-600">{rankings.elementary[0].totalScore.toLocaleString()}점</div>
                  <div className="text-sm text-gray-600 mt-1">학생 {rankings.elementary[0].studentCount}명</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 학교급별 랭킹 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {renderRankingList(rankings.elementary, 'elementary')}
          {renderRankingList(rankings.middle, 'middle')}
          {renderRankingList(rankings.high, 'high')}
        </div>

        {/* 학생 랭킹 제목 */}
        <div className="text-center mt-20 mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">전국 학생 순위</h2>
          <p className="text-lg text-gray-600">최고의 학생들을 확인해보세요!</p>
        </div>

        {/* 학생 랭킹 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {renderStudentRankingList(studentRankings.elementary, 'elementary')}
          {renderStudentRankingList(studentRankings.middle, 'middle')}
          {renderStudentRankingList(studentRankings.high, 'high')}
        </div>
      </div>
    </section>
  );
}
