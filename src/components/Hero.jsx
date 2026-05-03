import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1513506003901-1e6a35eb4d55?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85&fit=crop',
];

function Laurel({ flip = false }) {
  return (
    <svg
      viewBox="0 0 30 60"
      fill="none"
      className="w-5 h-10 sm:w-6 sm:h-12 flex-shrink-0"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path d="M22 3 Q18 8 20 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 5 Q24 10 22 17" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 11 Q12 15 14 22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 13 Q22 19 19 26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 21 Q8 25 10 32" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 23 Q20 30 17 36" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 31 Q7 37 10 42" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 35 Q17 42 15 48" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AwardBadge({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-0.5">
      <span className="text-white/90 text-[11px] sm:text-sm leading-none">{icon}</span>
      <span className="text-white/85 text-[6px] sm:text-[7.5px] font-bold uppercase tracking-wider text-center leading-[1.3] whitespace-pre-line">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % HERO_IMAGES.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100svh', backgroundColor: '#0d0f15' }}>

      {/* Blurred background — matches the pill image, crossfades on change */}
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <img
            src={HERO_IMAGES[current]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              filter: 'blur(72px) saturate(1.3) brightness(0.38)',
              transform: 'scale(1.18)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* ── Centered content ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-10"
        style={{ minHeight: '100svh', paddingTop: '72px', paddingBottom: '140px' }}
      >
        {/* Award strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center"
        >
          <p className="text-white/70 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] mb-4 leading-relaxed">
            #1 Most Recommended<br />Content Marketing Agency
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Laurel />
            <div className="flex items-center gap-3 sm:gap-5 px-3 sm:px-5 border-l border-r border-white/20">
              <AwardBadge icon="▶▶" label={"GLOBAL\nSEARCH\nAWARDS"} />
              <AwardBadge icon="▲▲▲" label={"THE\nDRUM"} />
              <AwardBadge icon="●● ●●" label={"UK SOCIAL\nMEDIA AWARDS"} />
              <AwardBadge icon="≡ ≡" label={"CONTENT\nAWARDS"} />
            </div>
            <Laurel flip />
          </div>
        </motion.div>

        {/* "We Create" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="text-[clamp(52px,10.5vw,148px)] font-black text-white leading-[0.88] tracking-[-0.04em]"
        >
          We Create
        </motion.h1>

        {/* "Category [PILL] Leaders" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 sm:flex-nowrap"
        >
          <span className="text-[clamp(52px,10.5vw,148px)] font-black text-white leading-[0.88] tracking-[-0.04em] flex-shrink-0">
            Category
          </span>

          {/* Rotating pill image */}
          <motion.div
            className="relative overflow-hidden shadow-2xl flex-shrink-0"
            style={{
              width: 'clamp(68px, 8.5vw, 128px)',
              height: 'clamp(68px, 8.5vw, 128px)',
              borderRadius: 'clamp(12px, 2vw, 26px)',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={HERO_IMAGES[current]}
                alt="Client showcase"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.9 }}
              />
            </AnimatePresence>
          </motion.div>

          <span className="text-[clamp(52px,10.5vw,148px)] font-black text-white leading-[0.88] tracking-[-0.04em] flex-shrink-0">
            Leaders
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 text-base sm:text-xl lg:text-2xl font-medium mt-5 tracking-wide"
        >
          on every searchable platform
        </motion.p>
      </div>

      {/* ── Bottom-left: description ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.65 }}
        className="absolute bottom-10 left-5 sm:left-8 lg:left-12 z-10 max-w-[260px] sm:max-w-[360px]"
      >
        <p className="text-white/60 text-[12px] sm:text-[13px] leading-relaxed">
          Organic media planners creating, distributing &amp; optimising{' '}
          <strong className="text-white/90 font-semibold">search-first</strong>{' '}
          content for SEO, Social, PR, Ai and LLM search
        </p>
      </motion.div>

      {/* ── Bottom-right: offices ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.65 }}
        className="absolute bottom-10 right-5 sm:right-8 lg:right-12 z-10 text-right"
      >
        <p className="text-white/60 text-[12px] sm:text-[13px] leading-relaxed">
          4 Global Offices serving<br />
          UK, USA (New York) &amp; EU
        </p>
      </motion.div>

      {/* Curved bottom edge into light bg */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60 Z" fill="#e9edf4" />
        </svg>
      </div>
    </section>
  );
}
