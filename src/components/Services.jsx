import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    id: 'digital-pr',
    label: 'Digital PR',
    href: '/services/digital-pr/',
    description:
      'We create campaigns that earn links, coverage, and visibility across the web. From data-led stories to reactive PR, we put your brand where your audience searches.',
    stats: ['500+ links earned', 'Top tier coverage', 'Award winning'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'social',
    label: 'Organic Social & Content',
    href: '/services/social/',
    description:
      'We build audiences that convert. Our social and content strategies are built around search demand, so every post serves a purpose beyond likes.',
    stats: ['Multi-channel', 'TikTok & YouTube', 'Community building'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    id: 'strategy',
    label: 'Search & Growth Strategy',
    href: '/services/strategy-growth/',
    description:
      'Data-backed strategies that identify where your customers are searching and how to capture that demand. We plan, execute, and optimise for measurable growth.',
    stats: ['Full funnel strategy', 'AI & LLM optimised', 'International reach'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: 'content',
    label: 'Content Experience',
    href: '/services/content-experience/',
    description:
      'Content that works harder. We create editorial, video, and interactive content designed to rank, engage, and convert across every channel.',
    stats: ['Editorial content', 'Video production', 'Interactive assets'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6V7.5z" />
      </svg>
    ),
  },
  {
    id: 'data',
    label: 'Data & Insights',
    href: '/services/data-insights/',
    description:
      'We turn data into direction. Our insights team tracks the signals that matter and translates them into clear strategy and action.',
    stats: ['Custom dashboards', 'Real-time reporting', 'Competitor tracking'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    id: 'onsite',
    label: 'Onsite SEO',
    href: '/services/onsite-seo/',
    description:
      'Technical and on-page SEO that makes your website the strongest possible signal for search engines. We fix what holds you back and build what pushes you forward.',
    stats: ['Technical audits', 'Page optimisation', 'Core Web Vitals'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="bg-[#0d0d0d] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold mb-3">What we do</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              Our<span className="text-[#ff3c00]">Services</span>
            </h2>
          </div>
          <a
            href="/services/"
            id="view-all-services-btn"
            className="hidden sm:inline-flex items-center gap-2 text-white border border-white/20 hover:border-[#ff3c00] hover:text-[#ff3c00] text-sm font-semibold px-6 py-3 transition-all duration-300"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Service pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {services.map((service, i) => (
            <button
              key={service.id}
              onClick={() => setActiveService(i)}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-200 border ${
                activeService === i
                  ? 'bg-[#ff3c00] text-white border-[#ff3c00]'
                  : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Active service content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-8 lg:p-12"
          >
            <div>
              <div className="text-[#ff3c00] mb-5">{services[activeService].icon}</div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {services[activeService].label}
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                {services[activeService].description}
              </p>
              <a
                href={services[activeService].href}
                className="inline-flex items-center gap-2 bg-[#ff3c00] text-white text-sm font-bold px-6 py-3 hover:bg-[#e03500] transition-colors duration-200"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {services[activeService].stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 px-6 py-4 border border-white/10">
                  <div className="w-2 h-2 bg-[#ff3c00] rounded-full flex-shrink-0" />
                  <span className="text-white font-semibold text-lg">{stat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chasing Consumers CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-[#ff3c00] p-10 lg:p-16 text-center"
        >
          <p className="text-white/70 text-sm uppercase tracking-widest font-semibold mb-4">Our philosophy</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4">
            Chasing Consumers
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-8">
            Not Algorithms
          </h2>
          <a
            href="/contact/"
            id="chasing-consumers-cta"
            className="inline-flex items-center gap-2 bg-black text-white text-base font-bold px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Work with us
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
