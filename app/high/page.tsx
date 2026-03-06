'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ActiveUsersNav from '@/components/ActiveUsersNav';

type SchoolLevel = 'elementary' | 'middle' | 'high';
type RankingType = 'national' | 'regional' | 'nearby';

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
  scoreMultiplier: number;
  studentCount: number;
  rank: number;
  normalizedScore: number;
  tier?: TierInfo;
}

interface Student {
  rank: number;
  id: number;
  nickname: string;
  totalScore: number;
  level: number;
  tier?: TierInfo;
  school?: {
    id: number;
    name: string;
    region1: string;
    region2: string;
  };
}

const API_BASE = 'https://api.schoolwar.kr';
const SCHOOL_LEVEL: SchoolLevel = 'high';
const PAGE_TITLE = '고등학교 전쟁';

export default function HighPage() {
  // 학교 순위 관련
  const [schoolRankingType, setSchoolRankingType] = useState<RankingType>('national');
  const [schools, setSchools] = useState<School[]>([]);
  const [schoolsLoading, setSchoolsLoading] = useState(false);
  const [schoolRegion1, setSchoolRegion1] = useState('');
  const [schoolRegion2, setSchoolRegion2] = useState('');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');

  // 학생 순위 관련
  const [studentRankingType, setStudentRankingType] = useState<RankingType>('national');
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentRegion1, setStudentRegion1] = useState('');
  const [studentRegion2, setStudentRegion2] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  // 지역 목록
  const [regions, setRegions] = useState<string[]>([]);
  const [allSchools, setAllSchools] = useState<any[]>([]);
  const [schoolRegion2Options, setSchoolRegion2Options] = useState<string[]>([]);
  const [studentRegion2Options, setStudentRegion2Options] = useState<string[]>([]);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchSchoolRankings();
  }, [schoolRankingType, schoolRegion1, schoolRegion2]);

  useEffect(() => {
    fetchStudentRankings();
  }, [studentRankingType, studentRegion1, studentRegion2]);

  useEffect(() => {
    if (schoolRegion1 && allSchools.length > 0) {
      const filteredRegion2 = Array.from(
        new Set(
          allSchools
            .filter((s: any) => s.region1 === schoolRegion1)
            .map((s: any) => s.region2)
            .filter(Boolean)
        )
      );
      setSchoolRegion2Options(filteredRegion2 as string[]);
      if (filteredRegion2.length > 0) {
        setSchoolRegion2(filteredRegion2[0] as string);
      }
    }
  }, [schoolRegion1, allSchools]);

  useEffect(() => {
    if (studentRegion1 && allSchools.length > 0) {
      const filteredRegion2 = Array.from(
        new Set(
          allSchools
            .filter((s: any) => s.region1 === studentRegion1)
            .map((s: any) => s.region2)
            .filter(Boolean)
        )
      );
      setStudentRegion2Options(filteredRegion2 as string[]);
      if (filteredRegion2.length > 0) {
        setStudentRegion2(filteredRegion2[0] as string);
      }
    }
  }, [studentRegion1, allSchools]);

  async function fetchRegions() {
    try {
      const res = await fetch(`${API_BASE}/schools`);
      const schoolsData = await res.json();
      setAllSchools(schoolsData);

      const uniqueRegions = Array.from(new Set(schoolsData.map((s: any) => s.region1).filter(Boolean)));
      setRegions(uniqueRegions as string[]);
      if (uniqueRegions.length > 0) {
        const firstRegion = uniqueRegions[0] as string;
        setSchoolRegion1(firstRegion);
        setStudentRegion1(firstRegion);
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  }

  async function fetchSchoolRankings() {
    setSchoolsLoading(true);
    try {
      let url = `${API_BASE}/high-schools/ranking/${schoolRankingType}?limit=1000`;

      if (schoolRankingType === 'regional' && schoolRegion1) {
        url += `&region1=${encodeURIComponent(schoolRegion1)}`;
      } else if (schoolRankingType === 'nearby' && schoolRegion2) {
        url += `&region2=${encodeURIComponent(schoolRegion2)}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`School API returned ${res.status}`);
        setSchools([]);
        return;
      }
      const data = await res.json();
      setSchools(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch school rankings:', error);
      setSchools([]);
    } finally {
      setSchoolsLoading(false);
    }
  }

  async function fetchStudentRankings() {
    setStudentsLoading(true);
    try {
      let url = `${API_BASE}/high-users/ranking/${studentRankingType}?limit=1000`;

      if (studentRankingType === 'regional' && studentRegion1) {
        url += `&region1=${encodeURIComponent(studentRegion1)}`;
      } else if (studentRankingType === 'nearby' && studentRegion2) {
        url += `&region2=${encodeURIComponent(studentRegion2)}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Student API returned ${res.status}`);
        setStudents([]);
        return;
      }
      const data = await res.json();
      setStudents(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch student rankings:', error);
      setStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  }

  const getFallbackTier = (score: number, isStudent: boolean = false) => {
    if (isStudent) {
      if (score >= 50000) return { name: '용', color: '#1F2937', emoji: '🐉' };
      if (score >= 15000) return { name: '사자', color: '#1F2937', emoji: '🦁' };
      if (score >= 5000) return { name: '늑대', color: '#1F2937', emoji: '🐺' };
      if (score >= 2000) return { name: '여우', color: '#1F2937', emoji: '🦊' };
      if (score >= 500) return { name: '토끼', color: '#1F2937', emoji: '🐰' };
      return { name: '병아리', color: '#1F2937', emoji: '🐣' };
    } else {
      if (score >= 1000000) return { name: '마스터', color: '#1F2937', emoji: '👑' };
      if (score >= 500000) return { name: '다이아몬드', color: '#1F2937', emoji: '💎' };
      if (score >= 200000) return { name: '플래티넘', color: '#1F2937', emoji: '🔷' };
      if (score >= 50000) return { name: '골드', color: '#1F2937', emoji: '🥇' };
      if (score >= 10000) return { name: '실버', color: '#1F2937', emoji: '🥈' };
      return { name: '브론즈', color: '#1F2937', emoji: '🥉' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-100">
      {/* Header */}
      <nav className="border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/high.png" alt="고등학교" className="h-12 w-12 object-contain" />
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  대한민국 학교 전쟁
                </div>
                <div className="text-xs text-green-600 font-semibold -mt-1">{PAGE_TITLE}</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <ActiveUsersNav />
              <div className="flex items-center gap-3">
                <Link href="/elementary" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  초등학교
                </Link>
                <Link href="/middle" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  중학교
                </Link>
                <Link
                  href="/"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                >
                  홈으로
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">📊 {PAGE_TITLE} 순위</h1>
        </div>

        {/* 학교 순위 섹션 */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🏫 학교 순위</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">랭킹 타입</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSchoolRankingType('national')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      schoolRankingType === 'national'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🌍 전국
                  </button>
                  <button
                    onClick={() => setSchoolRankingType('regional')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      schoolRankingType === 'regional'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📍 지역
                  </button>
                  <button
                    onClick={() => setSchoolRankingType('nearby')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      schoolRankingType === 'nearby'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📌 근처
                  </button>
                </div>
              </div>

              {schoolRankingType === 'regional' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">시/도 선택</label>
                  <select
                    value={schoolRegion1}
                    onChange={(e) => setSchoolRegion1(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              )}

              {schoolRankingType === 'nearby' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">시/도 선택</label>
                    <select
                      value={schoolRegion1}
                      onChange={(e) => setSchoolRegion1(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">시/군 선택</label>
                    <select
                      value={schoolRegion2}
                      onChange={(e) => setSchoolRegion2(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {schoolRegion2Options.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="학교 이름으로 검색..."
                value={schoolSearchQuery}
                onChange={(e) => setSchoolSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {schoolsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">로딩 중...</p>
              </div>
            ) : schools.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                데이터가 없습니다.
              </div>
            ) : (
              <div>
                {(() => {
                  const filteredSchools = schools.filter(school =>
                    school.name.toLowerCase().includes(schoolSearchQuery.toLowerCase())
                  );
                  return (
                    <>
                      <div className="text-sm text-gray-600 mb-4">
                        총 <span className="font-bold text-green-600">{filteredSchools.length}개</span> 학교
                        {schoolSearchQuery && ` (전체 ${schools.length}개 중 검색 결과)`}
                      </div>
                      {filteredSchools.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          검색 결과가 없습니다.
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                          {filteredSchools.map((school) => {
                    const fallbackTier = getFallbackTier(school.normalizedScore, false);
                    const tierEmoji = school.tier?.icon || fallbackTier.emoji;
                    const tierName = school.tier?.currentKorean || fallbackTier.name;

                    return (
                      <div
                        key={school.id}
                        className={`p-4 rounded-lg border transition-all ${
                          school.rank === 1
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 border-2'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={`text-lg font-bold ${
                              school.rank === 1 ? 'text-yellow-600' :
                              school.rank <= 3 ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {school.rank === 1 ? '🥇' :
                               school.rank === 2 ? '🥈' :
                               school.rank === 3 ? '🥉' :
                               `${school.rank}위`}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-gray-900 truncate">{school.name}</div>
                              <div className="text-xs text-gray-600 truncate">
                                {school.region1} {school.region2} · 학생 {school.studentCount}명
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="flex items-center gap-1 justify-end mb-1">
                              <span className="text-base">{tierEmoji}</span>
                              <span className="text-xs font-semibold text-gray-800">{tierName}</span>
                            </div>
                            <div className="text-base font-bold text-gray-900">
                              {school.normalizedScore.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">보정 점수</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* 학생 순위 섹션 - 동일한 구조 */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">👨‍🎓 학생 순위</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">랭킹 타입</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStudentRankingType('national')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      studentRankingType === 'national'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🌍 전국
                  </button>
                  <button
                    onClick={() => setStudentRankingType('regional')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      studentRankingType === 'regional'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📍 지역
                  </button>
                  <button
                    onClick={() => setStudentRankingType('nearby')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      studentRankingType === 'nearby'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📌 근처
                  </button>
                </div>
              </div>

              {studentRankingType === 'regional' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">시/도 선택</label>
                  <select
                    value={studentRegion1}
                    onChange={(e) => setStudentRegion1(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              )}

              {studentRankingType === 'nearby' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">시/도 선택</label>
                    <select
                      value={studentRegion1}
                      onChange={(e) => setStudentRegion1(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">시/군 선택</label>
                    <select
                      value={studentRegion2}
                      onChange={(e) => setStudentRegion2(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {studentRegion2Options.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="학생 닉네임으로 검색..."
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {studentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">로딩 중...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                데이터가 없습니다.
              </div>
            ) : (
              <div>
                {(() => {
                  const filteredStudents = students.filter(student =>
                    student.nickname.toLowerCase().includes(studentSearchQuery.toLowerCase())
                  );
                  return (
                    <>
                      <div className="text-sm text-gray-600 mb-4">
                        총 <span className="font-bold text-green-600">{filteredStudents.length}명</span> 학생
                        {studentSearchQuery && ` (전체 ${students.length}명 중 검색 결과)`}
                      </div>
                      {filteredStudents.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          검색 결과가 없습니다.
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                          {filteredStudents.map((student) => {
                    const fallbackTier = getFallbackTier(student.totalScore, true);
                    const tierEmoji = student.tier?.icon || fallbackTier.emoji;
                    const tierName = student.tier?.currentKorean || fallbackTier.name;

                    return (
                      <div
                        key={student.id}
                        className={`p-4 rounded-lg border transition-all ${
                          student.rank === 1
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 border-2'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={`text-lg font-bold ${
                              student.rank === 1 ? 'text-yellow-600' :
                              student.rank <= 3 ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {student.rank === 1 ? '🥇' :
                               student.rank === 2 ? '🥈' :
                               student.rank === 3 ? '🥉' :
                               `${student.rank}위`}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-gray-900 truncate">{student.nickname}</div>
                              <div className="text-xs text-gray-600 truncate">
                                {student.school ? `${student.school.name}` : `Lv.${student.level}`}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="flex items-center gap-1 justify-end mb-1">
                              <span className="text-base">{tierEmoji}</span>
                              <span className="text-xs font-semibold text-gray-800">{tierName}</span>
                            </div>
                            <div className="text-base font-bold text-green-600">
                              {student.totalScore.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">점수</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
