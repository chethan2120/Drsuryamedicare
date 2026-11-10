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
  Clock,
  FileCheck,
  Stethoscope,
  BarChart3,
  MessageSquare,
  PackageCheck,
  Headphones,
} from 'lucide-react';

export const WhyUsPage: React.FC = () => {
  return (
    <div className="bg-brand-warmWhite min-h-screen">
      
      {/* 1. HERO SECTION: WHY US */}
      <section className="relative overflow-hidden bg-brand-forest text-brand-warmWhite py-14 sm:py-20 border-b border-brand-emerald/40">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-emerald/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-brand-darkForest/60 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-brand-ivory" />
            <span>THE DR SURYA ADVANTAGE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Why Over 5,000+ Healthcare Providers Choose <span className="text-brand-ivory">Dr Surya Medicare</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-ivory/80 leading-relaxed max-w-2xl">
            In modern clinical environments, uninterrupted supply chains and guaranteed batch integrity save lives. Here is how our transparent B2B healthcare model solves traditional distributor delays and opaque pricing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs sm:text-sm shadow transition-all flex items-center gap-2 group"
            >
              <span>Browse Product Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello Dr Surya Medicare team, I would like to inquire about institutional supply rates.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white hover:bg-brand-ivory text-brand-forest font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. 6 CORE CLINICAL VALUE PILLARS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Built for Clinical Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-forest">
            Six Pillars That Set Our Procurement Apart
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Engineered specifically to support hospitals, specialty clinics, laboratories, and healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              100% Genuine & Batch-Coded
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Every medical item, from daily fever tablets (SuryaDolo 650) to surgical blades, carries full CDSCO manufacturer batch traceability and legal drug license verification.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              GST-Compliant Invoicing
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Transparent institutional procurement with audited tax invoices, formal e-way billing, and itemized HSN code listings for clean institutional accounting.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Biomedical Precision Testing
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Diagnostic instruments such as digital BP monitors, ECG devices, and pulse oximeters are pre-calibrated to ensure zero clinical reading deviation in emergency care.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Same-Day Priority Dispatch
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Emergency consumables, PPE, and daily tablets dispatched within 4 hours. Dedicated priority delivery channels for critical hospital stock requirements.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Direct Wholesale Pricing
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              By working directly with certified medical manufacturers, we eliminate middleman broker commissions and extend wholesale pricing to nursing homes and clinics.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-border/80 shadow-xs hover:shadow-card transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brand-forest">
              Dedicated Account Desk
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Instant WhatsApp order submission. Doctors and hospital administrators can upload purchase orders or handwritten requirement slips directly to their designated account manager.
            </p>
          </div>

        </div>
      </section>

      {/* 3. DIRECT COMPARISON TABLE */}
      <section className="py-12 sm:py-16 bg-white border-y border-brand-border/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">B2B Standard Comparison</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Dr Surya Medicare vs. Traditional Medical Suppliers
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-brand-ivory text-brand-forest">
                <tr className="border-b border-brand-border font-bold">
                  <th className="py-3 px-4">Procurement Standard</th>
                  <th className="py-3 px-4 text-brand-muted">Traditional Distributors</th>
                  <th className="py-3 px-4 text-brand-emerald bg-brand-softGreen/50">Dr Surya Medicare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 bg-white">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-forest">Pricing Transparency</td>
                  <td className="py-3.5 px-4 text-brand-muted">Opaque, negotiated per call</td>
                  <td className="py-3.5 px-4 text-brand-emerald font-bold bg-brand-softGreen/20">Standardized upfront wholesale rates</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-forest">Batch Verification</td>
                  <td className="py-3.5 px-4 text-brand-muted">Dependent on local sub-agents</td>
                  <td className="py-3.5 px-4 text-brand-emerald font-bold bg-brand-softGreen/20">Direct factory batches with test certificates</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-forest">Ordering Speed</td>
                  <td className="py-3.5 px-4 text-brand-muted">Manual paperwork & follow-up calls</td>
                  <td className="py-3.5 px-4 text-brand-emerald font-bold bg-brand-softGreen/20">1-Click WhatsApp Ordering & Digital Cart</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-forest">Emergency Consumables</td>
                  <td className="py-3.5 px-4 text-brand-muted">48 to 72 hours delay</td>
                  <td className="py-3.5 px-4 text-brand-emerald font-bold bg-brand-softGreen/20">4-Hour Emergency Dispatch</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-forest">Tax Compliance</td>
                  <td className="py-3.5 px-4 text-brand-muted">Inconsistent HSN classifications</td>
                  <td className="py-3.5 px-4 text-brand-emerald font-bold bg-brand-softGreen/20">Automated GST Invoices & E-way bills</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL CALL TO ACTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-12 text-center space-y-5 shadow-card">
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-warmWhite">
            Experience Reliable Healthcare Supply Today
          </h3>
          <p className="text-xs sm:text-sm text-brand-ivory/80 max-w-xl mx-auto leading-relaxed">
            Join thousands of clinical professionals who procure with complete confidence and zero administrative friction.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs sm:text-sm shadow transition-colors"
            >
              Explore Products
            </Link>
            <Link
              to="/bulk-orders"
              className="px-6 py-3 rounded-xl bg-brand-ivory hover:bg-white text-brand-forest font-bold text-xs sm:text-sm transition-colors"
            >
              Request Institutional Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};