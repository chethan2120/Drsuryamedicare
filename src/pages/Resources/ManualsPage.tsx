import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources } from '../../context/ResourcesContext';
import { DocumentCategory, ManualDocument } from '../../types/resources';
import { getManualEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Phone,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES: ('All' | DocumentCategory)[] = [
  'All',
  'User Manual',
  'Technical Service Guide',
  'ISO/CE Declaration',
  'Sterilization Protocol',
  'Product Data Sheet',
];

export const ManualsPage: React.FC = () => {
  const { manuals } = useResources();
  const [selectedCategory, setSelectedCategory] = useState<'All' | DocumentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredManuals = manuals.filter((doc) => {
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.productRef.toLowerCase().includes(q) ||
        (doc.modelSku && doc.modelSku.toLowerCase().includes(q)) ||
        doc.description.toLowerCase().includes(q)
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
          <span className="text-brand-forest font-bold">Manuals & Downloads</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>Official Technical Documentation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Product Manuals & Clinical Downloads
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              Access official manufacturer operator manuals, biomedical calibration guidelines, sterilization protocols, and CDSCO/ISO declarations for clinical equipment and hospital consumables.
            </p>
          </div>
        </div>

        {/* Helpful Explanation Notice Banner (No fake downloads) */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-10 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm text-brand-body flex-1">
            <h4 className="font-heading font-bold text-brand-forest text-sm sm:text-base">
              Digital Document Repository Notice
            </h4>
            <p className="leading-relaxed text-brand-muted">
              We uphold clinical transparency and regulatory authenticity. Manufacturer user manuals, technical service schematics, and batch test declarations are actively being uploaded to our verified digital archive.
            </p>
            <p className="leading-relaxed font-semibold text-brand-forest">
              To prevent broken links or generic placeholders, direct download buttons are displayed exclusively when verified genuine files are attached. If you require documentation for biomedical approval or hospital tender verification, our regulatory desk will transmit the certified file to your WhatsApp within minutes.
            </p>
          </div>
        </div>

        {/* Informational Cards on Document Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-xs">
            <FileText className="w-5 h-5 text-brand-emerald mb-2" />
            <h5 className="font-heading font-bold text-xs text-brand-forest">User Manuals</h5>
            <p className="text-[11px] text-brand-muted mt-1 leading-snug">
              Operating procedures, control keys, and nursing guidelines.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-xs">
            <Settings className="w-5 h-5 text-blue-600 mb-2" />
            <h5 className="font-heading font-bold text-xs text-brand-forest">Service Guides</h5>
            <p className="text-[11px] text-brand-muted mt-1 leading-snug">
              Biomedical calibration, wiring diagrams, and component testing.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-teal-600 mb-2" />
            <h5 className="font-heading font-bold text-xs text-brand-forest">ISO/CE Declarations</h5>
            <p className="text-[11px] text-brand-muted mt-1 leading-snug">
              Quality compliance, CDSCO licensing, and factory audits.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-xs">
            <Layers className="w-5 h-5 text-purple-600 mb-2" />
            <h5 className="font-heading font-bold text-xs text-brand-forest">Sterilization Protocols</h5>
            <p className="text-[11px] text-brand-muted mt-1 leading-snug">
              Autoclave cycles, enzymatic pre-soak, and chemical barrier care.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-4 shadow-xs">
            <Award className="w-5 h-5 text-amber-600 mb-2" />
            <h5 className="font-heading font-bold text-xs text-brand-forest">Product Data Sheets</h5>
            <p className="text-[11px] text-brand-muted mt-1 leading-snug">
              Physical dimensions, electrical specs, and packaging counts.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product, model number, or document title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
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

        {/* Document Listing */}
        <div className="space-y-4 mb-12">
          {filteredManuals.length === 0 ? (
            <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-brand-muted mx-auto" />
              <h4 className="font-heading font-bold text-base text-brand-forest">
                No matching documentation found
              </h4>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                Try adjusting your search query or contact our regulatory desk via WhatsApp for instant documentation assistance.
              </p>
            </div>
          ) : (
            filteredManuals.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-brand-border p-5 sm:p-6 shadow-xs hover:shadow-card transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-softGreen text-brand-emerald text-[10px] font-bold uppercase tracking-wider">
                      {doc.category}
                    </span>
                    {doc.modelSku && (
                      <span className="font-mono text-[10px] bg-brand-ivory px-2 py-0.5 rounded text-brand-forest">
                        {doc.modelSku}
                      </span>
                    )}
                    <span className="text-[11px] text-brand-muted">
                      Language: {doc.language} • Format: {doc.fileFormat} • Size: {doc.fileSize}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-brand-forest">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed max-w-3xl">
                    {doc.description}
                  </p>
                </div>

                {/* Action button: Genuine download only when file available; otherwise WhatsApp enquiry */}
                <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-brand-border/60 flex-shrink-0">
                  {doc.isAvailable && doc.fileUrl ? (
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {doc.fileFormat}</span>
                    </a>
                  ) : (
                    <a
                      href={getManualEnquiryWhatsAppUrl(doc.title, doc.modelSku)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-emerald text-brand-ivory hover:text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                      <span>Request on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Administrator Notice Card */}
        <div className="bg-brand-ivory/50 rounded-2xl border border-brand-border/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-brand-emerald flex-shrink-0" />
            <div>
              <span className="font-bold text-brand-forest block">Administrator Document Management</span>
              <span className="text-brand-muted">
                Authorized staff can upload genuine manufacturer PDFs and update document availability via the Admin Panel.
              </span>
            </div>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 font-bold text-brand-emerald hover:underline flex-shrink-0"
          >
            <span>Open Admin Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
