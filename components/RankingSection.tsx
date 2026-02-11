'use client';

import { useState, useEffect } from 'react';
import KoreaMap from './KoreaMap';

interface School {
  id: number;
  name: string;
  region1: string;  // 시/도 (경기, 서울 등)
  region2: string;  // 시/군 (광명시, 중랑구 등)
  address: string;
  latitude: number;
  longitude: number;
  totalScore: number;
  studentCount: number;
}

interface TopContributor {
  rank: number;
  nickname: string;
  totalScore: number;
  level: number;
}

export default function RankingSection() {
  const [nationalRanking, setNationalRanking] = useState<School[]>([]);
  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('전국');
  const [topStudent, setTopStudent] = useState<TopContributor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  async function fetchRankings() {
    try {
      // 전국 TOP 10
      const rankingRes = await fetch('http://localhost:3000/schools/ranking?limit=10');
      const rankings = await rankingRes.json();
      setNationalRanking(rankings);

      // 전체 학교 데이터
      const schoolsRes = await fetch('http://localhost:3000/schools');
      const schools = await schoolsRes.json();
      setAllSchools(schools);

      // 1등 학교의 1등 학생
      if (rankings.length > 0) {
        const topSchool = rankings[0];
        const contributorsRes = await fetch(`http://localhost:3000/schools/${topSchool.id}/top-contributors?limit=1`);
        const contributors = await contributorsRes.json();
        if (contributors.length > 0) {
          setTopStudent(contributors[0]);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
      setLoading(false);
    }
  }

  // 지역별 필터링 (region1 기준)
  const regions = ['전국', ...Array.from(new Set(allSchools.map(s => s.region1).filter(Boolean)))];
  const filteredSchools = selectedRegion === '전국'
    ? nationalRanking
    : allSchools
        .filter(s => s.region1 === selectedRegion)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10);

  const getTierBadge = (score: number) => {
    if (score >= 2000) return { emoji: '💎', name: 'Diamond', color: 'text-cyan-600' };
    if (score >= 1000) return { emoji: '🔷', name: 'Platinum', color: 'text-gray-600' };
    if (score >= 500) return { emoji: '🥇', name: 'Gold', color: 'text-yellow-600' };
    if (score >= 100) return { emoji: '🥈', name: 'Silver', color: 'text-gray-500' };
    return { emoji: '🥉', name: 'Bronze', color: 'text-amber-700' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">실시간 랭킹 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단 통계 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            실시간 업데이트
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">전국 학교 전쟁 순위</h2>

          {nationalRanking.length > 0 && (
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">👑</div>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 mb-1">🏆 전국 1등 학교</div>
                      <div className="text-3xl font-bold text-gray-900">{nationalRanking[0].name}</div>
                      <div className="text-sm text-gray-600">{nationalRanking[0].region1} {nationalRanking[0].region2}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-yellow-600">{nationalRanking[0].totalScore.toLocaleString()}점</div>
                    <div className="text-sm text-gray-600 mt-1">학생 {nationalRanking[0].studentCount}명</div>
                  </div>
                </div>

                {topStudent && (
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">⭐ 최고 학생: </span>
                        <span className="text-lg font-bold text-purple-600">{topStudent.nickname}</span>
                        <span className="ml-2 text-sm text-gray-600">Lv.{topStudent.level}</span>
                      </div>
                      <div className="text-xl font-bold text-purple-600">{topStudent.totalScore.toLocaleString()}점</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 지도와 랭킹 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* 한국 지도 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">전국 학교 지도</h3>
            <p className="text-sm text-gray-600 text-center mb-6">아이콘 위에 마우스를 올려보세요!</p>
            <KoreaMap schools={nationalRanking} />

            {/* 범례 */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-xs">💎</div>
                <span className="text-xs text-gray-600">Diamond 2000+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-xs">🔷</div>
                <span className="text-xs text-gray-600">Platinum 1000+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-xs">🥇</div>
                <span className="text-xs text-gray-600">Gold 500+</span>
              </div>
            </div>
          </div>

          {/* 랭킹 리스트 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {/* 지역 선택 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">지역 선택</label>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedRegion === region
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedRegion === '전국' ? '전국 TOP 10' : `${selectedRegion} TOP 10`}
            </h3>

            <div className="space-y-3">
              {filteredSchools.map((school, index) => {
                const tier = getTierBadge(school.totalScore);
                return (
                  <div
                    key={school.id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all hover:shadow-md ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300' :
                      'bg-gray-50 border border-gray-200'
                    }`}
                  >
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
                        <span className="text-lg">{tier.emoji}</span>
                        <span className={`text-xs font-semibold ${tier.color}`}>{tier.name}</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{school.totalScore.toLocaleString()}점</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
