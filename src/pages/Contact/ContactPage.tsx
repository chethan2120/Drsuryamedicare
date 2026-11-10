import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/storeConfig';
import {
  getContactFormWhatsAppUrl,
  getGeneralEnquiryWhatsAppUrl,
  getBulkOrderWhatsAppUrl,
} from '../../utils/whatsapp';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    subject: 'General Healthcare Procurement',
    message: '',
  });

  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit contact mobile number.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please enter your inquiry details or required medical supplies.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please confirm your consent to be contacted on WhatsApp regarding this inquiry.');
      return;
    }

    // Generate prefilled WhatsApp URL and open directly in a new tab
    const url = getContactFormWhatsAppUrl(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-brand-muted mb-4">
          <Link to="/" className="hover:text-brand-emerald transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-forest font-bold">Contact Us</span>
        </div>

        {/* Hero Section */}
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 text-white shadow-card mb-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald text-brand-ivory text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Healthcare Support</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Connect with Dr Surya Medicare
            </h1>
            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed font-medium">
              We provide prompt, direct procurement support for hospitals, nursing homes, diagnostic laboratories, and independent clinics across India.
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <a
            href={getGeneralEnquiryWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-card transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                Instant Chat
              </span>
              <h4 className="font-heading font-bold text-sm text-brand-forest group-hover:text-brand-emerald transition-colors">
                General Enquiry on WhatsApp
              </h4>
              <p className="text-xs text-brand-muted">Direct connection with our customer service desk.</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4 fill-white" />
            </div>
          </a>

          <a
            href={getBulkOrderWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-card transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                Tender & Hospital Rates
              </span>
              <h4 className="font-heading font-bold text-sm text-brand-forest group-hover:text-brand-emerald transition-colors">
                Bulk Orders & RFQ Desk
              </h4>
              <p className="text-xs text-brand-muted">Specialized institutional volume discounts.</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-emerald text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </a>

          <Link
            to="/resources"
            className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-card transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                Self-Service
              </span>
              <h4 className="font-heading font-bold text-sm text-brand-forest group-hover:text-brand-emerald transition-colors">
                Knowledge & Resource Hub
              </h4>
              <p className="text-xs text-brand-muted">Manuals, specs, buying guides, and FAQs.</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-forest text-brand-ivory flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Main Grid: Contact Form & Verified Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Form: Direct WhatsApp Submission */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-card">
            <div className="space-y-1 mb-6">
              <h3 className="font-heading font-extrabold text-xl text-brand-forest">
                Send Us a Procurement Message
              </h3>
              <p className="text-xs text-brand-muted">
                Fill out the details below. Clicking submit will automatically open our verified WhatsApp business desk with your structured inquiry.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-forest mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-forest mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-forest mb-1">
                    Institution / Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. Apollo Clinic or Self"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-forest mb-1">
                    Official Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. purchase@hospital.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-forest mb-1">
                  Inquiry Nature / Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald bg-white"
                >
                  <option value="General Healthcare Procurement">General Healthcare Procurement</option>
                  <option value="Hospital Consumables Bulk Quote">Hospital Consumables Bulk Quote</option>
                  <option value="Medical Diagnostic Equipment Inquiry">Medical Diagnostic Equipment Inquiry</option>
                  <option value="Surgical Instruments Procurement">Surgical Instruments Procurement</option>
                  <option value="Order Tracking & Logistics Assistance">Order Tracking & Logistics Assistance</option>
                  <option value="Regulatory / Certificate Request">Regulatory / Certificate Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-forest mb-1">
                  Inquiry Details / Supply Requirements *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your requested products, required quantities, delivery location, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-brand-muted cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-brand-border text-brand-emerald focus:ring-brand-emerald"
                />
                <span>
                  I consent to Dr Surya Medicare contacting me on WhatsApp regarding this inquiry. Your information is securely handled and never shared with unconfigured third parties.
                </span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white font-bold text-sm shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Open WhatsApp Chat</span>
              </button>
            </form>
          </div>

          {/* Right Column: Verified Corporate & Facility Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="font-heading font-extrabold text-lg text-brand-forest border-b border-brand-border/60 pb-3">
                Corporate & Logistics Contact
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-brand-body">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-forest block font-heading">
                      Distribution Hub & Office
                    </strong>
                    <span className="text-brand-muted text-xs leading-relaxed block mt-0.5">
                      {storeConfig.address.line1}, {storeConfig.address.line2}, {storeConfig.address.city}, {storeConfig.address.state} - {storeConfig.address.pincode}, {storeConfig.address.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-forest block font-heading">
                      Central Phone Desk
                    </strong>
                    <a
                      href={`tel:${storeConfig.supportPhone}`}
                      className="text-brand-emerald font-semibold hover:underline block text-xs mt-0.5"
                    >
                      {storeConfig.supportPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-forest block font-heading">
                      Official Support Email
                    </strong>
                    <a
                      href={`mailto:${storeConfig.supportEmail}`}
                      className="text-brand-emerald font-semibold hover:underline block text-xs mt-0.5"
                    >
                      {storeConfig.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-brand-forest block font-heading">
                      Operating Hours
                    </strong>
                    <span className="text-brand-muted text-xs block mt-0.5">
                      Monday to Saturday: 9:00 AM – 8:00 PM IST
                    </span>
                    <span className="text-[10px] text-brand-muted block">
                      Sunday: Emergency hospital dispatches only
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Legal Credentials */}
              <div className="pt-4 border-t border-brand-border/60 text-xs text-brand-muted space-y-1">
                <div>
                  GSTIN: <span className="font-mono font-bold text-brand-forest">{storeConfig.gstin}</span>
                </div>
                <div>
                  Drug License (Wholesale): <span className="font-mono font-bold text-brand-forest">{storeConfig.drugLicenseDemo}</span>
                </div>
              </div>
            </div>

            {/* Hospital Supply Guarantee Card */}
            <div className="bg-brand-forest text-brand-ivory rounded-3xl p-6 border border-brand-emerald/30 shadow-card space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-brand-warmWhite text-sm">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>Our Procurement Commitment</span>
              </div>
              <p className="text-brand-ivory/80 leading-relaxed">
                All consignments dispatched from Dr Surya Medicare carry GST-compliant tax invoices, batch test certificates, and temperature-verified protective packing.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
