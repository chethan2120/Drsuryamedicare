import React from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import {
  ShoppingBag,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Phone,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getGeneralEnquiryWhatsAppUrl } from '../../utils/whatsapp';

export const BuyingGuidesPage: React.FC = () => {
  const { buyingGuides } = useResources();

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
          <span className="text-brand-forest font-bold">Buying Guides</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Institutional Procurement Playbooks</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Medical Supplies & Equipment Buying Guides
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Structured procurement frameworks, ward inventory checklists, and operational evaluation criteria designed for hospital administrators, nursing superintendents, and clinic directors.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {buyingGuides.map((guide, idx) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs hover:shadow-card transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald font-bold uppercase text-[10px]">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-brand-muted text-[11px]">
                    <Clock className="w-3 h-3" />
                    {guide.estimatedReadTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-forest group-hover:text-brand-emerald transition-colors leading-snug">
                    <Link to={`/resources/buying-guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                {/* Key Checklist Highlights Preview */}
                {guide.checklist && guide.checklist.length > 0 && (
                  <div className="bg-brand-warmWhite/80 rounded-xl p-3 border border-brand-border/60 space-y-1.5 text-[11px]">
                    <span className="font-bold text-brand-forest block text-[10px] uppercase tracking-wider text-brand-emerald">
                      Included Checklists:
                    </span>
                    {guide.checklist.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-brand-body truncate">
                        <CheckCircle2 className="w-3 h-3 text-brand-emerald flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {guide.checklist.length > 2 && (
                      <span className="text-[10px] text-brand-muted italic block">
                        +{guide.checklist.length - 2} more checklist items inside
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-[11px] text-brand-muted">
                  Updated {guide.publishedAt}
                </span>
                <Link
                  to={`/resources/buying-guides/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emeraldDark transition-colors group"
                >
                  <span>Explore Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-brand-softGreen/60 rounded-3xl p-6 sm:p-8 border border-brand-emerald/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-sm sm:text-base text-brand-forest">
              Need a Custom Hospital Procurement Plan or BOQ Evaluation?
            </h4>
            <p className="text-xs text-brand-muted max-w-xl">
              Share your department layout, bed count, or tender Bill of Quantities (BOQ) with our hospital procurement team on WhatsApp for structured volume estimates.
            </p>
          </div>
          <a
            href={getGeneralEnquiryWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs transition-colors flex-shrink-0"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Consult Procurement Desk</span>
          </a>
        </div>

      </div>
    </div>
  );
};
