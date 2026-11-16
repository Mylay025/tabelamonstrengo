import { ProductCategory } from './products.ts';

/**
 * Catálogo Oficial Kronos Pharma
 * Cores da marca:
 * - Preto profundo: #040814
 * - Azul-marinho: #071129 / #0B1A3D
 * - Azul elétrico: #2563EB
 * - Azul neon: #00B4FF / #38BDF8
 * - Branco metálico: #FFFFFF / #E2E8F0
 */
export const KRONOS_CATEGORIES: ProductCategory[] = [
  {
    id: 'injetaveis-2x5ml',
    title: 'INJETÁVEIS 2x5ML',
    badge: '2x5ML',
    items: [
      { id: 'kronos-2x5ml-durateston', name: 'DURATESTON', concentration: '2X5ML/250MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-enantato-testo', name: 'ENANTATO TESTO', concentration: '2X5ML/250MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-cipionato-testo', name: 'CIPIONATO TESTO', concentration: '2X5ML/200MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-deca', name: 'DECA', concentration: '2X5ML/250MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-boldenona', name: 'BOLDENONA', concentration: '2X5ML/250MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-primobolan', name: 'PRIMOBOLAN', concentration: '2X5ML/100MG', price: 'R$ 300,00' },
      { id: 'kronos-2x5ml-trembo-slow', name: 'TREMBO SLOW', concentration: '2X5ML/200MG', price: 'R$ 180,00' },
      { id: 'kronos-2x5ml-masteron-slow', name: 'MASTERON SLOW', concentration: '2X5ML/200MG', price: 'R$ 180,00' },
      { id: 'kronos-2x5ml-trembo-ale', name: 'TREMBO ALE', concentration: '2X5ML/100MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-masterom', name: 'MASTEROM', concentration: '2X5ML/100MG', price: 'R$ 150,00' },
      { id: 'kronos-2x5ml-npp', name: 'NPP', concentration: '2X5ML/100MG', price: 'R$ 150,00' },
    ],
  },
  {
    id: 'linha-50ml',
    title: 'LINHA 50ML',
    badge: '50ML',
    items: [
      { id: 'kronos-50ml-dianabol', name: 'DIANABOL', concentration: '50ML/100MG', price: 'R$ 200,00' },
      { id: 'kronos-50ml-hemogenin', name: 'HEMOGENIN', concentration: '50ML/100MG', price: 'R$ 200,00' },
      { id: 'kronos-50ml-stano', name: 'STANO', concentration: '50ML/50MG', price: 'R$ 200,00' },
    ],
  },
  {
    id: 'encapsulados-orais',
    title: 'LINHA ENCAPSULADOS ORAIS',
    badge: 'ORAIS',
    items: [
      { id: 'kronos-orais-stano', name: 'STANO', concentration: '10MG/100CAPS', price: 'R$ 150,00' },
      { id: 'kronos-orais-dianabol', name: 'DIANABOL', concentration: '10MG/100CAPS', price: 'R$ 150,00' },
      { id: 'kronos-orais-hemogenin', name: 'HEMOGENIN', concentration: '25MG/100CAPS', price: 'R$ 180,00' },
      { id: 'kronos-orais-oxandrolona-10', name: 'OXANDROLONA', concentration: '10MG/100CAPS', price: 'R$ 150,00' },
      { id: 'kronos-orais-oxandrolona-20', name: 'OXANDROLONA', concentration: '20MG/100CAPS', price: 'R$ 180,00' },
      { id: 'kronos-orais-turbinabol', name: 'TURBINABOL', concentration: '10MG/100CAPS', price: 'R$ 150,00' },
    ],
  },
];
