import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, IndianRupee, Phone, Truck } from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BulkCtaSection } from '../../components/Home/BulkCtaSection';
import { FaqSection } from '../../components/Home/FaqSection';
import { BestsellersSection } from '../../components/Home/BestsellersSection';
import { HeroShowcase } from '../../components/Home/HeroShowcase';

export const HomePage: React.FC = () => {
  const shopCategories = categories.filter((category) => category.productCount > 0);
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const featuredIds = new Set(featured.map((product) => product.id));
  const equipment = products
    .filter((product) => product.productType === 'Medical Equipment' && !featuredIds.has(product.id))
    .slice(0, 4);
  const brands = useMemo(() => {
    const grouped = new Map<string, { name: string; count: number; image: string }>();
    products.forEach((product) => {
      const current = grouped.get(product.brand);
      if (current) current.count += 1;
      else grouped.set(product.brand, { name: product.brand, count: 1, image: product.images[0] });
    });
    return Array.from(grouped.values()).sort((a, b) => b.count - a.count).slice(0, 8);
  }, []);

  useEffect(() => {
    if (window.location.hash === '#home') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div id="home" className="bg-white text-brand-charcoal">
      <section className="relative overflow-x-clip bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-8 pt-7 sm:px-6 sm:pb-10 sm:pt-9 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:pb-12 lg:pt-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">
              Healthcare marketplace
            </p>
            <h1 className="hero-title mt-3 font-heading font-bold tracking-tight text-brand-navy">
              Clinical supplies,
              <span className="hero-accent block">ready to order.</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-brand-body sm:text-base">
              Equipment, surgical supplies, and daily medicines for clinics, hospitals, and home care across India.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-brand-emerald px-5 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-emeraldDark sm:w-auto"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/bulk-orders"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-brand-navy/25 bg-white px-5 py-3 text-sm font-semibold text-brand-navy sm:w-auto"
              >
                Bulk Order Enquiry
              </Link>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-ivory" aria-label="Supply details">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <li className="flex items-center gap-3">
            <Truck className="h-5 w-5 shrink-0 text-brand-goldInk" />
            <span>
              <span className="block text-sm font-semibold text-brand-navy">India delivery</span>
              <span className="block text-xs text-brand-muted">{storeConfig.shipping.estimatedDays}</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <IndianRupee className="h-5 w-5 shrink-0 text-brand-goldInk" />
            <span>
              <span className="block text-sm font-semibold text-brand-navy">Free delivery</span>
              <span className="block text-xs text-brand-muted">Orders from {formatINR(storeConfig.shipping.freeThreshold)}</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Building2 className="h-5 w-5 shrink-0 text-brand-goldInk" />
            <span>
              <span className="block text-sm font-semibold text-brand-navy">Institutional supply</span>
              <span className="block text-xs text-brand-muted">Quantity quotations</span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-5 w-5 shrink-0 text-brand-goldInk" />
            <span>
              <span className="block text-sm font-semibold text-brand-navy">Customer support</span>
              <span className="block text-xs text-brand-muted">{storeConfig.supportPhone}</span>
            </span>
          </li>
        </ul>
      </section>

      <section className="border-t border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Shop by category</p>
              <h2 className="section-title mt-1">Find the department you supply</h2>
            </div>
            <Link to="/categories" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-brand-navy">
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {shopCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="flex h-full flex-col rounded-2xl border border-brand-border bg-brand-cool p-3"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-white">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain object-center p-2"
                  />
                </div>
                <span className="mt-3 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-brand-navy">
                  {category.name}
                </span>
                <span className="mt-1 text-xs text-brand-muted">{category.productCount} products</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-ivory">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Featured products</h2>
              <p className="mt-1 text-sm text-brand-muted">Marked in the current catalogue.</p>
            </div>
            <Link to="/shop" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-navy">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Popular medical equipment</h2>
              <p className="mt-1 text-sm text-brand-muted">Devices listed under medical equipment.</p>
            </div>
            <Link to="/shop?productType=Medical%20Equipment" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-navy">
              Browse equipment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {equipment.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-cool">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <h2 className="section-title">Shop by brand</h2>
          <p className="mt-1 text-sm text-brand-muted">Brands already listed on products in this catalogue.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-3"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-ivory">
                  <img src={brand.image} alt="" className="h-full w-full object-contain p-1" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-brand-navy">{brand.name}</span>
                  <span className="text-xs text-brand-muted">{brand.count} products</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BestsellersSection />
      <BulkCtaSection />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Why this desk</p>
            <h2 className="section-title mt-2">A straightforward way to order and enquire.</h2>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <div className="rounded-2xl border border-brand-border p-4">
              <dt className="font-heading font-bold text-brand-navy">WhatsApp ordering</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-body">
                The cart is sent to {storeConfig.whatsappDisplayNumber}. Payment is confirmed with the desk, not on this page.
              </dd>
            </div>
            <div className="rounded-2xl border border-brand-border p-4">
              <dt className="font-heading font-bold text-brand-navy">Delivery</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-body">
                Listed transit is {storeConfig.shipping.estimatedDays}. Delivery is free from {formatINR(storeConfig.shipping.freeThreshold)}.
              </dd>
            </div>
            <div className="rounded-2xl border border-brand-border p-4">
              <dt className="font-heading font-bold text-brand-navy">Institutional quotes</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-body">
                Hospitals, clinics, laboratories, and nursing homes can send a quantity list from the bulk enquiry form.
              </dd>
            </div>
            <div className="rounded-2xl border border-brand-border p-4">
              <dt className="font-heading font-bold text-brand-navy">A person on the phone</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-body">
                {storeConfig.supportPhone} · {storeConfig.supportEmail}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <FaqSection />

      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold">Need help choosing a product?</h2>
            <p className="mt-1 text-sm text-brand-ivory/80">
              Call the desk or send the list you already have.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`tel:${storeConfig.supportPhone}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-emerald px-5 text-sm font-semibold text-brand-navy"
            >
              <Phone className="h-4 w-4" />
              {storeConfig.supportPhone}
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/25 px-5 text-sm font-semibold"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
