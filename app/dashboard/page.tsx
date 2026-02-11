'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type SchoolLevel = 'elementary' | 'middle' | 'high';
type RankingType = 'national' | 'regional' | 'nearby';

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
}

interface Student {
  rank: number;
  id: number;
  nickname: string;
  totalScore: number;
  level: number;
}

const API_BASE = 'https://api.schoolwar.kr';

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

export default function DashboardPage() {
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('elementary');
  const [rankingType, setRankingType] = useState<RankingType>('national');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [regions2, setRegions2] = useState<string[]>([]);
  const [selectedRegion1, setSelectedRegion1] = useState('');
  const [selectedRegion2, setSelectedRegion2] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [schoolLevel, rankingType, selectedRegion1, selectedRegion2]);

  async function fetchRegions() {
    try {
      const res = await fetch(`${API_BASE}/schools`);
      const allSchools = await res.json();

      // region1 목록 (시/도)
      const uniqueRegions = Array.from(new Set(allSchools.map((s: any) => s.region1).filter(Boolean)));
      setRegions(uniqueRegions as string[]);
      if (uniqueRegions.length > 0) {
        setSelectedRegion1(uniqueRegions[0] as string);
      }

      // region2 목록 (시/군)
      const uniqueRegions2 = Array.from(new Set(allSchools.map((s: any) => s.region2).filter(Boolean)));
      setRegions2(uniqueRegions2 as string[]);
      if (uniqueRegions2.length > 0) {
        setSelectedRegion2(uniqueRegions2[0] as string);
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  }

  async function fetchRankings() {
    setLoading(true);
    try {
      const basePath = SCHOOL_PATHS[schoolLevel];
      let url = `${API_BASE}/${basePath}/ranking/${rankingType}?limit=50`;

      if (rankingType === 'regional' && selectedRegion1) {
        url += `&region1=${encodeURIComponent(selectedRegion1)}`;
      } else if (rankingType === 'nearby' && selectedRegion2) {
        url += `&region2=${encodeURIComponent(selectedRegion2)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setSchools(data.data || data || []);

      // 자동으로 1등 학교 선택
      if (data.data && data.data.length > 0) {
        await fetchTopStudents(data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTopStudents(school: School) {
    setSelectedSchool(school);
    try {
      const basePath = SCHOOL_PATHS[schoolLevel];
      const res = await fetch(`${API_BASE}/${basePath}/${school.id}/top-contributors?limit=10`);
      const data = await res.json();
      setTopStudents(data.data || data || []);
    } catch (error) {
      console.error('Failed to fetch top students:', error);
      setTopStudents([]);
    }
  }

  const getTier = (score: number) => {
    if (score >= 2000) return { name: 'Diamond', color: 'bg-gradient-to-r from-cyan-400 to-cyan-600', emoji: '💎' };
    if (score >= 1000) return { name: 'Platinum', color: 'bg-gradient-to-r from-gray-300 to-gray-500', emoji: '🔷' };
    if (score >= 500) return { name: 'Gold', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', emoji: '🥇' };
    if (score >= 100) return { name: 'Silver', color: 'bg-gradient-to-r from-gray-400 to-gray-600', emoji: '🥈' };
    return { name: 'Bronze', color: 'bg-gradient-to-r from-amber-600 to-amber-800', emoji: '🥉' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <nav className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-3xl">🦛</div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  하마스쿨
                </div>
                <div className="text-xs text-purple-600 font-semibold -mt-1">초등학교 전쟁</div>
              </div>
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
            >
              홈으로
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 학교 레벨 선택 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">📊 실시간 학교 전쟁 대시보드</h1>
          <div className="flex gap-3">
            {(Object.keys(SCHOOL_LABELS) as SchoolLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setSchoolLevel(level)}
                className={`px-6 py-3 rounded-xl text-lg font-bold transition-all ${
                  schoolLevel === level
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {SCHOOL_LABELS[level]}
              </button>
            ))}
          </div>
        </div>

        {/* 랭킹 타입 & 지역 선택 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 랭킹 타입 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">랭킹 타입</label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setRankingType('national')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    rankingType === 'national'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🌍 전국 순위
                </button>
                <button
                  onClick={() => setRankingType('regional')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    rankingType === 'regional'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📍 지역 순위
                </button>
                <button
                  onClick={() => setRankingType('nearby')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    rankingType === 'nearby'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📌 근처 순위
                </button>
              </div>
            </div>

            {/* 지역 선택 (region1) */}
            {rankingType === 'regional' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">시/도 선택</label>
                <select
                  value={selectedRegion1}
                  onChange={(e) => setSelectedRegion1(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 근처 선택 (region2) */}
            {rankingType === 'nearby' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">시/군 선택</label>
                <select
                  value={selectedRegion2}
                  onChange={(e) => setSelectedRegion2(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {regions2.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 학교 랭킹 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {rankingType === 'national' && '🌍 전국 순위'}
              {rankingType === 'regional' && `📍 ${selectedRegion1} 순위`}
              {rankingType === 'nearby' && `📌 ${selectedRegion2} 순위`}
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">로딩 중...</p>
              </div>
            ) : schools.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                데이터가 없습니다.
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {schools.map((school, index) => {
                  const tier = getTier(school.totalScore);
                  return (
                    <button
                      key={school.id}
                      onClick={() => fetchTopStudents(school)}
                      className={`w-full text-left p-4 rounded-lg transition-all hover:shadow-md ${
                        selectedSchool?.id === school.id
                          ? 'bg-purple-50 border-2 border-purple-300'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`text-xl font-bold ${
                            school.rank === 1 ? 'text-yellow-600' :
                            school.rank === 2 ? 'text-gray-600' :
                            school.rank === 3 ? 'text-orange-600' :
                            'text-gray-400'
                          }`}>
                            {school.rank === 1 ? '🥇' : school.rank === 2 ? '🥈' : school.rank === 3 ? '🥉' : `${school.rank}위`}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{school.name}</div>
                            <div className="text-sm text-gray-600">{school.region1} {school.region2}</div>
                            <div className="text-xs text-gray-500">학생 {school.studentCount}명 · 배수 {school.scoreMultiplier}x</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end mb-1">
                            <span className="text-lg">{tier.emoji}</span>
                            <span className="text-xs font-semibold text-gray-600">{tier.name}</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900">{school.totalScore.toLocaleString()}</div>
                          <div className="text-xs text-purple-600">정규화 {school.normalizedScore.toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 우수 학생 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ⭐ 학교를 빛낸 학생들
            </h2>
            {selectedSchool && (
              <p className="text-sm text-gray-600 mb-6">
                {selectedSchool.name} ({selectedSchool.region1} {selectedSchool.region2})
              </p>
            )}

            {!selectedSchool ? (
              <div className="text-center py-12 text-gray-500">
                학교를 선택하세요
              </div>
            ) : topStudents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                등록된 학생이 없습니다
              </div>
            ) : (
              <div className="space-y-2">
                {topStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-lg ${
                      student.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' :
                      student.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300' :
                      student.rank === 3 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300' :
                      'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${
                          student.rank === 1 ? 'text-yellow-600' :
                          student.rank === 2 ? 'text-gray-600' :
                          student.rank === 3 ? 'text-orange-600' :
                          'text-gray-400'
                        }`}>
                          {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : `${student.rank}위`}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{student.nickname}</div>
                          <div className="text-sm text-gray-600">Lv.{student.level}</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        {student.totalScore.toLocaleString()}점
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
