import React from 'react';
import { QuoteItem } from '../types/quote.ts';
import { BrandType } from '../types/brand.ts';
import { calculateTotal, calculateTotalUnits, formatCurrency, getWhatsAppQuoteUrl } from '../utils/quote.ts';
import { ShoppingCart, Send } from 'lucide-react';

interface FloatingQuoteBarProps {
  quoteItems: QuoteItem[];
  onOpenDrawer: () => void;
  brand?: BrandType;
}

export const FloatingQuoteBar: React.FC<FloatingQuoteBarProps> = ({
  quoteItems,
  onOpenDrawer,
  brand = 'genoma',
}) => {
  if (quoteItems.length === 0) return null;

  const isImperio = brand === 'imperio';
  const brandDisplayName = isImperio ? 'Império Pharma' : 'Genoma Labs';

  const total = calculateTotal(quoteItems);
  const totalUnits = calculateTotalUnits(quoteItems);
  const whatsAppUrl = getWhatsAppQuoteUrl(quoteItems, brandDisplayName);

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto z-40 max-w-md animate-slideUp">
      <div
        className={`backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 border ${
          isImperio
            ? 'bg-[#0B0906]/95 border-[#C99720]/50'
            : 'bg-neutral-950/95 border-red-600/40'
        }`}
      >
        {/* Info & Click to open drawer */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity flex-1 min-w-0"
        >
          <div
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isImperio
                ? 'bg-[#14110C] border-[#C99720]/60 text-[#F2B91E]'
                : 'bg-red-950 border-red-600/50 text-red-500'
            }`}
          >
            <ShoppingCart className={`w-5 h-5 ${isImperio ? 'text-[#F2B91E]' : 'text-red-400'}`} />
            <span
              className={`absolute -top-1 -right-1 w-5 h-5 rounded-full font-mono font-bold text-[10px] flex items-center justify-center border-2 border-black ${
                isImperio ? 'bg-[#F2B91E] text-black' : 'bg-red-600 text-white'
              }`}
            >
              {totalUnits}
            </span>
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-mono text-neutral-400 truncate uppercase tracking-wider">
              {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'} no orçamento
            </div>
            <div
              className={`text-sm sm:text-base font-heading font-black tabular-nums truncate ${
                isImperio ? 'text-[#F2B91E]' : 'text-red-500'
              }`}
            >
              {formatCurrency(total)}
            </div>
          </div>
        </button>

        {/* Action Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenDrawer}
            className={`px-3 py-2 text-xs font-bold uppercase rounded-lg border transition-colors ${
              isImperio
                ? 'bg-[#14110C] hover:bg-[#292319] text-neutral-200 border-[#292319]'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
            }`}
          >
            Ver Lista
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 sm:px-4 py-2 text-xs font-heading font-black uppercase rounded-lg flex items-center gap-1.5 shadow-md transition-transform active:scale-95 ${
              isImperio
                ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black shadow-yellow-950/40'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-950'
            }`}
            title="Enviar orçamento direto para o WhatsApp"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
