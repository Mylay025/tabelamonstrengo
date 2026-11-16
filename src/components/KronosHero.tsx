import React from 'react';
import { Layers, Truck, MessageSquare, ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER, getWhatsAppUrl } from '../config/whatsapp.ts';

interface KronosHeroProps {
  onOpenWhatsAppConfig?: () => void;
}

export const KronosHero: React.FC<KronosHeroProps> = ({ onOpenWhatsAppConfig }) => {
  const currentNumber = WHATSAPP_NUMBER || (typeof window !== 'undefined' ? localStorage.getItem('genoma_whatsapp_number') || '' : '');
  const isWhatsAppConfigured = Boolean(currentNumber.trim().replace(/\D/g, ''));
  const whatsAppUrl = isWhatsAppConfigured
    ? getWhatsAppUrl(currentNumber, 'Olá! Acessei a página da Kronos Pharma e gostaria de obter informações.')
    : null;

  return (
    <section className="relative overflow-hidden bg-[#040814] bg-kronos-grid border-b border-[#0E244D] py-16 sm:py-24 lg:py-28">
      {/* Intense deep navy & electric blue radial glow */}
      <div className="absolute inset-0 bg-blue-radial-glow pointer-events-none" />

      {/* Decorative hairline electric blue tech accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00B4FF]/70 to-transparent shadow-[0_0_12px_rgba(0,180,255,0.6)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Kronos Pharma Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#071129]/90 border border-[#00B4FF]/45 rounded text-xs font-mono uppercase tracking-widest text-[#38BDF8] shadow-[0_0_16px_rgba(0,180,255,0.18)] mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#00B4FF]">
            <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5 12 2" />
          </svg>
          <span>Linha Oficial Kronos Pharma</span>
        </div>

        {/* Main Brand Title - Metallic White & Electric Blue Finish */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight uppercase mb-3">
          <span className="text-metallic">KRONOS</span>{' '}
          <span className="text-[#38BDF8] drop-shadow-[0_0_25px_rgba(0,180,255,0.5)]">PHARMA</span>
        </h1>

        {/* Subtitle matching brand identity */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-slate-300 mb-8 sm:mb-10 max-w-2xl">
          <span>RESULTADOS CONSISTENTES</span>
          <span className="text-[#00B4FF] font-black hidden sm:inline">|</span>
          <span>TECNOLOGIA &amp; PRECISÃO</span>
        </div>

        {/* Quick Access Navigation Buttons */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          {/* Quick link: Produtos */}
          <a
            href="#produtos"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-[#071129]/90 hover:bg-[#0B1A3D] text-slate-100 hover:text-white rounded-lg border border-[#1E40AF]/60 hover:border-[#00B4FF] shadow-[0_0_15px_rgba(37,99,235,0.18)] transition-all duration-150"
          >
            <Layers className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Produtos</span>
          </a>

          {/* Quick link: Fretes */}
          <a
            href="#fretes"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-[#071129]/90 hover:bg-[#0B1A3D] text-slate-100 hover:text-white rounded-lg border border-[#1E40AF]/60 hover:border-[#00B4FF] shadow-[0_0_15px_rgba(37,99,235,0.18)] transition-all duration-150"
          >
            <Truck className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Fretes</span>
          </a>

          {/* Quick link: WhatsApp */}
          {isWhatsAppConfigured && whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#0284C7] hover:from-[#2563EB] hover:to-[#00B4FF] text-white font-black rounded-lg border border-[#38BDF8]/60 shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all duration-150"
            >
              <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenWhatsAppConfig}
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#0284C7] hover:from-[#2563EB] hover:to-[#00B4FF] text-white font-black rounded-lg border border-[#38BDF8]/60 shadow-[0_0_20px_rgba(0,180,255,0.3)] transition-all duration-150"
              title="Configurar número do WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            </button>
          )}
        </div>

        {/* Scroll indicator */}
        <a
          href="#produtos"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#38BDF8] transition-colors uppercase tracking-widest font-mono"
        >
          <span>Consultar Catálogo Kronos</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#00B4FF] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
