import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, Sparkles, ShieldCheck, Truck, Percent, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InteractiveDealBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 42,
    seconds: 18,
  });
  const [copied, setCopied] = useState(false);

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('SURYAB2B');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-gradient-to-r from-brand-forest via-[#054E2C] to-brand-forest text-brand-warmWhite py-3 sm:py-4 px-3 sm:px-6 border-y border-brand-emerald/40 shadow-inner relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-brand-emerald/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-brand-vermilion/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
        
        {/* LEFT: Promotion Title & Ticking Countdown */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-vermilion/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>Institutional Flash Deal</span>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-brand-ivory flex items-center gap-1.5">
            <span>Special Hospital Batch Discount:</span>
            <span className="font-bold text-white underline decoration-brand-emerald">Flat 12% Bulk Rebate</span>
          </div>

          {/* Interactive Countdown Blocks */}
          <div className="flex items-center gap-1 font-mono text-xs font-extrabold">
            <div className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-brand-warmWhite flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-ivory" />
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
            </div>
            <span>:</span>
            <div className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-brand-warmWhite">
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
            </div>
            <span>:</span>
            <div className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-brand-vermilion font-bold">
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive Coupon Copy & Action Link */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          
          {/* Coupon Pill with copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-brand-forest hover:bg-brand-warmWhite font-mono text-xs font-bold shadow-xs transition-all active:scale-95 border border-brand-emerald/30 group"
            title="Click to copy coupon code"
          >
            <span className="text-[10px] uppercase font-sans text-brand-muted">Coupon:</span>
            <span className="text-brand-emerald font-extrabold tracking-wider">SURYAB2B</span>
            {copied ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                <Check className="w-3 h-3" /> Copied!
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-brand-muted group-hover:text-brand-emerald transition-colors" />
            )}
          </button>

          <Link
            to="/shop?onlyDiscounted=true"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-emerald hover:bg-brand-emeraldLight text-white text-xs font-bold shadow-xs transition-all group"
          >
            <span>Explore Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

      </div>
    </section>
  );
};
