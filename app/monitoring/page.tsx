'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SystemMetrics {
  server: {
    status: string;
    uptime: number;
    uptimeFormatted: string;
  };
  system: {
    cpu: {
      cores: number;
      usage: number;
    };
    memory: {
      usagePercent: number;
      used: string;
      total: string;
    };
  };
  database: {
    connected: boolean;
  };
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // 30초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('https://api.schoolwar.kr/system/metrics');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMetrics(data);
      setLastUpdate(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch system metrics:', error);
      // API가 준비되지 않았을 경우 더미 데이터 표시
      setMetrics({
        server: {
          status: 'preparing',
          uptime: 0,
          uptimeFormatted: 'API 준비 중'
        },
        system: {
          cpu: { cores: 0, usage: 0 },
          memory: { usagePercent: 0, used: '0 GB', total: '0 GB' }
        },
        database: { connected: false }
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-xl">시스템 정보 로딩 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">시스템 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'healthy' ? 'text-green-400' : 'text-red-400';
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <nav className="border-b border-blue-800 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
                ← 대한민국 학교 전쟁
              </Link>
            </div>
            <div className="text-white font-semibold">시스템 모니터링</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
            <h1 className="text-4xl font-bold text-white">시스템 모니터링</h1>
          </div>
          <p className="text-gray-300 text-sm">
            마지막 업데이트: {lastUpdate.toLocaleTimeString('ko-KR')}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Server Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">서버 상태</h3>
              <span className="text-3xl">🖥️</span>
            </div>
            <div className={`text-3xl font-bold ${getStatusColor(metrics.server.status)} mb-2`}>
              {metrics.server.status === 'healthy' ? '정상' : '오류'}
            </div>
            <div className="text-gray-300 text-sm">
              가동 시간: {metrics.server.uptimeFormatted}
            </div>
          </div>

          {/* CPU Usage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">CPU</h3>
              <span className="text-3xl">⚡</span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {metrics.system.cpu.usage}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${getUsageColor(metrics.system.cpu.usage)}`}
                style={{ width: `${metrics.system.cpu.usage}%` }}
              ></div>
            </div>
            <div className="text-gray-300 text-sm">
              코어: {metrics.system.cpu.cores}개
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">메모리</h3>
              <span className="text-3xl">💾</span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {metrics.system.memory.usagePercent.toFixed(1)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${getUsageColor(metrics.system.memory.usagePercent)}`}
                style={{ width: `${metrics.system.memory.usagePercent}%` }}
              ></div>
            </div>
            <div className="text-gray-300 text-sm">
              {metrics.system.memory.used} / {metrics.system.memory.total}
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">데이터베이스</h3>
              <span className="text-3xl">🗄️</span>
            </div>
            <div className={`text-3xl font-bold ${metrics.database.connected ? 'text-green-400' : 'text-red-400'} mb-2`}>
              {metrics.database.connected ? '연결됨' : '연결 끊김'}
            </div>
            <div className="text-gray-300 text-sm">
              {metrics.database.connected ? 'PostgreSQL 정상' : '연결 오류'}
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-800/30">
          <h2 className="text-2xl font-bold text-white mb-6">상세 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-3">서버 정보</h3>
              <div className="space-y-2 text-gray-300">
                <p>• 상태: <span className={getStatusColor(metrics.server.status)}>{metrics.server.status}</span></p>
                <p>• 가동 시간: {metrics.server.uptimeFormatted}</p>
                <p>• 가동 초: {metrics.server.uptime.toLocaleString()}초</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-3">시스템 리소스</h3>
              <div className="space-y-2 text-gray-300">
                <p>• CPU 코어: {metrics.system.cpu.cores}개</p>
                <p>• CPU 사용률: {metrics.system.cpu.usage}%</p>
                <p>• 메모리 사용: {metrics.system.memory.used} / {metrics.system.memory.total}</p>
                <p>• 메모리 사용률: {metrics.system.memory.usagePercent.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Refresh Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            ⏱️ 이 페이지는 30초마다 자동으로 업데이트됩니다
          </p>
        </div>
      </main>
    </div>
  );
}
