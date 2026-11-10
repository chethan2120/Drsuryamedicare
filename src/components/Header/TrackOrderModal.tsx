import React, { useState } from 'react';
import {
  Truck,
  X,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { storeConfig } from '../../config/storeConfig';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-forest/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-warmWhite w-full max-w-xl rounded-3xl border border-brand-border shadow-modal overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-brand-forest text-brand-ivory p-4 sm:p-5 flex items-center justify-between border-b border-brand-emerald/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-emerald text-white flex items-center justify-center">
              <Truck className="w-5 h-5 text-brand-ivory" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-brand-warmWhite">
                Track Clinical Consignment
              </h3>
              <p className="text-[11px] text-brand-ivory/70">
                Pan-India Real-Time Medical Dispatch Tracking
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-brand-ivory flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Tracking Form */}
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <label className="block text-xs font-bold text-brand-forest uppercase tracking-wider">
              Enter Order ID, AWB or Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. DSM-98241 or 9876543210"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-white text-xs sm:text-sm text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-brand-warmWhite font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                Track Status
              </button>
            </div>
            <p className="text-[11px] text-brand-muted">
              Sample Order ID for quick preview: <span className="font-mono font-bold text-brand-emerald cursor-pointer hover:underline" onClick={() => { setOrderQuery('DSM-98241'); setHasSearched(true); }}>DSM-98241</span>
            </p>
          </form>

          {/* Tracking Result Display */}
          {hasSearched ? (
            <div className="bg-white rounded-2xl border border-brand-border p-5 space-y-5 animate-fade-in shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase">Consignment</span>
                  <h4 className="font-mono font-bold text-sm text-brand-forest">
                    {orderQuery.toUpperCase() || 'DSM-98241'}
                  </h4>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold border border-brand-emerald/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Out for Clinical Delivery</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-emerald/30">
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-brand-emerald text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-forest">Order Verified & Packaged</h5>
                    <p className="text-[11px] text-brand-muted">Central Medical Warehouse, Hub 4 — Batch QC Certified</p>
                    <span className="text-[10px] font-mono text-brand-muted">Today, 06:30 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-brand-emerald text-white flex items-center justify-center flex-shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-forest">Dispatched via BlueDart Medical ColdChain</h5>
                    <p className="text-[11px] text-brand-muted">Air Waybill: BD-MED-774910 • Monitored Temp: 4.2°C</p>
                    <span className="text-[10px] font-mono text-brand-muted">Today, 09:15 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-brand-forest">Out for Hospital Transit</h5>
                    <p className="text-[11px] text-brand-muted">Delivery Executive Assigned • Expected within 3-5 Hours</p>
                    <span className="text-[10px] font-mono text-brand-emerald font-semibold">In Transit</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Dr Surya Medicare, please provide live courier GPS updates for order ${orderQuery || 'DSM-98241'}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-forest text-brand-ivory hover:text-white text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>WhatsApp Logistics Desk</span>
                </a>

                <div className="text-[11px] text-brand-muted flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>Tamper-evident clinical seal intact</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-brand-softGreen/40 border border-brand-border/60 text-center space-y-2">
              <Package className="w-8 h-8 text-brand-emerald mx-auto" />
              <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-forest">
                Pan-India Hospital & Clinic Dispatch
              </h4>
              <p className="text-[11px] text-brand-muted max-w-sm mx-auto">
                All consignments feature temperature-controlled packaging, batch test documentation, and GST e-way bill clearance.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
