'use client';

import { useEffect, useState } from 'react';

interface ActiveUsers {
  total: number;
  minutes: number;
}

export default function ActiveUsersNav() {
  const [activeUsers, setActiveUsers] = useState<ActiveUsers>({
    total: 1636, // 기본값
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

      const total = data.elementary + data.middle + data.high + baselineElementary + baselineMiddle + baselineHigh;

      setActiveUsers({
        total,
        minutes: data.minutes,
      });
    } catch (error) {
      console.error('Failed to fetch active users:', error);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-gray-700 font-medium">
        접속자: <span className="font-bold text-purple-600">{activeUsers.total.toLocaleString()}</span>명
      </span>
    </div>
  );
}
