import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { Tag, ArrowRight, ShoppingBag, Percent } from 'lucide-react';

export const SpecialOffersSection: React.FC = () => {
  const offerProducts = products.filter((p) => p.isSpecialOffer).slice(0, 4);
  const { addToCart } = useCart();

  return (
    <section className="py-16 sm:py-20 bg-brand-forest text-brand-ivory relative overflow-hidden">
      {/* Decorative emerald depth circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-emerald/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-emeraldLight/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-vermilion/20 text-brand-vermilion border border-brand-vermilion/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Percent className="w-3.5 h-3.5" />
              <span>Volume & Clearance Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-warmWhite">
              Healthcare Essentials. Better Value.
            </h2>
            <p className="text-xs sm:text-sm text-brand-ivory/80 mt-1 max-w-xl">
              Transparent institutional discounts on clinical monitors, daily PPE consumables, and diagnostic devices.
            </p>
          </div>

          <Link
            to="/shop?onlyDiscounted=true"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-ivory hover:text-white group self-start md:self-end"
          >
            <span>Explore All Special Offers</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.map((product) => (
            <div
              key={product.id}
              className="bg-brand-warmWhite rounded-2xl p-4 text-brand-forest flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all duration-300 relative group"
            >
              {/* Vermilion Badge */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-brand-vermilion text-white text-xs font-bold shadow-xs">
                {product.discountPercent}% OFF
              </div>

              <div>
                {/* Image */}
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-brand-ivory/50 p-2 mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="text-[10px] font-semibold text-brand-emerald uppercase tracking-wider">
                  {product.categoryName}
                </div>
                <h4 className="font-heading font-bold text-sm text-brand-forest line-clamp-2 mt-1">
                  {product.name}
                </h4>
              </div>

              {/* Price & Action */}
              <div className="pt-3 mt-3 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-brand-emerald font-heading">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-brand-muted line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-muted">Standard Institutional Unit</span>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="p-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white shadow-xs transition-colors"
                  title="Add to cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
