import React from 'react';
import { ShieldCheck, CheckCircle2, Building2, Truck, Award, FileCheck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export const B2BMarketplaceOverviewSection: React.FC = () => {
  const categoriesList = [
    'Medical Equipment & ICU Systems',
    'Surgical Instruments & OT Consumables',
    'Hospital Consumables & Sterile Disposables',
    'Tablets & Daily Health Formulations',
    'Diagnostics & Vitals Monitoring Devices',
    'Dental & Ophthalmic Instruments',
    'Hospital Furniture & Patient Care',
    'Orthopedic Implants & Mobility Aids',
    'Cardiology & Patient Telemetry',
    'Respiratory Care & Medical Oxygen Equipment',
    'Pathology & Clinical Laboratory Equipment',
    'Personal Protective Equipment (PPE)',
  ];

  const valuePillars = [
    '60,000+ medical supplies across comprehensive clinical departments',
    'Direct procurement from certified CDSCO & ISO 13485 manufacturers',
    'Competitive B2B wholesale pricing with bulk discount tiers',
    'Automated GST-compliant invoicing with itemized HSN codes',
    'Reliable pan-India delivery network with express emergency dispatch',
    'Dedicated customer support and designated institutional account managers',
    'Direct 1-Click WhatsApp ordering for handwritten doctor slips and clinic POs',
  ];

  return (
    <section className="py-14 sm:py-20 bg-brand-warmWhite/60 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Introduction Block */}
        <div className="bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-10 shadow-xs space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Healthcare Procurement Platform</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-forest tracking-tight">
            Dr Surya Medicare – India's Leading B2B Marketplace for Medical Supplies & Equipment
          </h2>

          <p className="text-xs sm:text-sm text-brand-body/90 leading-relaxed">
            Dr Surya Medicare is India's dedicated B2B healthcare procurement marketplace connecting hospitals, nursing homes, diagnostic laboratories, and independent doctor clinics with verified medical equipment and everyday clinical consumables. Founded to eliminate distributor markups and opaque pricing, our digital platform streamlines healthcare procurement with guaranteed batch authenticity, GST-compliant billing, and express pan-India dispatch.
          </p>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            By simplifying healthcare supply chains through a transparent digital catalogue and direct WhatsApp requisition ordering, Dr Surya Medicare enables medical institutions of all scales to procure quality medical products at standardized wholesale rates.
          </p>
        </div>

        {/* 2 Column Details: What You Can Procure & Why Choose Dr Surya Medicare */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: What You Can Buy */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-xl font-heading font-bold text-brand-forest">
              What You Can Procure from Dr Surya Medicare
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We provide an exhaustive catalogue of clinical-grade products to support tertiary hospitals, emergency casualty wards, dental operatories, pathology labs, and home caregivers across India:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {categoriesList.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-warmWhite border border-brand-border/60 text-xs font-medium text-brand-forest"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald flex-shrink-0" />
                  <span className="truncate">{cat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                className="text-xs font-bold text-brand-emerald hover:underline inline-flex items-center gap-1"
              >
                <span>Browse All Available Categories</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Why Healthcare Providers Choose Us */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="text-xl font-heading font-bold text-brand-forest">
              Why Healthcare Providers Choose Dr Surya Medicare
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Trusted by over 5,000+ medical directors, doctors, purchase managers, and clinical pharmacists:
            </p>

            <div className="space-y-3 pt-1">
              {valuePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-body/90">
                  <div className="w-4 h-4 rounded-full bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </div>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/why-us"
                className="px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-bold shadow-xs transition-colors"
              >
                Read The Dr Surya Advantage
              </Link>
              <Link
                to="/bulk-orders"
                className="px-4 py-2 rounded-xl bg-brand-ivory hover:bg-brand-border text-brand-forest text-xs font-bold transition-colors"
              >
                Institutional RFQ
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};