import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { products } from '../../data/products';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_TERMS = [
  'Digital BP Monitor',
  'Pulse Oximeter',
  'Stethoscope',
  'Nitrile Gloves',
  'Wheelchair',
  'Oxygen Concentrator',
  'First Aid Kit',
  'Surgical Blades',
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.searchKeywords.some((k) => k.toLowerCase().includes(q))
    );
    setResults(matched.slice(0, 6));
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeywordClick = (term: string) => {
    setQuery(term);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-brand-forest/40 px-4 pt-16 backdrop-blur-sm animate-fade-in sm:pt-24"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-border bg-brand-warmWhite shadow-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-brand-border p-4 bg-white">
          <Search className="w-5 h-5 text-brand-emerald ml-1 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, SKU, brand or category"
            className="min-w-0 flex-1 border-none bg-transparent text-base font-medium text-brand-forest outline-none placeholder:text-brand-muted/70 sm:text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-brand-softGreen text-brand-muted hover:text-brand-forest mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-ivory hover:bg-brand-border text-brand-forest border border-brand-border"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Suggestions Chips */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted mb-2.5">
              <Tag className="w-3.5 h-3.5 text-brand-emerald" />
              <span>POPULAR HEALTHCARE SEARCHES</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCH_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleKeywordClick(term)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-brand-ivory/60 hover:bg-brand-softGreen hover:text-brand-emerald text-brand-forest font-medium border border-brand-border/60 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Live Search Results */}
          {results.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-semibold text-brand-muted mb-3 flex items-center justify-between">
                <span>PRODUCTS MATCHING "{query}"</span>
                <span className="text-brand-emerald font-bold">{results.length} found</span>
              </div>
              <div className="space-y-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-softGreen/50 cursor-pointer border border-transparent hover:border-brand-emerald/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-brand-ivory/40 p-1 flex-shrink-0 border border-brand-border/60 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-forest group-hover:text-brand-emerald transition-colors line-clamp-1">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-muted">
                          <span className="font-mono">{product.sku}</span>
                          <span>•</span>
                          <span>{product.brand}</span>
                          <span>•</span>
                          <span className="text-brand-emerald font-medium">{product.categoryName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <div className="text-sm font-bold text-brand-emerald">{formatINR(product.price)}</div>
                        <span className="text-[10px] text-brand-muted">excl. GST</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-emerald group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>

              {/* View all in Shop CTA */}
              <div className="pt-3 border-t border-brand-border text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-emerald hover:text-brand-emeraldLight"
                >
                  <span>View all results in product catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-medium text-brand-muted">
                No direct matches found for "<span className="text-brand-forest font-semibold">{query}</span>"
              </p>
              <p className="text-xs text-brand-muted">
                Try searching for broad categories like "Surgical", "Diagnostic", "Consumables", or contact us for custom quotation.
              </p>
            </div>
          )}
        </div>

        {/* Footer info in modal */}
        <div className="bg-brand-ivory/40 px-4 py-2.5 border-t border-brand-border/70 flex items-center justify-between text-[11px] text-brand-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            Verified Medical Product Catalogue
          </span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
