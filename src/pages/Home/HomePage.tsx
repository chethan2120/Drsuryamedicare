import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, IndianRupee, Phone, Truck } from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { storeConfig } from '../../config/storeConfig';
import { formatINR } from '../../utils/formatters';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BulkCtaSection } from '../../components/Home/BulkCtaSection';
import { FaqSection } from '../../components/Home/FaqSection';
import { HeroShowcase, heroSlides } from '../../components/Home/HeroShowcase';
import { TopSellingShowcase } from '../../components/Home/TopSellingShowcase';
import { TestimonialsSection } from '../../components/Home/TestimonialsSection';

export const HomePage: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const onHeroChange = useCallback((index: number) => setHeroIndex(index), []);
  const hero = heroSlides[heroIndex] ?? heroSlides[0];
  const shopCategories = categories.filter((category) => category.productCount > 0).slice(0, 6);
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);

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
            <div key={hero.src} className="hero-copy" aria-live="polite">
              <p className="hero-copy-line text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">
                {hero.kicker}
              </p>
              <h1 className="hero-title mt-3 font-heading font-bold tracking-tight text-brand-navy">
                <span className="hero-copy-line block" style={{ animationDelay: '80ms' }}>{hero.title}</span>
                <span className="hero-accent hero-copy-line block" style={{ animationDelay: '160ms' }}>{hero.accent}</span>
              </h1>
              <p className="hero-copy-line mt-4 max-w-md text-[15px] leading-relaxed text-brand-body sm:text-base" style={{ animationDelay: '240ms' }}>
                {hero.body}
              </p>
            </div>
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
            <HeroShowcase onChange={onHeroChange} />
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-ivory" aria-label="Supply details" data-reveal="fade">
        <ul className="reveal-stagger mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
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

      <section className="cv-auto border-t border-brand-border bg-white" data-reveal="left">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4" data-reveal="text">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Shop by category</p>
              <h2 className="section-title mt-1">Find the department you supply</h2>
            </div>
            <Link to="/categories" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-brand-navy">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {shopCategories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="flex h-full flex-col border border-brand-border bg-white p-3"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden bg-brand-ivory">
                  <img
                    src={category.image}
                    alt=""
                    width={320}
                    height={224}
                    decoding="async"
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

      <TopSellingShowcase />

      <section className="cv-auto bg-brand-ivory" data-reveal="right">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4" data-reveal="text">
            <div>
              <h2 className="section-title">Featured healthcare equipment and supplies</h2>
              <p className="mt-1 text-sm text-brand-muted">Items marked as featured in the current catalogue.</p>
            </div>
            <Link to="/shop" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-navy">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <BulkCtaSection />

      <section className="cv-auto border-b border-brand-border bg-white" data-reveal="left">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Why Dr Surya Medicare</p>
            <h2 className="section-title mt-2">Ordering and enquiries, in one place.</h2>
          </div>
          <dl className="reveal-stagger divide-y divide-brand-border border-y border-brand-border lg:col-span-8">
            <div className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-heading font-bold text-brand-navy">WhatsApp ordering</dt>
              <dd className="text-sm leading-relaxed text-brand-body sm:col-span-2">
                The cart is sent to {storeConfig.whatsappDisplayNumber}. Payment is confirmed with the desk, not on this page.
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-heading font-bold text-brand-navy">Delivery</dt>
              <dd className="text-sm leading-relaxed text-brand-body sm:col-span-2">
                Listed transit is {storeConfig.shipping.estimatedDays}. Delivery is free from {formatINR(storeConfig.shipping.freeThreshold)}.
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-heading font-bold text-brand-navy">Institutional quotes</dt>
              <dd className="text-sm leading-relaxed text-brand-body sm:col-span-2">
                Hospitals, clinics, laboratories, and nursing homes can send a quantity list from the bulk enquiry form.
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="font-heading font-bold text-brand-navy">Sales desk</dt>
              <dd className="text-sm leading-relaxed text-brand-body sm:col-span-2">
                {storeConfig.supportPhone} · {storeConfig.supportEmail}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <TestimonialsSection />

      <section className="cv-auto bg-brand-ivory" data-reveal="fade">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Healthcare resources</h2>
              <p className="mt-1 text-sm text-brand-muted">Guides, specifications, and manuals already published on this site.</p>
            </div>
            <Link to="/resources" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-brand-navy">
              All resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="reveal-stagger mt-6 divide-y divide-brand-border border-y border-brand-border">
            {[
              { to: '/resources/buying-guides', title: 'Buying guides', detail: 'Procurement notes for hospitals and clinics.' },
              { to: '/resources/specifications', title: 'Specifications', detail: 'Technical details stored with each product.' },
              { to: '/resources/manuals', title: 'Manuals and downloads', detail: 'Documents listed in the manuals archive.' },
              { to: '/resources/knowledge', title: 'Product knowledge', detail: 'Short explainers on products in the catalogue.' },
              { to: '/resources/blogs', title: 'Articles', detail: 'Notes published in the resource library.' },
              { to: '/resources/faqs', title: 'Questions', detail: 'Ordering, delivery, and quotation answers.' },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="grid gap-1 py-4 sm:grid-cols-3 sm:items-baseline sm:gap-6">
                  <span className="font-heading font-bold text-brand-navy">{item.title}</span>
                  <span className="text-sm text-brand-body sm:col-span-2">{item.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection />

      <section className="bg-brand-navy text-brand-ivory" data-reveal="fade">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-ivory">Need help choosing a product?</h2>
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
