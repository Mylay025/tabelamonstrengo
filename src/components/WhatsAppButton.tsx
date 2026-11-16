import React, { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../config/whatsapp.ts';
import { MessageSquare, Settings2, ExternalLink, AlertCircle, Check } from 'lucide-react';

interface WhatsAppButtonProps {
  onOpenConfig?: () => void;
  hasActiveQuote?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onOpenConfig, hasActiveQuote = false }) => {
  // Support both hardcoded configuration in file and runtime localStorage for testing
  const [activeNumber, setActiveNumber] = useState<string>(() => {
    return WHATSAPP_NUMBER || localStorage.getItem('genoma_whatsapp_number') || '';
  });

  useEffect(() => {
    const handleStorage = () => {
      setActiveNumber(WHATSAPP_NUMBER || localStorage.getItem('genoma_whatsapp_number') || '');
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('whatsapp_config_updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('whatsapp_config_updated', handleStorage);
    };
  }, []);

  const isConfigured = Boolean(activeNumber.trim().replace(/\D/g, ''));
  const targetUrl = isConfigured ? getWhatsAppUrl(activeNumber, DEFAULT_WHATSAPP_MESSAGE) : null;

  return (
    <div className={`fixed ${hasActiveQuote ? 'bottom-20 sm:bottom-5' : 'bottom-5'} right-4 sm:right-5 z-40 flex flex-col items-end gap-2 max-w-[90vw] transition-all duration-200`}>
      {/* Floating WhatsApp Action Button */}
      {isConfigured && targetUrl ? (
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.45)] border border-emerald-400/30 transition-all duration-200 active:scale-95 hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)]"
          aria-label="Falar com o vendedor no WhatsApp"
        >
          {/* Official WhatsApp SVG Logo */}
          <svg
            className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform duration-200"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41 1.56 1.56 2.41 3.63 2.41 5.83 0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
          </svg>
          <span className="text-sm tracking-wider uppercase whitespace-nowrap">FALAR COM O VENDEDOR</span>
        </a>
      ) : (
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={onOpenConfig}
            className="group flex items-center gap-2.5 px-4 py-3 bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full border border-neutral-700/80 shadow-lg backdrop-blur-md transition-all duration-200"
            title="Clique para configurar o número do WhatsApp do vendedor"
          >
            <svg
              className="w-5 h-5 fill-current text-neutral-400 group-hover:text-emerald-400 transition-colors shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41 1.56 1.56 2.41 3.63 2.41 5.83 0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
              FALAR COM O VENDEDOR
            </span>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-600/30 px-1.5 py-0.5 rounded font-mono">
              Em breve
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
