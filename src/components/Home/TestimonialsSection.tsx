import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  institution: string;
  city: string;
  rating: number;
  quote: string;
  verifiedProcurement: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Arvind Ramaswamy',
    designation: 'Chief Medical Officer (CMO)',
    institution: 'Narayana Care Network',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    quote:
      'Dr Surya Medicare has significantly streamlined our hospital network procurement. From bulk ICU consumables to specialized emergency resuscitators, their guaranteed batch test certificates and rapid dispatch ensure zero ward downtime.',
    verifiedProcurement: 'Verified Institutional Buyer • 450+ Units Dispatched',
    initials: 'AR',
  },
  {
    id: 'test-2',
    name: 'Dr. Priya Swaminathan',
    designation: 'Head of Surgery & Minor OT Incharge',
    institution: 'Apollo Specialty Healthcare',
    city: 'Chennai, Tamil Nadu',
    rating: 5,
    quote:
      'The surgical stainless steel instruments and minor OT sets exceeded our expectations. Every instrument arrived properly passivated, sterile, and rust-resistant. The tactile precision of the needle holders and scalpel handles is exceptional.',
    verifiedProcurement: 'Verified OT Partner • Surgical Instruments',
    initials: 'PS',
  },
  {
    id: 'test-3',
    name: 'Suresh K. Mehra',
    designation: 'Head of Clinical Procurement',
    institution: 'Fortis Diagnostic & Pathology Labs',
    city: 'New Delhi, NCR',
    rating: 5,
    quote:
      'Coordinating supply chains for 14 diagnostic branches was tedious until we partnered with Dr Surya Medicare. Transparent wholesale tier pricing, instant GST-compliant invoicing, and dedicated WhatsApp support make procurement seamless.',
    verifiedProcurement: 'Verified Diagnostic Chain • Pathology & PPE Supplies',
    initials: 'SM',
  },
  {
    id: 'test-4',
    name: 'Dr. K. Venkatesh',
    designation: 'Senior Consultant Physician & Director',
    institution: 'Manipal Care Clinic & Daycare',
    city: 'Hyderabad, Telangana',
    rating: 5,
    quote:
      'Being able to procure both pharmaceutical formulations (Dolo 650, Pan-D, Multivitamins) and clinical diagnostic gear like digital BP monitors and OLED oximeters on a single platform saves our clinic administrative staff several hours weekly.',
    verifiedProcurement: 'Verified OPD Clinic • Pharma & Diagnostics',
    initials: 'KV',
  },
  {
    id: 'test-5',
    name: 'Sister Rajeshwari Nair',
    designation: 'Chief Nursing Superintendent & OT Store Manager',
    institution: 'Aster Medcity Specialty Hospital',
    city: 'Kochi, Kerala',
    rating: 5,
    quote:
      'Their powder-free blue nitrile gloves and ultrasonic 3-ply surgical masks are of consistently top quality. Zero latex allergies, superior puncture barrier, and reliable delivery schedules during peak hospital caseloads.',
    verifiedProcurement: 'Verified Hospital Store • 20,000+ Glove Units Procured',
    initials: 'RN',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slideshow timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="py-14 sm:py-20 bg-brand-ivory/40 border-b border-brand-border/60 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-emerald text-xs font-bold uppercase tracking-wider mb-2 border border-brand-emerald/20">
            <Award className="w-3.5 h-3.5" />
            <span>Healthcare Professional Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-forest">
            Trusted by Doctors, Clinics & Hospitals Pan-India
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Read authentic feedback from medical superintendents, surgeons, and healthcare procurement directors who rely on Dr Surya Medicare for clinical supplies.
          </p>
        </motion.div>

        {/* Carousel Presentation Card */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="bg-brand-warmWhite rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border shadow-card relative"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                
                {/* 5-Star Rating & Quote Marker */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-brand-forest">5.0 / 5.0 Clinical Review</span>
                </div>

                {/* Verified Procurement Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-softGreen text-brand-emerald text-[11px] font-bold border border-brand-emerald/20">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{current.verifiedProcurement}</span>
                </div>
              </div>

              {/* Quote Text */}
              <div className="relative mb-8">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-brand-emerald/20 absolute -top-4 -left-2 -z-0" />
                <p className="text-sm sm:text-base lg:text-lg text-brand-forest font-medium leading-relaxed relative z-10 italic">
                  "{current.quote}"
                </p>
              </div>

              {/* Doctor / Institution Profile Info */}
              <div className="flex items-center justify-between border-t border-brand-border/60 pt-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-forest text-brand-warmWhite flex items-center justify-center font-heading font-extrabold text-base flex-shrink-0 shadow-xs">
                    {current.initials}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-brand-forest leading-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs text-brand-emerald font-semibold mt-0.5">
                      {current.designation}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-brand-muted mt-0.5">
                      <Building2 className="w-3 h-3 flex-shrink-0" />
                      <span>{current.institution} • {current.city}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-brand-muted text-xs">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  <span>GST Registered Hospital Account</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-forest border border-brand-border shadow-md hover:bg-brand-softGreen hover:text-brand-emerald flex items-center justify-center transition-all active:scale-90 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-forest border border-brand-border shadow-md hover:bg-brand-softGreen hover:text-brand-emerald flex items-center justify-center transition-all active:scale-90 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all rounded-full h-2 ${
                  currentIndex === index ? 'w-8 bg-brand-emerald' : 'w-2 bg-brand-muted/40 hover:bg-brand-muted'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
