import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Activity,
  Layers,
  Cpu,
  Clock,
  Gauge,
  Zap,
} from 'lucide-react';

export const FeaturedShowcaseSection: React.FC = () => {
  // Selected spotlight item: High-Flow Oxygen Concentrator
  const spotlightItem = products.find((p) => p.id === 'dsm-oxy-01') || products[0];
  const gridItems = products.filter((p) => p.isFeatured && p.id !== spotlightItem.id).slice(0, 6);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section className="py-16 sm:py-24 bg-brand-warmWhite border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with Staggered & Scroll Reveal Animation */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-2 px-3 py-1 rounded-full bg-brand-softGreen border border-brand-emerald/20">
            <Activity className="w-3.5 h-3.5" />
            <span>Pinned Clinical Editorial Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-forest">
            Engineered for Precision & Continuous Patient Care
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto">
            Experience our scroll-pinned diagnostic deep dive. Biomedical telemetry, oxygen purity testing, and continuous ICU-grade resilience.
          </p>
        </div>

        {/* ========================================================= */}
        {/* STICKY / SCROLL-PINNED SHOWCASE                           */}
        {/* The left product preview pins gracefully while the         */}
        {/* right clinical specifications scroll through smoothly.     */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-brand-border/90 shadow-card p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Sticky Scroll-Pinned Product Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-ivory/40 p-4 border border-brand-border/60 group">
                <img
                  src={spotlightItem.images[0]}
                  alt={spotlightItem.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23F9EBD7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23046A38">Medical Device Verified</text></svg>';
                  }}
                />
                
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-emerald text-white text-[11px] font-bold shadow-md">
                  Clinical Spotlight
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-sm text-brand-forest font-mono text-[11px] font-bold shadow-xs border border-brand-border">
                  SKU: {spotlightItem.sku}
                </div>
              </div>

              {/* Quick Action Button Box inside sticky container */}
              <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-border/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl font-heading font-extrabold text-brand-forest block">
                    {formatINR(spotlightItem.price)}
                  </span>
                  <span className="text-[10px] text-brand-muted">Standard Institutional Rate</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(spotlightItem, 1)}
                    className="px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-bold shadow transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    to={`/product/${spotlightItem.id}`}
                    className="p-2.5 rounded-xl bg-white hover:bg-brand-border text-brand-forest text-xs font-bold border border-brand-border"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT: Scrolling Deep-Dive Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider block">
                  {spotlightItem.categoryName} • Continuous Flow 10 LPM
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest mt-1">
                  {spotlightItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-body/90 leading-relaxed mt-2">
                  {spotlightItem.description}
                </p>
              </div>

              {/* Scroll Step 1: Real-time Telemetry & Calibration */}
              <div className="p-5 rounded-2xl bg-brand-warmWhite border border-brand-border/80 space-y-3">
                <div className="flex items-center gap-2.5 text-brand-forest font-heading font-bold text-sm">
                  <Activity className="w-4 h-4 text-brand-emerald" />
                  <span>Clinical Purity & Sensor Telemetry</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Dual-sieve bed PSA filtration produces up to 96% medical-grade oxygen purity at 10 LPM flow rate. Built-in low-pressure and low-purity audio-visual alarm systems protect uninterrupted patient recovery.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-xl bg-white border border-brand-border">
                    <span className="text-brand-muted block text-[10px]">O2 Output</span>
                    <strong className="text-brand-forest">93% ± 3%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-brand-border">
                    <span className="text-brand-muted block text-[10px]">Duty Cycle</span>
                    <strong className="text-brand-forest">24/7 Continuous</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-brand-border">
                    <span className="text-brand-muted block text-[10px]">Acoustic Level</span>
                    <strong className="text-brand-forest">&lt; 45 dB(A)</strong>
                  </div>
                </div>
              </div>

              {/* Scroll Step 2: Electrical and Compressor Durability */}
              <div className="p-5 rounded-2xl bg-brand-warmWhite border border-brand-border/80 space-y-3">
                <div className="flex items-center gap-2.5 text-brand-forest font-heading font-bold text-sm">
                  <Cpu className="w-4 h-4 text-brand-emerald" />
                  <span>German Copper-Wound Oil-Free Compressor</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Constructed with an advanced thermal overload protection circuit and high-efficiency heat dissipation vents, ensuring stability under Indian hospital power variances (220V ± 10%).
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-semibold">
                    Thermal Cutoff Protection
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-semibold">
                    Anti-Vibration Rubber Base
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-semibold">
                    Washable HEPA Pre-Filter
                  </span>
                </div>
              </div>

              {/* Scroll Step 3: Verified Hospital Compatibility */}
              <div className="p-5 rounded-2xl bg-brand-warmWhite border border-brand-border/80 space-y-3">
                <div className="flex items-center gap-2.5 text-brand-forest font-heading font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  <span>Institutional Testing & Warranty</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Supplied with an official CDSCO test certificate, 2-year on-site biomedical repair warranty, and complimentary initial set of cannula tubing, humidifier bottles, and dual replacement filters.
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-brand-forest font-bold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> CDSCO Registered
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> ISO 80601-2-69 Compliant
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Grid of Other Featured Medical Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-forest">
                Additional Featured Clinical Devices
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted">
                Handpicked clinical essentials for immediate dispatch.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-brand-emerald hover:underline flex items-center gap-1"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridItems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-brand-border/80 p-4 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-brand-ivory/40 mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23F9EBD7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23046A38">Medical Item</text></svg>';
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand-warmWhite/90 text-brand-forest text-[10px] font-mono font-semibold">
                      {product.sku}
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-brand-emerald uppercase mb-1">
                    {product.categoryName}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-brand-forest line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-brand-muted line-clamp-2 mt-1">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-brand-forest font-heading">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-[10px] text-brand-muted block">excl. GST</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className="p-2 rounded-lg bg-brand-ivory/80 text-brand-muted hover:text-brand-vermilion"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'text-brand-vermilion fill-brand-vermilion' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1)}
                      className="px-3 py-1.5 rounded-lg bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-semibold"
                    >
                      Add
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-2.5 py-1.5 rounded-lg bg-brand-softGreen text-brand-emerald text-xs font-semibold"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};