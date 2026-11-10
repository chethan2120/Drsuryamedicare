import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { updatePageSeo } from '../../utils/seo';
import { getBuyingGuideWhatsAppUrl } from '../../utils/whatsapp';
import {
  ShoppingBag,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Phone,
  ShieldCheck,
  Lightbulb,
  FileCheck,
  Layers,
} from 'lucide-react';

export const BuyingGuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getGuideBySlug } = useResources();

  const guide = getGuideBySlug(slug || '');

  useEffect(() => {
    if (guide) {
      updatePageSeo({
        title: guide.metaTitle || guide.title,
        description: guide.metaDescription || guide.summary,
        canonicalUrl: window.location.href,
        ogType: 'article',
        publishedTime: guide.publishedAt,
      });
    }
  }, [guide]);

  if (!guide) {
    return (
      <div className="bg-brand-warmWhite min-h-[60vh] py-20 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <ShoppingBag className="w-12 h-12 text-brand-muted mx-auto" />
          <h2 className="text-2xl font-heading font-extrabold text-brand-forest">
            Buying Guide Not Found
          </h2>
          <p className="text-xs text-brand-muted">
            The buying guide you requested does not exist or may have been renamed.
          </p>
          <Link
            to="/resources/buying-guides"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emeraldLight"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Buying Guides</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related products
  const relatedProducts = (guide.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const whatsappEnquiryUrl = getBuyingGuideWhatsAppUrl(guide.title);

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/resources" className="hover:text-brand-emerald transition-colors">
            Resources
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/resources/buying-guides" className="hover:text-brand-emerald transition-colors">
            Buying Guides
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-forest font-bold truncate max-w-[200px] sm:max-w-xs">
            {guide.title}
          </span>
        </nav>

        {/* Header Hero */}
        <header className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
                {guide.category}
              </span>
              <span className="text-xs text-brand-ivory/70 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {guide.estimatedReadTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              {guide.title}
            </h1>

            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              {guide.summary}
            </p>
          </div>
        </header>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Article & Guide Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Guide Text Content */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="prose prose-emerald max-w-none text-brand-body text-sm sm:text-base leading-relaxed space-y-4">
                {guide.content.split('\n\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3
                        key={index}
                        className="text-lg sm:text-xl font-heading font-extrabold text-brand-forest pt-3 border-b border-brand-border/60 pb-2"
                      >
                        {trimmed.replace(/^###\s+/, '')}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith('- ')) {
                    const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- '));
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1.5 my-3 text-sm">
                        {items.map((it, i) => (
                          <li key={i}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: it
                                  .replace(/^-\s+/, '')
                                  .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-brand-forest">$1</strong>'),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className="leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: trimmed.replace(
                          /\*\*([^*]+)\*\*/g,
                          '<strong class="text-brand-forest">$1</strong>'
                        ),
                      }}
                    />
                  );
                })}
              </div>

              {/* Useful Expert Tips Callout Box */}
              {guide.keyTips && guide.keyTips.length > 0 && (
                <div className="bg-brand-softGreen/50 rounded-2xl border border-brand-emerald/30 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-emerald uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-brand-emerald" />
                    <span>Expert Procurement Tips & Takeaways</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-brand-forest">
                    {guide.keyTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-forest">
                    Recommended Products for this Guide
                  </h3>
                  <Link
                    to="/shop"
                    className="text-xs font-bold text-brand-emerald hover:underline"
                  >
                    View Catalogue →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Operational Checklist & WhatsApp Action */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Checklist Box */}
            {guide.checklist && guide.checklist.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-border p-5 shadow-xs space-y-3 sticky top-24">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-xs text-brand-forest uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-brand-emerald" />
                    <span>Procurement Checklist</span>
                  </h4>
                  <span className="text-[10px] font-mono text-brand-muted">
                    {guide.checklist.length} Points
                  </span>
                </div>

                <div className="space-y-2 text-xs text-brand-body pt-1">
                  {guide.checklist.map((item, idx) => (
                    <label
                      key={idx}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-brand-warmWhite cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 rounded border-brand-border text-brand-emerald focus:ring-brand-emerald"
                      />
                      <span className="leading-snug">{item}</span>
                    </label>
                  ))}
                </div>

                {/* WhatsApp Enquiry Button */}
                <div className="pt-4 border-t border-brand-border/60">
                  <a
                    href={whatsappEnquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 fill-white" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>

                {/* Related Resource Links */}
                {guide.relatedResourceLinks && guide.relatedResourceLinks.length > 0 && (
                  <div className="pt-3 border-t border-brand-border/60 space-y-1.5 text-xs">
                    <span className="font-bold text-brand-muted text-[10px] uppercase">
                      Related Resources:
                    </span>
                    {guide.relatedResourceLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.url}
                        className="block text-brand-emerald hover:underline text-[11px] font-medium"
                      >
                        • {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
