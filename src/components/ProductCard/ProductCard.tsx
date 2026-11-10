import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import { QuickViewModal } from './QuickViewModal';
import {
  Heart,
  ShoppingBag,
  Eye,
  CheckCircle2,
  AlertCircle,
  Star,
} from 'lucide-react';

const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3e%3crect width='400' height='400' fill='%23F7F5EF'/%3e%3ccircle cx='200' cy='180' r='78' fill='%23147D72' opacity='0.12'/%3e%3cpath d='M184 112h32v136h-32zM132 164h136v32H132z' fill='%23102C3C'/%3e%3ctext x='50%25' y='320' font-family='sans-serif' font-size='15' font-weight='600' fill='%23102C3C' text-anchor='middle'%3eDR SURYA MEDICARE%3c/text%3e%3c/svg%3e";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-brand-border hover:border-brand-emerald/40 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    >
      {/* 1. Image Container with Badges & Wishlist Trigger */}
      <div className="relative aspect-square w-full bg-brand-ivory overflow-hidden flex items-center justify-center">
        {/* Main & Secondary Image cross-fade */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
            }}
            className={`h-full w-full object-cover object-center transition-all duration-500 ${
              isHovered && product.images.length > 1 ? 'opacity-0 scale-95' : 'opacity-100 group-hover:scale-105'
            }`}
            loading="lazy"
          />
          {product.images.length > 1 && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
              }}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Vermilion Discount Badge (Top Left) */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-brand-forest text-brand-gold text-[11px] font-semibold tracking-tight">
            {product.discountPercent}% off
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-transform active:scale-95 ${
            isFavorited
              ? 'bg-brand-forest text-brand-gold'
              : 'bg-white text-brand-muted hover:text-brand-emerald'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-brand-gold' : ''}`} />
        </button>

        {/* Quick View Hover Action Bar (Desktop only) */}
        <div
          className={`hidden sm:flex absolute bottom-3 inset-x-3 z-10 gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 rounded-xl bg-brand-forest hover:bg-brand-emerald text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Content & Information Section */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        
        {/* Meta Bar: Category + SKU */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-brand-muted">
          <span className="font-semibold text-brand-emerald uppercase tracking-[0.12em] text-[10px] line-clamp-1">
            {product.categoryName}
          </span>
          <span className="font-mono bg-brand-ivory/70 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] flex-shrink-0 ml-1">
            {product.sku}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-heading font-semibold text-brand-forest hover:text-brand-emerald transition-colors line-clamp-2 leading-snug min-h-[2.6rem]"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Short Description */}
        <p className="text-[11px] sm:text-xs text-brand-body/80 line-clamp-2 leading-relaxed font-normal">
          {product.shortDescription}
        </p>

        {/* Brand & Demo Rating */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <span className="text-brand-muted text-[10px] sm:text-[11px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-brand-forest">
            <Star className="w-3.5 h-3.5 fill-brand-goldInk text-brand-goldInk" />
            <span>{product.rating}</span>
            <span className="text-brand-muted font-normal text-[9px] sm:text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Stock Status Pill */}
        <div>
          {product.stockStatus === 'in_stock' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-emeraldDark bg-brand-mist px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3 h-3 text-brand-emerald flex-shrink-0" />
              <span>In Stock</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
              <span>Low Stock</span>
            </span>
          )}
        </div>

        {/* Push to bottom container: Price + Add Button */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2">
          {/* Price Area */}
          <div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-base font-bold text-brand-forest font-heading">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-brand-muted line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-brand-muted block -mt-0.5">
              per {product.unit}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-1 min-h-[40px] px-3.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-semibold transition-colors active:scale-95"
            title="Add to shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
