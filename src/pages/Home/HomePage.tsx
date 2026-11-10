import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Headphones,
  Heart,
  MessageCircle,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { initialBlogs } from '../../data/resourcesData';
import { storeConfig } from '../../config/storeConfig';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import { Product } from '../../types';
import { B2BTrustRibbon } from '../../components/Home/B2BTrustRibbon';
import { BulkCtaSection } from '../../components/Home/BulkCtaSection';
import { TestimonialsSection } from '../../components/Home/TestimonialsSection';
import { FaqSection } from '../../components/Home/FaqSection';
import { BestsellersSection } from '../../components/Home/BestsellersSection';
import { HeroProductReel } from '../../components/Home/HeroProductReel';

const departmentIds = [
  'diagnostic-equipment',
  'ppe',
  'surgical-instruments',
  'monitoring-devices',
  'medical-consumables',
  'hospital-furniture',
];

const featuredIds = ['dsm-therm-01', 'dsm-oxi-01', 'dsm-gloves-01', 'dsm-mask-01'];

const stockLabel: Record<Product['stockStatus'], string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
  enquiry_only: 'Enquiry only',
};

const CatalogueCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-forest shadow-xs"
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-brand-teal text-brand-teal' : ''}`} />
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-brand-forest">
        {product.name}
      </Link>
      <p className="mt-1 text-xs text-brand-muted">{stockLabel[product.stockStatus]}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <p className="font-heading text-base font-bold text-brand-forest">{formatINR(product.price)}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-xs text-brand-muted line-through">{formatINR(product.originalPrice)}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          disabled={product.stockStatus === 'out_of_stock'}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand-forest px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-teal disabled:opacity-40"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </article>
  );
};

