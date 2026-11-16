import React from 'react';
import { BrandType } from '../types/brand.ts';

interface BrandSelectorProps {
  activeBrand: BrandType;
  onSelectBrand: (brand: BrandType) => void;
  variant?: 'header' | 'hero' | 'floating';
  fullWidth?: boolean;
  className?: string;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  activeBrand,
  onSelectBrand,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-all ${
        fullWidth ? 'w-full grid grid-cols-3 gap-1.5 shadow-lg' : 'flex gap-1 shadow-md'
      } ${
        activeBrand === 'imperio'
          ? 'bg-[#0B0906]/95 border-[#C99720]/40 shadow-[0_2px_15px_rgba(201,151,32,0.15)]'
          : activeBrand === 'kronos'
          ? 'bg-[#040814]/95 border-[#00B4FF]/45 shadow-[0_2px_18px_rgba(0,180,255,0.18)]'
          : 'bg-neutral-950/95 border-neutral-800 shadow-[0_2px_15px_rgba(220,38,38,0.12)]'
      } ${className}`}
      role="radiogroup"
      aria-label="Seletor de Marca"
    >
      {/* Brand 1: GENOMA LABS */}
      <button
        type="button"
        role="radio"
        aria-checked={activeBrand === 'genoma'}
        onClick={() => onSelectBrand('genoma')}
        className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-heading font-black tracking-wider uppercase transition-all duration-200 select-none ${
          fullWidth ? 'w-full' : ''
        } ${
          activeBrand === 'genoma'
            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/60 border border-red-500/50'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
        }`}
      >
        {/* DNA Mini Icon */}
        <span
          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
            activeBrand === 'genoma' ? 'text-white' : 'text-red-500'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-full h-full">
            <path d="M4 6c4 0 6 3 8 6s4 6 8 6" />
            <path d="M4 18c4 0 6-3 8-6s4-6 8-6" opacity="0.8" />
            <line x1="6" y1="7.5" x2="6" y2="16.5" strokeWidth="2" />
          </svg>
        </span>
        <span className="whitespace-nowrap font-black">
          {fullWidth ? 'Genoma' : 'Genoma'}
        </span>
      </button>

      {/* Brand 2: IMPÉRIO PHARMA */}
      <button
        type="button"
        role="radio"
        aria-checked={activeBrand === 'imperio'}
        onClick={() => onSelectBrand('imperio')}
        className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-heading font-black tracking-wider uppercase transition-all duration-200 select-none ${
          fullWidth ? 'w-full' : ''
        } ${
          activeBrand === 'imperio'
            ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] text-black shadow-md shadow-yellow-950/40 border border-[#F2B91E]'
            : 'text-neutral-400 hover:text-[#F2B91E] hover:bg-neutral-900/60'
        }`}
      >
        {/* Crown Mini Icon */}
        <span
          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
            activeBrand === 'imperio' ? 'text-black' : 'text-[#F2B91E]'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-full h-full">
            <path d="M3 8l3.5 5 5.5-7 5.5 7L21 8l-2 10H5L3 8z" />
          </svg>
        </span>
        <span className="whitespace-nowrap font-black">
          {fullWidth ? 'Império' : 'Império'}
        </span>
      </button>

      {/* Brand 3: KRONOS PHARMA */}
      <button
        type="button"
        role="radio"
        aria-checked={activeBrand === 'kronos'}
        onClick={() => onSelectBrand('kronos')}
        className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-heading font-black tracking-wider uppercase transition-all duration-200 select-none ${
          fullWidth ? 'w-full' : ''
        } ${
          activeBrand === 'kronos'
            ? 'bg-gradient-to-r from-[#1D4ED8] via-[#00B4FF] to-[#2563EB] text-[#040814] shadow-[0_0_16px_rgba(0,180,255,0.4)] border border-[#38BDF8]'
            : 'text-neutral-400 hover:text-[#38BDF8] hover:bg-neutral-900/60'
        }`}
      >
        {/* Hex Kronos Mini Icon */}
        <span
          className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
            activeBrand === 'kronos' ? 'text-[#040814]' : 'text-[#00B4FF]'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-full h-full">
            <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5 12 2" />
            <path d="M9 8h6l-3 4 3 4H9l3-4-3-4z" />
          </svg>
        </span>
        <span className="whitespace-nowrap font-black">
          Kronos
        </span>
      </button>
    </div>
  );
};
