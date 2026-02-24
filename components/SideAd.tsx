'use client';

interface SideAdProps {
  position: 'left' | 'right';
}

export default function SideAd({ position }: SideAdProps) {
  return (
    <div
      className={`hidden lg:block fixed top-20 ${
        position === 'left' ? 'left-4' : 'right-4'
      } w-40 h-[600px] bg-gray-100 border-2 border-gray-200 rounded-lg shadow-lg`}
    >
      <div className="flex items-center justify-center h-full text-gray-400 text-sm text-center p-4">
        <div>
          <div className="text-2xl mb-2">📢</div>
          <div>광고 영역</div>
          <div className="text-xs mt-2">160 x 600</div>
        </div>
      </div>
      {/* Google AdSense나 광고 코드를 여기에 넣으세요 */}
    </div>
  );
}
