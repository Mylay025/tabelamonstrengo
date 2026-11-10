export interface ProductItem {
  id: string;
  name: string;
  concentration: string;
  price: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  badge: string;
  items: ProductItem[];
}

export interface ShippingItem {
  id: string;
  region: string;
  price: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: '10ml',
    title: '10ML',
    badge: '10ML',
    items: [
      { id: '10ml-enantato', name: 'ENANTATO', concentration: '10ML/300MG', price: 'R$ 140,00' },
      { id: '10ml-cipionato', name: 'CIPIONATO', concentration: '10ML/200MG', price: 'R$ 140,00' },
      { id: '10ml-propionato', name: 'PROPIONATO', concentration: '10ML/100MG', price: 'R$ 140,00' },
      { id: '10ml-durateston', name: 'DURATESTON', concentration: '10ML/250MG', price: 'R$ 140,00' },
      { id: '10ml-deca', name: 'DECA', concentration: '10ML/250MG', price: 'R$ 140,00' },
      { id: '10ml-boldenona', name: 'BOLDENONA', concentration: '10ML/300MG', price: 'R$ 140,00' },
      { id: '10ml-trembo-slow', name: 'TREMBO ENANT', concentration: '10ML/200MG', price: 'R$ 180,00' },
      { id: '10ml-primobolan', name: 'PRIMOBOLAN', concentration: '10ML/100MG', price: 'R$ 280,00' },
      { id: '10ml-trembo-ace', name: 'TREMBO ACETATO', concentration: '10ML/100MG', price: 'R$ 150,00' },
      { id: '10ml-masteron-fast', name: 'MASTERON', concentration: '10ML/100MG', price: 'R$ 150,00' },
      { id: '10ml-masteron-slow', name: 'MASTERON ENANTATO', concentration: '10ML/200MG', price: 'R$ 180,00' },
    ],
  },
  {
    id: '30ml',
    title: '30ML',
    badge: '30ML',
    items: [
      { id: '30ml-enantato', name: 'ENANTATO', concentration: '30ML/300MG', price: 'R$ 390,00' },
      { id: '30ml-cipionato', name: 'CIPIONATO', concentration: '30ML/200MG', price: 'R$ 390,00' },
      { id: '30ml-propionato', name: 'PROPIONATO', concentration: '30ML/100MG', price: 'R$ 390,00' },
      { id: '30ml-durateston', name: 'DURATESTON', concentration: '30ML/250MG', price: 'R$ 390,00' },
      { id: '30ml-deca', name: 'DECA', concentration: '30ML/250MG', price: 'R$ 390,00' },
      { id: '30ml-boldenona', name: 'BOLDENONA', concentration: '30ML/300MG', price: 'R$ 390,00' },
      { id: '30ml-trembo-slow', name: 'TREMBO ENANT', concentration: '30ML/200MG', price: 'R$ 510,00' },
      { id: '30ml-primobolan', name: 'PRIMOBOLAN', concentration: '30ML/100MG', price: 'R$ 810,00' },
      { id: '30ml-trembo-ace', name: 'TREMBO ACETATO', concentration: '30ML/100MG', price: 'R$ 420,00' },
      { id: '30ml-masteron-fast', name: 'MASTERON', concentration: '30ML/100MG', price: 'R$ 420,00' },
      { id: '30ml-masteron-slow', name: 'MASTERON ENANTATO', concentration: '30ML/200MG', price: 'R$ 510,00' },
      { id: '30ml-dianabol', name: 'DIANABOL', concentration: '30ML', price: 'R$ 160,00' },
      { id: '30ml-stanozolol-oleo', name: 'STANOZOLOL ÓLEO', concentration: '30ML', price: 'R$ 160,00' },
    ],
  },
  {
    id: 'orais',
    title: 'ORAIS',
    badge: 'ORAIS',
    items: [
      { id: 'orais-oxandrolona-10', name: 'OXANDROLONA', concentration: '10MG/100CAPS', price: 'R$ 150,00' },
      { id: 'orais-oxandrolona-20', name: 'OXANDROLONA', concentration: '20MG/100CAPS', price: 'R$ 170,00' },
      { id: 'orais-stano', name: 'STANO', concentration: '10MG/100CAPS', price: 'R$ 140,00' },
      { id: 'orais-dianabol', name: 'DIANABOL', concentration: '10MG/100CAPS', price: 'R$ 140,00' },
      { id: 'orais-hemogenin', name: 'HEMOGENIN', concentration: '25MG/50CAPS', price: 'R$ 140,00' },
      { id: 'orais-turinabol', name: 'TURINABOL', concentration: '10MG/100CAPS', price: 'R$ 160,00' },
      { id: 'orais-proviron', name: 'PROVIRON', concentration: '25MG/40CAPS', price: 'R$ 160,00' },
      { id: 'orais-sibutramina-30', name: 'SIBUTRAMINA', concentration: '15MG/30CAPS', price: 'R$ 100,00' },
      { id: 'orais-sibutramina-60', name: 'SIBUTRAMINA', concentration: '15MG/60CAPS', price: 'R$ 150,00' },
      { id: 'orais-emagrecedor-fat', name: 'EMAGRECEDOR FAT', concentration: 'MG/30CAPS', price: 'R$ 190,00' },
    ],
  },
  {
    id: 'peptideos',
    title: 'PEPTÍDEOS',
    badge: 'PEPTÍDEOS',
    items: [
      { id: 'peptideos-tirzepatide', name: 'TIRZEPATIDE', concentration: '60MG', price: 'R$ 850,00' },
      { id: 'peptideos-ghk-cu', name: 'GHK-Cu', concentration: '100MG', price: 'R$ 600,00' },
      { id: 'peptideos-retatrutide-20', name: 'RETATRUTIDE', concentration: '20MG', price: 'R$ 630,00' },
      { id: 'peptideos-retatrutide-40', name: 'RETATRUTIDE', concentration: '40MG', price: 'R$ 730,00' },
      { id: 'peptideos-retatrutide-60', name: 'RETATRUTIDE', concentration: '60MG', price: 'R$ 850,00' },
    ],
  },
];

export const SHIPPING_RATES: ShippingItem[] = [
  { id: 'sp', region: 'São Paulo (SP)', price: 'R$ 40,00' },
  { id: 'co', region: 'Centro-Oeste', price: 'R$ 40,00' },
  { id: 'sul', region: 'Sul', price: 'R$ 40,00' },
  { id: 'mt', region: 'Mato Grosso (MT)', price: 'R$ 70,00' },
  { id: 'ms', region: 'Mato Grosso do Sul (MS)', price: 'R$ 70,00' },
  { id: 'ne', region: 'Nordeste', price: 'R$ 70,00' },
  { id: 'no', region: 'Norte', price: 'R$ 70,00' },
];
