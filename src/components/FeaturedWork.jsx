import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const workItems = [
  {
    id: 'sixt',
    category: 'Car rental',
    period: '[2023-2025]',
    client: 'SIXT',
    description: 'An extra 3m clicks regionally through SEO',
    href: '/work/sixt/',
    color: '#ff6b00',
  },
  {
    id: 'dojo',
    category: 'Card Machines',
    period: '[2021-2025]',
    client: 'Dojo - B2B',
    description: 'A B2B success story for Dojo card machines',
    href: '/work/dojo/',
    color: '#1a1a2e',
  },
  {
    id: 'magnet',
    category: '',
    period: '[2023-2024]',
    client: 'Magnet Trade - B2B',
    description: 'A full service SEO success story 170%+ increase',
    href: '/work/magnet-trade-b2b/',
    color: '#2d2d2d',
  },
  {
    id: 'esim',
    category: 'Esims',
    period: '[2023-2025]',
    client: 'Leading E Sim brand globally',
    description: 'Increasing brand and non brand visibility UK/ES',
    href: '/work/esim-case-study/',
    color: '#0f3460',
  },
  {
    id: 'jd',
    category: 'Trainers',
    period: '[2025]',
    client: 'JD Sports',
    description: '65% up YoY in clicks for JDSports FR, IT, ES',
    href: '/work/jd-sports-/',
    color: '#ff6900',
  },
  {
    id: 'parkdean1',
    category: 'Easter Breaks',
    period: '[2019-2025]',
    client: 'Parkdean Resorts',
    description: 'Dominating Google and AI search',
    href: '/work/parkdean-resorts-easter-breaks/',
    color: '#006b3c',
  },
  {
    id: 'pooky',
    category: 'Rechargeable Lights',
    period: '[2025]',
    client: 'Pooky',
    description: 'Driving demand for Pooky Rechargeable Lights',
    href: '/work/pooky/',
    color: '#4a1b6e',
  },
  {
    id: 'parkdean2',
    category: 'UK holidays',
    period: '[2019-2025]',
    client: 'Parkdean Resorts',
    description: 'Social search and multi channel content to #1',
    href: '/work/parkdean-resorts-social-search/',
    color: '#006b3c',
  },
  {
    id: 'revolution',
    category: 'Beauty Dupes',
    period: '[2022-2025]',
    client: 'Revolution Beauty',
    description: "Building the UK's leading beauty dupe brand",
    href: '/work/revolution-beauty/',
    color: '#8b0045',
  },
  {
    id: 'lloyds',
    category: 'STI tests',
    period: '[2022-23]',
    client: 'Lloyds Pharmacy',
    description: 'Driving category leadership for STI tests',
    href: '/work/lloyds-pharmacy/',
    color: '#00833e',
  },
  {
    id: 'plt',
    category: 'Outfits',
    period: '[2021-2023]',
    client: 'PrettyLittleThing',
    description: 'Driving discovery for everything "outfits" for PLT',
    href: '/work/prettylittlething/',
    color: '#ff5f00',
  },
];

const WorkCard = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="work-card relative block overflow-hidden group cursor-pointer"
      style={{ aspectRatio: index === 0 || index === 3 ? '16/10' : '4/3' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}aa 100%)`,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div>
            {item.category && (
              <span className="inline-block text-white/60 text-xs font-semibold uppercase tracking-widest border border-white/20 px-2 py-1 mb-2">
                {item.category}
              </span>
            )}
            <p className="text-white/50 text-sm font-medium">{item.period}</p>
          </div>
          <div
            className={`w-10 h-10 bg-white flex items-center justify-center transition-all duration-300 ${
              hovered ? 'bg-[#ff3c00]' : 'bg-white'
            }`}
          >
            <svg
              className={`w-4 h-4 transition-colors duration-300 ${hovered ? 'text-white' : 'text-black'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        <div>
          <h3 className="text-white text-xl sm:text-2xl font-black mb-2 leading-tight">
            {item.client}
          </h3>
          <p className="text-white/70 text-sm font-medium leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
};

const FeaturedWork = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="featured-work" className="bg-black py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold mb-3">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              Featured <span className="text-[#ff3c00]">Work</span>
            </h2>
          </div>
          <a
            href="/work/"
            id="explore-work-btn"
            className="hidden sm:inline-flex items-center gap-2 text-white border border-white/20 hover:border-[#ff3c00] hover:text-[#ff3c00] text-sm font-semibold px-6 py-3 transition-all duration-300"
          >
            Explore Our Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workItems.slice(0, 9).map((item, index) => (
            <div
              key={item.id}
              className={
                index === 0
                  ? 'lg:col-span-2 lg:row-span-1'
                  : index === 3
                  ? 'lg:col-span-1 lg:row-span-1'
                  : ''
              }
            >
              <WorkCard item={item} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href="/work/"
            className="inline-flex items-center gap-2 text-white border border-white/20 hover:border-[#ff3c00] hover:text-[#ff3c00] text-sm font-semibold px-6 py-3 transition-all duration-300"
          >
            Explore Our Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
