import { ProductCategory, ProductItem } from './products.ts';

/**
 * Catálogo Oficial Império Pharma
 * Cores da marca:
 * - Preto profundo: #0B0906
 * - Amarelo-ouro: #F2B91E
 * - Dourado metálico: #C99720
 * - Branco: #FFFFFF
 * - Marrom escuro: #292319
 */
export const IMPERIO_CATEGORIES: ProductCategory[] = [
  {
    id: '10ml',
    title: '10ML',
    badge: '10ML',
    items: [
      { id: 'imp-10ml-enantato', name: 'ENANTATO DE TESTOSTERONA', concentration: '10ML 250MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-durateston', name: 'DURATESTON', concentration: '10ML 250MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-cipionato', name: 'CIPIONATO DE TESTOSTERONA', concentration: '10ML 200MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-propionato', name: 'PROPIONATO DE TESTOSTERONA', concentration: '10ML 100MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-deca', name: 'DECA', concentration: '10ML 300MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-boldenona', name: 'BOLDENONA', concentration: '10ML 300MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-trembo-ace', name: 'TREMBOLONA ACETATO', concentration: '10ML 100MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-masteron', name: 'MASTERON', concentration: '10ML 100MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-primobolan', name: 'PRIMOBOLAN', concentration: '10ML 100MG', price: 'R$ 260,00' },
      { id: 'imp-10ml-fynil', name: 'NANDROLONA FYNIL', concentration: '10ML 100MG', price: 'R$ 140,00' },
      { id: 'imp-10ml-trembo-enant', name: 'TREMBOLONA ENANTATO', concentration: '10ML 200MG', price: 'R$ 180,00' },
    ],
  },
  {
    id: '30ml',
    title: '30ML',
    badge: '30ML',
    items: [
      { id: 'imp-30ml-enantato', name: 'ENANTATO DE TESTOSTERONA', concentration: '30ML 250MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-durateston', name: 'DURATESTON', concentration: '30ML 250MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-cipionato', name: 'CIPIONATO DE TESTOSTERONA', concentration: '30ML 200MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-propionato', name: 'PROPIONATO DE TESTOSTERONA', concentration: '30ML 100MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-deca', name: 'DECA', concentration: '30ML 300MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-boldenona', name: 'BOLDENONA', concentration: '30ML 300MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-trembo-ace', name: 'TREMBOLONA ACETATO', concentration: '30ML 100MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-masteron', name: 'MASTERON', concentration: '30ML 100MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-primobolan', name: 'PRIMOBOLAN', concentration: '30ML 100MG', price: 'R$ 750,00' },
      { id: 'imp-30ml-stanozolol-oleo', name: 'STANOZOLOL ÓLEO', concentration: '30ML 50MG', price: 'R$ 160,00' },
      { id: 'imp-30ml-dianabol', name: 'DIANABOL', concentration: '30ML 50MG', price: 'R$ 160,00' },
      { id: 'imp-30ml-fynil', name: 'NANDROLONA FYNIL', concentration: '30ML 100MG', price: 'R$ 390,00' },
      { id: 'imp-30ml-trembo-enant', name: 'TREMBOLONA ENANTATO', concentration: '30ML 200MG', price: 'R$ 510,00' },
    ],
  },
  {
    id: 'orais',
    title: 'ORAIS',
    badge: 'ORAIS',
    items: [
      { id: 'imp-orais-oxandrolona-10', name: 'OXANDROLONA', concentration: '10MG 100CPS', price: 'R$ 140,00' },
      { id: 'imp-orais-oxandrolona-20', name: 'OXANDROLONA', concentration: '20MG 100CPS', price: 'R$ 160,00' },
      { id: 'imp-orais-stanozolol', name: 'STANOZOLOL', concentration: '10MG 100CPS', price: 'R$ 140,00' },
      { id: 'imp-orais-dianabol', name: 'DIANABOL', concentration: '10MG 100CPS', price: 'R$ 140,00' },
      { id: 'imp-orais-hemogenin', name: 'HEMOGENIN', concentration: '25MG 50CPS', price: 'R$ 140,00' },
      { id: 'imp-orais-turinabol', name: 'TURINABOL', concentration: '10MG 100CPS', price: 'R$ 160,00' },
    ],
  },
  {
    id: 'variados',
    title: 'VARIADOS',
    badge: 'VARIADOS',
    items: [
      { id: 'imp-var-proviron', name: 'PROVIRON IMPÉRIO', concentration: '25MG 40CPS', price: 'R$ 150,00' },
      { id: 'imp-var-fat-thinner', name: 'FAT THINNER (EMAGRECEDOR)', concentration: '30 CAPS', price: 'R$ 190,00' },
      { id: 'imp-var-sibutramina-30', name: 'SIBUTRAMINA IMPERIO', concentration: '15MG 30CPS', price: 'R$ 80,00' },
      { id: 'imp-var-sibutramina-60', name: 'SIBUTRAMINA IMPERIO', concentration: '15MG 60CPS', price: 'R$ 150,00' },
    ],
  },
];
