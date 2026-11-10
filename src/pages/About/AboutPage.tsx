import React from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/storeConfig';
import {
  ShieldCheck,
  Building2,
  Truck,
  Award,
  Activity,
  ArrowRight,
  HeartPulse,
  CheckCircle2,
  FileCheck,
  Microscope,
  PackageCheck,
  MessageSquare,
  Boxes,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-warmWhite min-h-screen">
      
      {/* 1. HERO SECTION: ABOUT DR SURYA MEDICARE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-warmWhite to-brand-warmWhite pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-brand-border/60">
        
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-softGreen/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-brand-ivory blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider border border-brand-emerald/20 animate-fade-in">
                <Activity className="w-3.5 h-3.5" />
                <span>India's Trusted Healthcare Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-brand-forest tracking-tight leading-tight sm:leading-tight">
                Pioneering Precision & Integrity in <span className="text-brand-emerald">Medical Supply</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-body/80 leading-relaxed max-w-2xl">
                Founded to bridge the critical gap between certified biomedical manufacturers and frontline healthcare facilities. We empower hospitals, specialty clinics, diagnostics laboratories, and everyday families with authentic medical equipment, surgical supplies, and everyday wellness medicines.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-6 py-3 rounded-2xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-sm shadow-card hover:shadow-card-hover transition-all flex items-center gap-2 group"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/why-us"
                  className="px-6 py-3 rounded-2xl bg-white hover:bg-brand-ivory text-brand-forest font-bold text-sm border border-brand-border shadow-xs transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  <span>The Dr Surya Advantage (Why Us)</span>
                </Link>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-border/80">
                <div>
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-emerald block">
                    100%
                  </span>
                  <span className="text-xs font-medium text-brand-muted">
                    CDSCO & ISO Verified Sourcing
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-emerald block">
                    5,000+
                  </span>
                  <span className="text-xs font-medium text-brand-muted">
                    Hospitals & Clinics Served
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-emerald block">
                    24/7
                  </span>
                  <span className="text-xs font-medium text-brand-muted">
                    Direct WhatsApp Support
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Badge */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-forest text-brand-warmWhite flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-7 h-7 text-brand-ivory" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-brand-forest">
                    Our Medical Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    To eliminate counterfeit medical items, supply chain delays, and inflated hospital procurement costs through transparent pricing, temperature-guaranteed cold storage, and digital verification.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-ivory/50 border border-brand-border/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-brand-forest block">Direct Manufacturer Procurement</strong>
                      <span className="text-brand-muted">No grey-market brokers or unverified sub-distributors.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-ivory/50 border border-brand-border/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-brand-forest block">Precision Calibration Standard</strong>
                      <span className="text-brand-muted">Every diagnostic monitor and surgical set is pre-dispatch checked.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-ivory/50 border border-brand-border/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-brand-forest block">Formal GST Invoicing & Compliance</strong>
                      <span className="text-brand-muted">Audited tax invoices compliant with Indian institutional health regulations.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH STORY & OPERATIONAL INFRASTRUCTURE */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider">
            <Boxes className="w-3.5 h-3.5" />
            <span>Built by Medical Supply Veterans</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-forest">
            Transforming Indian Medical Distribution
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            In modern healthcare, minutes count. Traditional medical supply networks in India have historically struggled with fragmented suppliers, lack of lot-tracking, delayed deliveries, and uncertain authenticities. Dr Surya Medicare was built to solve these systemic challenges.
          </p>
        </div>

        {/* 3 Strategic Operational Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-xs hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Validated Medical Warehousing
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Our central pharmaceutical hub features clean-room packing zones, humidity controls, and 24/7 temperature tracking to safeguard the chemical integrity of medicines, diagnostic reagents, and sterile gloves.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-xs hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Biomedical Quality Benchmarking
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Every digital BP monitor, pulse oximeter, ECG module, and surgical instrument undergoes batch verification against international clinical precision tolerance thresholds before being listed for sale.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-xs hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Pan-India Cold-Chain & Freight
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Equipped with insulated packaging, temperature indicator strips, and partnered express courier networks, we guarantee safe and rapid doorstep transit to metro hospitals as well as tier-2/3 district clinics.
            </p>
          </div>
        </div>

        {/* Callout to Dedicated "Why Us" Page */}
        <div className="p-8 sm:p-10 rounded-3xl bg-brand-softGreen/60 border border-brand-emerald/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-brand-emerald uppercase tracking-wider">Comprehensive Institutional Analysis</span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-forest">
              Explore "Why Us" & The Dr Surya Advantage
            </h3>
            <p className="text-xs text-brand-muted max-w-lg">
              Detailed comparison against traditional distributors, clinical calibration guarantees, and institutional GST invoicing breakdown.
            </p>
          </div>

          <Link
            to="/why-us"
            className="px-6 py-3 rounded-2xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Read Why Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* 3. COMPLIANCE & ACCREDITATIONS */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Compliance & Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
            Medical Certifications & Sourcing Rigor
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            All medical equipment and clinical consumables supplied through Dr Surya Medicare conform to established national and international regulatory frameworks:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-brand-border text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-brand-forest">CDSCO Registered</h4>
            <p className="text-[11px] text-brand-muted">Compliant with Central Drugs Standard Control Organization</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-border text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-brand-forest">ISO 13485:2016</h4>
            <p className="text-[11px] text-brand-muted">Medical devices quality management systems certified</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-border text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold mx-auto">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-brand-forest">CE Marked & GMP</h4>
            <p className="text-[11px] text-brand-muted">Good Manufacturing Practices certified pharmaceutical facilities</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-border text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold mx-auto">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-sm text-brand-forest">GST & HSN Compliant</h4>
            <p className="text-[11px] text-brand-muted">Full institutional tax invoicing and e-way bill clearance</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-brand-navy">How a facility orders</h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted">
              <li>Browse the catalogue by department, or search by product name and SKU.</li>
              <li>Add the pack size you need. Prices on the card are the listed catalogue prices.</li>
              <li>At checkout, the name, mobile number, and address saved under Account are filled in automatically. You can change them for that delivery.</li>
              <li>The cart is sent to the WhatsApp desk at {storeConfig.whatsappDisplayNumber}. That order is stored in your account history on this device.</li>
              <li>Standard dispatch is {storeConfig.shipping.estimatedDays}. Delivery is free above ₹{storeConfig.shipping.freeThreshold.toLocaleString('en-IN')}.</li>
            </ol>
          </div>
          <div className="rounded-3xl bg-brand-ivory p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-brand-navy">Who the catalogue is built for</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted">
              <li>Clinics and nursing homes restocking diagnostics, PPE, and daily medicines.</li>
              <li>Hospital stores raising a bulk quotation for consumables or ward equipment.</li>
              <li>Laboratories ordering instruments and routine supplies.</li>
              <li>Home-care teams buying a monitor, a wheelchair, or a short list of consumables.</li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-brand-navy">
              {storeConfig.businessName}<br />
              {storeConfig.address.line1}<br />
              {storeConfig.address.line2}<br />
              {storeConfig.address.city}, {storeConfig.address.state} {storeConfig.address.pincode}<br />
              {storeConfig.supportPhone} · {storeConfig.supportEmail}
            </p>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-forest to-brand-emerald p-8 sm:p-12 text-white text-center space-y-5 shadow-card">
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-warmWhite">
            Partner with India's Foremost Medical Supplier
          </h3>
          <p className="text-xs sm:text-sm text-brand-ivory/80 max-w-xl mx-auto leading-relaxed">
            Whether equipping a hospital ward, stocking a doctor clinic, or procuring essential wellness medicines, Dr Surya Medicare delivers certified excellence.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-2xl bg-brand-ivory hover:bg-white text-brand-forest font-bold text-xs sm:text-sm shadow transition-colors"
            >
              Browse Catalogue
            </Link>
            <Link
              to="/bulk-orders"
              className="px-6 py-3 rounded-2xl bg-brand-forest hover:bg-black/30 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              Request Institutional Quotation
            </Link>
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare team, I would like to place an order or discuss bulk healthcare supply.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct Desk</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  );
};