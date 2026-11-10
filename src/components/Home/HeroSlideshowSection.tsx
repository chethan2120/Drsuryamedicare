import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Tag,
  Building2,
  Package,
  Pill,
  FileSpreadsheet,
  ArrowRight,
  Check,
  Copy,
} from 'lucide-react';

interface Slide {
  id: string;
  tabLabel: string;
  badge: string;
  headline: string;
  subtitle: string;
  offerDetails: string;
  couponCode: string;
  buttonText: string;
  link: string;
  image: string;
  popularItems: { label: string; url: string }[];
}

const slides: Slide[] = [
  {
    id: 'slide-1',
    tabLabel: 'ICU & Critical Care',
    badge: 'Clinical Sourcing Partner',
    headline: 'Critical Care. Smarter Choice.',
    subtitle: 'High-precision ICU monitors, anaesthesia workstations, and oxygen delivery systems trusted by leading hospitals.',
    offerDetails: 'Additional 5% Off',
    couponCode: 'FOREMOST5',
    buttonText: 'Explore Critical Care',
    link: '/shop?category=respiratory-care',
    image: '/banners/icu-critical-care.jpg',
    popularItems: [
      { label: 'OLED Oximeter', url: '/shop?q=oximeter' },
      { label: 'Oxygen Cannula', url: '/shop?q=cannula' },
      { label: 'Multipara Monitors', url: '/shop?category=monitoring-devices' },
    ],
  },
  {
    id: 'slide-2',
    tabLabel: 'Consumables & PPE',
    badge: 'Bulk Institutional Packs',
    headline: 'Hospital Consumables & Surgical PPE.',
    subtitle: 'Medical-grade powder-free nitrile gloves, 3-ply ultrasonic face masks, and sterile IV infusion sets at direct wholesale prices.',
    offerDetails: 'Institutional Bulk Rates',
    couponCode: 'CAREBULK',
    buttonText: 'Procure Consumables',
    link: '/shop?category=medical-consumables',
    image: '/banners/hospital-consumables.jpg',
    popularItems: [
      { label: 'Nitrile Gloves', url: '/shop?q=gloves' },
      { label: 'IV Infusion Sets', url: '/shop?q=iv' },
      { label: 'Surgical Masks', url: '/shop?q=mask' },
    ],
  },
  {
    id: 'slide-3',
    tabLabel: 'Tablets & Pharma',
    badge: 'WHO-GMP Certified Formulations',
    headline: 'Tablets & Daily Health Essentials.',
    subtitle: 'Fast-relief Paracetamol 650mg, Pan-D antacid capsules, ORS hydration salts, and zinc multivitamins ready for immediate clinic supply.',
    offerDetails: 'Verified Batch Assay',
    couponCode: 'SURYATAB',
    buttonText: 'Order Daily Pharma',
    link: '/shop?productType=Tablets%20%26%20Daily%20Health',
    image: '/banners/pharma-medicines.jpg',
    popularItems: [
      { label: 'SuryaDolo 650', url: '/shop?q=dolo' },
      { label: 'Pan-D Capsules', url: '/shop?q=pan' },
      { label: 'Immunity Multivitamins', url: '/shop?q=multivitamin' },
    ],
  },
];

