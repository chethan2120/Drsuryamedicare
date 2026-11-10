import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { CategoryId, Product } from '../../types';
import { getSpecificationEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import {
  Sliders,
  Search,
  ExternalLink,
  Phone,
  Layers,
  ArrowRight,
  ShieldCheck,
  Package,
  Info,
} from 'lucide-react';

export const SpecificationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchCategory = p.categoryName.toLowerCase().includes(q);
      const matchSpecs = Object.entries(p.specifications || {}).some(
        ([key, val]) => key.toLowerCase().includes(q) || val.toLowerCase().includes(q)
      );
      return matchName || matchSku || matchCategory || matchSpecs;
    }
    return true;
  });

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-4">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/resources" className="hover:text-brand-emerald transition-colors">
            Resources
          </Link>
          <span>/</span>
          <span className="text-brand-forest font-bold">Technical Specifications</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Verified Clinical Data Sheets</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Product Technical Specifications
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Inspect verified clinical specifications, electrical operating ranges, material grades, AQL ratings, and packaging standards across our entire medical product catalogue.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 mb-8 shadow-xs space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specifications by product name, model SKU, or technical parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-emerald text-white'
                  : 'bg-brand-softGreen text-brand-forest hover:bg-brand-ivory'
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-emerald text-white'
                    : 'bg-brand-softGreen text-brand-forest hover:bg-brand-ivory'
                }`}
              >
                {cat.name} ({cat.productCount})
              </button>
            ))}
          </div>
        </div>

        {/* Specifications Table / Card List */}
        <div className="space-y-6 mb-12">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-3">
              <Sliders className="w-10 h-10 text-brand-muted mx-auto" />
              <h4 className="font-heading font-bold text-base text-brand-forest">
                No matching product specifications found
              </h4>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                Need specifications for an unlisted model or tender specification sheet? Connect with our biomedical desk directly.
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const specEntries = Object.entries(p.specifications || {});
              const hasSpecs = specEntries.length > 0;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs hover:shadow-card transition-all"
                >
                  {/* Top Bar with Product Header & Actions */}
                  <div className="p-5 sm:p-6 bg-brand-warmWhite/60 border-b border-brand-border/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-brand-border p-1 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald text-[10px] font-bold uppercase tracking-wider">
                            {p.categoryName}
                          </span>
                          <span className="font-mono text-[10px] bg-brand-ivory px-2 py-0.5 rounded text-brand-forest font-bold">
                            Model: {p.sku}
                          </span>
                          <span className="text-[10px] text-brand-muted">
                            GST Slab: {p.gstPercent}%
                          </span>
                        </div>
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-brand-forest">
                          {p.name}
                        </h3>
                        <p className="text-xs text-brand-muted line-clamp-1">
                          {p.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <Link
                        to={`/product/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-brand-softGreen text-brand-forest text-xs font-bold border border-brand-border transition-colors shadow-2xs"
                      >
                        <span>View Product</span>
                        <ExternalLink className="w-3.5 h-3.5 text-brand-emerald" />
                      </Link>

                      <a
                        href={getSpecificationEnquiryWhatsAppUrl(p.name, p.sku)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5 fill-white" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Specification Table */}
                  <div className="p-5 sm:p-6">
                    {hasSpecs ? (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-brand-forest uppercase tracking-wider flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-brand-emerald" />
                          <span>Technical Parameters & Performance Standards</span>
                        </h4>

                        <div className="border border-brand-border rounded-xl overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                              <tr>
                                <th className="py-2.5 px-4 w-1/3">Specification Parameter</th>
                                <th className="py-2.5 px-4 w-2/3">Technical Value / Standard</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/60">
                              {specEntries.map(([key, val], idx) => (
                                <tr
                                  key={key}
                                  className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-warmWhite/30'}
                                >
                                  <td className="py-2.5 px-4 font-semibold text-brand-forest">
                                    {key}
                                  </td>
                                  <td className="py-2.5 px-4 text-brand-body font-mono">
                                    {val}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Packaging Details */}
                        {p.packagingDetails && (
                          <div className="flex items-center gap-2 text-xs text-brand-muted bg-brand-ivory/40 p-3 rounded-xl border border-brand-border/60">
                            <Package className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                            <span>
                              <strong className="text-brand-forest font-semibold">Standard Packaging:</strong>{' '}
                              {p.packagingDetails} (Order Unit: {p.unit})
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-brand-softGreen/30 rounded-xl p-4 text-center space-y-2 border border-brand-border/60">
                        <Info className="w-5 h-5 text-brand-emerald mx-auto" />
                        <p className="text-xs text-brand-muted">
                          Detailed laboratory test parameters for this SKU are available directly from our regulatory desk upon request.
                        </p>
                        <a
                          href={getSpecificationEnquiryWhatsAppUrl(p.name, p.sku)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:underline"
                        >
                          <span>Request Certified Spec Sheet on WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
