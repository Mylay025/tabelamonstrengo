import React from 'react';
import { Logo } from './Logo.tsx';
import { ImperioLogo } from './ImperioLogo.tsx';
import { BrandType } from '../types/brand.ts';

interface FooterProps {
  onOpenWhatsAppConfig?: () => void;
  brand?: BrandType;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsAppConfig, brand = 'genoma' }) => {
  const isImperio = brand === 'imperio';

  return (
    <footer
      className={`w-full border-t py-10 transition-colors ${
        isImperio ? 'bg-[#0B0906] border-[#292319]' : 'bg-black border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            {isImperio ? <ImperioLogo size="sm" /> : <Logo size="sm" />}
            <p className="text-xs text-neutral-500 font-mono tracking-wider">
              QUALIDADE | SEGURANÇA | RESULTADOS
            </p>
          </div>

          {/* Quick anchor links */}
          <div className="flex items-center gap-6 text-xs uppercase font-bold tracking-wider text-neutral-400">
            <a
              href="#produtos"
              className={`transition-colors ${isImperio ? 'hover:text-[#F2B91E]' : 'hover:text-red-500'}`}
            >
              Produtos
            </a>
            <a
              href="#orcamento"
              className={`transition-colors ${isImperio ? 'hover:text-[#F2B91E]' : 'hover:text-red-500'}`}
            >
              Orçamento
            </a>
            <a
              href="#fretes"
              className={`transition-colors ${isImperio ? 'hover:text-[#F2B91E]' : 'hover:text-red-500'}`}
            >
              Fretes
            </a>
          </div>

          {/* Copyright notice */}
          <div className="text-center md:text-right text-xs text-neutral-600 font-mono">
            <span>
              &copy; {new Date().getFullYear()} {isImperio ? 'IMPÉRIO PHARMA' : 'GENOMA LABS'}. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
