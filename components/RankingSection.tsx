'use client';

import { useState, useEffect } from 'react';

interface School {
  id: number;
  name: string;
  region1: string;
  region2: string;
  totalScore: number;
  studentCount: number;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  async function fetchRankings() {
    try {
      // 초등학교, 중학교, 고등학교 각각 TOP 10 가져오기
      const [elementaryRes, middleRes, highRes] = await Promise.all([
        fetch('http://localhost:3810/schools/ranking/national?limit=10'),
        fetch('http://localhost:3810/mid-schools/ranking/national?limit=10'),
        fetch('http://localhost:3810/high-schools/ranking/national?limit=10')
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

  const getTierBadge = (score: number) => {
    if (score >= 2000) return { emoji: '💎', name: 'Diamond', color: 'text-cyan-600' };
    if (score >= 1000) return { emoji: '🔷', name: 'Platinum', color: 'text-gray-600' };
    if (score >= 500) return { emoji: '🥇', name: 'Gold', color: 'text-yellow-600' };
    if (score >= 100) return { emoji: '🥈', name: 'Silver', color: 'text-gray-500' };
    return { emoji: '🥉', name: 'Bronze', color: 'text-amber-700' };
  };

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
      </div>
    </section>
  );
}
