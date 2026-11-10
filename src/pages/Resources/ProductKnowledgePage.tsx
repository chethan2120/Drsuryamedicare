import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import {
  Layers,
  Search,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Phone,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { getGeneralEnquiryWhatsAppUrl } from '../../utils/whatsapp';

const CATEGORIES = [
  'All',
  'Diagnostic Equipment',
  'Medical Equipment',
  'Surgical Instruments',
  'Hospital Consumables',
  'Personal Protective Equipment',
  'Clinical Supplies',
] as const;

export const ProductKnowledgePage: React.FC = () => {
  const { knowledgeArticles } = useResources();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = knowledgeArticles.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.terminology.some(
          (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
        )
      );
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
          <span className="text-brand-forest font-bold">Product Knowledge Hub</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Clinical Product Education</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Medical Product Knowledge Hub
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Educational literature on medical device mechanics, surgical steel metallurgy, fluid delivery standards, terminology definitions, and clinical maintenance protocols.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 mb-8 shadow-xs space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product knowledge by device, terminology (e.g., AQL, Plethysmography, Passivation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs font-bold">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-emerald text-white'
                    : 'bg-brand-softGreen text-brand-forest hover:bg-brand-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs hover:shadow-card transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald text-[10px] font-bold uppercase tracking-wider">
                  {article.category}
                </span>

                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-forest group-hover:text-brand-emerald transition-colors leading-snug">
                    <Link to={`/resources/knowledge/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Terminology Highlights */}
                {article.terminology && article.terminology.length > 0 && (
                  <div className="bg-brand-warmWhite/80 rounded-xl p-3 border border-brand-border/60 space-y-1 text-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-brand-forest block">
                      Core Medical Terminology:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {article.terminology.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-2 py-0.5 rounded text-[10px] text-brand-forest font-semibold border border-brand-border/60"
                        >
                          {t.term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-[11px] text-brand-muted">
                  Clinical Educational Guide
                </span>
                <Link
                  to={`/resources/knowledge/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emeraldDark transition-colors group"
                >
                  <span>Explore Topic</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-brand-forest text-brand-ivory rounded-3xl p-6 sm:p-8 border border-brand-emerald/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-brand-warmWhite">
              Have Questions Regarding Product Metallurgy, Gauges or Certifications?
            </h4>
            <p className="text-xs text-brand-ivory/70 max-w-xl">
              Our biomedical and clinical support desk is available on WhatsApp to answer detailed technical inquiries for hospital procurement teams.
            </p>
          </div>
          <a
            href={getGeneralEnquiryWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Consult Clinical Desk</span>
          </a>
        </div>

      </div>
    </div>
  );
};
