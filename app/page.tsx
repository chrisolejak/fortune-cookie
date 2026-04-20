'use client';

import { useState, useEffect } from 'react';
import { fortunes } from './fortunes';

type State = 'idle' | 'shaking' | 'cracked' | 'revealed';

function CookieSVG({ half }: { half?: 'left' | 'right' }) {
  if (!half) {
    // Whole cookie
    return (
      <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="cookieGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F5C842" />
            <stop offset="60%" stopColor="#E8A020" />
            <stop offset="100%" stopColor="#C47A15" />
          </radialGradient>
        </defs>
        {/* Cookie body - classic fortune cookie bent shape */}
        <path
          d="M10 40 Q15 10 60 8 Q105 10 110 40 Q105 65 80 68 Q60 75 40 68 Q15 65 10 40Z"
          fill="url(#cookieGrad)"
          stroke="#A0600A"
          strokeWidth="1.5"
        />
        {/* Center fold crease */}
        <path
          d="M30 38 Q60 28 90 38"
          fill="none"
          stroke="#A0600A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Highlight */}
        <path
          d="M35 22 Q55 16 75 20"
          fill="none"
          stroke="#FFE680"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Small dots texture */}
        <circle cx="45" cy="50" r="1.5" fill="#A0600A" opacity="0.4" />
        <circle cx="70" cy="55" r="1.5" fill="#A0600A" opacity="0.4" />
        <circle cx="58" cy="48" r="1" fill="#A0600A" opacity="0.3" />
      </svg>
    );
  }

  if (half === 'left') {
    return (
      <svg viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="cookieGradL" cx="30%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#F5C842" />
            <stop offset="60%" stopColor="#E8A020" />
            <stop offset="100%" stopColor="#C47A15" />
          </radialGradient>
        </defs>
        <path
          d="M10 40 Q15 10 60 8 Q65 20 62 38 Q60 55 55 65 Q35 72 15 65 Q5 55 10 40Z"
          fill="url(#cookieGradL)"
          stroke="#A0600A"
          strokeWidth="1.5"
        />
        <path d="M30 38 Q50 28 62 36" fill="none" stroke="#A0600A" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 22 Q50 16 62 20" fill="none" stroke="#FFE680" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="cookieGradR" cx="70%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F5C842" />
          <stop offset="60%" stopColor="#E8A020" />
          <stop offset="100%" stopColor="#C47A15" />
        </radialGradient>
      </defs>
      <path
        d="M8 36 Q10 20 60 8 Q65 10 60 40 Q58 60 45 68 Q25 75 10 65 Q4 55 8 36Z"
        fill="url(#cookieGradR)"
        stroke="#A0600A"
        strokeWidth="1.5"
      />
      <path d="M8 38 Q30 28 55 34" fill="none" stroke="#A0600A" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 20 Q38 14 56 18" fill="none" stroke="#FFE680" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function Home() {
  const [state, setState] = useState<State>('idle');
  const [fortune, setFortune] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  const getRandomFortune = () => {
    const idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
  };

  const getRandomLuckyNumbers = () => {
    const nums = new Set<number>();
    while (nums.size < 6) nums.add(Math.floor(Math.random() * 99) + 1);
    return Array.from(nums);
  };

  const handleCookieClick = () => {
    if (state === 'idle') {
      setState('shaking');
      setTimeout(() => setState('cracked'), 400);
      setTimeout(() => {
        setFortune(getRandomFortune());
        setLuckyNumbers(getRandomLuckyNumbers());
        setState('revealed');
      }, 900);
    }
  };

  const handleReset = () => {
    setState('idle');
    setFortune('');
  };

  // Ornate corner SVG - traditional Chinese key/meander pattern
  const CornerOrnament = ({ flip }: { flip?: string }) => (
    <svg viewBox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip, position: 'absolute' }}>
      <g stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.85">
        {/* Outer L-shape */}
        <polyline points="2,30 2,2 30,2" />
        {/* Step pattern - meander */}
        <polyline points="8,30 8,8 30,8" />
        <polyline points="14,22 14,14 22,14" />
        {/* Inner fill square */}
        <rect x="16" y="16" width="6" height="6" fill="#FFD700" opacity="0.6" />
        {/* Decorative dots */}
        <circle cx="4" cy="4" r="2" fill="#FFD700" opacity="0.9" />
        <circle cx="32" cy="4" r="1.5" fill="#FFD700" opacity="0.6" />
        <circle cx="4" cy="32" r="1.5" fill="#FFD700" opacity="0.6" />
        {/* Lotus petal suggestion */}
        <path d="M35 10 Q42 5 50 10 Q42 15 35 10Z" fill="#FFD700" opacity="0.5" />
        <path d="M10 35 Q5 42 10 50 Q15 42 10 35Z" fill="#FFD700" opacity="0.5" />
        {/* Diamond accent */}
        <polygon points="50,2 54,6 50,10 46,6" fill="#FFD700" opacity="0.7" />
        <polygon points="2,50 6,54 2,58 0,54" fill="#FFD700" opacity="0.5" />
      </g>
    </svg>
  );

  return (
    <div className="lantern-bg min-h-screen flex flex-col items-center justify-center px-6 py-12 select-none">

      {/* Full-screen ornate border system */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Outermost border */}
        <div className="absolute inset-2" style={{ border: '1px solid rgba(255,215,0,0.3)' }} />
        {/* Main gold border */}
        <div className="absolute inset-4" style={{ border: '2px solid rgba(255,215,0,0.7)', boxShadow: 'inset 0 0 15px rgba(255,150,0,0.1)' }} />
        {/* Inner border */}
        <div className="absolute inset-7" style={{ border: '1px solid rgba(255,215,0,0.35)' }} />

        {/* Top decorative band */}
        <div className="absolute top-4 left-4 right-4 h-6 flex items-center justify-center overflow-hidden" style={{ borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
          <div className="flex items-center gap-3 opacity-60">
            {Array.from({length: 20}).map((_, i) => (
              <span key={i} className="text-[#FFD700] text-[8px]">◆</span>
            ))}
          </div>
        </div>

        {/* Bottom decorative band */}
        <div className="absolute bottom-4 left-4 right-4 h-6 flex items-center justify-center overflow-hidden" style={{ borderTop: '1px solid rgba(255,215,0,0.3)' }}>
          <div className="flex items-center gap-3 opacity-60">
            {Array.from({length: 20}).map((_, i) => (
              <span key={i} className="text-[#FFD700] text-[8px]">◆</span>
            ))}
          </div>
        </div>

        {/* Left decorative band */}
        <div className="absolute top-4 bottom-4 left-4 w-6 flex flex-col items-center justify-center overflow-hidden" style={{ borderRight: '1px solid rgba(255,215,0,0.3)' }}>
          <div className="flex flex-col items-center gap-3 opacity-50">
            {Array.from({length: 15}).map((_, i) => (
              <span key={i} className="text-[#FFD700] text-[8px]">✦</span>
            ))}
          </div>
        </div>

        {/* Right decorative band */}
        <div className="absolute top-4 bottom-4 right-4 w-6 flex flex-col items-center justify-center overflow-hidden" style={{ borderLeft: '1px solid rgba(255,215,0,0.3)' }}>
          <div className="flex flex-col items-center gap-3 opacity-50">
            {Array.from({length: 15}).map((_, i) => (
              <span key={i} className="text-[#FFD700] text-[8px]">✦</span>
            ))}
          </div>
        </div>

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 4, left: 4 }}><CornerOrnament /></div>
        <div style={{ position: 'absolute', top: 4, right: 4 }}><CornerOrnament flip="scaleX(-1)" /></div>
        <div style={{ position: 'absolute', bottom: 4, left: 4 }}><CornerOrnament flip="scaleY(-1)" /></div>
        <div style={{ position: 'absolute', bottom: 4, right: 4 }}><CornerOrnament flip="scale(-1)" /></div>
      </div>

      {/* Main content panel */}
      <div className="relative w-full max-w-sm px-8 py-10"
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,215,0,0.5)',
          boxShadow: '0 0 0 3px rgba(139,0,0,0.9), 0 0 0 5px rgba(255,215,0,0.4), 0 0 0 7px rgba(139,0,0,0.5), 0 0 40px rgba(255,100,0,0.15)',
        }}>

        {/* Inner panel border */}
        <div className="absolute inset-2 pointer-events-none" style={{ border: '1px solid rgba(255,215,0,0.2)' }} />

        {/* Panel corner diamonds */}
        {[{t:'top-1 left-1'},{t:'top-1 right-1'},{t:'bottom-1 left-1'},{t:'bottom-1 right-1'}].map(({t}, i) => (
          <div key={i} className={`absolute ${t} text-[#FFD700] text-xs opacity-90 leading-none`}>◆</div>
        ))}

        {/* Top panel ornament */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B0000] px-3">
          <span className="text-[#FFD700] text-base tracking-widest">❧ ✦ ❦</span>
        </div>

        {/* Bottom panel ornament */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#8B0000] px-3">
          <span className="text-[#FFD700] text-base tracking-widest">❧ ✦ ❦</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#FFD700] text-xs tracking-[0.3em] uppercase mb-2 shimmer">✦ Ancient Wisdom ✦</p>
          <h1 className="text-[#FFD700] text-4xl font-bold tracking-wide" style={{ textShadow: '0 0 20px rgba(255,200,0,0.5)' }}>
            Fortune Cookie
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-8 bg-[#FFD700] opacity-40" />
            <span className="text-[#FFD700] opacity-40 text-[8px]">◆◆◆</span>
            <span className="text-[#FFD700] opacity-80 text-sm">🏮</span>
            <span className="text-[#FFD700] opacity-40 text-[8px]">◆◆◆</span>
            <div className="h-px w-8 bg-[#FFD700] opacity-40" />
          </div>
        </div>

      {/* Cookie area */}
      <div className="flex flex-col items-center mb-8">
        {state === 'idle' && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleCookieClick}
              className="w-40 h-28 cursor-pointer hover:scale-105 transition-transform active:scale-95 cookie-float"
              aria-label="Click to crack open fortune cookie"
            >
              <CookieSVG />
            </button>
            <p className="text-[#FFD700] text-sm opacity-70 animate-pulse">Tap to crack open</p>
          </div>
        )}

        {state === 'shaking' && (
          <div className="w-40 h-28 cookie-shake">
            <CookieSVG />
          </div>
        )}

        {(state === 'cracked' || state === 'revealed') && (
          <div className="flex items-start justify-center gap-2">
            <div className={`w-24 h-20 ${state === 'cracked' ? 'cookie-left-crack' : ''}`} style={{ transform: state === 'revealed' ? 'rotate(-25deg) translateX(-40px) translateY(-10px)' : undefined }}>
              <CookieSVG half="left" />
            </div>
            <div className={`w-24 h-20 ${state === 'cracked' ? 'cookie-right-crack' : ''}`} style={{ transform: state === 'revealed' ? 'rotate(25deg) translateX(40px) translateY(-10px)' : undefined }}>
              <CookieSVG half="right" />
            </div>
          </div>
        )}
      </div>

      {/* Fortune slip */}
      {state === 'revealed' && (
        <div className="fortune-reveal w-full max-w-sm">
          {/* Paper slip */}
          <div className="bg-[#FFF9E6] rounded-sm shadow-lg px-6 py-5 mb-6 relative border border-[#E8D89A]">
            {/* Decorative border lines */}
            <div className="absolute inset-2 border border-[#C8A84B] opacity-30 rounded-sm pointer-events-none" />
            <p className="text-[#3D2000] text-center text-lg leading-relaxed font-serif italic px-2">
              &ldquo;{fortune}&rdquo;
            </p>
          </div>

          {/* Lucky numbers */}
          <div className="text-center mb-8">
            <p className="text-[#FFD700] text-xs tracking-[0.2em] uppercase opacity-70 mb-3">Lucky Numbers</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {luckyNumbers.map((n) => (
                <span
                  key={n}
                  className="w-9 h-9 rounded-full bg-[#FFD700] text-[#8B0000] text-sm font-bold flex items-center justify-center"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Another cookie button */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="border border-[#FFD700] text-[#FFD700] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[#FFD700] hover:text-[#8B0000] transition-colors cursor-pointer"
            >
              Another Cookie
            </button>
          </div>
        </div>
      )}
      </div>{/* end main content panel */}
    </div>
  );
}
