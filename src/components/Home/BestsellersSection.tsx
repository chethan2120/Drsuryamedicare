import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const BestsellersSection: React.FC = () => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 5);

  return (
    <section className="py-16 sm:py-20 bg-brand-ivory/40 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-vermilion tracking-wider uppercase mb-1">
              <Flame className="w-4 h-4 fill-brand-vermilion text-brand-vermilion" />
              <span>Highest Demand Supplies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Popular Healthcare Essentials
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Most requested clinical devices and consumables ordered by doctors, nursing homes, and clinics.
            </p>
          </div>

          <Link
            to="/shop?sortBy=popularity"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-emerald hover:text-brand-emeraldLight group self-start sm:self-end"
          >
            <span>See All Bestsellers</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5-Column Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
