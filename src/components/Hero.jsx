import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animated counter hook
const useCounter = (target, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const brands = ['SIXT', 'JD Sports', 'Parkdean Resorts', 'Revolution Beauty', 'PrettyLittleThing', 'Lloyds Pharmacy', 'Dojo', 'Pooky'];

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative bg-[#0a0a0a] text-white min-h-[90vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Red glow */}
      <div className="pointer-events-none absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#ff3c00] rounded-full opacity-[0.04] blur-[100px]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-10 xl:px-14 pt-16 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Location badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 border border-white/10 bg-white/4 px-4 py-2 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3c00] animate-pulse" />
              <span className="text-sm text-white/60 font-medium tracking-wide">
                4 Global Offices serving UK, USA (New York) &amp; EU
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(38px,6.5vw,88px)] font-black leading-[1.0] tracking-[-0.02em] mb-7 max-w-[900px]"
          >
            Organic media planners
            <br />
            creating, distributing &amp;{' '}
            <br />
            <span className="text-[#ff3c00] italic">optimising</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-white/55 font-light leading-snug mb-10 max-w-[680px]"
          >
            search-first content for{' '}
            <strong className="text-white font-bold">SEO</strong>,{' '}
            <strong className="text-white font-bold">Social</strong>,{' '}
            <strong className="text-white font-bold">PR</strong>,{' '}
            <strong className="text-white font-bold">AI</strong> and{' '}
            <strong className="text-white font-bold">LLM search</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href="/about/"
              id="hero-our-story-btn"
              className="group inline-flex items-center gap-3 bg-white text-black text-[15px] font-black px-8 py-4 hover:bg-[#ff3c00] hover:text-white transition-all duration-300"
            >
              Our Story
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/services/"
              id="hero-services-btn"
              className="group inline-flex items-center gap-3 bg-transparent text-white border border-white/25 text-[15px] font-black px-8 py-4 hover:border-[#ff3c00] hover:text-[#ff3c00] transition-all duration-300"
            >
              Our Services
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Brand strip */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-10 border-t border-white/8"
          >
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold mb-5">
              The agency behind ...
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              {brands.map((brand, i) => (
                <span
                  key={brand}
                  className="text-white/25 font-black text-base sm:text-xl hover:text-white/70 transition-colors duration-300 cursor-default"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
