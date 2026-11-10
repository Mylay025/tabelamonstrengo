import { QuoteItem } from '../types/quote.ts';

export const WHATSAPP_QUOTE_BASE_URL = 'https://wa.me/5544920076155?utm_source=chatgpt.com';

/**
 * Converte uma string de valor monetário (ex: "R$ 140,00" ou "R$ 1.250,50") para número float.
 */
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Remove R$, espaços, e pontos de milhar, troca vírgula por ponto
  const clean = priceStr
    .replace(/R\$/gi, '')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * Formata um número em formato monetário Real brasileiro (ex: "R$ 140,00").
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Calcula o subtotal de um item do orçamento.
 */
export function calculateItemSubtotal(item: QuoteItem): number {
  const unitPrice = parsePrice(item.product.price);
  return unitPrice * item.quantity;
}

/**
 * Calcula o total geral de todos os itens do orçamento.
 */
export function calculateTotal(items: QuoteItem[]): number {
  return items.reduce((acc, item) => acc + calculateItemSubtotal(item), 0);
}

/**
 * Calcula a quantidade total de unidades selecionadas.
 */
export function calculateTotalUnits(items: QuoteItem[]): number {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

/**
 * Gera o texto formatado para envio no WhatsApp com identificação opcional da marca.
 */
export function generateWhatsAppMessage(items: QuoteItem[], brandName?: string): string {
  if (items.length === 0) return '';

  const brandContext = brandName ? ` (${brandName})` : '';
  const header = `Olá! Gostaria de solicitar um orçamento${brandContext} para os seguintes produtos:\n`;

  const productLines = items
    .map((item, index) => {
      const num = index + 1;
      const name = item.product.name;
      const desc = item.product.concentration || 'Padrão';
      const unit = item.product.price;
      const qty = item.quantity;
      const subtotal = formatCurrency(calculateItemSubtotal(item));

      return (
        `${num}. ${name}\n` +
        `   Descrição: ${desc}\n` +
        `   Valor unitário: ${unit}\n` +
        `   Quantidade: ${qty}\n` +
        `   Subtotal: ${subtotal}`
      );
    })
    .join('\n\n');

  const total = formatCurrency(calculateTotal(items));
  const footer = `\n\nTotal estimado: ${total}\n\nAguardo o retorno. Obrigado!`;

  return `${header}\n${productLines}${footer}`;
}

/**
 * Gera o link completo para o WhatsApp com a mensagem codificada em URL.
 */
export function getWhatsAppQuoteUrl(items: QuoteItem[], brandName?: string): string {
  const message = generateWhatsAppMessage(items, brandName);
  if (!message) {
    return WHATSAPP_QUOTE_BASE_URL;
  }
  const separator = WHATSAPP_QUOTE_BASE_URL.includes('?') ? '&' : '?';
  return `${WHATSAPP_QUOTE_BASE_URL}${separator}text=${encodeURIComponent(message)}`;
}

