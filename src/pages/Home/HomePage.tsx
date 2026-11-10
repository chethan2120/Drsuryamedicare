import React, { useEffect } from 'react';
import { HeroSlideshowSection } from '../../components/Home/HeroSlideshowSection';
import { LiveOrderTicker } from '../../components/Home/LiveOrderTicker';
import { B2BTrustRibbon } from '../../components/Home/B2BTrustRibbon';
import { TopSellingConsumablesSection } from '../../components/Home/TopSellingConsumablesSection';
import { CategoryGridSection } from '../../components/Home/CategoryGridSection';
import { BestsellersSection } from '../../components/Home/BestsellersSection';
import { FeaturedShowcaseSection } from '../../components/Home/FeaturedShowcaseSection';
import { B2BMarketplaceOverviewSection } from '../../components/Home/B2BMarketplaceOverviewSection';
import { BulkCtaSection } from '../../components/Home/BulkCtaSection';
import { FaqSection } from '../../components/Home/FaqSection';
import { TestimonialsSection } from '../../components/Home/TestimonialsSection';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  // Clinical curated products for "You May Also Need"
  const recommendedProducts = products.slice(6, 11);

  // Smooth scroll to hero section when #home hash is present
  useEffect(() => {
    if (window.location.hash === '#home') {
      const hero = document.getElementById('home');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="bg-brand-warmWhite min-h-screen relative">
      {/* 1. TOP HERO: PANORAMIC SLIDESHOW (Medikabazaar-style Hero with Coupons & Left Quick Rail) */}
      <HeroSlideshowSection />

      {/* 2. 5 B2B TRUST BADGES (Verified Suppliers, Express Delivery, Best B2B Rates, Dedicated Support, Shop & Earn) */}
      <B2BTrustRibbon />

      {/* 3. TOP SELLING CONSUMABLES [VIEW ALL] (High-demand surgical gloves, IV sets, cannulas) */}
      <TopSellingConsumablesSection />

      {/* 4. SHOP BY HEALTHCARE CATEGORY (Strictly 8 categories + View More to Shop) */}
      <CategoryGridSection />

      {/* 5. POPULAR BESTSELLERS (Tablets, Oximeter, Instruments) */}
      <BestsellersSection />

      {/* 6. SCROLL-PINNED CLINICAL DEVICE SPOTLIGHT */}
      <FeaturedShowcaseSection />

      {/* 7. RECOMMENDED CLINICAL ACCESSORIES ("You May Also Need") */}
      <section className="py-12 sm:py-16 bg-brand-ivory/30 border-b border-brand-border/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Frequently Paired Clinical Supplies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
                You May Also Need
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Frequently paired clinical accessories, trauma kits, and patient care essentials.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-emerald hover:underline self-start sm:self-auto"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {recommendedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. B2B MARKETPLACE OVERVIEW (Professional B2B text inspired by Medikabazaar) */}
      <B2BMarketplaceOverviewSection />

      {/* 9. BULK INSTITUTIONAL RFQ CTA */}
      <BulkCtaSection />

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 11. SLIDESHOW TESTIMONIALS (Directly below FAQ as requested) */}
      <TestimonialsSection />

      {/* 12. LIVE VERIFIED ORDERS & ACTIVITY TICKER */}
      <LiveOrderTicker />
    </div>
  );
};
