interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color = 'indigo',
}: StatsCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${
            colorClasses[color as keyof typeof colorClasses] ||
            colorClasses.indigo
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
