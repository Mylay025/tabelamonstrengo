import React from 'react';

interface KronosLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const KronosLogo: React.FC<KronosLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1A3D] via-[#071129] to-[#040814] border border-[#00B4FF]/60 p-1.5 shadow-[0_0_18px_rgba(0,180,255,0.28)] ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-[#38BDF8] drop-shadow-[0_0_6px_rgba(0,180,255,0.7)]"
        >
          {/* Futuristic Hexagonal Kronos Shield / Hourglass Emblem */}
          <polygon
            points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5 12 2"
            fill="url(#kronosGrad)"
            stroke="#00B4FF"
            strokeWidth="1.5"
          />
          <path d="M8.5 7.5h7L12 12l3.5 4.5h-7L12 12 8.5 7.5z" stroke="#FFFFFF" strokeWidth="1.4" />
          <defs>
            <linearGradient id="kronosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-heading font-black tracking-wider uppercase ${sizeClasses[size]}`}>
          <span className="text-metallic">KRONOS</span>{' '}
          <span className="text-[#38BDF8] drop-shadow-[0_0_12px_rgba(0,180,255,0.45)]">PHARMA</span>
        </span>
      </div>
    </div>
  );
};
