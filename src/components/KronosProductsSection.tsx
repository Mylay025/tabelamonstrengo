import React, { useState, useMemo } from 'react';
import { KRONOS_CATEGORIES } from '../data/kronosProducts.ts';
import { ProductCategory, ProductItem } from '../data/products.ts';
import { QuoteItem } from '../types/quote.ts';
import { Search, Check, Info } from 'lucide-react';

interface KronosProductsSectionProps {
  quoteItems: QuoteItem[];
  onToggleProduct: (product: ProductItem) => void;
  onOpenQuote?: () => void;
}

export const KronosProductsSection: React.FC<KronosProductsSectionProps> = ({
  quoteItems,
  onToggleProduct,
  onOpenQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const selectedMap = useMemo(() => {
    const map = new Map<string, QuoteItem>();
    quoteItems.forEach((qi) => map.set(qi.product.id, qi));
    return map;
  }, [quoteItems]);

  const filteredCategories = useMemo(() => {
    return KRONOS_CATEGORIES.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return { ...cat, items: [] };
      }

      if (!searchQuery.trim()) {
        return cat;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchedItems = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.concentration.toLowerCase().includes(q) ||
          item.price.toLowerCase().includes(q)
      );

      return { ...cat, items: matchedItems };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery, selectedCategory]);

  const renderCategoryCard = (category: ProductCategory) => (
    <div
      key={category.id}
      className="overflow-hidden rounded-xl bg-[#040814] border border-[#1E40AF]/60 shadow-[0_0_28px_rgba(0,180,255,0.14)]"
    >
      {/* Category Header */}
      <div className="bg-gradient-to-r from-[#0B1A3D] via-[#071129] to-[#0B1A3D] px-5 py-3.5 flex items-center justify-between border-b border-[#00B4FF]/45">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 bg-[#00B4FF] rounded-full shadow-[0_0_8px_#00B4FF]" />
          <div>
            <h3 className="text-base sm:text-lg font-heading font-black tracking-wider uppercase text-white">
              {category.title}
            </h3>
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#38BDF8]">
              KRONOS PHARMA
            </span>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#040814]/90 px-2.5 py-0.5 rounded border border-[#00B4FF]/40 shadow-[0_0_10px_rgba(0,180,255,0.15)]">
          {category.items.length} ITENS
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[340px]">
          <thead>
            <tr className="bg-[#071129] text-slate-200 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border-b border-[#1E3A8A]/70">
              <th scope="col" className="py-3 px-4 sm:px-5 text-left font-bold text-white">
                PRODUTO
              </th>
              <th scope="col" className="py-3 px-3 text-center font-bold text-slate-200">
                CONCENTRAÇÃO
              </th>
              <th scope="col" className="py-3 px-4 sm:px-5 text-right font-bold text-[#38BDF8]">
                VALOR
              </th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, index) => {
              const isAlternate = index % 2 === 1;
              const selectedItem = selectedMap.get(item.id);
              const isSelected = Boolean(selectedItem);

              return (
                <tr
                  key={item.id}
                  onClick={() => onToggleProduct(item)}
                  className={`cursor-pointer border-b transition-colors select-none ${
                    isSelected
                      ? 'bg-[#0B2352]/80 border-[#00B4FF]/60 hover:bg-[#0E2B63]/90'
                      : isAlternate
                      ? 'bg-[#071129]/80 border-[#1E3A8A]/45 hover:bg-[#0B1A3D]/80'
                      : 'bg-[#040814] border-[#1E3A8A]/45 hover:bg-[#0B1A3D]/60'
                  }`}
                  title={isSelected ? 'Clique para desmarcar do orçamento' : 'Clique para adicionar ao orçamento'}
                >
                  {/* Nome do Produto */}
                  <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-left text-xs sm:text-sm font-semibold tracking-wide">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#00B4FF] border border-[#38BDF8] text-[#040814] font-bold shadow-[0_0_8px_rgba(0,180,255,0.6)]'
                            : 'border border-[#1E40AF]/80 bg-[#071129] text-transparent'
                        }`}
                      >
                        <Check className={`w-3 h-3 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      <span className={isSelected ? 'text-[#38BDF8] font-bold' : 'text-slate-100'}>
                        {item.name}
                      </span>

                      {isSelected && selectedItem && (
                        <span className="ml-1 text-[10px] font-mono font-bold text-[#040814] bg-[#38BDF8] border border-[#00B4FF] px-1.5 py-0.2 rounded">
                          {selectedItem.quantity > 1 ? `x${selectedItem.quantity}` : 'Sel'}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Concentração */}
                  <td className="py-3 sm:py-3.5 px-3 text-center text-xs sm:text-sm font-mono text-slate-300 tabular-nums">
                    {item.concentration}
                  </td>

                  {/* Valor */}
                  <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-right text-xs sm:text-sm font-mono font-bold text-[#38BDF8] whitespace-nowrap tabular-nums">
                    {item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // When showing all 3 categories on desktop, pair the taller INJETÁVEIS 2x5ML table on the left
  // with LINHA 50ML + LINHA ENCAPSULADOS ORAIS stacked on the right for balanced heights
  const showBalancedTwoColumn =
    filteredCategories.length === 3 &&
    filteredCategories[0]?.id === 'injetaveis-2x5ml';

  return (
    <section
      id="produtos"
      className="relative py-16 sm:py-24 bg-[#040814] bg-kronos-grid border-b border-[#0E244D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#071129]/90 border border-[#00B4FF]/45 rounded text-xs font-mono uppercase tracking-widest text-[#38BDF8] shadow-[0_0_16px_rgba(0,180,255,0.15)] mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-[#00B4FF]">
              <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5 12 2" />
            </svg>
            <span>KRONOS PHARMA · RESULTADOS CONSISTENTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
            <span className="text-metallic">Tabela de </span>
            <span className="text-[#38BDF8] drop-shadow-[0_0_18px_rgba(0,180,255,0.45)]">Produtos</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-medium">
            Clique diretamente sobre qualquer produto Kronos Pharma para adicioná-lo ou removê-lo da sua lista de orçamento.
          </p>
        </div>

        {/* Tip / Interactive Banner */}
        <div className="mb-6 max-w-2xl mx-auto p-3 bg-[#071129]/80 border border-[#1E40AF]/60 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-300 shadow-[0_0_18px_rgba(37,99,235,0.12)]">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>
              <strong className="text-white">Dica:</strong> Toque no produto para selecionar. Clique novamente para desmarcar.
            </span>
          </div>
          {quoteItems.length > 0 && onOpenQuote && (
            <button
              type="button"
              onClick={onOpenQuote}
              className="px-2.5 py-1 bg-[#00B4FF] hover:bg-[#38BDF8] text-[#040814] font-black rounded text-[11px] uppercase tracking-wider shrink-0 transition-colors"
            >
              Ver {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'}
            </button>
          )}
        </div>

        {/* Search & Category Quick Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#071129] p-3 sm:p-4 rounded-xl border border-[#1E3A8A]/70 shadow-[0_0_20px_rgba(0,180,255,0.08)]">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou concentração..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#040814] border border-[#1E3A8A]/80 focus:border-[#00B4FF] focus:ring-1 focus:ring-[#00B4FF] rounded-lg text-xs sm:text-sm text-white placeholder:text-slate-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#2563EB] via-[#00B4FF] to-[#2563EB] text-[#040814] font-black shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                  : 'bg-[#040814] text-slate-300 hover:text-[#38BDF8] hover:bg-[#0B1A3D] border border-[#1E3A8A]/50'
              }`}
            >
              Todos
            </button>
            {KRONOS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#2563EB] via-[#00B4FF] to-[#2563EB] text-[#040814] font-black shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                    : 'bg-[#040814] text-slate-300 hover:text-[#38BDF8] hover:bg-[#0B1A3D] border border-[#1E3A8A]/50'
                }`}
              >
                {cat.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center bg-[#071129] rounded-xl border border-[#1E3A8A]/70">
            <p className="text-slate-400 text-sm">Nenhum produto encontrado para a busca "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#38BDF8] hover:underline uppercase tracking-wider font-semibold"
            >
              Exibir catálogo completo
            </button>
          </div>
        )}

        {/* Product Tables Grid */}
        {showBalancedTwoColumn ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{renderCategoryCard(filteredCategories[0])}</div>
            <div className="flex flex-col gap-8">
              {renderCategoryCard(filteredCategories[1])}
              {renderCategoryCard(filteredCategories[2])}
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              filteredCategories.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'
            } gap-8 items-start`}
          >
            {filteredCategories.map((category) => renderCategoryCard(category))}
          </div>
        )}
      </div>
    </section>
  );
};
