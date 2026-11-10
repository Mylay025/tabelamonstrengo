import React from 'react';
import { Layers, Truck, MessageSquare, ChevronDown } from 'lucide-react';
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.ts';

interface ImperioHeroProps {
  onOpenWhatsAppConfig?: () => void;
}

export const ImperioHero: React.FC<ImperioHeroProps> = ({ onOpenWhatsAppConfig }) => {
  const currentNumber = WHATSAPP_NUMBER || (typeof window !== 'undefined' ? localStorage.getItem('genoma_whatsapp_number') || '' : '');
  const isWhatsAppConfigured = Boolean(currentNumber.trim().replace(/\D/g, ''));
  const whatsAppUrl = isWhatsAppConfigured
    ? getWhatsAppUrl(currentNumber, 'Olá! Acessei a página da Império Pharma e gostaria de obter informações.')
    : null;

  return (
    <section className="relative overflow-hidden bg-[#0B0906] bg-imperio-grid border-b border-[#292319] py-16 sm:py-24 lg:py-28">
      {/* Intense dark gold radial glow */}
      <div className="absolute inset-0 bg-gold-radial-glow pointer-events-none" />

      {/* Decorative hairline gold industrial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#F2B91E]/60 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Imperial Badge / Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#292319]/80 border border-[#C99720]/50 rounded text-xs font-mono uppercase tracking-widest text-[#F2B91E] mb-4">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#F2B91E]">
            <path d="M3 8l3.5 5 5.5-7 5.5 7L21 8l-2 10H5L3 8z" />
          </svg>
          <span>Linha Oficial Império Pharma</span>
        </div>

        {/* Main Brand Title - Império Gold & White Finish */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight uppercase mb-3">
          <span className="text-[#F2B91E] drop-shadow-[0_0_25px_rgba(242,185,30,0.4)]">IMPÉRIO</span>{' '}
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">PHARMA</span>
        </h1>

        {/* Subtitle strictly matching prompt */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-neutral-300 mb-8 sm:mb-10 max-w-2xl">
          <span>QUALIDADE</span>
          <span className="text-[#F2B91E] font-black">|</span>
          <span>SEGURANÇA</span>
          <span className="text-[#F2B91E] font-black">|</span>
          <span>RESULTADOS</span>
        </div>

        {/* Quick Access Navigation Buttons */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          {/* Quick link: Produtos */}
          <a
            href="#produtos"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0B0906] hover:bg-[#292319]/80 text-neutral-100 hover:text-white rounded-lg border border-[#C99720]/40 hover:border-[#F2B91E] shadow-lg transition-all duration-150"
          >
            <Layers className="w-4 h-4 text-[#F2B91E] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Produtos</span>
          </a>

          {/* Quick link: Fretes */}
          <a
            href="#fretes"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0B0906] hover:bg-[#292319]/80 text-neutral-100 hover:text-white rounded-lg border border-[#C99720]/40 hover:border-[#F2B91E] shadow-lg transition-all duration-150"
          >
            <Truck className="w-4 h-4 text-[#F2B91E] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Fretes</span>
          </a>

          {/* Quick link: WhatsApp */}
          {isWhatsAppConfigured && whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black font-black rounded-lg border border-[#F2B91E]/60 shadow-lg shadow-yellow-950/40 transition-all duration-150"
            >
              <MessageSquare className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenWhatsAppConfig}
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black font-black rounded-lg border border-[#F2B91E]/60 shadow-lg shadow-yellow-950/40 transition-all duration-150"
              title="Configurar número do WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            </button>
          )}
        </div>

        {/* Scroll indicator */}
        <a
          href="#produtos"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#F2B91E] transition-colors uppercase tracking-widest font-mono"
        >
          <span>Consultar Catálogo Império</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#F2B91E] animate-bounce" />
        </a>

      </div>
    </section>
  );
};
