export type BrandType = 'genoma' | 'imperio';

export interface BrandConfig {
  id: BrandType;
  name: string;
  fullName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  headerBorderColor: string;
}

export const BRANDS: Record<BrandType, BrandConfig> = {
  genoma: {
    id: 'genoma',
    name: 'GENOMA',
    fullName: 'GENOMA LABS',
    tagline: 'QUALIDADE | SEGURANÇA | RESULTADOS',
    primaryColor: '#DC2626',
    accentColor: '#EF4444',
    headerBorderColor: 'rgba(220, 38, 38, 0.4)',
  },
  imperio: {
    id: 'imperio',
    name: 'IMPÉRIO',
    fullName: 'IMPÉRIO PHARMA',
    tagline: 'QUALIDADE | SEGURANÇA | RESULTADOS',
    primaryColor: '#F2B91E',
    accentColor: '#C99720',
    headerBorderColor: 'rgba(201, 151, 32, 0.4)',
  },
};
