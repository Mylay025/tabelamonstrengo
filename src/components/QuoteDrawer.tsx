import React, { useState } from 'react';
import { QuoteItem } from '../types/quote.ts';
import { BrandType } from '../types/brand.ts';
import {
  calculateItemSubtotal,
  calculateTotal,
  calculateTotalUnits,
  formatCurrency,
  getWhatsAppQuoteUrl,
  generateWhatsAppMessage,
} from '../utils/quote.ts';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  Copy,
  Check,
  ShoppingCart,
  PackageX,
  AlertCircle,
} from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  brand?: BrandType;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  brand = 'genoma',
}) => {
  const [copied, setCopied] = useState(false);
  const [warning, setWarning] = useState(false);

  if (!isOpen) return null;

  const isImperio = brand === 'imperio';
  const brandDisplayName = isImperio ? 'Império Pharma' : 'Genoma Labs';

  const total = calculateTotal(quoteItems);
  const totalUnits = calculateTotalUnits(quoteItems);

  const handleCopy = () => {
    if (quoteItems.length === 0) return;
    const msg = generateWhatsAppMessage(quoteItems, brandDisplayName);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.MouseEvent) => {
    if (quoteItems.length === 0) {
      e.preventDefault();
      setWarning(true);
      setTimeout(() => setWarning(false), 3000);
    }
  };

  const whatsAppUrl = getWhatsAppQuoteUrl(quoteItems, brandDisplayName);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div
        className={`relative w-full max-w-lg border-l shadow-2xl flex flex-col h-full max-h-screen ${
          isImperio
            ? 'bg-[#0B0906] border-[#292319]'
            : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b shrink-0 ${
            isImperio
              ? 'bg-gradient-to-r from-[#292319] via-[#14110C] to-[#292319] border-[#C99720]/50'
              : 'bg-gradient-to-r from-red-800 via-red-600 to-red-800 border-red-500/40'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingCart className={`w-5 h-5 ${isImperio ? 'text-[#F2B91E]' : 'text-white'}`} />
            <h3 className="font-heading font-black text-white text-base tracking-wider uppercase">
              SEU ORÇAMENTO
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isImperio
                  ? 'text-[#F2B91E] bg-[#292319]/90 border-[#C99720]/40'
                  : 'text-red-100 bg-red-950/70 border border-red-400/40'
              }`}
            >
              {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'} ({totalUnits} unid.)
            </span>
            <button
              onClick={onClose}
              className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Warning Alert */}
        {warning && (
          <div
            className={`m-3 p-3 text-xs rounded-lg flex items-center gap-2 shrink-0 border ${
              isImperio
                ? 'bg-[#292319] border-[#C99720] text-[#F2B91E]'
                : 'bg-red-950 border-red-600 text-red-200'
            }`}
          >
            <AlertCircle className={`w-4 h-4 shrink-0 ${isImperio ? 'text-[#F2B91E]' : 'text-red-400'}`} />
            <span>Adicione ao menos um produto para enviar o orçamento.</span>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {quoteItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <PackageX className={`w-12 h-12 mb-3 ${isImperio ? 'text-[#C99720]' : 'text-neutral-600'}`} />
              <p className="font-bold text-sm text-neutral-300 uppercase mb-1">
                Nenhum produto selecionado
              </p>
              <p className="text-xs text-neutral-500 max-w-xs mb-4">
                Clique nos produtos das tabelas para adicioná-los automaticamente a este orçamento.
              </p>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 border text-xs font-bold text-white uppercase rounded-lg transition-colors ${
                  isImperio
                    ? 'bg-[#14110C] border-[#292319] hover:border-[#F2B91E]'
                    : 'bg-neutral-900 border border-neutral-700 hover:border-red-600'
                }`}
              >
                Voltar às tabelas
              </button>
            </div>
          ) : (
            <>
              <div
                className={`flex items-center justify-between pb-2 border-b text-xs font-mono ${
                  isImperio ? 'border-[#292319] text-neutral-400' : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <span>ITENS DO ORÇAMENTO</span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className={`flex items-center gap-1 ${
                    isImperio ? 'text-[#F2B91E] hover:text-white' : 'text-red-400 hover:text-red-300'
                  }`}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Limpar tudo</span>
                </button>
              </div>

              {quoteItems.map((item) => {
                const subtotal = calculateItemSubtotal(item);
                return (
                  <div
                    key={item.product.id}
                    className={`p-3 rounded-xl border space-y-2 transition-colors ${
                      isImperio
                        ? 'bg-[#14110C]/80 border-[#292319] hover:border-[#C99720]/40'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-100">{item.product.name}</h4>
                        <span className="text-xs font-mono text-neutral-400 block">
                          {item.product.concentration}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className={`p-1 transition-colors ${
                          isImperio
                            ? 'text-neutral-500 hover:text-[#F2B91E]'
                            : 'text-neutral-500 hover:text-red-400'
                        }`}
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-xs font-mono text-neutral-400">
                        {item.product.price}
                      </div>

                      {/* Quantity Controls */}
                      <div className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-950 p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                          }`}
                        >
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        {quoteItems.length > 0 && (
          <div
            className={`p-4 border-t space-y-3 shrink-0 ${
              isImperio ? 'bg-[#14110C] border-[#292319]' : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 block font-mono">TOTAL ESTIMADO</span>
                <span className="text-xs text-neutral-500">
                  {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'} ({totalUnits} unid.)
                </span>
              </div>
              <span
                className={`text-2xl font-heading font-black tabular-nums ${
                  isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                }`}
              >
                {formatCurrency(total)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className={`col-span-1 px-3 py-3 rounded-lg text-xs font-bold uppercase text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors border ${
                  isImperio
                    ? 'bg-[#0B0906] hover:bg-[#292319] border-[#292319]'
                    : 'bg-neutral-950 hover:bg-neutral-800 border-neutral-700'
                }`}
                title="Copiar texto"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSend}
                className={`col-span-1 sm:col-span-3 px-4 py-3 rounded-lg text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                  isImperio
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black shadow-yellow-950/40'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-950'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>ENVIAR ORÇAMENTO PELO WHATSAPP</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
