import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Stethoscope, FlaskConical, UserCheck, Home, ArrowRight } from 'lucide-react';

export const ShopByRequirementSection: React.FC = () => {
  const requirements = [
    {
      id: 'Hospitals',
      name: 'For Hospitals',
      tagline: 'ICU Beds, Monitors & OT Instruments',
      description: 'High-reliability ward infrastructure, multipara monitors, anesthesia consumables and surgical trays.',
      icon: Building2,
      count: '18+ Items',
      bgImg: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Clinics',
      name: 'For Clinics & Nursing Homes',
      tagline: 'OPD Essentials, Diagnostic Scopes & Dressing Kits',
      description: 'Daily clinical tools including digital BP units, stethoscopes, minor surgical sets and cotton gauze.',
      icon: Stethoscope,
      count: '24+ Items',
      bgImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Laboratories',
      name: 'For Laboratories',
      tagline: 'Centrifuges, Microscopes & Blood Collection',
      description: 'Clinical centrifuges, compound biological microscopes, sterile vacutainer tubes and micro-pipettes.',
      icon: FlaskConical,
      count: '12+ Items',
      bgImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Healthcare Professionals',
      name: 'For Healthcare Professionals',
      tagline: 'Doctor Coats, Cardiology Scopes & Reflex Kits',
      description: 'Personal clinical instruments, cardiology stethoscopes, ergonomic doctor aprons and trauma diagnostic penlights.',
      icon: UserCheck,
      count: '15+ Items',
      bgImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Home Healthcare',
      name: 'For Home Healthcare',
      tagline: 'Wheelchairs, Oximeters & Bedsore Air Mattresses',
      description: 'Patient recovery devices, folding mobility wheelchairs, oxygen generators and home vitals monitors.',
      icon: Home,
      count: '14+ Items',
      bgImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-warmWhite border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald tracking-wider uppercase mb-1">
            <span>Tailored Healthcare Procurement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-forest">
            Shop by Clinical Requirement
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Explore curated packages configured specifically for your facility type and daily clinical workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {requirements.map((req) => {
            const Icon = req.icon;
            return (
              <Link
                key={req.id}
                to={`/shop?requirement=${encodeURIComponent(req.id)}`}
                className="group relative flex flex-col bg-white rounded-2xl border border-brand-border/80 hover:border-brand-emerald hover:shadow-card-hover transition-all duration-300 p-5 overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-softGreen text-brand-emerald flex items-center justify-center mb-4 group-hover:bg-brand-emerald group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider mb-0.5">
                  {req.count}
                </div>
                <h3 className="font-heading font-bold text-base text-brand-forest group-hover:text-brand-emerald transition-colors">
                  {req.name}
                </h3>
                <span className="text-xs font-semibold text-brand-forest/90 block mt-1">
                  {req.tagline}
                </span>

                <p className="text-xs text-brand-muted leading-relaxed mt-2 flex-1">
                  {req.description}
                </p>

                <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-emerald">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
