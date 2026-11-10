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
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  Copy,
  Check,
  AlertCircle,
  PackageX,
  ArrowRight,
} from 'lucide-react';

interface QuoteSectionProps {
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  brand?: BrandType;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  brand = 'genoma',
}) => {
  const [copied, setCopied] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);

  const isImperio = brand === 'imperio';
  const brandDisplayName = isImperio ? 'Império Pharma' : 'Genoma Labs';

  const total = calculateTotal(quoteItems);
  const totalUnits = calculateTotalUnits(quoteItems);

  const handleSendWhatsApp = (e: React.MouseEvent) => {
    if (quoteItems.length === 0) {
      e.preventDefault();
      setShowEmptyWarning(true);
      setTimeout(() => setShowEmptyWarning(false), 3500);
      return;
    }
  };

  const handleCopyMessage = () => {
    if (quoteItems.length === 0) return;
    const msg = generateWhatsAppMessage(quoteItems, brandDisplayName);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsAppUrl = getWhatsAppQuoteUrl(quoteItems, brandDisplayName);

  return (
    <section
      id="orcamento"
      className={`relative py-16 sm:py-20 border-b scroll-mt-20 ${
        isImperio
          ? 'bg-[#0B0906] bg-imperio-grid border-[#292319]'
          : 'bg-black bg-lab-grid border-neutral-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest mb-3 ${
              isImperio
                ? 'bg-[#292319]/80 border border-[#C99720]/50 text-[#F2B91E]'
                : 'bg-red-950/40 border border-red-600/30 text-red-400'
            }`}
          >
            <ShoppingCart className={`w-3.5 h-3.5 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
            <span>Lista de Pedido</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase text-metallic tracking-tight">
            Seu{' '}
            <span
              className={
                isImperio
                  ? 'text-[#F2B91E] drop-shadow-[0_0_15px_rgba(242,185,30,0.35)]'
                  : 'text-red-600'
              }
            >
              Orçamento
            </span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Revise os produtos selecionados, ajuste as quantidades e envie direto para o WhatsApp.
          </p>
        </div>

        {/* Warning if trying to submit empty */}
        {showEmptyWarning && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-shake ${
              isImperio
                ? 'bg-[#292319] border border-[#C99720] text-[#F2B91E]'
                : 'bg-red-950/80 border border-red-600/60 text-red-200'
            }`}
          >
            <AlertCircle className={`w-5 h-5 shrink-0 ${isImperio ? 'text-[#F2B91E]' : 'text-red-400'}`} />
            <span>Por favor, selecione pelo menos um produto na tabela acima antes de enviar o orçamento.</span>
          </div>
        )}

        {/* Quote Container */}
        <div
          className={`overflow-hidden rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.85)] ${
            isImperio
              ? 'bg-[#0B0906] border border-[#292319]'
              : 'bg-neutral-950 border border-neutral-800'
          }`}
        >
          
          {/* Header of the Quote Box */}
          <div
            className={`px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${
              isImperio
                ? 'bg-gradient-to-r from-[#292319] via-[#14110C] to-[#292319] border-[#C99720]/50'
                : 'bg-gradient-to-r from-red-800 via-red-600 to-red-800 border-red-500/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className={`w-5 h-5 ${isImperio ? 'text-[#F2B91E]' : 'text-white'}`} />
              <span className="text-base sm:text-lg font-heading font-black tracking-wider uppercase text-white">
                PRODUTOS SELECIONADOS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                  isImperio
                    ? 'text-[#F2B91E] bg-[#292319]/90 border-[#C99720]/40'
                    : 'text-red-100 bg-red-950/70 border border-red-400/40'
                }`}
              >
                {quoteItems.length} {quoteItems.length === 1 ? 'PRODUTO' : 'PRODUTOS'} ({totalUnits}{' '}
                {totalUnits === 1 ? 'UNIDADE' : 'UNIDADES'})
              </span>
              {quoteItems.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className={`text-xs px-2.5 py-1 rounded transition-colors flex items-center gap-1 border ${
                    isImperio
                      ? 'text-neutral-300 hover:text-white bg-[#14110C] hover:bg-[#292319] border-[#292319]'
                      : 'text-red-200 hover:text-white bg-red-900/40 hover:bg-red-900/80 border-red-400/30'
                  }`}
                  title="Remover todos os itens da lista"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar lista</span>
                </button>
              )}
            </div>
          </div>

          {/* List Content */}
          {quoteItems.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isImperio
                    ? 'bg-[#14110C] border border-[#292319] text-[#C99720]'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-500'
                }`}
              >
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Nenhum produto selecionado no momento
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mb-6">
                Navegue pelas tabelas de produtos acima e clique diretamente sobre qualquer item para adicioná-lo ao seu orçamento.
              </p>
              <a
                href="#produtos"
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg transition-colors flex items-center gap-2 border ${
                  isImperio
                    ? 'bg-[#14110C] hover:bg-[#292319] border-[#292319] hover:border-[#F2B91E]'
                    : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 hover:border-red-600'
                }`}
              >
                <span>Explorar Tabela de Produtos</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
              </a>
            </div>
          ) : (
            <div>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className={`text-neutral-300 text-xs font-mono font-bold tracking-wider uppercase border-b ${
                        isImperio
                          ? 'bg-[#14110C] border-[#292319]'
                          : 'bg-neutral-900/90 border-neutral-800'
                      }`}
                    >
                      <th scope="col" className="py-3.5 px-5 text-left text-white">PRODUTO</th>
                      <th scope="col" className="py-3.5 px-3 text-center text-white">CONCENTRAÇÃO</th>
                      <th scope="col" className="py-3.5 px-3 text-right text-white">VALOR UNIT.</th>
                      <th scope="col" className="py-3.5 px-4 text-center text-white">QUANTIDADE</th>
                      <th scope="col" className="py-3.5 px-4 text-right text-white">SUBTOTAL</th>
                      <th scope="col" className="py-3.5 px-4 text-center text-white">AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteItems.map((item, index) => {
                      const isAlternate = index % 2 === 1;
                      const subtotal = calculateItemSubtotal(item);
                      return (
                        <tr
                          key={item.product.id}
                          className={`border-b transition-colors ${
                            isImperio
                              ? `border-[#292319]/60 ${isAlternate ? 'bg-[#14110C]/40' : 'bg-[#0B0906]'}`
                              : `border-neutral-800/60 ${isAlternate ? 'bg-neutral-900/30' : 'bg-black'}`
                          }`}
                        >
                          {/* Nome */}
                          <td className="py-3.5 px-5 font-semibold text-sm text-neutral-100">
                            {item.product.name}
                          </td>

                          {/* Concentração */}
                          <td className="py-3.5 px-3 text-center text-xs font-mono text-neutral-300">
                            {item.product.concentration}
                          </td>

                          {/* Preço Unitário */}
                          <td className="py-3.5 px-3 text-right text-xs font-mono text-neutral-400">
                            {item.product.price}
                          </td>

                          {/* Quantidade */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900/90 p-0.5 shadow-inner">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 flex items-center justify-center rounded text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                title="Diminuir uma unidade"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value, 10);
                                  if (!isNaN(val) && val >= 1) {
                                    onUpdateQuantity(item.product.id, val);
                                  }
                                }}
                                className={`w-10 text-center font-mono font-bold text-xs bg-transparent text-white focus:outline-none focus:ring-1 rounded ${
                                  isImperio ? 'focus:ring-[#F2B91E]' : 'focus:ring-red-500'
                                }`}
                                aria-label="Quantidade"
                              />

                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                                title="Aumentar uma unidade"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td
                            className={`py-3.5 px-4 text-right font-mono font-bold text-sm tabular-nums ${
                              isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                            }`}
                          >
                            {formatCurrency(subtotal)}
                          </td>

                          {/* Botão Remover */}
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isImperio
                                  ? 'text-neutral-500 hover:text-[#F2B91E] hover:bg-[#14110C]'
                                  : 'text-neutral-500 hover:text-red-400 hover:bg-neutral-900'
                              }`}
                              title="Remover produto da lista"
                              aria-label={`Remover ${item.product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div
                className={`sm:hidden divide-y ${
                  isImperio ? 'divide-[#292319]' : 'divide-neutral-800/80'
                }`}
              >
                {quoteItems.map((item) => {
                  const subtotal = calculateItemSubtotal(item);
                  return (
                    <div
                      key={item.product.id}
                      className={`p-4 space-y-3 ${isImperio ? 'bg-[#0B0906]' : 'bg-neutral-950'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-sm text-neutral-100">{item.product.name}</h4>
                          <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                            {item.product.concentration}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className={`p-1 ${isImperio ? 'text-neutral-500 hover:text-[#F2B91E]' : 'text-neutral-500 hover:text-red-400'}`}
                          aria-label={`Remover ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-xs text-neutral-400 font-mono">
                          Unit: <span className="text-neutral-200">{item.product.price}</span>
                        </div>

                        {/* Quantity Control */}
                        <div className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900 p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center text-neutral-300 disabled:opacity-30"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono font-bold text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-300"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">Subtotal</span>
                          <span
                            className={`font-mono font-bold text-sm ${
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
              </div>

              {/* Summary & WhatsApp Action Footer */}
              <div
                className={`p-5 sm:p-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${
                  isImperio
                    ? 'bg-[#14110C] border-[#292319]'
                    : 'bg-neutral-900/90 border-neutral-800'
                }`}
              >
                {/* Total breakdown */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  <div>
                    <span className="text-xs text-neutral-400 uppercase font-mono tracking-wider block">
                      Total de Itens
                    </span>
                    <span className="text-sm sm:text-base font-bold text-neutral-200">
                      {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'} ({totalUnits} unid.)
                    </span>
                  </div>

                  <div
                    className={`border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-8 ${
                      isImperio ? 'border-[#292319]' : 'border-neutral-800'
                    }`}
                  >
                    <span className="text-xs text-neutral-400 uppercase font-mono tracking-wider block">
                      Total Estimado
                    </span>
                    <span
                      className={`text-2xl sm:text-3xl font-heading font-black tabular-nums ${
                        isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                      }`}
                    >
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Actions: Send WhatsApp & Copy */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className={`w-full sm:w-auto px-4 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                      isImperio
                        ? 'bg-[#0B0906] hover:bg-[#292319] text-neutral-300 hover:text-white border-[#292319]'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700'
                    }`}
                    title="Copiar texto do orçamento para a área de transferência"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSendWhatsApp}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-lg text-xs sm:text-sm font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-95 ${
                      isImperio
                        ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] hover:from-[#F2B91E] hover:to-[#C99720] text-black shadow-[0_4px_25px_rgba(242,185,30,0.35)]'
                        : 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-500 text-white shadow-[0_4px_25px_rgba(220,38,38,0.45)]'
                    }`}
                  >
                    <Send className={`w-4 h-4 ${isImperio ? 'text-black' : 'text-white'}`} />
                    <span>ENVIAR ORÇAMENTO PELO WHATSAPP</span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
