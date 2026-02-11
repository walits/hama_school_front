'use client';

import { useState, useEffect } from 'react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 출시일: 2026년 3월 1일 (신학기)
    const launchDate = new Date('2026-03-01T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8 animate-bounce">
          <div className="text-9xl mb-4">🦛</div>
        </div>

        {/* Brand name */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-12 drop-shadow-2xl">
          대한민국 학교 전쟁
        </h1>

        {/* Coming Soon message */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8 border border-white/20 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🚀 곧 출시됩니다!
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            전국 학교가 참여하는 학습 전쟁이 시작됩니다
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base text-purple-200 font-semibold">일</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base text-purple-200 font-semibold">시간</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base text-purple-200 font-semibold">분</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-base text-purple-200 font-semibold">초</div>
            </div>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">7초 타임어택</h3>
              <p className="text-sm text-purple-100">빠른 속도로 문제를 풀어보세요</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-white mb-2">학교 대항전</h3>
              <p className="text-sm text-purple-100">우리 학교를 1등으로!</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">티어 시스템</h3>
              <p className="text-sm text-purple-100">동물 티어로 성장하세요</p>
            </div>
          </div>
        </div>

        {/* Launch info */}
        <div className="text-white/80 text-lg">
          <p className="mb-2">📅 정식 출시: 2026년 3월 1일 (신학기)</p>
          <p>💡 준비 중인 멋진 경험을 기대해주세요!</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
