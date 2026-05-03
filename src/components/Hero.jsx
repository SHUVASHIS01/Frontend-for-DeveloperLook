import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative bg-black text-white min-h-[92vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red accent line top */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff3c00] to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-20">
        <div className="max-w-[900px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff3c00] animate-pulse" />
            <span className="text-sm text-white/70 font-medium">
              4 Global Offices — UK, USA (New York) &amp; EU
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black leading-[1.0] tracking-tight mb-8"
          >
            Organic media planners{' '}
            <br className="hidden sm:block" />
            creating, distributing &amp;{' '}
            <br className="hidden sm:block" />
            <span className="text-[#ff3c00]">optimising</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/60 font-light leading-relaxed mb-10 max-w-[700px]"
          >
            search-first content for{' '}
            <span className="text-white font-medium">SEO</span>,{' '}
            <span className="text-white font-medium">Social</span>,{' '}
            <span className="text-white font-medium">PR</span>,{' '}
            <span className="text-white font-medium">AI</span> and{' '}
            <span className="text-white font-medium">LLM search</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/about/"
              id="hero-our-story-btn"
              className="group inline-flex items-center gap-3 bg-white text-black text-base font-bold px-8 py-4 hover:bg-[#ff3c00] hover:text-white transition-all duration-300"
            >
              Our Story
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/services/"
              id="hero-services-btn"
              className="group inline-flex items-center gap-3 bg-transparent text-white border border-white/30 text-base font-bold px-8 py-4 hover:border-[#ff3c00] hover:text-[#ff3c00] transition-all duration-300"
            >
              Our Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* The agency behind */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/10"
        >
          <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-6">
            The agency behind ...
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {['SIXT', 'JD Sports', 'Parkdean Resorts', 'Revolution Beauty', 'PrettyLittleThing', 'Lloyds Pharmacy', 'Dojo', 'Pooky'].map((brand) => (
              <span key={brand} className="text-white/30 font-bold text-lg hover:text-white/70 transition-colors duration-300 cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
