import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { ArrowRight, Star, ShoppingBag, Check } from 'lucide-react';

const CONSUMABLE_IDS = [
  'dsm-gloves-01',
  'dsm-gloves-02',
  'dsm-iv-02',
  'dsm-iv-01',
  'dsm-cannula-01',
  'dsm-mask-01',
  'dsm-syring-01',
];

export const TopSellingConsumablesSection: React.FC = () => {
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const items = CONSUMABLE_IDS
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-kicker">Catalogue</p>
            <h2 className="section-title mt-2">Top selling consumables</h2>
            <p className="section-copy">
              Surgical gloves, infusion sets, and clinical disposables from the current catalogue.
            </p>
          </div>
          <Link
            to="/shop?category=medical-consumables"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald hover:text-brand-emeraldDark flex-shrink-0"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="product-scroller flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="snap-start shrink-0 w-[210px] sm:w-[230px] bg-brand-ivory rounded-2xl border border-brand-border p-3 flex flex-col hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <Link to={`/product/${item.id}`} className="relative aspect-square rounded-xl overflow-hidden bg-white border border-brand-border/70">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-full w-full object-contain object-center p-2"
                />
                {item.discountPercent && item.discountPercent > 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-forest text-brand-gold text-[11px] font-semibold">
                    {item.discountPercent}% off
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-1 text-[11px] text-brand-muted mt-3">
                <Star className="w-3.5 h-3.5 fill-brand-goldInk text-brand-goldInk" />
                <span className="font-semibold text-brand-forest">{item.rating}</span>
                <span className="truncate">· {item.brand}</span>
              </div>

              <Link to={`/product/${item.id}`} className="mt-1 text-sm font-heading font-semibold text-brand-forest line-clamp-2 leading-snug hover:text-brand-emerald">
                {item.name}
              </Link>

              <div className="mt-auto pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-heading font-bold text-brand-forest">
                    {formatINR(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-brand-muted line-through">
                      {formatINR(item.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-brand-muted">per {item.unit}</p>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(item)}
                  className={`mt-3 w-full min-h-[40px] rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    addedItemId === item.id
                      ? 'bg-brand-forest text-white'
                      : 'bg-white border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald hover:text-white'
                  }`}
                >
                  {addedItemId === item.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
