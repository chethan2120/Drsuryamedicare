import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Check,
  ExternalLink,
  Star,
  MessageCircle,
  FileText,
  BadgeCheck,
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'packaging'>('specs');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Reset internal state when a new product is opened
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsAdded(false);
      setActiveTab('specs');
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const totalPrice = product.price * quantity;
  const gstAmount = Math.round((totalPrice * (product.gstPercent || 12)) / 100);
  const grandTotal = totalPrice + gstAmount;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Dr Surya Medicare team,\n\nI am interested in procuring:\n*Product:* ${product.name}\n*SKU:* ${product.sku}\n*Quantity:* ${quantity} ${product.unit}(s)\n*Estimated Price:* ₹${grandTotal.toLocaleString('en-IN')} (incl. GST)\n\nPlease share institutional bulk rate & delivery schedule.`
    );
    window.open(`https://wa.me/919483038686?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-forest/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl border border-brand-border/80 max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-brand-warmWhite hover:bg-brand-softGreen text-brand-forest flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8">
          
          {/* LEFT: Image Gallery & Previews */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-brand-ivory/40 p-4 border border-brand-border/60 flex items-center justify-center overflow-hidden">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain rounded-xl transition-transform duration-300 hover:scale-105"
              />

              {product.discountPercent && product.discountPercent > 0 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-forest text-brand-gold text-xs font-semibold">
                  -{product.discountPercent}% OFF
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-xs ${
                  isFavorited
                    ? 'bg-brand-vermilion text-white'
                    : 'bg-white/90 hover:bg-white text-brand-forest'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnails if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-brand-emerald shadow-xs'
                        : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Assurance Tags */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-brand-forest">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-brand-softGreen/50 border border-brand-emerald/15">
                <BadgeCheck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>CDSCO & ISO Verified</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-brand-ivory/60 border border-brand-border/60">
                <Truck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>Pan-India Dispatch</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information & Interactive Actions */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald font-bold uppercase tracking-wider text-[10px]">
                  {product.categoryName}
                </span>
                <span className="font-mono text-brand-muted text-[11px]">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-forest leading-snug">
                {product.name}
              </h3>

              {/* Rating & Stock Status */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-amber-500 font-normal">({product.reviewCount || 120})</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock ({product.stockCount || 500} {product.unit}s Available)</span>
                </div>
              </div>

              {/* Pricing Block with live calculation */}
              <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border/70 space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-heading font-extrabold text-brand-forest">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-brand-muted line-through font-medium">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-brand-muted">/ {product.unit}</span>
                </div>
                <div className="text-[11px] text-brand-muted flex items-center justify-between">
                  <span>+ {product.gstPercent || 12}% GST compliant invoice</span>
                  {quantity > 1 && (
                    <span className="font-bold text-brand-emerald">
                      Subtotal: {formatINR(totalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs text-brand-body leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Tabs: Specs vs Packaging */}
              <div className="space-y-2 pt-1">
                <div className="flex border-b border-brand-border text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1.5 px-1 border-b-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'border-brand-emerald text-brand-emerald'
                        : 'border-transparent text-brand-muted hover:text-brand-forest'
                    }`}
                  >
                    Clinical Specifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('packaging')}
                    className={`pb-1.5 px-3 border-b-2 transition-colors ${
                      activeTab === 'packaging'
                        ? 'border-brand-emerald text-brand-emerald'
                        : 'border-transparent text-brand-muted hover:text-brand-forest'
                    }`}
                  >
                    Packaging Details
                  </button>
                </div>

                {activeTab === 'specs' && product.specifications && (
                  <div className="max-h-28 overflow-y-auto space-y-1 pr-1 text-[11px]">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5 border-b border-brand-border/40">
                        <span className="text-brand-muted">{key}</span>
                        <span className="font-medium text-brand-forest text-right ml-2">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'packaging' && (
                  <p className="text-[11px] text-brand-body leading-relaxed bg-brand-warmWhite p-2.5 rounded-xl border border-brand-border/60">
                    {product.packagingDetails || 'Standard institutional bulk tamper-evident hospital packaging.'}
                  </p>
                )}
              </div>

            </div>

            {/* Interactive Quantity & Action Buttons */}
            <div className="space-y-3 pt-2 border-t border-brand-border/70">
              
              {/* Quantity Picker */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-forest">Quantity ({product.unit}s):</span>
                <div className="flex items-center border border-brand-border rounded-xl bg-white shadow-xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-brand-softGreen text-brand-forest transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-brand-forest">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-brand-softGreen text-brand-forest transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-brand-emerald hover:bg-brand-emeraldLight text-brand-warmWhite'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {quantity} to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart ({formatINR(totalPrice)})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>

              {/* Link to Full Product Page */}
              <div className="text-center pt-1">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-emerald transition-colors"
                >
                  <span>View Full Product Specifications & FAQs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
