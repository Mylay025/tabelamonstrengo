import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ImperioHero } from './components/ImperioHero.tsx';
import { ProductsSection } from './components/ProductsSection.tsx';
import { ImperioProductsSection } from './components/ImperioProductsSection.tsx';
import { QuoteSection } from './components/QuoteSection.tsx';
import { QuoteDrawer } from './components/QuoteDrawer.tsx';
import { FloatingQuoteBar } from './components/FloatingQuoteBar.tsx';
import { ShippingSection } from './components/ShippingSection.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductItem } from './data/products.ts';
import { QuoteItem } from './types/quote.ts';
import { BrandType } from './types/brand.ts';

export default function App() {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active brand selection state (default 'genoma' preserved 100%)
  const [activeBrand, setActiveBrand] = useState<BrandType>(() => {
    try {
      const saved = localStorage.getItem('active_brand_choice');
      return saved === 'imperio' ? 'imperio' : 'genoma';
    } catch {
      return 'genoma';
    }
  });

  // Keep page title in sync with active brand
  useEffect(() => {
    try {
      localStorage.setItem('active_brand_choice', activeBrand);
      if (activeBrand === 'imperio') {
        document.title = 'Império Pharma - Catálogo Oficial e Tabela de Fretes';
      } else {
        document.title = 'Genoma Labs - Catálogo e Tabela de Fretes';
      }
    } catch {
      // ignore
    }
  }, [activeBrand]);

  // Ensure legacy phone number is migrated to the new link
  useEffect(() => {
    try {
      const saved = localStorage.getItem('genoma_whatsapp_number');
      if (saved === '559591353489' || saved === '5515953742255') {
        localStorage.removeItem('genoma_whatsapp_number');
        window.dispatchEvent(new Event('whatsapp_config_updated'));
      }
    } catch {
      // ignore
    }
  }, []);

  // Quote items state persisted independently for each brand to preserve users' selections
  const [genomaQuoteItems, setGenomaQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('genoma_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [imperioQuoteItems, setImperioQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('imperio_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('genoma_quote_items', JSON.stringify(genomaQuoteItems));
    } catch {
      // ignore
    }
  }, [genomaQuoteItems]);

  useEffect(() => {
    try {
      localStorage.setItem('imperio_quote_items', JSON.stringify(imperioQuoteItems));
    } catch {
      // ignore
    }
  }, [imperioQuoteItems]);

  // Get active quote items according to the active brand
  const activeQuoteItems = activeBrand === 'imperio' ? imperioQuoteItems : genomaQuoteItems;
  const setActiveQuoteItems = activeBrand === 'imperio' ? setImperioQuoteItems : setGenomaQuoteItems;

  // Toggle product selection: adds with qty 1 or removes if already in list
  const handleToggleProduct = (product: ProductItem) => {
    setActiveQuoteItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Update item quantity (minimum 1, no zeros or negatives)
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const validQty = Math.max(1, Math.floor(newQuantity));
    setActiveQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    );
  };

  // Remove individual item
  const handleRemoveItem = (productId: string) => {
    setActiveQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear all items from active quote
  const handleClearAll = () => {
    setActiveQuoteItems([]);
  };

  const isImperio = activeBrand === 'imperio';

  return (
    <div
      className={`min-h-screen text-neutral-100 flex flex-col transition-colors duration-150 ${
        isImperio
          ? 'bg-[#0B0906] selection:bg-[#F2B91E] selection:text-black'
          : 'bg-black selection:bg-red-600 selection:text-white'
      }`}
    >
      {/* Top Navigation with Brand Selector */}
      <Header
        onOpenWhatsAppConfig={() => setConfigModalOpen(true)}
        quoteCount={activeQuoteItems.length}
        onOpenQuote={() => setIsDrawerOpen(true)}
        brand={activeBrand}
        onSelectBrand={(newBrand) => setActiveBrand(newBrand)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Brand Hero Section */}
        {isImperio ? (
          <ImperioHero onOpenWhatsAppConfig={() => setConfigModalOpen(true)} />
        ) : (
          <Hero onOpenWhatsAppConfig={() => setConfigModalOpen(true)} />
        )}

        {/* Brand Products Section with direct row-selection */}
        {isImperio ? (
          <ImperioProductsSection
            quoteItems={imperioQuoteItems}
            onToggleProduct={handleToggleProduct}
            onOpenQuote={() => setIsDrawerOpen(true)}
          />
        ) : (
          <ProductsSection
            quoteItems={genomaQuoteItems}
            onToggleProduct={handleToggleProduct}
            onOpenQuote={() => setIsDrawerOpen(true)}
          />
        )}

        {/* Dedicated Budget / Quote Review Section */}
        <QuoteSection
          quoteItems={activeQuoteItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearAll}
          brand={activeBrand}
        />

        {/* Shipping & Assurance Section (Shared data, brand-specific style) */}
        <ShippingSection brand={activeBrand} />
      </main>

      {/* Footer */}
      <Footer
        onOpenWhatsAppConfig={() => setConfigModalOpen(true)}
        brand={activeBrand}
      />

      {/* Quick Access Floating Quote Bar (shows when items are selected) */}
      <FloatingQuoteBar
        quoteItems={activeQuoteItems}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        brand={activeBrand}
      />

      {/* Slide-over Quote Drawer */}
      <QuoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        quoteItems={activeQuoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        brand={activeBrand}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton
        onOpenConfig={() => setConfigModalOpen(true)}
        hasActiveQuote={activeQuoteItems.length > 0}
      />

      {/* Admin WhatsApp Configuration Modal */}
      <WhatsAppConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </div>
  );
}
