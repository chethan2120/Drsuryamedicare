import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    src: '/hero/hero-slide-1.jpg',
    alt: 'Clinical gloves, a pulse oximeter, and surgical instruments arranged on a supply counter',
  },
  {
    src: '/hero/hero-slide-2.jpg',
    alt: 'A hospital supply cart beside a sunlit patient room',
  },
  {
    src: '/hero/hero-slide-3.jpg',
    alt: 'Surgical instruments, gauze, and a stainless kidney tray prepared for a procedure',
  },
];

export const HeroShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-cool sm:aspect-[5/4] lg:aspect-[16/10]">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1280}
            height={800}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-brand-navy/45 to-transparent px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => go(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === active ? 'w-7 bg-brand-emerald' : 'w-2.5 bg-white/80'
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
