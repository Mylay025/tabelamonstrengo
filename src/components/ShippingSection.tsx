import React from 'react';
import { SHIPPING_RATES } from '../data/products.ts';
import { Truck, ShieldCheck, Package } from 'lucide-react';

import { BrandType } from '../types/brand.ts';

interface ShippingSectionProps {
  brand?: BrandType;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({ brand = 'genoma' }) => {
  const isImperio = brand === 'imperio';

  return (
    <section
      id="fretes"
      className={`relative py-16 sm:py-24 border-b ${
        isImperio
          ? 'bg-[#0B0906] bg-imperio-grid border-[#292319]'
          : 'bg-black bg-lab-grid border-neutral-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest mb-3 ${
              isImperio
                ? 'bg-[#292319]/80 border border-[#C99720]/50 text-[#F2B91E]'
                : 'bg-red-950/40 border border-red-600/30 text-red-400'
            }`}
          >
            <Truck className={`w-3.5 h-3.5 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
            <span>Envio Nacional</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase text-metallic tracking-tight">
            TABELA DE <span className={isImperio ? 'text-[#F2B91E] drop-shadow-[0_0_15px_rgba(242,185,30,0.35)]' : 'text-red-600'}>FRETES</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base font-bold uppercase tracking-widest text-neutral-300">
            ENTREGA PARA TODO O BRASIL
          </p>
        </div>

        {/* Shipping Table */}
        <div
          className={`max-w-3xl mx-auto overflow-hidden rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] mb-16 ${
            isImperio
              ? 'bg-[#0B0906] border border-[#292319]'
              : 'bg-neutral-950 border border-neutral-800'
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3.5 flex items-center justify-between border-b ${
              isImperio
                ? 'bg-gradient-to-r from-[#292319] via-[#14110C] to-[#292319] border-[#C99720]/50'
                : 'bg-gradient-to-r from-red-800 via-red-600 to-red-800 border-red-500/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className={`w-5 h-5 ${isImperio ? 'text-[#F2B91E]' : 'text-white'}`} />
              <span className="text-base sm:text-lg font-heading font-black tracking-wider uppercase text-white">
                FRETES POR REGIÃO
              </span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isImperio
                  ? 'text-[#F2B91E] bg-[#292319]/80 border-[#C99720]/40'
                  : 'text-red-100 bg-red-950/60 border border-red-400/30'
              }`}
            >
              7 REGIÕES
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-neutral-300 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border-b ${
                    isImperio
                      ? 'bg-[#14110C] border-[#292319]'
                      : 'bg-neutral-900/90 border-neutral-800'
                  }`}
                >
                  <th scope="col" className="py-3 px-5 sm:px-6 text-left font-bold text-white">
                    REGIÃO
                  </th>
                  <th scope="col" className="py-3 px-5 sm:px-6 text-right font-bold text-white">
                    VALOR DO FRETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {SHIPPING_RATES.map((item, index) => {
                  const isAlternate = index % 2 === 1;
                  return (
                    <tr
                      key={item.id}
                      className={`border-b transition-colors ${
                        isImperio
                          ? `border-[#292319]/60 hover:bg-[#292319]/30 ${
                              isAlternate ? 'bg-[#14110C]/60' : 'bg-[#0B0906]'
                            }`
                          : `border-neutral-800/60 hover:bg-neutral-800/40 ${
                              isAlternate ? 'bg-neutral-900/40' : 'bg-black'
                            }`
                      }`}
                    >
                      {/* Região */}
                      <td className="py-3.5 sm:py-4 px-5 sm:px-6 text-left">
                        <div className="flex items-center gap-3">
                          <Truck
                            className={`w-4 h-4 shrink-0 ${
                              isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                            }`}
                          />
                          <span className="text-sm sm:text-base font-semibold text-neutral-100">
                            {item.region}
                          </span>
                        </div>
                      </td>

                      {/* Valor do Frete */}
                      <td
                        className={`py-3.5 sm:py-4 px-5 sm:px-6 text-right font-mono text-sm sm:text-base font-bold whitespace-nowrap tabular-nums ${
                          isImperio ? 'text-[#F2B91E]' : 'text-red-500'
                        }`}
                      >
                        {item.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. ÁREA INFORMATIVA INFERIOR (3 Elementos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {/* Elemento 1: Caminhão */}
          <div
            className={`flex flex-col items-center text-center p-6 rounded-xl border transition-colors ${
              isImperio
                ? 'bg-[#14110C]/90 border-[#292319] hover:border-[#C99720]/60'
                : 'bg-neutral-950/80 border-neutral-800 hover:border-red-900/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isImperio
                  ? 'bg-[#292319] border border-[#C99720]/60 text-[#F2B91E] shadow-[0_0_15px_rgba(242,185,30,0.2)]'
                  : 'bg-neutral-900 border border-red-600/40 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
              }`}
            >
              <Truck className={`w-6 h-6 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
            </div>
            <h3 className="text-xs sm:text-sm font-heading font-black tracking-widest uppercase text-neutral-100">
              ENVIO SEGURO E RÁPIDO
            </h3>
          </div>

          {/* Elemento 2: Escudo */}
          <div
            className={`flex flex-col items-center text-center p-6 rounded-xl border transition-colors ${
              isImperio
                ? 'bg-[#14110C]/90 border-[#292319] hover:border-[#C99720]/60'
                : 'bg-neutral-950/80 border-neutral-800 hover:border-red-900/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isImperio
                  ? 'bg-[#292319] border border-[#C99720]/60 text-[#F2B91E] shadow-[0_0_15px_rgba(242,185,30,0.2)]'
                  : 'bg-neutral-900 border border-red-600/40 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
              }`}
            >
              <ShieldCheck className={`w-6 h-6 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
            </div>
            <h3 className="text-xs sm:text-sm font-heading font-black tracking-widest uppercase text-neutral-100">
              CÓDIGO DE RASTREIO APÓS O ENVIO
            </h3>
          </div>

          {/* Elemento 3: Caixa */}
          <div
            className={`flex flex-col items-center text-center p-6 rounded-xl border transition-colors ${
              isImperio
                ? 'bg-[#14110C]/90 border-[#292319] hover:border-[#C99720]/60'
                : 'bg-neutral-950/80 border-neutral-800 hover:border-red-900/50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isImperio
                  ? 'bg-[#292319] border border-[#C99720]/60 text-[#F2B91E] shadow-[0_0_15px_rgba(242,185,30,0.2)]'
                  : 'bg-neutral-900 border border-red-600/40 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
              }`}
            >
              <Package className={`w-6 h-6 ${isImperio ? 'text-[#F2B91E]' : 'text-red-500'}`} />
            </div>
            <h3 className="text-xs sm:text-sm font-heading font-black tracking-widest uppercase text-neutral-100">
              EMBALAGEM DISCRETA
            </h3>
          </div>
        </div>

        {/* Closing Slogan Banner */}
        <div
          className={`text-center py-6 border-t border-b ${
            isImperio ? 'border-[#292319]' : 'border-neutral-900'
          }`}
        >
          <p className="text-sm sm:text-base font-heading font-black tracking-[0.2em] uppercase text-metallic mb-1">
            {isImperio ? 'QUALIDADE IMPÉRIO PHARMA' : 'QUALIDADE GENOMA LABS'}
          </p>
          <p
            className={`text-lg sm:text-2xl md:text-3xl font-heading font-black tracking-wider uppercase ${
              isImperio
                ? 'text-[#F2B91E] drop-shadow-[0_0_15px_rgba(242,185,30,0.35)]'
                : 'text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]'
            }`}
          >
            DO SEU PEDIDO ATÉ VOCÊ!
          </p>
        </div>

      </div>
    </section>
  );
};

