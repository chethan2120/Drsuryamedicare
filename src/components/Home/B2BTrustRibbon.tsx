import React from 'react';
import { ShieldCheck, Truck, BarChart3, Headphones, Award } from 'lucide-react';

export const B2BTrustRibbon: React.FC = () => {
  const trustItems = [
    { title: 'Verified Suppliers', subtitle: '100% Quality Checked', icon: ShieldCheck },
    { title: 'Express Delivery', subtitle: 'In-Stock Clinical Dispatch', icon: Truck },
    { title: 'Best B2B Rates', subtitle: 'Bulk Pricing Transparency', icon: BarChart3 },
    { title: 'Dedicated Support', subtitle: 'Account Managers Assigned', icon: Headphones },
    { title: 'Shop & Earn', subtitle: '5% Reward Every Purchase', icon: Award },
  ];

  return (
    <section data-surface="cream" className="bg-brand-ivory py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-[#F3F5F8] px-3 py-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:px-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 px-2 py-2">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#E07A2F] shadow-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-tight text-brand-navy">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-snug text-brand-muted">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
