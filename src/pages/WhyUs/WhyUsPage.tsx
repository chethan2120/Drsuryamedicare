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

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-7">
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
          <div className="lg:col-span-5">
            <img
              src="/products/stethoscope.jpg"
              alt="Cardiology stethoscope from the Dr Surya Medicare catalogue"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
              style={{ filter: 'brightness(0.88) contrast(1.08)' }}
            />
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

      <section className="bg-brand-ivory py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">How an order moves</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-brand-navy sm:text-3xl">From the catalogue to the ward, in four steps.</h2>
            <ol className="mt-6 space-y-4 text-sm leading-relaxed text-brand-muted">
              <li><span className="font-semibold text-brand-navy">1. Choose from the live catalogue.</span> Diagnostic devices, surgical instruments, consumables, PPE, furniture, respiratory care, and tablets are listed with the price and pack size already on the product page.</li>
              <li><span className="font-semibold text-brand-navy">2. Send the cart on WhatsApp.</span> The desk at {storeConfig.whatsappDisplayNumber} receives the items, quantities, and the delivery details saved on your account.</li>
              <li><span className="font-semibold text-brand-navy">3. Confirm the quotation.</span> Institutional orders can include a GST invoice. Bulk quantities are quoted from the bulk-order form, not guessed on the product card.</li>
              <li><span className="font-semibold text-brand-navy">4. Dispatch.</span> Standard delivery is {storeConfig.shipping.estimatedDays}. Orders above {storeConfig.shipping.freeThreshold.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })} ship without the standard delivery fee.</li>
            </ol>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-brand-navy">What the desk actually handles</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted">
              <li>Repeat clinic orders for gloves, masks, syringes, IV sets, gauze, and daily tablets.</li>
              <li>Single-device orders such as a BP monitor, oximeter, thermometer, or stethoscope.</li>
              <li>Ward equipment enquiries for beds, wheelchairs, walkers, and oxygen concentrators.</li>
              <li>A saved name, mobile number, and delivery address so the next order does not start from a blank form.</li>
              <li>A record of orders already sent, kept on this device under Account.</li>
            </ul>
            <p className="mt-6 text-sm text-brand-navy">
              Support: {storeConfig.supportPhone}<br />
              {storeConfig.supportEmail}<br />
              {storeConfig.address.line1}, {storeConfig.address.city} {storeConfig.address.pincode}
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