import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { getGeneralEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import {
  FileText,
  Sliders,
  BookOpen,
  ShoppingBag,
  HelpCircle,
  Download,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Sparkles,
  Phone,
  Layers,
  Award,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ResourcesLandingPage: React.FC = () => {
  const { blogs, buyingGuides, knowledgeArticles, faqs, manuals } = useResources();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredBlog = blogs.find((b) => b.isFeatured && !b.isDraft) || blogs[0];

  const resourceHubSections = [
    {
      id: 'manuals',
      title: 'Manuals & Downloads',
      description:
        'Official clinical operator manuals, service guidelines, ISO/CE compliance declarations, and sterilization protocols.',
      icon: Download,
      link: '/resources/manuals',
      badge: `${manuals.length} Documents Listed`,
      color: 'bg-emerald-500/10 text-brand-emerald border-brand-emerald/30',
      actionText: 'Browse Manuals Archive',
    },
    {
      id: 'specifications',
      title: 'Specifications',
      description:
        'Browse and compare detailed technical specifications, dimensions, power requirements, and certifications across our catalog.',
      icon: Sliders,
      link: '/resources/specifications',
      badge: 'Interactive Technical Specs',
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
      actionText: 'Search Product Specs',
    },
    {
      id: 'blogs',
      title: 'Blogs & Insights',
      description:
        'Industry perspectives on hospital supplies, clinical procurement strategies, infection control, and medical technology advancements.',
      icon: BookOpen,
      link: '/resources/blogs',
      badge: `${blogs.filter((b) => !b.isDraft).length} Articles Available`,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      actionText: 'Read Latest Articles',
    },
    {
      id: 'buying-guides',
      title: 'Buying Guides',
      description:
        'Strategic step-by-step procurement playbooks, equipment purchasing checklists, and ward inventory blueprints for healthcare administrators.',
      icon: ShoppingBag,
      link: '/resources/buying-guides',
      badge: `${buyingGuides.length} Complete Guides`,
      color: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
      actionText: 'Explore Buying Guides',
    },
    {
      id: 'knowledge',
      title: 'Product Knowledge',
      description:
        'Educational deep-dives into medical terminology, material metallurgy, device comparisons (e.g., Nitrile vs. Latex), and clinical care instructions.',
      icon: Layers,
      link: '/resources/knowledge',
      badge: `${knowledgeArticles.length} Topic Guides`,
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/30',
      actionText: 'Learn Clinical Terminology',
    },
    {
      id: 'faqs',
      title: 'FAQs',
      description:
        'Quick answers to commonly asked questions regarding medical certifications, delivery timelines, bulk quotes, and return policies.',
      icon: HelpCircle,
      link: '/resources/faqs',
      badge: `${faqs.length} Answers Available`,
      color: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      actionText: 'View Frequently Asked Questions',
    },
  ];

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-4">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-forest font-bold">Resources Hub</span>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-forest rounded-3xl p-6 sm:p-10 lg:p-14 text-white shadow-card mb-12 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Dr Surya Medicare Clinical Desk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Healthcare Resources & Knowledge Hub
            </h1>

            <p className="text-sm sm:text-base text-brand-ivory/80 leading-relaxed font-medium max-w-2xl">
              Explore useful healthcare information, product knowledge, buying guides and expert insights to make informed purchasing decisions.
            </p>

            {/* Regulatory Notice Ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-brand-ivory/70 border-t border-brand-emerald/30">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                <span>CDSCO Compliant Sourcing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>Verified Technical Specifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-emerald" />
                <span>Direct WhatsApp Regulatory Desk</span>
              </div>
            </div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-brand-emerald/20 pointer-events-none blur-3xl" />
        </motion.div>

        {/* 6 Core Hub Category Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-brand-forest">
                Explore Knowledge Areas
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                Select a department below to inspect manuals, technical specs, buying guides, or educational literature.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceHubSections.map((section, idx) => {
              const IconComp = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl border border-brand-border p-6 shadow-xs hover:shadow-card transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${section.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-brand-ivory/60 text-brand-forest border border-brand-border/60">
                        {section.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-lg text-brand-forest group-hover:text-brand-emerald transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border/60">
                    <Link
                      to={section.link}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-emerald group-hover:text-brand-emeraldDark transition-colors"
                    >
                      <span>{section.actionText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Featured SEO Blog Spotlight Card */}
        {featuredBlog && (
          <div className="bg-brand-softGreen/50 rounded-3xl border border-brand-emerald/20 p-6 sm:p-8 lg:p-10 mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-brand-border shadow-xs">
                <img
                  src={featuredBlog.featuredImage}
                  alt={featuredBlog.title}
                  className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-forest text-white text-[10px] font-bold uppercase tracking-wider">
                  Featured Insight
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs text-brand-muted">
                  <span className="font-bold text-brand-emerald">{featuredBlog.category}</span>
                  <span>•</span>
                  <span>{featuredBlog.readTime}</span>
                  <span>•</span>
                  <span>Updated {featuredBlog.updatedAt}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-brand-forest leading-snug">
                  {featuredBlog.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/resources/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs sm:text-sm shadow-xs transition-all group"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/resources/blogs"
                    className="text-xs font-bold text-brand-forest hover:text-brand-emerald transition-colors"
                  >
                    View All Articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Direct WhatsApp Clinical Assistance Banner */}
        <div className="bg-brand-forest text-brand-ivory rounded-3xl p-6 sm:p-8 border border-brand-emerald/30 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-brand-ivory" />
              <span>Need Specialized Clinical Documentation?</span>
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-brand-warmWhite">
              Connect with our Regulatory & Product Specialist Desk
            </h3>
            <p className="text-xs text-brand-ivory/70 max-w-xl">
              Can't locate a specific technical specification sheet, ISO certificate, or tender compliance report? Our biomedical team provides instant assistance via WhatsApp.
            </p>
          </div>

          <a
            href={getGeneralEnquiryWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex-shrink-0"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Chat with Regulatory Desk</span>
          </a>
        </div>

      </div>
    </div>
  );
};
