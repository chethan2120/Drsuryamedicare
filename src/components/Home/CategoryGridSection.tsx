import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const CategoryGridSection: React.FC = () => {
  // Strictly display top 8 categories as requested
  const visibleCategories = categories.slice(0, 8);
  const remainingCount = Math.max(0, categories.length - 8);

  return (
    <section className="py-12 sm:py-16 bg-brand-warmWhite border-b border-brand-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Comprehensive Healthcare Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-forest">
              Explore Our Healthcare Categories
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
              From everyday tablets & pain relief to clinical diagnostics, surgical tools, and patient care equipment.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-emerald hover:text-brand-emeraldLight group self-start md:self-end"
          >
            <span>View All in Catalogue ({categories.length} Categories)</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Categories Responsive Grid (Staggered Animation on 8 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* Prominent "View More" CTA Redirecting to Shop Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-softGreen/40 rounded-2xl p-5 border"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald text-white flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-brand-forest">
                Looking for Laboratory, Rehabilitation, Furniture or Accessories?
              </h4>
              <p className="text-xs text-brand-muted">
                Explore +{remainingCount} more specialized medical departments and 1,000+ clinical products in our complete store catalogue.
              </p>
            </div>
          </div>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-brand-warmWhite font-bold text-xs sm:text-sm shadow-xs transition-all group flex-shrink-0"
          >
            <span>View More Categories in Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
