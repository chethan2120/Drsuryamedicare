import React, { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import { Heart, ShoppingBag, Eye, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const QuickViewModal = lazy(() => import('./QuickViewModal').then((module) => ({ default: module.QuickViewModal })));

const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3e%3crect width='400' height='400' fill='%23F7FAF8'/%3e%3cpath d='M184 112h32v136h-32zM132 164h136v32H132z' fill='%230B0F0E'/%3e%3c/svg%3e";

interface ProductCardProps {
  product: Product;
}

const stockCopy: Record<Product['stockStatus'], { label: string; className: string }> = {
  in_stock: { label: 'In stock', className: 'bg-brand-mist text-brand-goldInk' },
  low_stock: { label: 'Low stock', className: 'bg-amber-50 text-amber-800' },
  out_of_stock: { label: 'Out of stock', className: 'bg-brand-stone text-brand-muted' },
  enquiry_only: { label: 'Quote only', className: 'bg-brand-cool text-brand-navy' },
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const secondaryImage = product.images[1];
  const stock = stockCopy[product.stockStatus];
  const canAdd = product.stockStatus === 'in_stock' || product.stockStatus === 'low_stock';

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow duration-300 hover:shadow-card"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-brand-ivory">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
            }}
            className={`h-full w-full object-contain object-center p-3 transition-opacity duration-500 ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
            width={640}
            height={640}
            decoding="async"
            loading="lazy"
          />
          {secondaryImage && isHovered && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
              }}
              className={`absolute inset-0 h-full w-full object-contain object-center p-3 transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {product.discountPercent && product.discountPercent > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-brand-navy px-2 py-1 text-[11px] font-semibold text-brand-ivory">
            {product.discountPercent}% off
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-xs ${
            isFavorited ? 'bg-brand-navy text-brand-ivory' : 'bg-white text-brand-muted'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-brand-ivory' : ''}`} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setIsQuickViewOpen(true);
          }}
          className={`absolute inset-x-3 bottom-3 z-10 hidden items-center justify-center gap-1.5 rounded-[10px] bg-white py-2.5 text-xs font-semibold text-brand-navy shadow-sm transition-opacity sm:flex ${
            isHovered ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-goldInk">
          {product.brand}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-[2.6rem] font-heading text-sm font-semibold leading-snug text-brand-navy"
          title={product.name}
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-brand-body">{product.shortDescription}</p>
        <p className={`mt-auto inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${stock.className}`}>
          {product.stockStatus === 'in_stock' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
          {stock.label}
        </p>
        <div className="flex items-end justify-between gap-2 border-t border-brand-border/70 pt-3">
          <div>
            <p className="font-heading text-base font-bold text-brand-navy">{formatINR(product.price)}</p>
            <p className="text-[10px] text-brand-muted">
              per {product.unit}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-1.5 line-through">{formatINR(product.originalPrice)}</span>
              )}
            </p>
          </div>
          {product.stockStatus === 'enquiry_only' ? (
            <Link
              to={`/bulk-orders?prefill=${product.id}`}
              className="inline-flex min-h-10 items-center gap-1 rounded-[10px] border border-brand-navy/20 px-3 text-xs font-semibold text-brand-navy"
            >
              <FileText className="h-3.5 w-3.5" />
              Request Quote
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              disabled={!canAdd}
              className="inline-flex min-h-10 items-center gap-1 rounded-[10px] bg-brand-emerald px-3 text-xs font-semibold text-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add
            </button>
          )}
        </div>
      </div>

      {isQuickViewOpen ? (
        <Suspense fallback={null}>
          <QuickViewModal product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
        </Suspense>
      ) : null}
    </article>
  );
};
