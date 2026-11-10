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
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3e%3crect width='400' height='400' fill='%23F9EBD7'/%3e%3ccircle cx='200' cy='200' r='90' fill='%23046A38' opacity='0.15'/%3e%3cpath d='M175 120h50v160h-50zM120 175h160v50H120z' fill='%23046A38'/%3e%3ctext x='50%25' y='330' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23046A38' text-anchor='middle'%3eDR SURYA MEDICARE%3c/text%3e%3c/svg%3e";

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
      className="group relative flex flex-col bg-white rounded-2xl border border-brand-border/80 hover:border-brand-emerald/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      {/* 1. Image Container with Badges & Wishlist Trigger */}
      <div className="relative aspect-square w-full bg-brand-ivory/30 p-2.5 sm:p-3 overflow-hidden flex items-center justify-center">
        {/* Main & Secondary Image cross-fade */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
            }}
            className={`w-full h-full object-cover rounded-xl transition-all duration-500 transform ${
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
              className={`absolute inset-2.5 sm:inset-3 w-[calc(100%-1.25rem)] sm:w-[calc(100%-1.5rem)] h-[calc(100%-1.25rem)] sm:h-[calc(100%-1.5rem)] object-cover rounded-xl transition-all duration-500 transform ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Vermilion Discount Badge (Top Left) */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2 py-0.5 sm:py-1 rounded-md bg-brand-vermilion text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs">
            -{product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs transition-transform active:scale-90 ${
            isFavorited
              ? 'bg-brand-vermilion text-white'
              : 'bg-white/95 hover:bg-white text-brand-muted hover:text-brand-vermilion'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-white' : ''}`} />
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
            className="flex-1 py-2 px-3 rounded-xl bg-brand-forest/90 hover:bg-brand-forest text-white text-xs font-semibold backdrop-blur-sm flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Content & Information Section */}
      <div className="flex flex-col flex-1 p-3 sm:p-4.5 space-y-2">
        
        {/* Meta Bar: Category + SKU */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-brand-muted">
          <span className="font-semibold text-brand-emerald uppercase tracking-wider text-[9px] sm:text-[10px] line-clamp-1">
            {product.categoryName}
          </span>
          <span className="font-mono bg-brand-ivory/70 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] flex-shrink-0 ml-1">
            {product.sku}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="text-xs sm:text-sm font-heading font-bold text-brand-forest hover:text-brand-emerald transition-colors line-clamp-2 leading-snug"
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
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-brand-muted font-normal text-[9px] sm:text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Stock Status Pill */}
        <div>
          {product.stockStatus === 'in_stock' ? (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
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
              <span className="text-sm sm:text-base font-bold text-brand-forest font-heading">
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
            className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-semibold shadow-xs hover:shadow transition-all duration-200 active:scale-95"
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
