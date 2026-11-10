import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, ShoppingBag, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LiveOrder {
  id: string;
  facility: string;
  location: string;
  productName: string;
  quantity: string;
  timeAgo: string;
  category: string;
  productId: string;
}

const liveOrders: LiveOrder[] = [
  {
    id: 'lo-1',
    facility: 'Apollo Cradle Hospital',
    location: 'Bengaluru, KA',
    productName: 'SuryaSafe Nitrile Examination Gloves',
    quantity: '25 Boxes',
    timeAgo: '3m ago',
    category: 'Consumables',
    productId: 'dsm-gloves-01',
  },
  {
    id: 'lo-2',
    facility: 'Fortis Multi-Specialty Hospital',
    location: 'Mumbai, MH',
    productName: 'BioOptix Clinical Binocular Compound Microscope',
    quantity: '2 Units',
    timeAgo: '8m ago',
    category: 'Diagnostics',
    productId: 'dsm-micro-01',
  },
  {
    id: 'lo-3',
    facility: 'MedPlus City Pharmacy',
    location: 'Hyderabad, TS',
    productName: 'SuryaDolo 650mg Rapid Relief Paracetamol',
    quantity: '60 Strips',
    timeAgo: '14m ago',
    category: 'Pharma',
    productId: 'dsm-tab-01',
  },
  {
    id: 'lo-4',
    facility: 'Sunshine Super-Specialty Clinic',
    location: 'Chennai, TN',
    productName: 'OxiPulse Clinical OLED Fingertip Pulse Oximeter',
    quantity: '5 Units',
    timeAgo: '21m ago',
    category: 'Monitoring',
    productId: 'dsm-oxi-01',
  },
  {
    id: 'lo-5',
    facility: 'Manipal Health Institute',
    location: 'New Delhi, DL',
    productName: 'SuryaShield 3-Ply Ultrasonic Surgical Masks',
    quantity: '100 Packs',
    timeAgo: '29m ago',
    category: 'PPE Supplies',
    productId: 'dsm-mask-01',
  },
];

export const LiveOrderTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % liveOrders.length);
        setIsVisible(true);
      }, 400);
    }, 7500);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentOrder = liveOrders[currentIndex];

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[340px] sm:max-w-[380px] pointer-events-auto">
      <div
        className={`bg-white/95 backdrop-blur-md rounded-2xl border border-brand-emerald/25 shadow-2xl p-3 sm:p-3.5 flex items-start gap-3 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      >
        {/* Pulsing Verified Order Badge */}
        <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center">
          <Building2 className="w-5 h-5 text-brand-emerald" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
          </span>
        </div>

        {/* Order Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between text-[10px] text-brand-muted">
            <span className="font-bold text-brand-emerald flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-brand-emerald" />
              Verified Order
            </span>
            <span className="font-mono text-brand-muted">{currentOrder.timeAgo}</span>
          </div>

          <div className="text-xs font-bold text-brand-forest truncate mt-0.5">
            {currentOrder.facility}
            <span className="text-[10px] font-normal text-brand-muted ml-1">
              ({currentOrder.location})
            </span>
          </div>

          <p className="text-[11px] text-brand-body truncate mt-0.5">
            Purchased <span className="font-bold text-brand-forest">{currentOrder.quantity}</span> of{' '}
            <span className="font-semibold text-brand-emerald">{currentOrder.productName}</span>
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-brand-muted hover:text-brand-forest p-1 rounded-lg hover:bg-brand-warmWhite transition-colors flex-shrink-0"
          title="Dismiss notification"
          aria-label="Dismiss live order notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
