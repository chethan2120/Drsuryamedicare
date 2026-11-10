import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3e%3crect width='400' height='400' fill='%23F9EBD7'/%3e%3ccircle cx='200' cy='200' r='90' fill='%23046A38' opacity='0.15'/%3e%3cpath d='M175 120h50v160h-50zM120 175h160v50H120z' fill='%23046A38'/%3e%3ctext x='50%25' y='330' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23046A38' text-anchor='middle'%3eDR SURYA MEDICARE%3c/text%3e%3c/svg%3e";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-brand-border/80 hover:border-brand-emerald/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      {/* Category Image */}
      <div className="relative h-44 w-full bg-brand-ivory/40 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE_DATA_URI;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/75 via-brand-forest/20 to-transparent" />

        {/* Product Count Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-warmWhite/90 backdrop-blur-sm text-[11px] font-semibold text-brand-emerald shadow-xs">
          {category.productCount} Products
        </div>

        {/* Category Title Overlaid on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-heading font-bold text-base sm:text-lg group-hover:text-brand-ivory transition-colors drop-shadow-sm">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description & Action */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white space-y-3">
        <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
          {category.shortDescription}
        </p>

        <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-emerald group-hover:text-brand-emeraldLight">
          <span>Explore Category</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
