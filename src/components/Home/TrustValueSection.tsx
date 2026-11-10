import React from 'react';
import { Layers, ShoppingBag, FileSpreadsheet, Headphones, FileCheck2, Shield } from 'lucide-react';

export const TrustValueSection: React.FC = () => {
  const values = [
    {
      icon: Layers,
      title: 'Multiple Product Categories',
      description: 'Find clinical diagnostics, surgical steel, consumables, furniture, and emergency gear under one roof.',
    },
    {
      icon: ShoppingBag,
      title: 'Convenient Online Shopping',
      description: 'Easily browse, compare specifications, curate institutional wishlists, and order directly on WhatsApp.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Bulk Purchase Enquiries',
      description: 'Special quotation desks for nursing homes, clinics, diagnostic labs, and healthcare tenders.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Assistance',
      description: 'Healthcare specialists ready to assist with model selection, technical datasheets, and delivery coordination.',
    },
    {
      icon: FileCheck2,
      title: 'Clear Product Information',
      description: 'Detailed technical specifications, packaging details, and honest unit pricing without confusing markups.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-ivory/50 border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Why Choose Dr Surya Medicare</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
            Healthcare Shopping Made Simpler
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            A reliable supply chain infrastructure built specifically around the everyday requirements of medical practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-brand-border/80 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-brand-forest mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
