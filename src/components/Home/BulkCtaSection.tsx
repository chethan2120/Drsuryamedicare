import React from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/storeConfig';

const buyers = ['Hospitals', 'Clinics', 'Diagnostic centres', 'Laboratories', 'Nursing homes'];

export const BulkCtaSection: React.FC = () => {
  return (
    <section className="cv-auto bg-brand-navy py-14 text-brand-ivory sm:py-16" data-reveal="right">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-emerald">Institutional supply</p>
          <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-brand-ivory sm:text-4xl">
            Your trusted partner for complete healthcare supplies
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-ivory/80 sm:text-base">
            Send a product list with quantities. The desk replies with a quotation for clinics, hospitals, and other institutional buyers.
          </p>
          <p className="mt-4 text-sm text-brand-ivory/80">{buyers.join(' · ')}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/bulk-orders" className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-brand-emerald px-5 text-sm font-semibold text-brand-navy">
              Bulk Order Enquiry
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/25 px-5 text-sm font-semibold">
              Contact Sales
            </Link>
          </div>
          <p className="mt-4 text-xs text-brand-ivory/70">
            Sales desk: {storeConfig.supportPhone} · {storeConfig.supportEmail}
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white lg:col-span-5">
          <img
            src="/products/oxygen-concentrator.jpg"
            alt="Oxygen concentrator from the catalogue"
            className="h-64 w-full object-contain p-4 sm:h-72"
          />
        </div>
      </div>
    </section>
  );
};
