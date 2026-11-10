import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { Product, StockStatus } from '../../types';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
  enquiry_only: 'Quote only',
};

const CARE_CATEGORIES = new Set(['monitoring-devices', 'diagnostic-equipment', 'respiratory-care', 'patient-care']);

interface ShowcaseGroup {
  id: string;
  label: string;
  viewAll: string;
  products: Product[];
}

function byCatalogueFlag(a: Product, b: Product) {
  const score = (item: Product) => (item.isFeatured ? 2 : 0) + (item.isBestseller ? 1 : 0);
  return score(b) - score(a) || a.name.localeCompare(b.name);
}

export const TopSellingShowcase: React.FC = () => {
  const groups = useMemo<ShowcaseGroup[]>(() => {
    const catalogue = [...products];
    const lab = catalogue
      .filter((product) => product.category === 'laboratory-equipment')
      .sort(byCatalogueFlag);
    const care = catalogue
      .filter((product) => CARE_CATEGORIES.has(product.category) && product.productType !== 'Consumables')
      .sort(byCatalogueFlag)
      .slice(0, 8);
    const consumables = catalogue
      .filter((product) => product.productType === 'Consumables')
      .sort(byCatalogueFlag)
      .slice(0, 8);

    return [
      {
        id: 'lab',
        label: 'Lab Bestsellers',
        viewAll: '/shop?category=laboratory-equipment',
        products: lab,
      },
      {
        id: 'care',
        label: 'Top Selling Critical Care & Patient Monitoring Range',
        viewAll: '/shop?category=monitoring-devices,diagnostic-equipment,respiratory-care,patient-care',
        products: care,
      },
      {
        id: 'consumables',
        label: 'Top Selling Consumables',
        viewAll: '/shop?productType=Consumables',
        products: consumables,
      },
    ];
  }, []);

  const [activeId, setActiveId] = useState(groups[0]?.id ?? 'lab');
  const scroller = useRef<HTMLDivElement>(null);
  const active = groups.find((group) => group.id === activeId) ?? groups[0];

  const scrollRow = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.8, 240), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section className="border-b border-brand-border bg-white" aria-labelledby="top-selling-heading">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Featured products</p>
            <h2 id="top-selling-heading" className="section-title mt-1">
              Top Selling Medical Supplies
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-body">
              Explore frequently ordered products across our clinical, laboratory and patient care range.
            </p>
          </div>
          <Link
            to={active.viewAll}
            className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-brand-navy"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-b border-brand-border">
          <div role="tablist" aria-label="Product ranges" className="flex min-w-0 gap-6 overflow-x-auto">
            {groups.map((group) => {
              const selected = group.id === active.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  id={`range-tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls="range-panel"
                  onClick={() => {
                    setActiveId(group.id);
                    scroller.current?.scrollTo({ left: 0 });
                  }}
                  className={`shrink-0 border-b-2 pb-3 text-left text-sm font-semibold ${
                    selected ? 'border-brand-emerald text-brand-navy' : 'border-transparent text-brand-muted'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
          <div className="mb-2 hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scrollRow(-1)}
              className="flex h-9 w-9 items-center justify-center border border-brand-border bg-white text-brand-navy"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => scrollRow(1)}
              className="flex h-9 w-9 items-center justify-center border border-brand-border bg-white text-brand-navy"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          id="range-panel"
          role="tabpanel"
          aria-labelledby={`range-tab-${active.id}`}
          ref={scroller}
          className="mt-5 flex gap-4 overflow-x-auto pb-1 snap-x snap-mandatory"
        >
          {active.products.map((product) => (
            <ShowcaseCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const canAdd = product.stockStatus === 'in_stock' || product.stockStatus === 'low_stock';

  return (
    <article className="flex w-[15.5rem] shrink-0 snap-start flex-col border border-brand-border bg-brand-ivory sm:w-[16.5rem]">
      <Link to={`/product/${product.id}`} className="block bg-white">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-contain object-center p-4"
        />
      </Link>
      <div className="flex flex-1 flex-col px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-goldInk">{product.brand}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-1 line-clamp-2 min-h-10 font-heading text-sm font-semibold leading-5 text-brand-navy"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-xs text-brand-muted">{STOCK_LABEL[product.stockStatus]}</p>
        <p className="mt-1 font-heading text-base font-bold text-brand-navy">
          {formatINR(product.price)}
          <span className="ml-1 text-[11px] font-medium text-brand-muted">/ {product.unit}</span>
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-brand-border pt-3">
          <Link to={`/product/${product.id}`} className="text-xs font-semibold text-brand-navy">
            View product
          </Link>
          {product.stockStatus === 'enquiry_only' ? (
            <Link to={`/bulk-orders?prefill=${product.id}`} className="text-xs font-semibold text-brand-goldInk">
              Request quote
            </Link>
          ) : (
            <button
              type="button"
              disabled={!canAdd}
              onClick={() => addToCart(product, 1)}
              className="text-xs font-semibold text-brand-goldInk disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
