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
    <section id="services" className="bg-[#efeeec] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.135, 0.9, 0.15, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-medium text-[#282828] leading-tight tracking-tight">
            Our Services
          </h2>
        </motion.div>

        {/* Service List */}
        <div className="border-t border-black/10">
          {serviceList.map((service, i) => (
            <motion.a
              key={service.label}
              href={service.href}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.135, 0.9, 0.15, 1] }}
              className="group service-item flex items-center justify-between py-5 sm:py-6 border-b border-black/10 transition-all duration-300"
            >
              <span className="text-[#282828] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight leading-none group-hover:text-[#282828]/40 transition-colors duration-300">
                {service.label}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#282828] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.135, 0.9, 0.15, 1] }}
          className="mt-8"
        >
          <a
            href="/services/"
            id="view-all-services-btn"
            className="inline-flex items-center gap-2 bg-[#282828] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-black transition-all duration-300 w-full sm:w-auto justify-center"
          >
            View All Services
            <svg className="w-3 h-3" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5"/>
            </svg>
          </a>
        </motion.div>

        {/* "Chasing Consumers" big CTA — full bleed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.135, 0.9, 0.15, 1] }}
          className="mt-16 bg-[#121212] rounded-3xl overflow-hidden relative"
        >
          <div className="relative z-10 overflow-hidden pt-10 lg:pt-14">
            {/* Huge scrolling text — row 1 */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="marquee-track inline-flex items-center gap-10">
                {Array(6).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[clamp(48px,7vw,108px)] font-medium text-white leading-none tracking-tight">
                      Chasing Consumers
                    </span>
                    <span className="text-[clamp(48px,7vw,108px)] font-medium text-white/15 leading-none tracking-tight">
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Row 2 — reversed */}
            <div className="overflow-hidden whitespace-nowrap mt-2">
              <div className="marquee-track inline-flex items-center gap-10" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
                {Array(6).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[clamp(48px,7vw,108px)] font-medium text-white/15 leading-none tracking-tight">
                      Chasing Consumers
                    </span>
                    <span className="text-[clamp(48px,7vw,108px)] font-medium text-white leading-none tracking-tight">
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA row */}
          <div className="px-8 lg:px-12 py-8 lg:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              We chase consumers, not algorithms — creating content that puts brands at the centre of what people are actually searching for.
            </p>
            <a
              href="/contact/"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#b2f6e3] text-[#121212] text-sm font-medium px-6 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
            >
              Work With Us
              <svg className="w-3 h-3" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
