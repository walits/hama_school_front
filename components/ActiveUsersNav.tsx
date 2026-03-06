'use client';

import { useEffect, useState } from 'react';

interface ActiveUsers {
  elementary: number;
  middle: number;
  high: number;
  total: number;
  minutes: number;
}

export default function ActiveUsersNav() {
  const [activeUsers, setActiveUsers] = useState<ActiveUsers>({
    elementary: 1001,
    middle: 352,
    high: 283,
    total: 1636,
    minutes: 5,
  });

  useEffect(() => {
    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch('https://api.schoolwar.kr/stats/active-users?minutes=5');
      const data = await response.json();

      const baselineElementary = 1001;
      const baselineMiddle = 352;
      const baselineHigh = 283;

      const elementary = data.elementary + baselineElementary;
      const middle = data.middle + baselineMiddle;
      const high = data.high + baselineHigh;
      const total = elementary + middle + high;

      setActiveUsers({
        elementary,
        middle,
        high,
        total,
        minutes: data.minutes,
      });
    } catch (error) {
      console.error('Failed to fetch active users:', error);
    }
  };

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">접속:</span>
        <span className="text-orange-600 font-bold">{activeUsers.elementary.toLocaleString()}</span>
        <span className="text-gray-400">|</span>
        <span className="text-blue-600 font-bold">{activeUsers.middle.toLocaleString()}</span>
        <span className="text-gray-400">|</span>
        <span className="text-green-600 font-bold">{activeUsers.high.toLocaleString()}</span>
        <span className="text-gray-400">|</span>
        <span className="text-purple-600 font-bold">{activeUsers.total.toLocaleString()}</span>
      </div>
    </div>
  );
}
