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
  normalizedScore: number;
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

const STUDENT_PATHS = {
  elementary: 'users',
  middle: 'mid-users',
  high: 'high-users'
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
  const [modalSchool, setModalSchool] = useState<{ school: School; level: SchoolLevel } | null>(null);
  const [modalStudents, setModalStudents] = useState<Student[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  async function openSchoolModal(school: School, level: SchoolLevel) {
    setModalSchool({ school, level });
    setModalStudents([]);
    setModalLoading(true);
    try {
      const res = await fetch(`https://api.schoolwar.kr/${STUDENT_PATHS[level]}/ranking/national?schoolId=${school.id}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setModalStudents(data.data || data || []);
      }
    } catch {
      setModalStudents([]);
    } finally {
      setModalLoading(false);
    }
  }

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
      // 학생 티어 (모두 검은색으로 통일)
      if (score >= 50000) return { emoji: '🐉', name: 'DRAGON', nameKorean: '용', color: '#1F2937' };
      if (score >= 15000) return { emoji: '🦁', name: 'LION', nameKorean: '사자', color: '#1F2937' };
      if (score >= 5000) return { emoji: '🐺', name: 'WOLF', nameKorean: '늑대', color: '#1F2937' };
      if (score >= 2000) return { emoji: '🦊', name: 'FOX', nameKorean: '여우', color: '#1F2937' };
      if (score >= 500) return { emoji: '🐰', name: 'RABBIT', nameKorean: '토끼', color: '#1F2937' };
      return { emoji: '🐣', name: 'CHICK', nameKorean: '병아리', color: '#1F2937' };
    } else {
      // 학교 티어 (모두 검은색으로 통일)
      if (score >= 1000000) return { emoji: '👑', name: 'MASTER', nameKorean: '마스터', color: '#1F2937' };
      if (score >= 500000) return { emoji: '💎', name: 'DIAMOND', nameKorean: '다이아몬드', color: '#1F2937' };
      if (score >= 200000) return { emoji: '🔷', name: 'PLATINUM', nameKorean: '플래티넘', color: '#1F2937' };
      if (score >= 50000) return { emoji: '🥇', name: 'GOLD', nameKorean: '골드', color: '#1F2937' };
      if (score >= 10000) return { emoji: '🥈', name: 'SILVER', nameKorean: '실버', color: '#1F2937' };
      return { emoji: '🥉', name: 'BRONZE', nameKorean: '브론즈', color: '#1F2937' };
    }
  };

  const renderStudentRankingList = (students: Student[], level: SchoolLevel) => {
    const firstPlace = students[0];
    const restStudents = students.slice(1);

    return (
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
          <div className="space-y-6">
            {/* 1등 - 크게 표시 */}
            {firstPlace && (() => {
              const fallbackTier = getFallbackTier(firstPlace.totalScore, true);
              const tierInfo = firstPlace.tier || fallbackTier;
              const tierEmoji = firstPlace.tier?.icon || fallbackTier.emoji;
              const tierName = firstPlace.tier?.currentKorean || fallbackTier.nameKorean;

              return (
                <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between gap-6 mb-4 flex-nowrap">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-3xl animate-bounce flex-shrink-0">🥇</div>
                      <div className="min-w-0">
                        <div className="text-lg font-bold text-gray-900 truncate">{firstPlace.nickname}</div>
                        <div className="text-xs text-gray-600 mt-1 truncate">
                          {firstPlace.school ? `${firstPlace.school.name}` : `Lv.${firstPlace.level}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <span className="text-lg">{tierEmoji}</span>
                        <span className="text-sm font-bold text-gray-800">
                          {tierName}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-yellow-600 whitespace-nowrap">{Math.round(firstPlace.totalScore).toLocaleString()}점</div>
                    </div>
                  </div>

                  {/* 티어 진행도 바 */}
                  {firstPlace.tier && firstPlace.tier.nextTier && (
                    <div className="mt-4 pt-4 border-t border-yellow-200">
                      <div className="flex justify-between text-xs text-gray-700 mb-2 font-semibold">
                        <span>다음: {firstPlace.tier.nextTierKorean} {firstPlace.tier.icon}</span>
                        <span>{Math.round(firstPlace.tier.remainingScore).toLocaleString()}점 남음</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all bg-gradient-to-r from-yellow-400 to-orange-400"
                          style={{ width: `${firstPlace.tier.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 2-10등 */}
            {restStudents.length > 0 && (
              <div className="space-y-2">
                {restStudents.map((student, index) => {
                  const fallbackTier = getFallbackTier(student.totalScore, true);
                  const tierInfo = student.tier || fallbackTier;
                  const tierEmoji = student.tier?.icon || fallbackTier.emoji;
                  const tierName = student.tier?.currentKorean || fallbackTier.nameKorean;

                  return (
                    <div
                      key={student.id}
                      className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-gray-400 w-8">
                            {index + 2}위
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{student.nickname}</div>
                            <div className="text-xs text-gray-500">
                              {student.school ? `${student.school.name}` : `Lv.${student.level}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <span className="text-sm">{tierEmoji}</span>
                            <span className="text-xs font-semibold text-gray-800">
                              {tierName}
                            </span>
                          </div>
                          <div className="text-base font-bold text-gray-900">{Math.round(student.totalScore).toLocaleString()}점</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderRankingList = (schools: School[], level: SchoolLevel) => {
    const firstPlace = schools[0];
    const restSchools = schools.slice(1);

    return (
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
          <div className="space-y-6">
            {/* 1등 - 크게 표시 */}
            {firstPlace && (() => {
              const fallbackTier = getFallbackTier(firstPlace.totalScore, false);
              const tierInfo = firstPlace.tier || fallbackTier;
              const tierEmoji = firstPlace.tier?.icon || fallbackTier.emoji;
              const tierName = firstPlace.tier?.currentKorean || fallbackTier.nameKorean;

              return (
                <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => openSchoolModal(firstPlace, level)}>
                  <div className="flex items-center justify-between gap-6 mb-4 flex-nowrap">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-3xl animate-bounce flex-shrink-0">🥇</div>
                      <div className="min-w-0">
                        <div className="text-lg font-bold text-gray-900 truncate">{firstPlace.name}</div>
                        <div className="text-xs text-gray-600 mt-1 truncate">{firstPlace.region1} {firstPlace.region2}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-2 justify-end mb-2">
                        <span className="text-lg">{tierEmoji}</span>
                        <span className="text-sm font-bold text-gray-800">
                          {tierName}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-yellow-600 whitespace-nowrap">{Math.round(firstPlace.normalizedScore).toLocaleString()}점</div>
                    </div>
                  </div>

                  {/* 티어 진행도 바 */}
                  {firstPlace.tier && firstPlace.tier.nextTier && (
                    <div className="mt-4 pt-4 border-t border-yellow-200">
                      <div className="flex justify-between text-sm text-gray-700 mb-2 font-semibold">
                        <span>다음: {firstPlace.tier.nextTierKorean} {firstPlace.tier.icon}</span>
                        <span>{Math.round(firstPlace.tier.remainingScore).toLocaleString()}점 남음</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all bg-gradient-to-r from-yellow-400 to-orange-400"
                          style={{ width: `${firstPlace.tier.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 2-10등 */}
            {restSchools.length > 0 && (
              <div className="space-y-2">
                {restSchools.map((school, index) => {
                  const fallbackTier = getFallbackTier(school.totalScore, false);
                  const tierInfo = school.tier || fallbackTier;
                  const tierEmoji = school.tier?.icon || fallbackTier.emoji;
                  const tierName = school.tier?.currentKorean || fallbackTier.nameKorean;

                  return (
                    <div
                      key={school.id}
                      onClick={() => openSchoolModal(school, level)}
                      className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-gray-400 w-8">
                            {index + 2}위
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{school.name}</div>
                            <div className="text-xs text-gray-500">{school.region1} {school.region2}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <span className="text-sm">{tierEmoji}</span>
                            <span className="text-xs font-semibold text-gray-800">
                              {tierName}
                            </span>
                          </div>
                          <div className="text-base font-bold text-gray-900">{Math.round(school.normalizedScore).toLocaleString()}점</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
    <>
    {/* 학교 학생 목록 모달 */}
    {modalSchool && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalSchool(null)}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{modalSchool.school.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{modalSchool.school.region1} {modalSchool.school.region2} · {SCHOOL_LABELS[modalSchool.level]}</p>
              </div>
              <button onClick={() => setModalSchool(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none flex-shrink-0">×</button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-4">
            {modalLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : modalStudents.length === 0 ? (
              <p className="text-center text-gray-500 py-12">학생 데이터가 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {modalStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-gray-400 w-7">{index + 1}위</div>
                      <div>
                        <div className="font-semibold text-gray-900">{student.nickname}</div>
                        <div className="text-xs text-gray-400">Lv.{student.level}</div>
                      </div>
                    </div>
                    <div className="text-base font-bold text-purple-600">{Math.round(student.totalScore).toLocaleString()}점</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button onClick={() => setModalSchool(null)} className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors">닫기</button>
          </div>
        </div>
      </div>
    )}
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
              <div className="flex items-center justify-between gap-6 flex-nowrap">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="text-3xl flex-shrink-0">👑</div>
                  <div className="text-left min-w-0">
                    <div className="text-xs text-gray-600 mb-1">🏆 초등학교 전국 1등</div>
                    <div className="text-lg font-bold text-gray-900 truncate">{rankings.elementary[0].name}</div>
                    <div className="text-xs text-gray-600 truncate">{rankings.elementary[0].region1} {rankings.elementary[0].region2}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-yellow-600 whitespace-nowrap">{Math.round(rankings.elementary[0].normalizedScore).toLocaleString()}점</div>
                  <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">학생 {rankings.elementary[0].studentCount}명</div>
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
    </>
  );
}
