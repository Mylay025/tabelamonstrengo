import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, ShieldAlert, PhoneCall } from 'lucide-react';
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.ts';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({ isOpen, onClose }) => {
  const [inputNumber, setInputNumber] = useState<string>(() => {
    return WHATSAPP_NUMBER || localStorage.getItem('genoma_whatsapp_number') || '';
  });
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const sanitized = inputNumber.trim().replace(/\D/g, '');
  const previewUrl = sanitized ? getWhatsAppUrl(sanitized, DEFAULT_WHATSAPP_MESSAGE) : null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (sanitized) {
      localStorage.setItem('genoma_whatsapp_number', sanitized);
    } else {
      localStorage.removeItem('genoma_whatsapp_number');
    }
    window.dispatchEvent(new Event('whatsapp_config_updated'));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setInputNumber('');
    localStorage.removeItem('genoma_whatsapp_number');
    window.dispatchEvent(new Event('whatsapp_config_updated'));
  };

  const copyConfigSnippet = () => {
    const snippet = `export const WHATSAPP_NUMBER: string = '${sanitized}';`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-6 overflow-hidden">
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-emerald-500 to-red-600" />

        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">Configuração do WhatsApp</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div className="p-3.5 bg-neutral-900/70 border border-neutral-800 rounded-lg text-xs text-neutral-300 space-y-1.5 leading-relaxed">
            <p className="font-semibold text-neutral-200">
              Formato obrigatório: <span className="text-emerald-400 font-mono">55DDDNUMERO</span>
            </p>
            <p className="text-neutral-400">
              Apenas números com DDI do Brasil (55), DDD de 2 dígitos e telefone com 8 ou 9 dígitos, sem espaços ou traços.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Número do Vendedor (DDI + DDD + Número)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: 5511999998888"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white rounded-lg font-mono text-sm tracking-wider placeholder:text-neutral-600 transition-colors"
              />
            </div>
            {sanitized && (
              <p className="mt-1.5 text-xs text-emerald-400 font-mono">
                Número formatado: +{sanitized}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Mensagem Pré-preenchida
            </label>
            <div className="p-2.5 bg-neutral-900/50 border border-neutral-800 rounded text-xs text-neutral-300 italic font-mono">
              "{DEFAULT_WHATSAPP_MESSAGE}"
            </div>
          </div>

          {previewUrl && (
            <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg text-xs space-y-1">
              <span className="text-neutral-400 font-semibold block">Link resultante gerado:</span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 break-all font-mono"
              >
                <span>{previewUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-3.5 py-2 text-xs text-neutral-400 hover:text-red-400 hover:bg-neutral-900 rounded-lg transition-colors border border-transparent hover:border-neutral-800"
            >
              Limpar (Desativar)
            </button>

            <div className="flex items-center gap-2">
              {sanitized && (
                <button
                  type="button"
                  onClick={copyConfigSnippet}
                  className="px-3 py-2 text-xs text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-colors"
                  title="Copiar linha para o arquivo src/config/whatsapp.ts"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar p/ Código'}</span>
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg transition-colors shadow-md shadow-red-950 flex items-center gap-1.5"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : null}
                <span>{savedSuccess ? 'Salvo!' : 'Salvar e Ativar'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
