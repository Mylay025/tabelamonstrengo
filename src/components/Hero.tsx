import React from 'react';
import { Layers, Truck, MessageSquare, ChevronDown, ExternalLink } from 'lucide-react';
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.ts';

interface HeroProps {
  onOpenWhatsAppConfig?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsAppConfig }) => {
  const currentNumber = WHATSAPP_NUMBER || (typeof window !== 'undefined' ? localStorage.getItem('genoma_whatsapp_number') || '' : '');
  const isWhatsAppConfigured = Boolean(currentNumber.trim().replace(/\D/g, ''));
  const whatsAppUrl = isWhatsAppConfigured ? getWhatsAppUrl(currentNumber, DEFAULT_WHATSAPP_MESSAGE) : null;

  return (
    <section className="relative overflow-hidden bg-black bg-lab-grid border-b border-neutral-900 py-16 sm:py-24 lg:py-28">
      {/* Intense dark radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Decorative hairline industrial accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Main Brand Title - Metallic Finish */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight uppercase text-metallic mb-3">
          GENOMA <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">LABS</span>
        </h1>

        {/* Subtitle strictly matching prompt */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-neutral-300 mb-8 sm:mb-10 max-w-2xl">
          <span>QUALIDADE</span>
          <span className="text-red-600 font-black">|</span>
          <span>SEGURANÇA</span>
          <span className="text-red-600 font-black">|</span>
          <span>RESULTADOS</span>
        </div>

        {/* Quick Access Navigation Buttons */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          {/* Quick link: Produtos */}
          <a
            href="#produtos"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 hover:text-white rounded-lg border border-neutral-800 hover:border-red-600/60 shadow-lg transition-all duration-150"
          >
            <Layers className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Produtos</span>
          </a>

          {/* Quick link: Fretes */}
          <a
            href="#fretes"
            className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 hover:text-white rounded-lg border border-neutral-800 hover:border-red-600/60 shadow-lg transition-all duration-150"
          >
            <Truck className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Fretes</span>
          </a>

          {/* Quick link: WhatsApp */}
          {isWhatsAppConfigured && whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white rounded-lg border border-red-500/40 shadow-lg shadow-red-950/50 transition-all duration-150"
            >
              <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenWhatsAppConfig}
              className="group flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white rounded-lg border border-red-500/40 shadow-lg shadow-red-950/50 transition-all duration-150"
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
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-widest font-mono"
        >
          <span>Consultar Catálogo</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>

      </div>
    </section>
  );
};
