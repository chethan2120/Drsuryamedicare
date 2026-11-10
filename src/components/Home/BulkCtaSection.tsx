import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, ArrowRight, MessageCircle, Building2, CheckCircle2 } from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';

export const BulkCtaSection: React.FC = () => {
  return (
    <section data-surface="navy" className="py-16 sm:py-20 bg-brand-navy border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#16384A] text-white p-8 sm:p-12 overflow-hidden shadow-card border border-brand-gold/30">
          <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/80" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/40 text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-gold">
              <Building2 className="w-4 h-4 text-brand-ivory" />
              <span>INSTITUTIONAL TENDER & WHOLESALE DESK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight leading-tight">
              Order in bulk
            </h2>

            <p className="text-sm sm:text-base text-brand-warmWhite/90 leading-relaxed font-normal">
              Share your requirements and explore a convenient quotation process for healthcare institutions and businesses. Get custom volume pricing, GST invoices, and dedicated relationship manager support.
            </p>

            {/* Checklist highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-brand-warmWhite/90">
                <CheckCircle2 className="w-4 h-4 text-brand-ivory flex-shrink-0" />
                <span>Tiered Volume Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-warmWhite/90">
                <CheckCircle2 className="w-4 h-4 text-brand-ivory flex-shrink-0" />
                <span>Official GST Tax Invoices</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-warmWhite/90">
                <CheckCircle2 className="w-4 h-4 text-brand-ivory flex-shrink-0" />
                <span>Priority Logistics Dispatch</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/bulk-orders"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-warmWhite hover:bg-white text-brand-forest font-bold text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-brand-emerald" />
                <span>Request a Bulk Quote</span>
                <ArrowRight className="w-4 h-4 text-brand-forest" />
              </Link>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare, I want to discuss a bulk medical supplies requirement for my organisation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm border border-white/25 hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-brand-ivory" />
                <span>Chat with Institutional Desk</span>
              </a>
            </div>
          </div>
          <img
            src="/products/oxygen-concentrator.jpg"
            alt="Medical oxygen concentrator from the catalogue"
            className="mx-auto h-56 w-full max-w-sm rounded-2xl object-cover shadow-card sm:h-64 lg:h-72 lg:max-w-none"
            style={{ filter: 'brightness(0.9) contrast(1.05)' }}
          />
          </div>
        </div>
      </div>
    </section>
  );
};
