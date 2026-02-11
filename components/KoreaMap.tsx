'use client';

interface School {
  id: number;
  name: string;
  region1: string;
  region2: string;
  latitude: number;
  longitude: number;
  totalScore: number;
}

interface KoreaMapProps {
  schools: School[];
}

// 한국 좌표계를 SVG 좌표로 변환
function coordsToSvg(lat: number, lng: number) {
  const minLat = 33.0;
  const maxLat = 38.6;
  const minLng = 124.5;
  const maxLng = 131.9;

  const width = 400;
  const height = 500;

  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height;

  return { x, y };
}

// 점수로 티어 판단
function getTier(score: number) {
  if (score >= 2000) return { name: 'Diamond', color: 'from-cyan-400 to-cyan-600', emoji: '💎' };
  if (score >= 1000) return { name: 'Platinum', color: 'from-gray-300 to-gray-500', emoji: '🔷' };
  if (score >= 500) return { name: 'Gold', color: 'from-yellow-400 to-yellow-600', emoji: '🥇' };
  if (score >= 100) return { name: 'Silver', color: 'from-gray-400 to-gray-600', emoji: '🥈' };
  return { name: 'Bronze', color: 'from-amber-600 to-amber-800', emoji: '🥉' };
}

export default function KoreaMap({ schools }: KoreaMapProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 한국 지도 SVG */}
      <svg viewBox="0 0 400 500" className="w-full h-auto">
        <rect width="400" height="500" fill="#f0f9ff" />

        {/* 간단한 한국 모양 */}
        <path
          d="M 200 50 L 250 100 L 280 150 L 290 200 L 280 250 L 270 300 L 250 350 L 220 400 L 200 450 L 180 420 L 160 380 L 150 340 L 140 300 L 130 250 L 120 200 L 130 150 L 150 100 Z"
          fill="#e0f2fe"
          stroke="#0ea5e9"
          strokeWidth="2"
        />

        {/* 제주도 */}
        <ellipse cx="180" cy="460" rx="25" ry="15" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
      </svg>

      {/* 학교 마커들 */}
      <div className="absolute inset-0">
        {schools.map((school) => {
          const { x, y } = coordsToSvg(school.latitude, school.longitude);
          const tier = getTier(school.totalScore);

          return (
            <div
              key={school.id}
              className="absolute group cursor-pointer"
              style={{
                left: `${(x / 400) * 100}%`,
                top: `${(y / 500) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-lg shadow-lg hover:scale-125 transition-transform`}>
                {tier.emoji}
              </div>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                <div className="font-bold">{school.name}</div>
                <div className="text-gray-300">{school.region1} {school.region2}</div>
                <div className="text-yellow-400">{school.totalScore.toLocaleString()}점</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
