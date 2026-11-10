import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { FaqCategory } from '../../types/resources';
import { getFaqWhatsAppUrl } from '../../utils/whatsapp';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES: ('All' | FaqCategory)[] = [
  'All',
  'General Enquiries',
  'Product Information',
  'Orders & Payments',
  'Delivery & Consignment',
  'Bulk Orders',
  'Returns & Refunds',
  'Customer Support',
];

export const FaqsPage: React.FC = () => {
  const { faqs } = useResources();
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-gen-1', 'faq-prod-1']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenFaqIds(faqs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds([]);
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const whatsappSupportUrl = getFaqWhatsAppUrl(searchQuery || selectedCategory);

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
          <span className="text-brand-forest font-bold">Frequently Asked Questions</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Customer & Hospital Helpdesk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Verified clinical and procurement information regarding product certifications, institutional volume discounts, GST invoicing, Pan-India courier transit, and customer guarantees.
            </p>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 mb-8 shadow-xs space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by keyword (e.g., GST, Return, Warranty, Delivery, Bulk)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
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

            {/* Expand / Collapse All Controls */}
            <div className="flex items-center gap-2 text-xs font-bold text-brand-emerald flex-shrink-0">
              <button
                type="button"
                onClick={handleExpandAll}
                className="hover:underline text-[11px]"
              >
                Expand All
              </button>
              <span className="text-brand-muted">|</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="hover:underline text-[11px]"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Accordion FAQ Listing */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-brand-muted mx-auto" />
              <h4 className="font-heading font-bold text-base text-brand-forest">
                No matching questions found
              </h4>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                Could not find the answer you need? Our customer support and clinical procurement team is available on WhatsApp.
              </p>
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-colors"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Ask on WhatsApp Desk</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-brand-warmWhite/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-softGreen text-brand-emerald flex-shrink-0">
                        {faq.category}
                      </span>
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-brand-forest leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-emerald flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/40 bg-brand-warmWhite/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="bg-brand-forest text-brand-ivory rounded-3xl p-6 sm:p-8 border border-brand-emerald/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-brand-warmWhite">
              Still Have Unanswered Questions?
            </h4>
            <p className="text-xs text-brand-ivory/70 max-w-xl">
              If your question is not covered in our FAQs, contact our support team directly. We are ready to assist with institutional quotations, consignment updates, and technical inquiries.
            </p>
          </div>
          <a
            href={whatsappSupportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp Support</span>
          </a>
        </div>

      </div>
    </div>
  );
};
