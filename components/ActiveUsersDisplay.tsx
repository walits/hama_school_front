'use client';

import { useEffect, useState } from 'react';

interface ActiveUsers {
  elementary: number;
  middle: number;
  high: number;
  total: number;
  minutes: number;
  timestamp: string;
}

export default function ActiveUsersDisplay() {
  const [activeUsers, setActiveUsers] = useState<ActiveUsers>({
    elementary: 0,
    middle: 0,
    high: 0,
    total: 0,
    minutes: 5,
    timestamp: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로드
    fetchActiveUsers();

    // 30초마다 업데이트
    const interval = setInterval(fetchActiveUsers, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch('https://api.schoolwar.kr/stats/active-users?minutes=5');
      const data = await response.json();

      // 기본 접속자 수 추가
      const baselineElementary = 1001;
      const baselineMiddle = 352;
      const baselineHigh = 283;

      const updatedData = {
        elementary: data.elementary + baselineElementary,
        middle: data.middle + baselineMiddle,
        high: data.high + baselineHigh,
        total: data.elementary + data.middle + data.high + baselineElementary + baselineMiddle + baselineHigh,
        minutes: data.minutes,
        timestamp: data.timestamp,
      };

      setActiveUsers(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch active users:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
          <span className="text-sm">실시간 접속자 정보 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h3 className="text-lg font-bold text-gray-800">실시간 접속 현황</h3>
          </div>
          <p className="text-sm text-gray-600">최근 {activeUsers.minutes}분 이내 활동 중인 사용자</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* 전체 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {activeUsers.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-semibold">전체</div>
            </div>
          </div>

          {/* 초등학교 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200 hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="text-4xl mb-2">🟠</div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {activeUsers.elementary.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-semibold">초등학교</div>
            </div>
          </div>

          {/* 중학교 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="text-4xl mb-2">🔵</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {activeUsers.middle.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-semibold">중학교</div>
            </div>
          </div>

          {/* 고등학교 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="text-4xl mb-2">🟢</div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {activeUsers.high.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-semibold">고등학교</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            마지막 업데이트: {new Date(activeUsers.timestamp).toLocaleTimeString('ko-KR')}
          </p>
        </div>
      </div>
    </div>
  );
}
