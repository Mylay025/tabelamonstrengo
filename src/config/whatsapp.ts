/**
 * Configuração de contato via WhatsApp para ambas as marcas (Genoma Labs & Império Pharma)
 * Novo link oficial: https://wa.me/5544920076155?utm_source=chatgpt.com
 */
export const WHATSAPP_NUMBER: string = '5544920076155';
export const WHATSAPP_BASE_URL: string = 'https://wa.me/5544920076155?utm_source=chatgpt.com';

export const DEFAULT_WHATSAPP_MESSAGE: string = 
  'Olá! Acessei a página da Genoma Labs e gostaria de obter informações.';

/**
 * Função utilitária para gerar o link do WhatsApp com parâmetros UTM e mensagem codificada
 */
export function getWhatsAppUrl(customNumber?: string, customMessage?: string): string | null {
  const phone = (customNumber || WHATSAPP_NUMBER).trim().replace(/\D/g, '');
  if (!phone) {
    return null;
  }
  
  const baseUrl = phone === WHATSAPP_NUMBER
    ? WHATSAPP_BASE_URL
    : `https://wa.me/${phone}?utm_source=chatgpt.com`;

  if (customMessage) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}text=${encodeURIComponent(customMessage)}`;
  }
  return baseUrl;
}
