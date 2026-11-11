import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'We send the ward list on WhatsApp. The desk confirms the quantities before anything leaves.',
    role: 'Hospital store',
    place: 'Bengaluru',
  },
  {
    quote: 'Gloves, masks, and IV sets sit in one order instead of three supplier calls.',
    role: 'Nursing superintendent',
    place: 'Kochi',
  },
  {
    quote: 'The bulk form is how we ask for a quotation. The price on the page stays the catalogue price.',
    role: 'Clinic administrator',
    place: 'Hyderabad',
  },
  {
    quote: 'Diagnostic devices and daily tablets are on the same list, which is what the OPD actually needs.',
    role: 'Physician',
    place: 'Chennai',
  },
  {
    quote: 'Support picks up on the published number when a specification is unclear.',
    role: 'Laboratory buyer',
    place: 'Pune',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const step = (direction: number) => {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section
      data-reveal="left"
      className="cv-auto border-y border-brand-border bg-white"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-goldInk">Testimonials</p>
          <h2 id="testimonials-heading" className="section-title mt-2">
            How buyers use the desk
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">
            Short notes from clinics, hospitals, and laboratories that order from this catalogue.
          </p>
        </div>

        <div className="lg:col-span-8">
          <blockquote className="border border-brand-border bg-brand-ivory px-5 py-6 sm:px-8 sm:py-8">
            <p className="font-heading text-xl font-semibold leading-snug text-brand-navy sm:text-2xl">
              “{current.quote}”
            </p>
            <footer className="mt-5 text-sm text-brand-body">
              <span className="font-semibold text-brand-navy">{current.role}</span>
              <span className="text-brand-muted"> · {current.place}</span>
            </footer>
          </blockquote>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={item.place}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={`${item.role}, ${item.place}`}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-2.5 rounded-full ${itemIndex === index ? 'w-8 bg-brand-navy' : 'w-2.5 bg-brand-border'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => step(-1)}
                className="flex h-10 w-10 items-center justify-center border border-brand-border bg-white text-brand-navy"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => step(1)}
                className="flex h-10 w-10 items-center justify-center border border-brand-border bg-white text-brand-navy"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
