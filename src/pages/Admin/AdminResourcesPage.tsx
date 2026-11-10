import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { BlogPost, BuyingGuide, ProductKnowledgeArticle, FaqItem, ManualDocument, BlogCategory, FaqCategory, DocumentCategory } from '../../types/resources';
import { products } from '../../data/products';
import {
  ShieldCheck,
  BookOpen,
  ShoppingBag,
  Layers,
  HelpCircle,
  Download,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Sliders,
  RotateCcw,
  Sparkles,
  Search,
  ExternalLink,
  Save,
} from 'lucide-react';

export const AdminResourcesPage: React.FC = () => {
  const {
    blogs,
    saveBlogPost,
    deleteBlogPost,
    toggleBlogDraft,
    buyingGuides,
    saveBuyingGuide,
    deleteBuyingGuide,
    knowledgeArticles,
    saveKnowledgeArticle,
    deleteKnowledgeArticle,
    faqs,
    saveFaq,
    deleteFaq,
    manuals,
    saveManual,
    deleteManual,
    resetResourcesData,
  } = useResources();

  const [activeTab, setActiveTab] = useState<'blogs' | 'guides' | 'knowledge' | 'faqs' | 'manuals' | 'specs'>('blogs');
  const [notification, setNotification] = useState<string | null>(null);

  // Edit / Create Modals state
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  const [editingManual, setEditingManual] = useState<ManualDocument | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Blog modal handlers
  const handleOpenNewBlog = () => {
    setEditingBlog({
      id: 'blog-' + Date.now(),
      slug: 'new-article-' + Math.floor(Math.random() * 1000),
      title: '',
      metaTitle: '',
      metaDescription: '',
      category: 'Hospital Supplies',
      excerpt: '',
      content: '## Overview\n\nWrite your clinical article content here.\n\n## Key Considerations\n\n- Detailed operational specifications\n- Regulatory compliance standards',
      featuredImage: '/banners/icu-critical-care.jpg',
      author: 'Dr Surya Medicare Procurement Desk',
      authorRole: 'Clinical Procurement Specialist',
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      tags: ['Procurement', 'Hospital Supplies'],
      isFeatured: false,
      isDraft: true, // Marked as draft by default as requested
      tableOfContents: [
        { id: 'overview', title: '1. Overview', level: 2 },
        { id: 'key-considerations', title: '2. Key Considerations', level: 2 },
      ],
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title) return;
    saveBlogPost(editingBlog);
    setIsBlogModalOpen(false);
    showNotify(`Article "${editingBlog.title}" successfully saved!`);
  };

  // FAQ modal handlers
  const handleOpenNewFaq = () => {
    setEditingFaq({
      id: 'faq-' + Date.now(),
      question: '',
      answer: '',
      category: 'General Enquiries',
      isPopular: false,
    });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question) return;
    saveFaq(editingFaq);
    setIsFaqModalOpen(false);
    showNotify('FAQ item saved successfully!');
  };

  // Manual modal handlers
  const handleOpenNewManual = () => {
    setEditingManual({
      id: 'doc-' + Date.now(),
      title: '',
      productRef: '',
      modelSku: '',
      category: 'User Manual',
      language: 'English',
      fileFormat: 'PDF',
      fileSize: '2.5 MB',
      fileUrl: '',
      isAvailable: false,
      uploadDate: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsManualModalOpen(true);
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingManual || !editingManual.title) return;
    saveManual(editingManual);
    setIsManualModalOpen(false);
    showNotify(`Technical document "${editingManual.title}" updated!`);
  };

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-4">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-forest font-bold">Admin Panel — Resources Management</span>
        </div>

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrative Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Resources & Knowledge Management
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">
              Manage SEO blog articles, buying guides, educational knowledge deep-dives, technical manuals, and FAQs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all resource items to default demo data?')) {
                  resetResourcesData();
                  showNotify('All resource data reset to verified default catalog.');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-brand-border text-xs font-bold text-brand-muted hover:text-brand-forest hover:bg-brand-softGreen transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Global Notification Toast */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-brand-forest text-brand-warmWhite text-xs font-bold shadow-md flex items-center justify-between animate-fade-in border border-brand-emerald">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-emerald" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-brand-ivory/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-brand-border pb-px mb-8 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'blogs'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blogs & Insights ({blogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guides')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'guides'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buying Guides ({buyingGuides.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'knowledge'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Product Knowledge ({knowledgeArticles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'faqs'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs ({faqs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manuals')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'manuals'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Manuals & Documents ({manuals.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-t border-x transition-all ${
              activeTab === 'specs'
                ? 'bg-white border-brand-border text-brand-emerald border-b-white -mb-px'
                : 'border-transparent text-brand-muted hover:text-brand-forest'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Catalogue Specs ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: BLOGS & INSIGHTS */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  SEO Articles & Clinical Blogs
                </h3>
                <p className="text-xs text-brand-muted">
                  Create, edit SEO metadata, manage URL slugs, and publish draft articles.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenNewBlog}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>New Blog Article</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                    <tr>
                      <th className="py-3 px-4">Title & Slug</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Updated</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-brand-warmWhite/50">
                        <td className="py-3 px-4 max-w-sm">
                          <strong className="text-brand-forest block leading-snug">{b.title}</strong>
                          <span className="font-mono text-[10px] text-brand-muted">/resources/blogs/{b.slug}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-brand-softGreen text-brand-emerald font-semibold">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => {
                              toggleBlogDraft(b.id);
                              showNotify(`Status toggled for "${b.title}"`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              b.isDraft
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {b.isDraft ? 'Draft' : 'Published'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-brand-muted font-mono">{b.updatedAt}</td>
                        <td className="py-3 px-4">
                          {b.isFeatured ? (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="text-brand-muted text-[11px]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Link
                            to={`/resources/blogs/${b.slug}`}
                            className="p-1 text-brand-muted hover:text-brand-forest inline-block"
                            title="View Public Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingBlog(b);
                              setIsBlogModalOpen(true);
                            }}
                            className="p-1 text-brand-emerald hover:text-brand-emeraldDark inline-block"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete article "${b.title}"?`)) {
                                deleteBlogPost(b.id);
                                showNotify('Article deleted.');
                              }
                            }}
                            className="p-1 text-rose-600 hover:text-rose-800 inline-block"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUYING GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  Hospital Buying Guides
                </h3>
                <p className="text-xs text-brand-muted">
                  Institutional checklists, evaluation parameters, and procurement playbooks.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                  <tr>
                    <th className="py-3 px-4">Guide Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Read Time</th>
                    <th className="py-3 px-4">Checklist Items</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {buyingGuides.map((g) => (
                    <tr key={g.id} className="hover:bg-brand-warmWhite/50">
                      <td className="py-3 px-4 font-bold text-brand-forest max-w-md">
                        {g.title}
                        <span className="font-mono text-[10px] text-brand-muted block font-normal">
                          /resources/buying-guides/{g.slug}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{g.category}</td>
                      <td className="py-3 px-4 font-mono">{g.estimatedReadTime}</td>
                      <td className="py-3 px-4">{g.checklist?.length || 0} Points</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Link
                          to={`/resources/buying-guides/${g.slug}`}
                          className="p-1 text-brand-muted hover:text-brand-forest inline-block"
                          title="View"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT KNOWLEDGE */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  Product Knowledge Modules
                </h3>
                <p className="text-xs text-brand-muted">
                  Educational literature on medical terminology, device differences, and maintenance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                  <tr>
                    <th className="py-3 px-4">Module Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Terms Defined</th>
                    <th className="py-3 px-4">Comparisons</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {knowledgeArticles.map((k) => (
                    <tr key={k.id} className="hover:bg-brand-warmWhite/50">
                      <td className="py-3 px-4 font-bold text-brand-forest">
                        {k.title}
                        <span className="font-mono text-[10px] text-brand-muted block font-normal">
                          /resources/knowledge/{k.slug}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{k.category}</td>
                      <td className="py-3 px-4">{k.terminology?.length || 0} Terms</td>
                      <td className="py-3 px-4">{k.differences?.length || 0} Comparisons</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/resources/knowledge/${k.slug}`}
                          className="p-1 text-brand-muted hover:text-brand-forest inline-block"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  Frequently Asked Questions (FAQs)
                </h3>
                <p className="text-xs text-brand-muted">
                  Manage questions and answers across the 7 verified store categories.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenNewFaq}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New FAQ</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                  <tr>
                    <th className="py-3 px-4">Question</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Popular</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {faqs.map((f) => (
                    <tr key={f.id} className="hover:bg-brand-warmWhite/50">
                      <td className="py-3 px-4 max-w-md">
                        <strong className="text-brand-forest block leading-snug">{f.question}</strong>
                        <span className="text-[11px] text-brand-muted line-clamp-1 mt-0.5">{f.answer}</span>
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{f.category}</td>
                      <td className="py-3 px-4">
                        {f.isPopular ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Popular
                          </span>
                        ) : (
                          <span className="text-brand-muted text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFaq(f);
                            setIsFaqModalOpen(true);
                          }}
                          className="p-1 text-brand-emerald hover:text-brand-emeraldDark"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this FAQ item?')) {
                              deleteFaq(f.id);
                              showNotify('FAQ deleted.');
                            }
                          }}
                          className="p-1 text-rose-600 hover:text-rose-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: MANUALS & DOCUMENTS (UPLOAD REPOSITORY) */}
        {activeTab === 'manuals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  Manuals & Technical Document Archive
                </h3>
                <p className="text-xs text-brand-muted">
                  Manage document visibility and attach genuine manufacturer PDF URLs as they become available.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenNewManual}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Document Record</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                  <tr>
                    <th className="py-3 px-4">Document Title</th>
                    <th className="py-3 px-4">Product / SKU</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Genuine File Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {manuals.map((m) => (
                    <tr key={m.id} className="hover:bg-brand-warmWhite/50">
                      <td className="py-3 px-4 max-w-sm">
                        <strong className="text-brand-forest block leading-snug">{m.title}</strong>
                        <span className="text-[10px] text-brand-muted">{m.fileFormat} • {m.fileSize}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-brand-forest block">{m.productRef}</span>
                        <span className="font-mono text-[10px] text-brand-muted">{m.modelSku || 'N/A'}</span>
                      </td>
                      <td className="py-3 px-4 text-brand-muted">{m.category}</td>
                      <td className="py-3 px-4">
                        {m.isAvailable && m.fileUrl ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            File Attached (Download Enabled)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                            In Digitization (WhatsApp Request)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingManual(m);
                            setIsManualModalOpen(true);
                          }}
                          className="p-1 text-brand-emerald hover:text-brand-emeraldDark"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this manual record?')) {
                              deleteManual(m.id);
                              showNotify('Document removed.');
                            }
                          }}
                          className="p-1 text-rose-600 hover:text-rose-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CATALOGUE SPECS OVERVIEW */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-brand-forest">
                  Product Technical Specifications Overview
                </h3>
                <p className="text-xs text-brand-muted">
                  Active verified parameters integrated directly from catalogue products.
                </p>
              </div>
              <Link
                to="/resources/specifications"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:underline"
              >
                <span>View Public Specs Table</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softGreen/50 border-b border-brand-border text-brand-forest font-bold">
                  <tr>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Specs Count</th>
                    <th className="py-3 px-4 text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-warmWhite/50">
                      <td className="py-3 px-4 font-bold text-brand-forest">{p.name}</td>
                      <td className="py-3 px-4 font-mono text-[10px]">{p.sku}</td>
                      <td className="py-3 px-4 text-brand-muted">{p.categoryName}</td>
                      <td className="py-3 px-4">{Object.keys(p.specifications || {}).length} Parameters</td>
                      <td className="py-3 px-4 text-right">
                        <Link to={`/product/${p.id}`} className="text-brand-emerald hover:underline font-bold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: EDIT / CREATE BLOG ARTICLE */}
        {isBlogModalOpen && editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-3xl border border-brand-border shadow-modal overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-4 sm:p-5 bg-brand-forest text-brand-warmWhite flex items-center justify-between">
                <h3 className="font-heading font-bold text-base">
                  {editingBlog.id ? 'Edit Article & SEO Metadata' : 'Create New Article'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-brand-forest mb-1">Article Title *</label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                      setEditingBlog({ ...editingBlog, title, slug: editingBlog.slug || slug });
                    }}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs text-brand-forest focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-forest mb-1">URL Slug *</label>
                    <input
                      type="text"
                      value={editingBlog.slug}
                      onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-brand-border font-mono text-xs text-brand-forest"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Category</label>
                    <select
                      value={editingBlog.category}
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as BlogCategory })}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs text-brand-forest bg-white"
                    >
                      <option value="Hospital Supplies">Hospital Supplies</option>
                      <option value="Medical Equipment">Medical Equipment</option>
                      <option value="Surgical Supplies">Surgical Supplies</option>
                      <option value="Healthcare Industry">Healthcare Industry</option>
                      <option value="Medical Consumables">Medical Consumables</option>
                      <option value="Product Guides">Product Guides</option>
                      <option value="Hospital Procurement">Hospital Procurement</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-forest mb-1">SEO Meta Title</label>
                    <input
                      type="text"
                      value={editingBlog.metaTitle}
                      onChange={(e) => setEditingBlog({ ...editingBlog, metaTitle: e.target.value })}
                      placeholder="Title tag for search engines..."
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Estimated Read Time</label>
                    <input
                      type="text"
                      value={editingBlog.readTime}
                      onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingBlog.metaDescription}
                    onChange={(e) => setEditingBlog({ ...editingBlog, metaDescription: e.target.value })}
                    placeholder="Short description for search snippets..."
                    className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Article Excerpt (Lead text)</label>
                  <textarea
                    rows={2}
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingBlog.featuredImage}
                    onChange={(e) => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Article Markdown Content</label>
                  <textarea
                    rows={6}
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border font-mono text-xs"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-forest">
                    <input
                      type="checkbox"
                      checked={editingBlog.isDraft}
                      onChange={(e) => setEditingBlog({ ...editingBlog, isDraft: e.target.checked })}
                      className="rounded border-brand-border text-brand-emerald"
                    />
                    <span>Save as Draft (Hide from public until reviewed)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-forest">
                    <input
                      type="checkbox"
                      checked={editingBlog.isFeatured}
                      onChange={(e) => setEditingBlog({ ...editingBlog, isFeatured: e.target.checked })}
                      className="rounded border-brand-border text-brand-emerald"
                    />
                    <span>Mark as Featured Article</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-brand-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-brand-border text-brand-forest font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-emerald text-white font-bold"
                  >
                    Save Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT / CREATE FAQ */}
        {isFaqModalOpen && editingFaq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-brand-border shadow-modal overflow-hidden">
              <div className="p-4 bg-brand-forest text-brand-warmWhite flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm">Add / Edit FAQ</h3>
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveFaq} className="p-5 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-brand-forest mb-1">Category</label>
                  <select
                    value={editingFaq.category}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as FaqCategory })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white"
                  >
                    <option value="General Enquiries">General Enquiries</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Orders & Payments">Orders & Payments</option>
                    <option value="Delivery & Consignment">Delivery & Consignment</option>
                    <option value="Bulk Orders">Bulk Orders</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Question *</label>
                  <input
                    type="text"
                    value={editingFaq.question}
                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-brand-border"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Answer *</label>
                  <textarea
                    rows={4}
                    value={editingFaq.answer}
                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-brand-border"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-forest pt-1">
                  <input
                    type="checkbox"
                    checked={editingFaq.isPopular || false}
                    onChange={(e) => setEditingFaq({ ...editingFaq, isPopular: e.target.checked })}
                    className="rounded border-brand-border text-brand-emerald"
                  />
                  <span>Mark as Popular / Featured FAQ</span>
                </label>

                <div className="pt-3 border-t border-brand-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFaqModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-brand-border font-bold text-brand-forest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-emerald text-white font-bold"
                  >
                    Save FAQ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT / CREATE MANUAL RECORD */}
        {isManualModalOpen && editingManual && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-brand-border shadow-modal overflow-hidden">
              <div className="p-4 bg-brand-forest text-brand-warmWhite flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm">Add / Edit Technical Document</h3>
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveManual} className="p-5 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-brand-forest mb-1">Document Title *</label>
                  <input
                    type="text"
                    value={editingManual.title}
                    onChange={(e) => setEditingManual({ ...editingManual, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-brand-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Product Reference</label>
                    <input
                      type="text"
                      value={editingManual.productRef}
                      onChange={(e) => setEditingManual({ ...editingManual, productRef: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-brand-border"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Model SKU</label>
                    <input
                      type="text"
                      value={editingManual.modelSku}
                      onChange={(e) => setEditingManual({ ...editingManual, modelSku: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Category</label>
                    <select
                      value={editingManual.category}
                      onChange={(e) => setEditingManual({ ...editingManual, category: e.target.value as DocumentCategory })}
                      className="w-full px-3 py-2 rounded-xl border border-brand-border bg-white"
                    >
                      <option value="User Manual">User Manual</option>
                      <option value="Technical Service Guide">Technical Service Guide</option>
                      <option value="ISO/CE Declaration">ISO/CE Declaration</option>
                      <option value="Sterilization Protocol">Sterilization Protocol</option>
                      <option value="Product Data Sheet">Product Data Sheet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-brand-forest mb-1">Format & File Size</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingManual.fileFormat}
                        onChange={(e) => setEditingManual({ ...editingManual, fileFormat: e.target.value as any })}
                        className="w-16 px-2 py-2 rounded-xl border border-brand-border text-center"
                      />
                      <input
                        type="text"
                        value={editingManual.fileSize}
                        onChange={(e) => setEditingManual({ ...editingManual, fileSize: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-brand-border"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">
                    Genuine Document URL (Attach when verified PDF is uploaded)
                  </label>
                  <input
                    type="text"
                    value={editingManual.fileUrl || ''}
                    onChange={(e) =>
                      setEditingManual({
                        ...editingManual,
                        fileUrl: e.target.value,
                        isAvailable: Boolean(e.target.value.trim()),
                      })
                    }
                    placeholder="https://... or /manuals/doc.pdf (Leave empty if in digitization)"
                    className="w-full px-3 py-2 rounded-xl border border-brand-border font-mono"
                  />
                  <span className="text-[10px] text-brand-muted block mt-1">
                    Direct download button appears on public page ONLY when a genuine URL is supplied and availability is enabled.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-brand-forest mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingManual.description}
                    onChange={(e) => setEditingManual({ ...editingManual, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-forest pt-1">
                  <input
                    type="checkbox"
                    checked={editingManual.isAvailable}
                    onChange={(e) => setEditingManual({ ...editingManual, isAvailable: e.target.checked })}
                    className="rounded border-brand-border text-brand-emerald"
                  />
                  <span>Mark as Genuine File Available for Public Direct Download</span>
                </label>

                <div className="pt-3 border-t border-brand-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-brand-border font-bold text-brand-forest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-emerald text-white font-bold"
                  >
                    Save Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
