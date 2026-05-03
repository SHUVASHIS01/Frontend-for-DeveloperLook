import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const serviceList = [
  { label: 'Digital PR', href: '/services/digital-pr/' },
  { label: 'Organic Social & Content', href: '/services/social/' },
  { label: 'Search & Growth Strategy', href: '/services/strategy-growth/' },
  { label: 'Content Experience', href: '/services/content-experience/' },
  { label: 'Data & Insights', href: '/services/data-insights/' },
  { label: 'Onsite SEO', href: '/services/onsite-seo/' },
  { label: 'B2B Marketing', href: '/services/b2b-marketing/' },
  { label: 'Social SEO/Search', href: '/services/social-seo-tiktok-youtube/' },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="bg-[#e9edf4] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-[#0d0f15] leading-tight tracking-[-0.03em]">
            Our{' '}
            <span className="relative inline-block">
              Services
            </span>
          </h2>
        </motion.div>

        {/* Service List — exactly matching the screenshot */}
        <div className="border-t border-black/10">
          {serviceList.map((service, i) => (
            <motion.a
              key={service.label}
              href={service.href}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group service-item flex items-center justify-between py-5 sm:py-6 border-b border-black/10 hover:pl-2 transition-all duration-200"
            >
              <span className="text-[#0d0f15] text-xl sm:text-2xl lg:text-3xl font-black tracking-[-0.02em] group-hover:text-[#0d0f15]/70 transition-colors">
                {service.label}
              </span>
              <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                <span className="text-[#0d0f15] text-sm">↗</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <a
            href="/services/"
            id="view-all-services-btn"
            className="inline-flex items-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0d0f15] hover:text-white transition-all duration-300 shadow-sm border border-black/10 w-full sm:w-auto justify-center"
          >
            View All Services
            <span className="text-base">↗</span>
          </a>
        </motion.div>

        {/* "Chasing Consumers" big CTA — full bleed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-[#0d0f15] rounded-3xl overflow-hidden p-10 lg:p-16 relative"
        >
          {/* Background texture dots */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 overflow-hidden">
            {/* Huge scrolling text */}
            <div className="overflow-hidden whitespace-nowrap py-2">
              <div className="marquee-track inline-flex gap-16">
                {Array(4).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[clamp(56px,8vw,120px)] font-black text-white leading-none tracking-[-0.03em]">
                      Chasing Consumers
                    </span>
                    <span className="text-[clamp(56px,8vw,120px)] font-black text-white/20 leading-none tracking-[-0.03em]">
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="overflow-hidden whitespace-nowrap py-2">
              <div className="marquee-track inline-flex gap-16" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
                {Array(4).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[clamp(56px,8vw,120px)] font-black text-white/20 leading-none tracking-[-0.03em]">
                      Chasing Consumers
                    </span>
                    <span className="text-[clamp(56px,8vw,120px)] font-black text-white leading-none tracking-[-0.03em]">
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
