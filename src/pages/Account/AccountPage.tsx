import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { formatINR } from '../../utils/formatters';
import {
  User,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  FileSpreadsheet,
  Building2,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'enquiries' | 'addresses'>('profile');
  const { wishlistCount } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();

  // Demo user data
  const user = {
    name: 'Dr. Vikram Chandra',
    qualification: 'MD (General Medicine)',
    institution: 'Chandra Multispeciality Clinic',
    email: 'dr.chandra@chandraclinic.in',
    phone: '+91 98450 12345',
    gstin: '29AABCC1234D1Z8',
  };

  const demoEnquiries = [
    {
      id: 'RFQ-DSM-8821',
      date: '06 Nov 2026',
      itemsCount: 4,
      totalEstimate: 42500,
      status: 'Quotation Dispatched via WhatsApp',
      items: ['Digital BP Monitor (5 pcs)', 'OLED Pulse Oximeter (10 pcs)', 'Surgical Blades #11 (5 boxes)'],
    },
    {
      id: 'RFQ-DSM-8610',
      date: '28 Oct 2026',
      itemsCount: 2,
      totalEstimate: 18500,
      status: 'Delivered & Invoice Closed',
      items: ['Semi-Fowler Hospital Bed (1 unit)', 'Stainless Steel IV Stand (2 units)'],
    },
  ];

  return (
    <div className="bg-brand-warmWhite min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Demo Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client Dashboard (Demo Mode)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
              Healthcare Institution Portal
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Manage saved procurement profiles, RFQ quotations, and clinic delivery addresses.
            </p>
          </div>
        </div>

        {/* 2-Column: Sidebar Tabs & Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="md:col-span-4 bg-white rounded-3xl border border-brand-border/80 p-5 shadow-card space-y-4">
            <div className="flex items-center gap-3.5 pb-4 border-b border-brand-border">
              <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-emerald flex items-center justify-center font-bold text-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-brand-forest">{user.name}</h3>
                <span className="text-xs text-brand-muted block">{user.institution}</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-brand-emerald text-white shadow-xs'
                    : 'text-brand-forest hover:bg-brand-ivory/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Facility Profile</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enquiries')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'enquiries'
                    ? 'bg-brand-emerald text-white shadow-xs'
                    : 'text-brand-forest hover:bg-brand-ivory/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Enquiry History</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono">
                  {demoEnquiries.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-brand-emerald text-white shadow-xs'
                    : 'text-brand-forest hover:bg-brand-ivory/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Addresses</span>
                </span>
              </button>

              <Link
                to="/wishlist"
                className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold flex items-center justify-between text-brand-forest hover:bg-brand-ivory/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-vermilion" />
                  <span>Saved Wishlist</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-brand-ivory text-brand-forest font-mono">
                  {wishlistCount}
                </span>
              </Link>
            </nav>

            <div className="pt-3 border-t border-brand-border text-[11px] text-brand-muted">
              Note: Backend authentication is simulated for client demonstration.
            </div>
          </div>

          {/* Main Pane */}
          <div className="md:col-span-8 bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-8 shadow-card space-y-6">
            
            {/* 1. Facility Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-brand-forest border-b border-brand-border pb-3">
                  Registered Institutional Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border">
                    <span className="text-brand-muted block uppercase text-[10px] font-bold">Contact Name</span>
                    <span className="font-bold text-sm text-brand-forest mt-0.5 block">{user.name}</span>
                    <span className="text-brand-muted">{user.qualification}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border">
                    <span className="text-brand-muted block uppercase text-[10px] font-bold">Health Facility</span>
                    <span className="font-bold text-sm text-brand-forest mt-0.5 block">{user.institution}</span>
                    <span className="text-brand-emerald font-semibold">Tier-1 Verified Partner</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border">
                    <span className="text-brand-muted block uppercase text-[10px] font-bold">Official Email</span>
                    <span className="font-semibold text-brand-forest mt-0.5 block">{user.email}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border">
                    <span className="text-brand-muted block uppercase text-[10px] font-bold">Mobile Number</span>
                    <span className="font-mono font-semibold text-brand-forest mt-0.5 block">{user.phone}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-ivory/40 border border-brand-border sm:col-span-2">
                    <span className="text-brand-muted block uppercase text-[10px] font-bold">GSTIN Registration</span>
                    <span className="font-mono font-bold text-sm text-brand-forest mt-0.5 block">{user.gstin}</span>
                    <span className="text-brand-muted text-[11px]">Enables input tax credit (ITC) on all wholesale medical procurement.</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Enquiry History */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-brand-forest border-b border-brand-border pb-3">
                  WhatsApp Quotation Enquiries
                </h3>

                <div className="space-y-4">
                  {demoEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-2xl bg-brand-ivory/40 border border-brand-border text-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-brand-forest text-sm">{enq.id}</span>
                          <span className="text-brand-muted text-[11px] block mt-0.5">Date: {enq.date}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-softGreen text-brand-emerald">
                          {enq.status}
                        </span>
                      </div>

                      <div className="border-t border-brand-border/60 pt-2 space-y-1">
                        <span className="font-bold text-brand-forest block">Items:</span>
                        <ul className="list-disc list-inside text-brand-body text-[11px] space-y-0.5">
                          {enq.items.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-brand-border/60 pt-2 flex justify-between font-bold">
                        <span className="text-brand-muted">Quoted Estimate:</span>
                        <span className="text-brand-forest text-sm font-heading">{formatINR(enq.totalEstimate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Delivery Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-brand-forest border-b border-brand-border pb-3">
                  Saved Clinic Delivery Addresses
                </h3>

                <div className="p-4 rounded-2xl bg-brand-ivory/40 border border-brand-border text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-forest">Primary OT & Inpatient Receiving</span>
                    <span className="text-[10px] font-bold text-brand-emerald bg-brand-softGreen px-2 py-0.5 rounded">DEFAULT</span>
                  </div>
                  <p className="text-brand-body/90 leading-relaxed">
                    Chandra Multispeciality Clinic, 3rd Floor Diagnostic Wing, 14th Main Road, Indiranagar, Bengaluru, Karnataka - 560038
                  </p>
                  <span className="text-brand-muted block">Contact: +91 98450 12345</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
