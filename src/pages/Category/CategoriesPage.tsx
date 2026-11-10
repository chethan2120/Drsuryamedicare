import React from 'react';
import { categories } from '../../data/categories';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="bg-brand-warmWhite min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Healthcare Departments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-forest">
            Explore All Healthcare Categories
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Browse specialized biomedical equipment, surgical tools, daily tablets, and clinical supplies organized by healthcare need.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </div>
    </div>
  );
};
