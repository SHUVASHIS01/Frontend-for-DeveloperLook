import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Use text-based brand logos to avoid image dependencies
const brands = [
  { name: 'SIXT', style: 'font-black text-2xl tracking-tighter text-[#0d0f15]' },
  { name: 'Revolution', style: 'font-bold text-xl text-[#0d0f15] italic' },
  { name: 'PlayStation', style: 'font-black text-xl text-[#0d0f15]' },
  { name: 'Capital One', style: 'font-bold text-xl text-[#0d0f15]' },
  { name: 'Red Bull', style: 'font-black text-xl text-[#0d0f15]' },
  { name: 'JD Sports', style: 'font-black text-xl text-[#0d0f15]' },
  { name: 'Dojo', style: 'font-black text-xl text-[#0d0f15]' },
  { name: 'Parkdean', style: 'font-bold text-xl text-[#0d0f15]' },
];

export default function BrandsAndIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-[#e9edf4] pt-12 pb-0" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* "The agency behind" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#0d0f15]/50 text-sm font-medium mb-6">The agency behind ...</p>

          {/* Brand logos row */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12 mb-14">
            {brands.map((brand) => (
              <span key={brand.name} className={`${brand.style} opacity-70 hover:opacity-100 transition-opacity duration-200`}>
                {brand.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-black/10 mb-14" />

        {/* "Driving Demand & Discovery" block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-[clamp(40px,5.5vw,72px)] font-black text-[#0d0f15] leading-[0.95] tracking-[-0.03em] mb-6">
              Driving Demand
              <br />
              &amp; Discovery
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between h-full"
          >
            <p className="text-[#0d0f15]/70 text-lg leading-relaxed mb-8">
              A global team of search-first content marketers engineering semantic relevancy &amp; category signals for both the internet and people
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/about/"
                id="intro-our-story-btn"
                className="flex items-center justify-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#0d0f15] hover:text-white transition-all duration-300 shadow-sm border border-black/10"
              >
                Our Story
                <span className="text-base">↗</span>
              </a>
              <a
                href="/services/"
                id="intro-services-btn"
                className="flex items-center justify-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#0d0f15] hover:text-white transition-all duration-300 shadow-sm border border-black/10"
              >
                Our Services
                <span className="text-base">↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
