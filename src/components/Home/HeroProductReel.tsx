import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { products } from '../../data/products';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';

const midpoint = Math.ceil(products.length / 2);
const downward = products.slice(0, midpoint);
const upward = products.slice(midpoint);
const loop = (list: Product[]) => [...list, ...list];

type ReelProps = {
  product: Product;
  onSelect: (product: Product) => void;
  className?: string;
};

const ReelTile: React.FC<ReelProps & { eager?: boolean }> = ({ product, onSelect, className = '', eager = false }) => (
  <button
    type="button"
    onClick={() => onSelect(product)}
    className={`hero-reel-tile relative shrink-0 overflow-hidden rounded-2xl text-left shadow-card transition-shadow hover:shadow-card-hover ${className}`}
    aria-label={`Preview ${product.name}`}
  >
    <img
      src={product.images[0]}
      alt={product.name}
      width={160}
      height={160}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="aspect-square w-full object-cover"
      draggable={false}
    />
    <span className="hero-reel-shade" aria-hidden="true" />
  </button>
);

export const HeroProductReel: React.FC = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<Product | null>(null);

  const selectProduct = (product: Product) => {
    if (preview?.id === product.id) {
      navigate(`/product/${product.id}`);
      return;
    }
    setPreview(product);
  };

  const openPreviewed = () => {
    if (!preview) return;
    navigate(`/product/${preview.id}`);
  };

  return (
    <>
      <div className={`hero-reels ${preview ? 'is-paused' : ''}`} aria-label="All shop products">
        <div className="hero-reels-columns">
          <div className="hero-col-window">
            <div className="hero-col-track" data-dir="down">
              {loop(downward).map((product, index) => (
                <ReelTile
                  key={`${product.id}-down-${index}`}
                  product={product}
                  onSelect={selectProduct}
                  eager={index < 3}
                />
              ))}
            </div>
          </div>
          <div className="hero-col-window">
            <div className="hero-col-track" data-dir="up">
              {loop(upward.length > 0 ? upward : downward).map((product, index) => (
                <ReelTile
                  key={`${product.id}-up-${index}`}
                  product={product}
                  onSelect={selectProduct}
                  eager={index < 3}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-row-window">
          <div className="hero-row-track">
            {loop(products).map((product, index) => (
              <ReelTile
                key={`${product.id}-row-${index}`}
                product={product}
                onSelect={selectProduct}
                className="w-[6.75rem] min-[400px]:w-32 sm:w-36"
                eager={index < 4}
              />
            ))}
          </div>
        </div>
      </div>

      {preview &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-label={preview.name}>
            <button
              type="button"
              aria-label="Close preview"
              className="absolute inset-0 bg-brand-navy/55"
              onClick={() => setPreview(null)}
            />
            <div className="relative w-full max-w-sm rounded-3xl bg-white p-4 shadow-modal sm:p-5">
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-cool text-brand-navy"
              >
                <X className="h-4 w-4" />
              </button>
              <button type="button" onClick={openPreviewed} className="block w-full" aria-label={`Open ${preview.name}`}>
                <img
                  src={preview.images[0]}
                  alt={preview.name}
                  className="mx-auto aspect-square w-full max-h-[46vh] rounded-2xl bg-brand-cool object-contain p-4"
                />
              </button>
              <p className="mt-4 pr-8 font-heading text-lg font-bold leading-snug text-brand-navy">{preview.name}</p>
              <p className="mt-1 text-sm font-semibold text-brand-teal">{formatINR(preview.price)}</p>
              <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                Click the image again to open this product.
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
