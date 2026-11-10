import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { ImperioLogo } from './ImperioLogo.tsx';
import { BrandSelector } from './BrandSelector.tsx';
import { BrandType } from '../types/brand.ts';
import { Menu, X, ArrowRight, ShoppingCart } from 'lucide-react';
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.ts';

interface HeaderProps {
  onOpenWhatsAppConfig?: () => void;
  quoteCount?: number;
  onOpenQuote?: () => void;
  brand?: BrandType;
  onSelectBrand?: (brand: BrandType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWhatsAppConfig,
  quoteCount = 0,
  onOpenQuote,
  brand = 'genoma',
  onSelectBrand,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isImperio = brand === 'imperio';

  // Check WhatsApp status
  const currentNumber = WHATSAPP_NUMBER || (typeof window !== 'undefined' ? localStorage.getItem('genoma_whatsapp_number') || '' : '');
  const isWhatsAppConfigured = Boolean(currentNumber.trim().replace(/\D/g, ''));
  const whatsAppUrl = isWhatsAppConfigured
    ? getWhatsAppUrl(
        currentNumber,
        isImperio
          ? 'Olá! Acessei a página da Império Pharma e gostaria de obter informações.'
          : DEFAULT_WHATSAPP_MESSAGE
      )
    : null;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!isWhatsAppConfigured) {
      e.preventDefault();
      if (onOpenWhatsAppConfig) {
        onOpenWhatsAppConfig();
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full backdrop-blur-md transition-colors ${
        isImperio
          ? 'bg-[#0B0906]/95 border-b border-[#292319]'
          : 'bg-black/90 border-b border-neutral-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 md:gap-8 h-16 sm:h-20">
          
          {/* Zone 1: Brand Wordmark & Desktop Selector */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 min-w-0">
            <a href="#" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
              {isImperio ? <ImperioLogo size="md" /> : <Logo size="md" />}
            </a>

            {/* Brand Switcher - Desktop & Tablet */}
            {onSelectBrand && (
              <div className="hidden sm:block">
                <BrandSelector activeBrand={brand} onSelectBrand={onSelectBrand} />
              </div>
            )}
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm font-semibold tracking-wider uppercase text-neutral-300">
            <a
              href="#produtos"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 border-transparent ${
                isImperio ? 'hover:text-[#F2B91E] hover:border-[#F2B91E]' : 'hover:text-red-500 hover:border-red-600'
              }`}
            >
              Produtos
            </a>

            <a
              href="#orcamento"
              onClick={(e) => {
                if (onOpenQuote && quoteCount > 0) {
                  // If drawer exists or wants to jump
                }
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 border-transparent flex items-center gap-1.5 ${
                isImperio ? 'hover:text-[#F2B91E] hover:border-[#F2B91E]' : 'hover:text-red-500 hover:border-red-600'
              }`}
            >
              <span>Orçamento</span>
              {quoteCount > 0 && (
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isImperio ? 'bg-[#F2B91E] text-black' : 'bg-red-600 text-white'
                  }`}
                >
                  {quoteCount}
                </span>
              )}
            </a>

            <a
              href="#fretes"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 border-transparent ${
                isImperio ? 'hover:text-[#F2B91E] hover:border-[#F2B91E]' : 'hover:text-red-500 hover:border-red-600'
              }`}
            >
              Fretes
            </a>

            <a
              href={isWhatsAppConfigured && whatsAppUrl ? whatsAppUrl : '#contato'}
              onClick={handleWhatsAppClick}
              target={isWhatsAppConfigured ? '_blank' : undefined}
              rel={isWhatsAppConfigured ? 'noopener noreferrer' : undefined}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 border-transparent flex items-center gap-1.5 ${
                isImperio ? 'hover:text-[#F2B91E] hover:border-[#F2B91E]' : 'hover:text-red-500 hover:border-red-600'
              }`}
            >
              <span>Fale com o vendedor</span>
            </a>
          </nav>

          {/* Zone 3: Primary CTA Button & Quick Quote Cart */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {quoteCount > 0 && onOpenQuote && (
              <button
                type="button"
                onClick={onOpenQuote}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  isImperio
                    ? 'bg-[#14110C] hover:bg-[#292319] text-[#F2B91E] border border-[#C99720]/50 hover:border-[#F2B91E]'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-red-600'
                }`}
                title="Ver lista de orçamento"
              >
                <ShoppingCart className={`w-4 h-4 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
                <span>Orçamento ({quoteCount})</span>
              </button>
            )}

            {isWhatsAppConfigured && whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 ${
                  isImperio
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black font-black border border-[#F2B91E]/60 shadow-yellow-950/40'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:from-red-800 text-white border border-red-500/30 shadow-red-950/40'
                }`}
              >
                <span>Falar com o vendedor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenWhatsAppConfig}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 ${
                  isImperio
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black font-black border border-[#F2B91E]/60 shadow-yellow-950/40'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:from-red-800 text-white border border-red-500/30 shadow-red-950/40'
                }`}
                title="Configurar número de WhatsApp"
              >
                <span>Falar com o vendedor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Cart & Hamburger (Element 3) */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {quoteCount > 0 && onOpenQuote && (
              <button
                type="button"
                onClick={onOpenQuote}
                className={`relative p-2 rounded-lg border transition-colors ${
                  isImperio
                    ? 'text-[#F2B91E] bg-[#14110C] border-[#292319]'
                    : 'text-neutral-200 bg-neutral-900 border border-neutral-800'
                }`}
                aria-label="Abrir orçamento"
              >
                <ShoppingCart className={`w-5 h-5 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-mono font-bold flex items-center justify-center ${
                    isImperio ? 'bg-[#F2B91E] text-black' : 'bg-red-600 text-white'
                  }`}
                >
                  {quoteCount}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isImperio
                  ? 'text-neutral-200 border-[#292319] bg-[#14110C] hover:border-[#C99720]'
                  : 'text-neutral-300 hover:text-white border-neutral-800 bg-neutral-900/60'
              }`}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dedicated Mobile Brand Selector Bar - 100% full width, zero clipping on any phone */}
        {onSelectBrand && (
          <div className="sm:hidden pb-3 pt-1 flex justify-center w-full">
            <BrandSelector activeBrand={brand} onSelectBrand={onSelectBrand} fullWidth />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-6 py-6 space-y-4 animate-fadeIn ${
            isImperio ? 'bg-[#0B0906] border-[#292319]' : 'bg-neutral-950/98 border-neutral-800'
          }`}
        >
          {/* Brand Switcher in Mobile Drawer */}
          {onSelectBrand && (
            <div className="pb-3 border-b border-neutral-800/80">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                Selecionar Marca
              </span>
              <BrandSelector activeBrand={brand} onSelectBrand={onSelectBrand} fullWidth />
            </div>
          )}

          <nav className="flex flex-col space-y-3">
            <a
              href="#produtos"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-bold tracking-wider uppercase py-2 border-b flex items-center justify-between ${
                isImperio
                  ? 'text-neutral-200 hover:text-[#F2B91E] border-[#292319]'
                  : 'text-neutral-200 hover:text-red-500 border-neutral-900'
              }`}
            >
              <span>Produtos</span>
              <ArrowRight className={`w-4 h-4 ${isImperio ? 'text-[#F2B91E]' : 'text-red-600'}`} />
            </a>

            <a
              href="#orcamento"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-bold tracking-wider uppercase py-2 border-b flex items-center justify-between ${
                isImperio
                  ? 'text-neutral-200 hover:text-[#F2B91E] border-[#292319]'
                  : 'text-neutral-200 hover:text-red-500 border-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Orçamento</span>
                {quoteCount > 0 && (
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full font-bold ${
                      isImperio ? 'bg-[#F2B91E] text-black' : 'bg-red-600 text-white'
                    }`}
                  >
                    {quoteCount}
                  </span>
                )}
              </div>
              <ArrowRight className={`w-4 h-4 ${isImperio ? 'text-[#F2B91E]' : 'text-red-600'}`} />
            </a>

            <a
              href="#fretes"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-bold tracking-wider uppercase py-2 border-b flex items-center justify-between ${
                isImperio
                  ? 'text-neutral-200 hover:text-[#F2B91E] border-[#292319]'
                  : 'text-neutral-200 hover:text-red-500 border-neutral-900'
              }`}
            >
              <span>Fretes</span>
              <ArrowRight className={`w-4 h-4 ${isImperio ? 'text-[#F2B91E]' : 'text-red-600'}`} />
            </a>

            <a
              href={isWhatsAppConfigured && whatsAppUrl ? whatsAppUrl : '#contato'}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleWhatsAppClick(e);
              }}
              target={isWhatsAppConfigured ? '_blank' : undefined}
              rel={isWhatsAppConfigured ? 'noopener noreferrer' : undefined}
              className={`text-base font-bold tracking-wider uppercase py-2 border-b flex items-center justify-between ${
                isImperio
                  ? 'text-neutral-200 hover:text-[#F2B91E] border-[#292319]'
                  : 'text-neutral-200 hover:text-red-500 border-neutral-900'
              }`}
            >
              <span>Fale com o vendedor</span>
              <ArrowRight className={`w-4 h-4 ${isImperio ? 'text-[#F2B91E]' : 'text-red-600'}`} />
            </a>
          </nav>

          <div className="pt-2">
            {isWhatsAppConfigured && whatsAppUrl ? (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 font-bold text-center uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg ${
                  isImperio
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] text-black font-black shadow-yellow-950/40'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950'
                }`}
              >
                <span>Falar com o vendedor</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenWhatsAppConfig) onOpenWhatsAppConfig();
                }}
                className={`w-full py-3 font-bold text-center uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg ${
                  isImperio
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] text-black font-black shadow-yellow-950/40'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950'
                }`}
              >
                <span>Falar com o vendedor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
