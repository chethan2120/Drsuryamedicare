import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero3DComposition } from './Hero3DComposition';
import { ArrowRight, ShieldCheck, Truck, MessageSquare, Stethoscope, Pill } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-ivory pt-2 pb-6 sm:pt-4 sm:pb-12 lg:pt-5 lg:pb-14 border-b border-brand-border/60">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-vermilion/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Brand Messaging & Action */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-3.5 sm:space-y-5 text-left">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-[11px] sm:text-xs font-bold tracking-wide uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
              <span>YOUR HEALTHCARE SUPPLY PARTNER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-brand-forest tracking-tight leading-[1.15]"
            >
              Everything Healthcare Needs.{' '}
              <span className="text-brand-emerald block sm:inline">
                All in One Place.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-base text-brand-body/90 leading-relaxed max-w-xl font-normal"
            >
              Explore trusted medical equipment, daily tablets & healthcare essentials, and professional supplies with a smarter shopping experience.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1"
            >
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs sm:text-sm font-bold shadow hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?productType=Tablets%20%26%20Daily%20Health"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-brand-warmWhite hover:bg-white text-brand-forest text-xs sm:text-sm font-bold border border-brand-border/80 shadow-xs hover:shadow transition-all duration-200"
              >
                <Pill className="w-4 h-4 text-brand-emerald" />
                <span>Tablets & Daily Health</span>
              </Link>
            </motion.div>

            {/* Trust supporting line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-[11px] sm:text-xs font-medium text-brand-muted flex items-center gap-1.5 sm:gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-emerald flex-shrink-0" />
              <span>Verified supplies for doctors, hospitals, clinics and home healthcare.</span>
            </motion.div>

            {/* Highlights Bar (Compact on 360px phones) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-3 border-t border-brand-border/80 max-w-lg"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-softGreen flex items-center justify-center text-brand-emerald flex-shrink-0">
                  <Pill className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="text-[9px] sm:text-[11px] leading-tight">
                  <span className="font-bold text-brand-forest block truncate">Tablets</span>
                  <span className="text-brand-muted truncate block">Fever & Pain</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-softGreen flex items-center justify-center text-brand-emerald flex-shrink-0">
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="text-[9px] sm:text-[11px] leading-tight">
                  <span className="font-bold text-brand-forest block truncate">WhatsApp Desk</span>
                  <span className="text-brand-muted truncate block">Instant Order</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-softGreen flex items-center justify-center text-brand-emerald flex-shrink-0">
                  <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="text-[9px] sm:text-[11px] leading-tight">
                  <span className="font-bold text-brand-forest block truncate">Pan-India</span>
                  <span className="text-brand-muted truncate block">Express Ship</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Interactive Medical Product Showcase */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center w-full">
            <Hero3DComposition />
          </div>

        </div>
      </div>
    </section>
  );
};