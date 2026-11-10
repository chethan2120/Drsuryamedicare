import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';

const spotlightIds = ['dsm-oxi-01', 'dsm-gloves-01', 'dsm-bp-01'];

export const HeroSlideshowSection: React.FC = () => {
  const spotlight = spotlightIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return (
    <section id="home" className="bg-brand-ivory border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pt-10 lg:pt-14 lg:pb-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-emerald">
              Healthcare supply partner
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.12] tracking-tight text-brand-forest sm:text-5xl">
              Clinical supplies for hospitals, clinics, and home care.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-brand-body/85">
              Genuine medical equipment, surgical supplies, and everyday clinical consumables, with direct WhatsApp ordering and pan-India dispatch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-emerald px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emeraldLight"
              >
                Browse the catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/bulk-orders"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-emerald"
              >
                Request a bulk quote
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card">
            <img
              src="/banners/hero-ward.jpg"
              alt="A prepared hospital room with an adjustable patient bed"
              className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/3]"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {spotlight.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex items-center gap-3 rounded-xl border border-brand-border bg-white p-3 transition-colors hover:border-brand-emerald/40"
            >
              <img
                src={product.images[0]}
                alt=""
                className="h-16 w-16 flex-shrink-0 rounded-lg bg-brand-ivory object-contain"
              />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-emerald">
                  {product.categoryName}
                </span>
                <span className="mt-1 block text-sm font-semibold leading-snug text-brand-forest line-clamp-2">
                  {product.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
