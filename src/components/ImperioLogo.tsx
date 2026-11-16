import React from 'react';

interface ImperioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ImperioLogo: React.FC<ImperioLogoProps> = ({ className = '', size = 'md' }) => {
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
      {/* 
        ÁREA RESERVADA PARA LOGOTIPO IMPÉRIO PHARMA:
        Caso o arquivo de imagem do logotipo da Império Pharma esteja disponível,
        ele pode ser inserido diretamente na tag <img src="..." alt="IMPÉRIO PHARMA" />
      */}
      <div
        className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#292319] via-[#0B0906] to-[#0B0906] border border-[#C99720]/80 p-1.5 shadow-[0_0_15px_rgba(242,185,30,0.25)] ${iconSizes[size]}`}
      >
        {/* Imperial Crown & Crest Pharma SVG emblem */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-[#F2B91E] drop-shadow-[0_0_6px_rgba(242,185,30,0.6)]"
        >
          {/* Imperial Crown */}
          <path
            d="M3 8l3.5 5 5.5-7 5.5 7L21 8l-2 10H5L3 8z"
            fill="url(#goldGrad)"
            stroke="#F2B91E"
            strokeWidth="1.5"
          />
          {/* Crown Jewels / Accents */}
          <circle cx="3" cy="8" r="1" fill="#FFFFFF" />
          <circle cx="12" cy="6" r="1.2" fill="#FFFFFF" />
          <circle cx="21" cy="8" r="1" fill="#FFFFFF" />
          <path d="M7 16h10" stroke="#C99720" strokeWidth="1.5" />
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2B91E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C99720" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-heading font-black tracking-wider uppercase ${sizeClasses[size]}`}>
          <span className="text-[#F2B91E] drop-shadow-[0_0_12px_rgba(242,185,30,0.35)]">IMPÉRIO</span>{' '}
          <span className="text-white">PHARMA</span>
        </span>
      </div>
    </div>
  );
};
