import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const heroSlides = [
  {
    src: '/hero/hero-slide-1.jpg',
    alt: 'Clinical gloves, a pulse oximeter, and surgical instruments arranged on a supply counter',
    kicker: 'On the counter',
    title: 'Clinical supplies,',
    accent: 'ready to order.',
    body: 'Gloves, a pulse oximeter, and instruments laid out for clinics and procedure rooms.',
  },
  {
    src: '/hero/hero-slide-2.jpg',
    alt: 'A hospital supply cart beside a sunlit patient room',
    kicker: 'For the ward',
    title: 'Patient rooms,',
    accent: 'stocked for the day.',
    body: 'A supply cart beside the bed, for linen, monitors, and the rest of a ward list.',
  },
  {
    src: '/hero/hero-slide-3.jpg',
    alt: 'Surgical instruments, gauze, and a stainless kidney tray prepared for a procedure',
    kicker: 'For the procedure',
    title: 'Instruments and dressings,',
    accent: 'set out to use.',
    body: 'Steel instruments, gauze, and a kidney tray prepared for a minor procedure.',
  },
];

export const HeroShowcase: React.FC<{ onChange?: (index: number) => void }> = ({ onChange }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  useEffect(() => {
    const next = heroSlides[(active + 1) % heroSlides.length].src;
    const preload = () => {
      const image = new Image();
      image.src = next;
    };
    const delay = active === 0 ? 3000 : 0;
    const timer = window.setTimeout(preload, delay);
    return () => window.clearTimeout(timer);
  }, [active]);

  const go = (index: number) => {
    setActive((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-brand-cool">
        <img
          key={heroSlides[active].src}
          src={heroSlides[active].src}
          alt={heroSlides[active].alt}
          width={1280}
          height={720}
          fetchPriority={active === 0 ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-center ${active === 0 ? '' : 'hero-slide-img'}`}
          draggable={false}
        />

        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 sm:bottom-4 sm:left-4">
          <div className="flex items-center gap-1.5 rounded-full bg-brand-navy/35 px-2.5 py-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => go(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active ? 'w-6 bg-brand-emerald' : 'w-2 bg-white/85'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(active - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white text-brand-navy shadow-card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(active + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white text-brand-navy shadow-card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
