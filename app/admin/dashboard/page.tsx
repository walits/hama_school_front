'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import StatsCard from '@/components/admin/StatsCard';
import DailyChart from '@/components/admin/DailyChart';
import SchoolStatsTable from '@/components/admin/SchoolStatsTable';
import { DashboardStats } from '@/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchDashboardStats();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">
              하마스쿨 관리자
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-2 text-gray-600">
            전체 통계 및 학교별 현황을 확인하세요
          </p>
        </div>

        {stats && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="전체 사용자"
                value={stats.totalUsers}
                icon="👥"
                color="indigo"
              />
              <StatsCard
                title="등록 학교"
                value={stats.totalSchools}
                icon="🏫"
                color="green"
              />
              <StatsCard
                title="전체 문제"
                value={stats.totalQuestions}
                icon="📝"
                color="blue"
              />
              <StatsCard
                title="오늘 풀이"
                value={stats.todayProgress}
                icon="🎯"
                color="purple"
              />
            </div>

            <div className="mb-8">
              <DailyChart data={stats.dailyProgress} />
            </div>

            <div>
              <SchoolStatsTable data={stats.schoolStats} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
