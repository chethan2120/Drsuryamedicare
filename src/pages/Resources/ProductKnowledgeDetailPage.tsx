import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { updatePageSeo } from '../../utils/seo';
import { getProductKnowledgeWhatsAppUrl } from '../../utils/whatsapp';
import {
  Layers,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Wrench,
  Scale,
  ExternalLink,
} from 'lucide-react';

export const ProductKnowledgeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getKnowledgeBySlug } = useResources();

  const article = getKnowledgeBySlug(slug || '');

  useEffect(() => {
    if (article) {
      updatePageSeo({
        title: `${article.title} | Dr Surya Medicare Product Knowledge`,
        description: article.summary,
        canonicalUrl: window.location.href,
        ogType: 'article',
        publishedTime: article.publishedAt,
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="bg-brand-warmWhite min-h-[60vh] py-20 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <Layers className="w-12 h-12 text-brand-muted mx-auto" />
          <h2 className="text-2xl font-heading font-extrabold text-brand-forest">
            Knowledge Topic Not Found
          </h2>
          <p className="text-xs text-brand-muted">
            The educational topic requested does not exist or may have been consolidated.
          </p>
          <Link
            to="/resources/knowledge"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emeraldLight"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product Knowledge</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related products
  const relatedProducts = (article.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const whatsappEnquiryUrl = getProductKnowledgeWhatsAppUrl(article.title);

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
          <Link to="/resources/knowledge" className="hover:text-brand-emerald transition-colors">
            Product Knowledge
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-forest font-bold truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* Hero Header */}
        <header className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>
        </header>

        {/* Knowledge Modules Layout */}
        <div className="space-y-8">
          
          {/* Module 1: Intended Clinical Use & Category Introduction */}
          <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-heading font-extrabold text-brand-forest flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-emerald" />
              <span>Intended Clinical Use & Indication</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
              {article.intendedUse}
            </p>
          </section>

          {/* Module 2: Key Product Features */}
          {article.keyFeatures && article.keyFeatures.length > 0 && (
            <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-lg font-heading font-extrabold text-brand-forest flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
                <span>Critical Technical & Safety Features</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-brand-body">
                {article.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-warmWhite border border-brand-border/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 3: Common Medical Terminology Glossary */}
          {article.terminology && article.terminology.length > 0 && (
            <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-lg font-heading font-extrabold text-brand-forest flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-emerald" />
                <span>Clinical Terminology & Engineering Definitions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.terminology.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-brand-border bg-brand-softGreen/30 space-y-1"
                  >
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-brand-forest">
                      {t.term}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {t.definition}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 4: Differences Between Product Types (Comparisons) */}
          {article.differences && article.differences.length > 0 && (
            <section className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-lg font-heading font-extrabold text-brand-forest flex items-center gap-2">
                <Scale className="w-5 h-5 text-brand-emerald" />
                <span>Side-by-Side Product Variations & Selection</span>
              </h2>
              <div className="space-y-3">
                {article.differences.map((diff, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-brand-border bg-white shadow-2xs space-y-2"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-brand-forest">
                      <span className="px-2 py-0.5 rounded bg-brand-softGreen text-brand-emerald">
                        {diff.typeA}
                      </span>
                      <span className="text-brand-muted">vs.</span>
                      <span className="px-2 py-0.5 rounded bg-brand-ivory text-brand-forest">
                        {diff.typeB}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {diff.comparison}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 5: Verified Care & Maintenance Protocols */}
          {article.careAndMaintenance && article.careAndMaintenance.length > 0 && (
            <section className="bg-brand-softGreen/40 rounded-3xl border border-brand-emerald/20 p-6 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-lg font-heading font-extrabold text-brand-forest flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-emerald" />
                <span>Verified Product Care & Maintenance Protocols</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-forest">
                {article.careAndMaintenance.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Module 6: Related Product Links */}
          {relatedProducts.length > 0 && (
            <section className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-forest">
                  Verified Catalogue Products in this Category
                </h3>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-brand-emerald hover:underline"
                >
                  View All in Shop →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {/* WhatsApp Direct Action Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading font-bold text-sm sm:text-base text-brand-forest">
                Have a Technical Question Regarding This Clinical Equipment?
              </h4>
              <p className="text-xs text-brand-muted">
                Our biomedical engineering and clinical desk can clarify hospital compliance standards, maintenance cycles, and volume quotations directly on WhatsApp.
              </p>
            </div>
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs transition-colors flex-shrink-0"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Ask Clinical Desk on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
