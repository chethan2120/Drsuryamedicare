import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { BlogCategory, BlogPost } from '../../types/resources';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES: ('All' | BlogCategory)[] = [
  'All',
  'Hospital Procurement',
  'Medical Consumables',
  'Surgical Supplies',
  'Hospital Supplies',
  'Medical Equipment',
  'Healthcare Industry',
  'Product Guides',
];

export const BlogsListPage: React.FC = () => {
  const { blogs } = useResources();
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Exclude drafts from public listing
  const publicBlogs = blogs.filter((b) => !b.isDraft);

  const filteredBlogs = publicBlogs.filter((blog) => {
    if (selectedCategory !== 'All' && blog.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const featuredBlog = filteredBlogs.find((b) => b.isFeatured) || filteredBlogs[0];
  const regularBlogs = filteredBlogs.filter((b) => b.id !== featuredBlog?.id);

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
          <span className="text-brand-forest font-bold">Blogs & Insights</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Clinical Knowledge & Industry Perspectives</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Healthcare Blogs & Procurement Insights
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Authoritative industry perspectives on medical equipment procurement, infection control standards, surgical metallurgy, and cold-chain logistics in India.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 mb-8 shadow-xs space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or keyword..."
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

        {/* Featured Article Card */}
        {featuredBlog && (
          <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-card mb-12 hover:shadow-card-hover transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative overflow-hidden min-h-[260px] lg:min-h-[380px]">
                <img
                  src={featuredBlog.featuredImage}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-forest text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                  Featured Insight
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald font-bold uppercase">
                      {featuredBlog.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredBlog.publishedAt}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-brand-forest leading-snug">
                    <Link
                      to={`/resources/blogs/${featuredBlog.slug}`}
                      className="hover:text-brand-emerald transition-colors"
                    >
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredBlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-brand-muted bg-brand-ivory/60 px-2 py-0.5 rounded border border-brand-border/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <div className="w-7 h-7 rounded-full bg-brand-forest text-brand-warmWhite flex items-center justify-center font-bold text-[10px]">
                      DSM
                    </div>
                    <div>
                      <span className="font-bold text-brand-forest block leading-tight">
                        {featuredBlog.author}
                      </span>
                      <span className="text-[10px]">{featuredBlog.authorRole || 'Author'}</span>
                    </div>
                  </div>

                  <Link
                    to={`/resources/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-brand-emeraldDark transition-colors group"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regularBlogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative overflow-hidden h-48">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-brand-forest text-white text-[10px] font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.publishedAt}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-brand-forest leading-snug group-hover:text-brand-emerald transition-colors line-clamp-2">
                    <Link to={`/resources/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted font-medium">
                    {blog.author}
                  </span>
                  <Link
                    to={`/resources/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-emerald hover:underline"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
};
