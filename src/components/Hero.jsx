import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Award badge logos (SVG text approximations)
const AwardBadge = ({ label }) => (
  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
    <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
    <span className="text-white text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </div>
);

// Floating pill image (mimics the site's emoji-like floating images)
const FloatingPill = ({ src, alt, className, style }) => (
  <motion.div
    className={`absolute overflow-hidden rounded-2xl shadow-2xl ${className}`}
    style={style}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </motion.div>
);

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <section id="hero" className="relative overflow-hidden bg-[#1a1d26]" style={{ minHeight: '90vh' }}>
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
        >
          {/* Using a fallback video source */}
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center justify-center text-center min-h-[90vh] py-20">
        {/* Award Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            #1 Most Recommended Content Marketing Agency
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <AwardBadge label="Global Search Awards" />
            <AwardBadge label="The Drum" />
            <AwardBadge label="UK Social Media Awards" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <h1 className="text-[clamp(52px,10vw,130px)] font-black text-white leading-[0.9] tracking-[-0.03em] mb-0">
            We Create
          </h1>
          <h1 className="text-[clamp(52px,10vw,130px)] font-black text-white leading-[0.9] tracking-[-0.03em]">
            Category
          </h1>
          <h1 className="text-[clamp(52px,10vw,130px)] font-black text-white leading-[0.9] tracking-[-0.03em]">
            Leaders
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/80 text-lg sm:text-xl font-medium mt-5 mb-2"
        >
          on every searchable platform
        </motion.p>

        {/* Offices */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/60 text-sm font-medium mt-6"
        >
          4 Global Offices serving<br />
          UK, USA (New York) &amp; EU
        </motion.p>
      </div>

      {/* Bottom curved edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60 Z" fill="#e9edf4" />
        </svg>
      </div>
    </section>
  );
}
