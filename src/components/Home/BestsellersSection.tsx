import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const BestsellersSection: React.FC = () => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 5);

  return (
    <section data-surface="white" className="py-14 sm:py-16 bg-brand-cool border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="section-kicker mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Highest Demand Supplies</span>
            </div>
            <h2 className="section-title">
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
