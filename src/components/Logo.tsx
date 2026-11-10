import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
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
        ÁREA RESERVADA PARA LOGOTIPO:
        Caso o arquivo de imagem do logotipo da Genoma Labs esteja disponível,
        ele pode ser inserido diretamente na tag <img src="..." alt="GENOMA LABS" />
      */}
      <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-red-600/60 p-1.5 shadow-[0_0_15px_rgba(220,38,38,0.25)] ${iconSizes[size]}`}>
        {/* Minimalist industrial laboratory emblem */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-full h-full text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
        >
          {/* DNA double helix / molecular structure */}
          <path d="M4 6c4 0 6 3 8 6s4 6 8 6" stroke="currentColor" />
          <path d="M4 18c4 0 6-3 8-6s4-6 8-6" stroke="#ffffff" strokeOpacity="0.8" />
          <line x1="6" y1="7.5" x2="6" y2="16.5" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="12" y1="10" x2="12" y2="14" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="18" y1="7.5" x2="18" y2="16.5" stroke="#ef4444" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-heading font-black tracking-wider uppercase text-metallic ${sizeClasses[size]}`}>
          GENOMA <span className="text-red-500 font-black">LABS</span>
        </span>
      </div>
    </div>
  );
};
