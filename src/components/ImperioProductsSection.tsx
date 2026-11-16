import React, { useState, useMemo } from 'react';
import { IMPERIO_CATEGORIES } from '../data/imperioProducts.ts';
import { ProductItem } from '../data/products.ts';
import { QuoteItem } from '../types/quote.ts';
import { Search, Check, Info } from 'lucide-react';

interface ImperioProductsSectionProps {
  quoteItems: QuoteItem[];
  onToggleProduct: (product: ProductItem) => void;
  onOpenQuote?: () => void;
}

export const ImperioProductsSection: React.FC<ImperioProductsSectionProps> = ({
  quoteItems,
  onToggleProduct,
  onOpenQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fast lookup map for selected products
  const selectedMap = useMemo(() => {
    const map = new Map<string, QuoteItem>();
    quoteItems.forEach((qi) => map.set(qi.product.id, qi));
    return map;
  }, [quoteItems]);

  // Filter products based on search and selected category
  const filteredCategories = useMemo(() => {
    return IMPERIO_CATEGORIES.map((cat) => {
      // Category tab filter
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return { ...cat, items: [] };
      }

      // Search filter
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

  return (
    <section id="produtos" className="relative py-16 sm:py-24 bg-[#0B0906] border-b border-[#292319]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#292319]/80 border border-[#C99720]/50 rounded text-xs font-mono uppercase tracking-widest text-[#F2B91E] mb-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#F2B91E]">
              <path d="M3 8l3.5 5 5.5-7 5.5 7L21 8l-2 10H5L3 8z" />
            </svg>
            <span>Catálogo Oficial Império</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white">
            Tabela de <span className="text-[#F2B91E] drop-shadow-[0_0_15px_rgba(242,185,30,0.35)]">Produtos</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 font-medium">
            Clique diretamente sobre qualquer produto para adicioná-lo ou removê-lo da sua lista de orçamento.
          </p>
        </div>

        {/* Tip / Interactive Banner */}
        <div className="mb-6 max-w-2xl mx-auto p-3 bg-[#292319]/50 border border-[#C99720]/40 rounded-xl flex items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#F2B91E] shrink-0" />
            <span>
              <strong className="text-white">Dica:</strong> Toque no produto para selecionar. Clique novamente para desmarcar.
            </span>
          </div>
          {quoteItems.length > 0 && onOpenQuote && (
            <button
              type="button"
              onClick={onOpenQuote}
              className="px-2.5 py-1 bg-[#F2B91E] hover:bg-[#C99720] text-black font-black rounded text-[11px] uppercase tracking-wider shrink-0 transition-colors"
            >
              Ver {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'itens'}
            </button>
          )}
        </div>

        {/* Search & Category Quick Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#14110C] p-3 sm:p-4 rounded-xl border border-[#292319]">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou concentração..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B0906] border border-[#292319] focus:border-[#F2B91E] focus:ring-1 focus:ring-[#F2B91E] rounded-lg text-xs sm:text-sm text-white placeholder:text-neutral-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
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
                  ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] text-black font-black shadow-sm'
                  : 'bg-[#0B0906] text-neutral-400 hover:text-[#F2B91E] hover:bg-[#292319]'
              }`}
            >
              Todos
            </button>
            {IMPERIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#C99720] via-[#F2B91E] to-[#C99720] text-black font-black shadow-sm'
                    : 'bg-[#0B0906] text-neutral-400 hover:text-[#F2B91E] hover:bg-[#292319]'
                }`}
              >
                {cat.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State if search finds nothing */}
        {filteredCategories.length === 0 && (
          <div className="py-12 text-center bg-[#14110C] rounded-xl border border-[#292319]">
            <p className="text-neutral-400 text-sm">Nenhum produto encontrado para a busca "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-[#F2B91E] hover:underline uppercase tracking-wider font-semibold"
            >
              Exibir catálogo completo
            </button>
          </div>
        )}

        {/* Product Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden rounded-xl bg-[#0B0906] border border-[#292319] shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-[#292319] via-[#14110C] to-[#292319] px-5 py-3.5 flex items-center justify-between border-b border-[#C99720]/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F2B91E] rounded-full shadow-[0_0_6px_#F2B91E]" />
                  <h3 className="text-base sm:text-lg font-heading font-black tracking-wider uppercase text-white">
                    {category.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#F2B91E] bg-[#292319]/80 px-2 py-0.5 rounded border border-[#C99720]/40">
                  {category.items.length} ITENS
                </span>
              </div>

              {/* Responsive Table Container */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[340px]">
                  <thead>
                    <tr className="bg-[#14110C] text-neutral-300 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border-b border-[#292319]">
                      <th scope="col" className="py-3 px-4 sm:px-5 text-left font-bold text-white">
                        PRODUTOS
                      </th>
                      <th scope="col" className="py-3 px-3 text-center font-bold text-white">
                        CONCENTRAÇÃO
                      </th>
                      <th scope="col" className="py-3 px-4 sm:px-5 text-right font-bold text-[#F2B91E]">
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
                              ? 'bg-[#292319]/60 border-[#C99720]/60 hover:bg-[#292319]/80'
                              : isAlternate
                              ? 'bg-[#14110C]/60 border-[#292319]/60 hover:bg-[#292319]/40'
                              : 'bg-[#0B0906] border-[#292319]/60 hover:bg-[#292319]/30'
                          }`}
                          title={isSelected ? 'Clique para desmarcar do orçamento' : 'Clique para adicionar ao orçamento'}
                        >
                          {/* Nome do Produto com Indicador Visual Discreto */}
                          <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-left text-xs sm:text-sm font-semibold tracking-wide">
                            <div className="flex items-center gap-2.5">
                              {/* Selection checkbox indicator */}
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-[#F2B91E] border border-[#C99720] text-black font-bold'
                                    : 'border border-neutral-700 bg-neutral-900/60 text-transparent'
                                }`}
                              >
                                <Check className={`w-3 h-3 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                              </div>

                              <span className={isSelected ? 'text-[#F2B91E] font-bold' : 'text-neutral-100'}>
                                {item.name}
                              </span>

                              {isSelected && selectedItem && (
                                <span className="ml-1 text-[10px] font-mono font-bold text-black bg-[#F2B91E] border border-[#C99720] px-1.5 py-0.2 rounded">
                                  {selectedItem.quantity > 1 ? `x${selectedItem.quantity}` : 'Sel'}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Concentração (centralizada) */}
                          <td className="py-3 sm:py-3.5 px-3 text-center text-xs sm:text-sm font-mono text-neutral-300">
                            {item.concentration}
                          </td>

                          {/* Valor (alinhado à direita, destacado em amarelo-ouro) */}
                          <td className="py-3 sm:py-3.5 px-4 sm:px-5 text-right text-xs sm:text-sm font-mono font-bold text-[#F2B91E] whitespace-nowrap tabular-nums">
                            {item.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
