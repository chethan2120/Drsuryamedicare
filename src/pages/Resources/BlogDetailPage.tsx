import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { updatePageSeo } from '../../utils/seo';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Phone,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogBySlug, blogs } = useResources();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const blog = getBlogBySlug(slug || '');

  // Dynamic SEO Injection
  useEffect(() => {
    if (blog) {
      updatePageSeo({
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        canonicalUrl: window.location.href,
        ogImage: blog.featuredImage,
        ogType: 'article',
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
        author: blog.author,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: blog.title,
          description: blog.excerpt,
          image: [window.location.origin + blog.featuredImage],
          datePublished: blog.publishedAt,
          dateModified: blog.updatedAt,
          author: {
            '@type': 'Organization',
            name: blog.author,
            url: window.location.origin,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Dr Surya Medicare',
            logo: {
              '@type': 'ImageObject',
              url: window.location.origin + '/logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': window.location.href,
          },
        },
      });
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="bg-brand-warmWhite min-h-[60vh] py-20 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <BookOpen className="w-12 h-12 text-brand-muted mx-auto" />
          <h2 className="text-2xl font-heading font-extrabold text-brand-forest">
            Article Not Found
          </h2>
          <p className="text-xs text-brand-muted">
            The article you are looking for may have been moved or updated.
          </p>
          <Link
            to="/resources/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emeraldLight"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Blogs & Insights</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related products
  const relatedProducts = (blog.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  // Related articles
  const relatedArticles = blogs
    .filter((b) => b.id !== blog.id && !b.isDraft && b.category === blog.category)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = getWhatsAppUrl(
    `Hello, check out this insightful healthcare article on Dr Surya Medicare: "${blog.title}"\n${window.location.href}`
  );

  const whatsappEnquiryUrl = getWhatsAppUrl(
    `Hello Dr Surya Medicare, I read your clinical article on "${blog.title}" and would like to enquire about relevant supplies.`
  );

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation (with Schema markup) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-muted mb-6">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/resources" className="hover:text-brand-emerald transition-colors">
            Resources
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/resources/blogs" className="hover:text-brand-emerald transition-colors">
            Blogs & Insights
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-forest font-bold truncate max-w-[200px] sm:max-w-xs">
            {blog.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            {blog.isDraft && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-xs font-bold uppercase">
                Draft Preview
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-forest leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-brand-border py-3 text-xs text-brand-muted">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-forest text-brand-warmWhite flex items-center justify-center font-bold text-xs">
                DSM
              </div>
              <div>
                <span className="font-bold text-brand-forest block leading-tight">
                  {blog.author}
                </span>
                <span className="text-[10px] text-brand-muted">{blog.authorRole || 'Author'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                Published: {blog.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-emerald" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-border shadow-card mb-10 max-h-[420px]">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Layout with Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Excerpt Lead Paragraph */}
            <p className="text-base sm:text-lg text-brand-forest font-medium leading-relaxed border-l-4 border-brand-emerald pl-4 bg-brand-softGreen/30 py-3 rounded-r-xl">
              {blog.excerpt}
            </p>

            {/* Markdown/Structured Article Content */}
            <div className="prose prose-emerald max-w-none text-brand-body text-sm sm:text-base leading-relaxed space-y-4">
              {blog.content.split('\n\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('## ')) {
                  const headingText = trimmed.replace(/^##\s+/, '').replace(/\s*\{#[^}]+\}/, '');
                  const idMatch = trimmed.match(/\{#([^}]+)\}/);
                  const headingId = idMatch ? idMatch[1] : `section-${index}`;
                  return (
                    <h2
                      key={index}
                      id={headingId}
                      className="text-xl sm:text-2xl font-heading font-extrabold text-brand-forest pt-6 border-t border-brand-border/60 scroll-mt-24"
                    >
                      {headingText}
                    </h2>
                  );
                }

                if (trimmed.startsWith('### ')) {
                  const headingText = trimmed.replace(/^###\s+/, '');
                  return (
                    <h3
                      key={index}
                      className="text-lg font-heading font-bold text-brand-forest pt-4"
                    >
                      {headingText}
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

                if (trimmed.match(/^\d+\.\s+/)) {
                  const items = trimmed.split('\n').filter((l) => l.trim().match(/^\d+\.\s+/));
                  return (
                    <ol key={index} className="list-decimal pl-5 space-y-1.5 my-3 text-sm">
                      {items.map((it, i) => (
                        <li key={i}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: it
                                .replace(/^\d+\.\s+/, '')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-brand-forest">$1</strong>'),
                            }}
                          />
                        </li>
                      ))}
                    </ol>
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

            {/* Medical Content Review Disclaimer */}
            <div className="bg-brand-ivory/50 rounded-2xl border border-brand-border p-4 text-xs text-brand-muted flex items-start gap-3 mt-8">
              <ShieldCheck className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-forest block">Professional Healthcare Disclaimer</strong>
                <span>
                  The information presented is prepared for hospital procurement, operational planning, and general product education. It does not constitute formal medical diagnosis or patient-specific treatment advice. Sourcing decisions should be validated by the facility's biomedical engineering and clinical safety committees.
                </span>
              </div>
            </div>

            {/* Tags & Social Sharing Bar */}
            <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-brand-forest bg-brand-softGreen px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border bg-white text-xs font-bold text-brand-forest hover:bg-brand-softGreen transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Related Products Showcase */}
            {relatedProducts.length > 0 && (
              <div className="pt-10 border-t border-brand-border space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                    Featured Products Mentioned in this Guide
                  </h3>
                  <Link
                    to="/shop"
                    className="text-xs font-bold text-brand-emerald hover:underline"
                  >
                    Explore Shop →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

          </article>

          {/* Right Sticky Sidebar: Table of Contents & Enquiry CTA */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents Box */}
            {blog.tableOfContents && blog.tableOfContents.length > 0 && (
              <div className="sticky top-24 bg-white rounded-2xl border border-brand-border p-5 shadow-xs space-y-3">
                <h4 className="font-heading font-bold text-xs text-brand-forest uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>Table of Contents</span>
                </h4>
                <nav className="space-y-1.5 text-xs">
                  {blog.tableOfContents.map((toc) => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      className="block text-brand-muted hover:text-brand-emerald transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-brand-emerald font-medium leading-snug"
                    >
                      {toc.title}
                    </a>
                  ))}
                </nav>

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
              </div>
            )}

            {/* Related Articles Card */}
            {relatedArticles.length > 0 && (
              <div className="bg-brand-warmWhite rounded-2xl border border-brand-border p-5 space-y-3">
                <h4 className="font-heading font-bold text-xs text-brand-forest uppercase tracking-wider">
                  Related Insights
                </h4>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/resources/blogs/${rel.slug}`}
                      className="block group"
                    >
                      <h5 className="font-bold text-xs text-brand-forest group-hover:text-brand-emerald transition-colors line-clamp-2">
                        {rel.title}
                      </h5>
                      <span className="text-[10px] text-brand-muted mt-0.5 block">
                        {rel.readTime} • {rel.publishedAt}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>
    </div>
  );
};