export const HomePage: React.FC = () => {
  const departments = departmentIds
    .map((id) => categories.find((category) => category.id === id))
    .filter((category) => category !== undefined);
  const featured = featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);
  const stories = initialBlogs.filter((post) => !post.isDraft).slice(0, 4);
  const [activeStory, setActiveStory] = useState(0);
  const story = stories[activeStory];

  useEffect(() => {
    if (window.location.hash === '#home') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div id="home" className="bg-brand-ivory text-brand-charcoal">
      <section data-surface="cream" className="relative overflow-x-clip bg-brand-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-6 pt-5 sm:gap-8 sm:px-6 sm:pb-8 sm:pt-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center lg:grid-cols-12 lg:px-8 lg:pb-8 lg:pt-10">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-teal sm:tracking-[0.22em]">
              Premium medical supplies
            </p>
            <h1 className="hero-title mt-3 font-heading font-bold tracking-tight text-brand-navy">
              Stronger Supply.<br />
              <span className="text-brand-teal">Steadier Care.</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-brand-charcoal/80 sm:text-base">
              The catalogue clinics and hospitals order from when a ward cannot wait on equipment, surgical supplies, or daily medicines.
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link
                to="/shop"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emeraldDark"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/bulk-orders"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-teal"
              >
                Bulk Order Enquiry
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-brand-charcoal/75 sm:mt-6">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-brand-teal" />
                WhatsApp ordering
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-brand-teal" />
                Pan-India dispatch
              </span>
              <span className="inline-flex items-center gap-2">
                <Headphones className="h-4 w-4 text-brand-teal" />
                {storeConfig.supportPhone}
              </span>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <HeroProductReel />
          </div>
        </div>
      </section>

      <section data-surface="white" className="border-t border-brand-stone/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div data-reveal className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk sm:tracking-[0.2em]">Shop by department</p>
            <h2 className="section-title mt-1">Explore Our Categories</h2>
          </div>
          <div className="reveal-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {departments.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group flex h-full flex-col rounded-2xl bg-brand-cool p-3"
              >
                <div className="flex h-28 items-center justify-center">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 flex h-10 items-start gap-1 text-sm font-semibold leading-5 text-brand-navy">
                  <span className="line-clamp-2 flex-1">{category.name}</span>
                  <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-teal" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-surface="mist" className="bg-brand-mist">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="mt-1 text-sm text-brand-muted">From the current catalogue.</p>
            </div>
            <Link to="/shop" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-navy">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid items-stretch gap-6 lg:grid-cols-12">
            <div className="reveal-stagger grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 lg:col-span-8">
              {featured.map((product) => (
                <CatalogueCard key={product.id} product={product} />
              ))}
            </div>
            <aside className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl bg-brand-navy p-6 text-white lg:col-span-4">
              <img
                src="/products/oxygen-concentrator.jpg"
                alt=""
                className="pointer-events-none absolute -bottom-6 -right-4 w-40 object-contain opacity-90"
              />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Institutional supply</p>
                <h3 className="mt-3 max-w-[16rem] font-heading text-2xl font-bold leading-tight">
                  Need bulk medical supplies?
                </h3>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/75">
                  Share your requirements for a quotation, GST invoice, and institutional pricing.
                </p>
              </div>
              <Link
                to="/bulk-orders"
                className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-teal px-4 py-2.5 text-sm font-semibold text-white"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section data-surface="cream" className="bg-brand-ivory">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">Why Dr Surya Medicare</p>
            <h2 className="section-title mt-2">
              A supply desk for clinics, hospitals, and home care.
            </h2>
            <Link to="/why-us" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
              Read why us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <dl className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl bg-white p-4">
              <dt className="font-heading text-base font-bold text-brand-navy">Direct WhatsApp ordering</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-charcoal/75">Carts go to the business WhatsApp desk at {storeConfig.whatsappDisplayNumber}.</dd>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <dt className="font-heading text-base font-bold text-brand-navy">Pan-India dispatch</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-charcoal/75">Standard delivery is {storeConfig.shipping.estimatedDays}. Free delivery above {formatINR(storeConfig.shipping.freeThreshold)}.</dd>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <dt className="font-heading text-base font-bold text-brand-navy">Institutional quotations</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-charcoal/75">Bulk enquiries include GST invoicing and a dedicated procurement conversation.</dd>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <dt className="font-heading text-base font-bold text-brand-navy">A real person on support</dt>
              <dd className="mt-1 text-sm leading-relaxed text-brand-charcoal/75">{storeConfig.supportPhone} · {storeConfig.supportEmail}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section data-surface="white" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div data-reveal className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk sm:tracking-[0.2em]">Resources</p>
              <h2 className="section-title mt-1">From the knowledge desk</h2>
            </div>
            <Link to="/resources/blogs" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-navy">
              All articles
            </Link>
          </div>
          {stories.length === 0 || !story ? (
            <p className="rounded-2xl bg-[#F4F1EB] px-5 py-8 text-sm text-brand-muted">No published articles yet.</p>
          ) : (
            <div className="grid overflow-hidden rounded-3xl border border-brand-stone bg-[#F7F5F1] lg:min-h-[460px] lg:grid-cols-12">
              <div className="flex flex-col lg:col-span-5">
                {stories.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStory(index)}
                    className={`flex flex-1 items-start gap-3 border-b border-brand-stone/80 px-5 py-4 text-left last:border-b-0 ${
                      index === activeStory ? 'bg-white' : 'hover:bg-white/70'
                    }`}
                  >
                    <span className="mt-0.5 font-heading text-sm font-bold text-brand-teal">0{index + 1}</span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-muted">{item.category}</span>
                      <span className="mt-1 block font-heading text-sm font-bold leading-snug text-brand-navy">{item.title}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="bg-white lg:col-span-7">
                <img src={story.featuredImage} alt="" loading="lazy" decoding="async" className="h-48 w-full object-cover sm:h-64" />
                <div className="p-4 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-teal">{story.category}</p>
                  <h3 className="mt-2 font-heading text-xl font-bold leading-tight text-brand-navy sm:text-2xl">{story.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/80">{story.excerpt}</p>
                  <Link to={`/resources/blogs/${story.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <BestsellersSection />
      <B2BTrustRibbon />
      <BulkCtaSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
};
