import { SchoolStats } from '@/types';

interface SchoolStatsTableProps {
  data: SchoolStats[];
}

export default function SchoolStatsTable({ data }: SchoolStatsTableProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">학교별 통계</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                학교명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                학생 수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                문제 풀이 수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                평균 풀이 수
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((school) => (
              <tr key={school.schoolId} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {school.schoolName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {school.userCount}명
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {school.progressCount}개
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {school.userCount > 0
                    ? (school.progressCount / school.userCount).toFixed(1)
                    : '0.0'}
                  개
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            데이터가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