export const HeroSlideshowSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Auto-play slide timer (6.5 seconds per slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  return (
    <section id="home" className="scroll-mt-20 sm:scroll-mt-24 py-3 sm:py-5 bg-brand-warmWhite border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          
          {/* LEFT EXPLORE QUICK MENU (Inspired by Medikabazaar left rail) */}
          <div className="hidden lg:flex lg:col-span-2 bg-white rounded-2xl border border-brand-border/80 p-3 shadow-xs flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider px-2 py-1 block">
                Quick Explore
              </span>

              <Link
                to="/shop?onlyDiscounted=true"
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-brand-forest hover:bg-brand-softGreen hover:text-brand-emerald transition-colors"
              >
                <Tag className="w-4 h-4 text-brand-vermilion" />
                <span>Clearance Deals</span>
              </Link>

              <Link
                to="/shop?category=medical-consumables"
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-brand-forest hover:bg-brand-softGreen hover:text-brand-emerald transition-colors"
              >
                <Package className="w-4 h-4 text-brand-emerald" />
                <span>Consumables</span>
              </Link>

              <Link
                to="/shop?category=diagnostic-equipment"
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-brand-forest hover:bg-brand-softGreen hover:text-brand-emerald transition-colors"
              >
                <Building2 className="w-4 h-4 text-brand-emerald" />
                <span>Equipment</span>
              </Link>

              <Link
                to="/shop?productType=Tablets%20%26%20Daily%20Health"
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-brand-forest hover:bg-brand-softGreen hover:text-brand-emerald transition-colors"
              >
                <Pill className="w-4 h-4 text-brand-emerald" />
                <span>Daily Pharma</span>
              </Link>

              <Link
                to="/bulk-orders"
                className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-brand-forest hover:bg-brand-softGreen hover:text-brand-emerald transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-brand-emerald" />
                <span>Bulk RFQ</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-brand-border">
              <div className="p-2.5 rounded-xl bg-brand-softGreen/60 text-center border border-brand-emerald/20">
                <span className="text-[10px] font-extrabold text-brand-emerald block">CDSCO Certified</span>
                <span className="text-[9px] text-brand-muted">Pan-India Cold Chain</span>
              </div>
            </div>
          </div>

          {/* MAIN WIDE SLIDESHOW CONTAINER (10 cols on Desktop, 12 on mobile) */}
          <div className="lg:col-span-10 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-border shadow-card bg-brand-forest min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] flex flex-col justify-between">
            
            {/* Background Photographic Banner with Crossfade */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentSlide.image}
                alt={currentSlide.headline}
                className="w-full h-full object-cover opacity-40 transition-all duration-700 transform scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-forest via-brand-forest/90 via-55% to-transparent" />
            </div>

            {/* Slide Content Layer */}
            <div className="relative z-10 p-5 sm:p-8 lg:p-10 max-w-2xl text-white space-y-3 sm:space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/85 backdrop-blur-sm text-brand-warmWhite text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-ivory" />
                <span>{currentSlide.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                {currentSlide.headline}
              </h2>

              <p className="text-xs sm:text-sm text-brand-ivory/85 leading-relaxed font-medium max-w-xl">
                {currentSlide.subtitle}
              </p>

              {/* Offer Details & Interactive Copy Coupon Button */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <div className="px-3 py-1.5 rounded-lg bg-brand-emerald/90 text-white font-bold border border-brand-ivory/20 shadow-xs">
                  {currentSlide.offerDetails}
                </div>
                
                <button
                  type="button"
                  onClick={() => handleCopyCoupon(currentSlide.couponCode)}
                  className="px-3 py-1.5 rounded-lg bg-white text-brand-forest font-mono font-bold flex items-center gap-2 shadow-xs hover:bg-brand-warmWhite transition-all active:scale-95"
                  title="Click to copy coupon code"
                >
                  <span className="text-[10px] text-brand-muted uppercase font-sans">Coupon:</span>
                  <span className="text-brand-emerald tracking-wider">{currentSlide.couponCode}</span>
                  {copiedCoupon === currentSlide.couponCode ? (
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.2 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3 text-brand-muted hover:text-brand-emerald" />
                  )}
                </button>
              </div>

              {/* Interactive Quick Discovery Filter Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-brand-ivory/70 font-semibold mr-1">Trending:</span>
                {currentSlide.popularItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.url}
                    className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-brand-warmWhite text-[11px] font-medium backdrop-blur-xs transition-colors border border-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Action Button */}
              <div className="pt-2">
                <Link
                  to={currentSlide.link}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl bg-brand-ivory hover:bg-white text-brand-forest font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 group"
                >
                  <span>{currentSlide.buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-emerald group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Slide Navigation Controls */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-brand-forest flex items-center justify-center shadow-md transition-transform active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-brand-forest flex items-center justify-center shadow-md transition-transform active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* BOTTOM: Interactive Slide Category Selector Tabs */}
            <div className="relative z-20 bg-brand-forest/90 backdrop-blur-md border-t border-white/15 p-2 sm:p-2.5 flex items-center justify-between gap-2 overflow-x-auto">
              
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                      currentSlideIndex === idx
                        ? 'bg-brand-emerald text-white shadow-sm'
                        : 'text-brand-ivory/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-ivory flex-shrink-0" />
                    <span>{s.tabLabel}</span>
                  </button>
                ))}
              </div>

              {/* Slide Counter (e.g. 1 / 3) */}
              <div className="flex items-center gap-1 text-[11px] font-mono text-brand-ivory/80 px-2 py-1 rounded bg-white/10 flex-shrink-0">
                <span>{currentSlideIndex + 1}</span>
                <span>/</span>
                <span>{slides.length}</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
