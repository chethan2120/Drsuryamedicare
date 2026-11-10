import React from 'react';
import { ShieldCheck, Truck, BarChart3, Headphones, Award } from 'lucide-react';

export const B2BTrustRibbon: React.FC = () => {
  const trustItems = [
    {
      title: 'Verified Suppliers',
      subtitle: '100% Quality Checked',
      icon: ShieldCheck,
    },
    {
      title: 'Express Delivery',
      subtitle: 'In-Stock Clinical Dispatch',
      icon: Truck,
    },
    {
      title: 'Best B2B Rates',
      subtitle: 'Bulk Pricing Transparency',
      icon: BarChart3,
    },
    {
      title: 'Dedicated Support',
      subtitle: 'Account Managers Assigned',
      icon: Headphones,
    },
    {
      title: 'Shop & Earn',
      subtitle: '5% Reward Every Purchase',
      icon: Award,
    },
  ];

  return (
    <div className="bg-white border-y border-brand-border py-4 sm:py-5 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-brand-warmWhite border border-brand-border/60 hover:border-brand-emerald/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-softGreen text-brand-emerald flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-heading font-bold text-brand-forest truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-brand-muted truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};