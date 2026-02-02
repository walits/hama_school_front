'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyProgress } from '@/types';

interface DailyChartProps {
  data: DailyProgress[];
}

export default function DailyChart({ data }: DailyChartProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">
        일일 문제 풀이 현황
      </h3>
      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(value) => {
                const date = new Date(value);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
