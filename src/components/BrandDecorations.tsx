import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="6" fill="#6B4CE6" />
        <circle cx="21" cy="11" r="6" fill="#FFD454" />
        <circle cx="11" cy="21" r="6" fill="#B9A4F9" />
        <circle cx="21" cy="21" r="6" fill="#6B4CE6" />
        <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
      </svg>
      <span className="text-[19px] font-extrabold tracking-tight text-[#181725] whitespace-nowrap">
        BrightSprout
      </span>
    </span>
  );
}

export function WavyUnderline({
  color = '#B9A4F9',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 11.5C22 4.5 39 14.5 60 8.5C81 2.5 99 13.5 121 7.5C143 1.5 159 12 177 6"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OvalHighlight({
  color = '#FFD454',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M16 38C12 19 52 7 113 7C174 7 211 20 207 37C203 54 159 62 104 61C49 60 21 49 23 33"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoopingArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 92 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M18 6C8 24 14 48 34 50C49 51 54 37 44 31C34 25 26 39 36 53C46 66 68 68 85 57"
        stroke="#6B4CE6"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M77 52L87 56.5L81 66"
        stroke="#6B4CE6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircularSeal({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 112 112" className="w-full h-full">
        <defs>
          <path
            id="brightsprout-seal-path"
            d="M 56, 56 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <circle cx="56" cy="56" r="52" fill="#FFFBEB" stroke="#FFD454" strokeWidth="1.5" />
        <text
          fill="#666476"
          fontSize="9.2"
          fontWeight="700"
          letterSpacing="2.3"
        >
          <textPath href="#brightsprout-seal-path" startOffset="0%">
            BRIGHTSPROUT • LEARN &amp; PLAY •
          </textPath>
        </text>
        <circle cx="48" cy="48" r="6" fill="#6B4CE6" />
        <circle cx="64" cy="48" r="6" fill="#FFD454" />
        <circle cx="48" cy="64" r="6" fill="#B9A4F9" />
        <circle cx="64" cy="64" r="6" fill="#6B4CE6" />
      </svg>
    </div>
  );
}

export function ConcentricRings({
  color = '#DFD3FE',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <circle cx="60" cy="60" r="10" stroke={color} strokeWidth="5" />
      <circle cx="60" cy="60" r="22" stroke={color} strokeWidth="5" />
      <circle cx="60" cy="60" r="34" stroke={color} strokeWidth="5" />
      <circle cx="60" cy="60" r="46" stroke={color} strokeWidth="5" />
      <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="4" />
    </svg>
  );
}

export function ScallopedSun({
  color = '#FFD454',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M50 4L58 13L69 7L73 18L85 16L84 28L95 31L90 42L98 50L90 58L95 69L84 72L85 84L73 82L69 93L58 87L50 96L42 87L31 93L27 82L15 84L16 72L5 69L10 58L2 50L10 42L5 31L16 28L15 16L27 18L31 7L42 13L50 4Z"
        fill={color}
      />
    </svg>
  );
}

export function WavyScribble({
  color = '#DFD3FE',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 48C22 22 32 18 38 42C44 66 54 68 62 38C70 10 82 12 88 40C94 68 106 66 116 36C126 8 138 14 144 40C150 64 162 60 168 34"
        stroke={color}
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DotGrid({
  color = '#FFF8DC',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  const dots: Array<{ cx: number; cy: number }> = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      dots.push({ cx: 8 + c * 14, cy: 8 + r * 14 });
    }
  }
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {dots.map((d, idx) => (
        <circle key={idx} cx={d.cx} cy={d.cy} r="2.6" fill={color} />
      ))}
    </svg>
  );
}

export function ArrowBadge({
  variant = 'purple',
}: {
  variant?: 'purple' | 'white';
}) {
  const bg = variant === 'white' ? 'bg-white text-[#6B4CE6]' : 'bg-[#6B4CE6] text-white';
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${bg}`}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFE9FE] via-[#FAF7FF] to-[#FFF4D1] text-[#6B4CE6] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-7 h-7 mb-2 opacity-80" aria-hidden="true" />
        <span className="text-xs font-semibold text-[#181725] line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
