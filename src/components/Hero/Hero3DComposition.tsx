import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, ShieldCheck, HeartPulse, CheckCircle2, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero3DComposition: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full relative">
      
      {/* ========================================================= */}
      {/* 1. MOBILE/PHONE VERSION (Samsung Galaxy, iPhone, etc.)    */}
      {/* Clean, no overlapping card bugs, 100% width, touch ready */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full max-w-sm mx-auto space-y-3 pt-2 pb-4">
        
        {/* Main Showcase Card */}
        <div className="bg-white rounded-2xl p-4 border border-brand-border/90 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen text-brand-emerald">
              <Activity className="w-3 h-3 text-brand-emerald" />
              <span>Clinical Diagnostic Suite</span>
            </span>
            <span className="text-[10px] font-mono text-brand-muted">ISO 13485</span>
          </div>

          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-brand-ivory/40 p-2 mb-3 flex items-center justify-center">
            <img
              src="/products/bp-monitor.svg"
              alt="Digital BP Monitor"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-heading font-bold text-brand-forest">
                IntelliSense Digital BP Monitor
              </h4>
              <span className="text-[10px] text-brand-muted">Pre-calibrated clinical accuracy</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-brand-emerald block">₹2,499</span>
              <span className="text-[9px] text-brand-muted line-through">₹3,299</span>
            </div>
          </div>
        </div>

        {/* 2 Horizontal Mini-Feature Cards for Mobile */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to="/shop?productType=Tablets%20%26%20Daily%20Health"
            className="p-3 rounded-2xl bg-white border border-brand-border/80 shadow-xs flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-softGreen text-brand-emerald flex items-center justify-center mb-1.5">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-brand-forest block line-clamp-1">SuryaDolo 650</span>
              <span className="text-[10px] text-brand-emerald font-semibold">₹34 • In Stock</span>
            </div>
          </Link>

          <Link
            to="/shop?category=ppe"
            className="p-3 rounded-2xl bg-white border border-brand-border/80 shadow-xs flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-softGreen text-brand-emerald flex items-center justify-center mb-1.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-brand-forest block line-clamp-1">Nitrile Gloves</span>
              <span className="text-[10px] text-brand-emerald font-semibold">100 Pcs Box</span>
            </div>
          </Link>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP 3D COMPOSITION STAGE                           */}
      {/* ========================================================= */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:flex relative w-full h-[520px] items-center justify-center select-none"
        style={{ perspective: 1200 }}
      >
        {/* Soft Ambient Radial Background Glow */}
        <div className="absolute w-[360px] h-[360px] rounded-full bg-brand-emerald/15 blur-3xl pointer-events-none" />
        <div className="absolute w-[240px] h-[240px] rounded-full bg-brand-vermilion/10 blur-2xl pointer-events-none" />

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full max-w-[480px] h-full flex items-center justify-center"
        >
          {/* CENTER PRIMARY CARD: Digital Blood Pressure Monitor */}
          <motion.div
            style={{ translateZ: 35 }}
            whileHover={{ scale: 1.03, z: 50 }}
            className="relative z-20 w-[265px] bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-brand-border/80 shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen text-brand-emerald">
                <Activity className="w-3.5 h-3.5 text-brand-emerald" />
                IntelliSense Pro
              </span>
              <span className="text-[10px] font-mono text-brand-muted">DSM-DIA-101</span>
            </div>

            <div className="relative h-32 w-full rounded-xl overflow-hidden bg-brand-ivory/40 p-2 mb-2 flex items-center justify-center">
              <img
                src="/products/bp-monitor.svg"
                alt="Digital BP Monitor"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-heading font-bold text-brand-forest line-clamp-1">
                Dr Surya ProCheck Digital BP
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-brand-emerald">₹2,499</span>
                  <span className="text-[11px] text-brand-muted line-through">₹3,299</span>
                </div>
                <span className="text-[10px] font-bold text-brand-vermilion bg-brand-vermilion/10 px-1.5 py-0.5 rounded">
                  -24% OFF
                </span>
              </div>
            </div>
          </motion.div>

          {/* TOP RIGHT SATELLITE: Common Human Health Tablets */}
          <motion.div
            style={{
              translateZ: 60,
              x: '40%',
              y: '-32%',
            }}
            whileHover={{ scale: 1.05, z: 75 }}
            className="absolute z-30 w-[195px] bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-brand-border/80 shadow-card"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-brand-emerald">
                <Pill className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Daily Tablets</span>
              </div>
              <span className="text-[10px] font-mono text-brand-vermilion font-bold">₹34</span>
            </div>

            <div className="h-20 w-full rounded-lg overflow-hidden bg-brand-ivory/50 mb-1.5 flex items-center justify-center p-1">
              <img
                src="/products/tab-dolo.svg"
                alt="SuryaDolo Tablets"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-brand-forest">SuryaDolo 650mg</span>
              <span className="text-brand-emerald text-[10px] font-semibold">In Stock</span>
            </div>
          </motion.div>

          {/* BOTTOM LEFT SATELLITE: Cardiology Stethoscope */}
          <motion.div
            style={{
              translateZ: 50,
              x: '-40%',
              y: '28%',
            }}
            whileHover={{ scale: 1.04, z: 70 }}
            className="absolute z-30 w-[200px] bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-brand-border/80 shadow-card"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-brand-forest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
                Stainless Steel
              </span>
              <span className="text-[11px] font-bold text-brand-emerald">₹3,899</span>
            </div>

            <div className="h-20 w-full rounded-lg overflow-hidden bg-brand-ivory/50 mb-1.5 flex items-center justify-center p-1">
              <img
                src="/products/steth-cardio.svg"
                alt="Cardiology Stethoscope"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] font-bold text-brand-body line-clamp-1">
              Master Cardiology Stethoscope
            </p>
          </motion.div>

          {/* TOP LEFT BADGE: Fingertip Pulse Oximeter */}
          <motion.div
            style={{
              translateZ: 30,
              x: '-44%',
              y: '-38%',
            }}
            className="absolute z-10 flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-border/70 shadow-subtle"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-softGreen flex items-center justify-center text-brand-emerald font-bold text-xs">
              <HeartPulse className="w-4 h-4 text-brand-emerald" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-brand-forest">OLED Oximeter</div>
              <div className="text-[10px] text-brand-muted">SpO2 99% • ₹899</div>
            </div>
          </motion.div>

          {/* BOTTOM RIGHT BADGE: Nitrile Gloves */}
          <motion.div
            style={{
              translateZ: 40,
              x: '42%',
              y: '34%',
            }}
            className="absolute z-20 flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-border/80 shadow-card"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-emerald text-brand-warmWhite flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-brand-ivory" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-brand-forest">Nitrile Gloves</div>
              <div className="text-[10px] text-brand-emerald font-semibold">100 Pcs Box</div>
            </div>
          </motion.div>

        </motion.div>
      </div>

    </div>
  );
};