import React from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/storeConfig';
import { categories } from '../../data/categories';
import {
  Activity,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-forest text-brand-ivory pt-16 pb-8 border-t border-brand-emerald/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-brand-emerald/30">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/40 text-brand-ivory flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-brand-warmWhite">Verified Medical Grade</h4>
              <p className="text-xs text-brand-ivory/70 mt-0.5">Strict quality control on all clinical consumables and instruments.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/40 text-brand-ivory flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-brand-warmWhite">Direct WhatsApp Ordering</h4>
              <p className="text-xs text-brand-ivory/70 mt-0.5">Seamless cart transmission to verified WhatsApp business desk.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/40 text-brand-ivory flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-brand-warmWhite">Pan-India Express Dispatch</h4>
              <p className="text-xs text-brand-ivory/70 mt-0.5">Reliable insured freight to clinics, hospitals and residences.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/40 text-brand-ivory flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-brand-warmWhite">Institutional Quotations</h4>
              <p className="text-xs text-brand-ivory/70 mt-0.5">Volume discounts, GST invoices and hospital procurement support.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald flex items-center justify-center text-brand-warmWhite">
                <Activity className="w-6 h-6 text-brand-ivory" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-brand-warmWhite">
                  DR SURYA <span className="text-brand-ivory">MEDICARE</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-brand-ivory/60 block -mt-1 font-semibold">
                  Healthcare Wholesale Marketplace
                </span>
              </div>
            </Link>

            <p className="text-xs text-brand-ivory/80 leading-relaxed max-w-sm">
              Dr Surya Medicare is dedicated to modernising medical procurement across India. From individual clinics and nursing homes to tertiary hospitals, we deliver genuine medical equipment, surgical supplies, and everyday clinical consumables.
            </p>

            <div className="space-y-1 text-xs text-brand-ivory/80 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-ivory" />
                <span>Operating Hours: Mon – Sat, 9:00 AM – 8:00 PM IST</span>
              </div>
              <div className="text-[11px] text-brand-ivory/60">
                GSTIN: <span className="font-mono text-brand-ivory">{storeConfig.gstin}</span> (Demo Registered Entity)
              </div>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-brand-warmWhite tracking-wide">
              Medical Categories
            </h4>
            <ul className="space-y-2 text-xs text-brand-ivory/80">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-emerald group-hover:translate-x-0.5 transition-transform" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-brand-ivory font-bold hover:underline inline-block pt-1">
                  View All 12 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Knowledge Hub */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-brand-warmWhite tracking-wide">
              Resources & Guides
            </h4>
            <ul className="space-y-2 text-xs text-brand-ivory/80">
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resources Landing Hub
                </Link>
              </li>
              <li>
                <Link to="/resources/specifications" className="hover:text-white transition-colors">
                  Technical Specifications
                </Link>
              </li>
              <li>
                <Link to="/resources/blogs" className="hover:text-white transition-colors">
                  Blogs & Clinical Insights
                </Link>
              </li>
              <li>
                <Link to="/resources/buying-guides" className="hover:text-white transition-colors">
                  Hospital Buying Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/knowledge" className="hover:text-white transition-colors">
                  Product Knowledge Hub
                </Link>
              </li>
              <li>
                <Link to="/resources/manuals" className="hover:text-white transition-colors">
                  Manuals & Downloads
                </Link>
              </li>
              <li>
                <Link to="/resources/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-ivory font-bold hover:underline inline-block pt-1">
                  Contact Us →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-brand-warmWhite tracking-wide">
              Customer Support
            </h4>
            <div className="space-y-2.5 text-xs text-brand-ivory/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-ivory flex-shrink-0 mt-0.5" />
                <span>
                  {storeConfig.address.line1}, {storeConfig.address.city}, {storeConfig.address.state} - {storeConfig.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-ivory flex-shrink-0" />
                <a href={`tel:${storeConfig.supportPhone}`} className="hover:text-white">
                  {storeConfig.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-ivory flex-shrink-0" />
                <a href={`mailto:${storeConfig.supportEmail}`} className="hover:text-white">
                  {storeConfig.supportEmail}
                </a>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-brand-warmWhite font-bold text-xs shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Business Desk</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 border-t border-brand-emerald/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-ivory/70">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Dr Surya Medicare. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Designed and Maintained by{' '}
              <a
                href="https://webnxt.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-ivory font-bold underline decoration-brand-emerald decoration-2 transition-colors"
              >
                WebNxt
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-brand-ivory/60">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Wholesale Terms</span>
            <span>•</span>
            <span>Return Guidelines</span>
            <span>•</span>
            <span>Drug License: {storeConfig.drugLicenseDemo} (Demo)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
