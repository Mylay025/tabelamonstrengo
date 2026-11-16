import { ProductItem } from '../data/products.ts';

export interface QuoteItem {
  product: ProductItem;
  quantity: number;
}
