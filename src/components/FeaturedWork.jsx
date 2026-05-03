import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const workItems = [
  {
    id: 'sixt',
    category: 'Car rental',
    period: '[2023-2025]',
    client: 'SIXT',
    href: '/work/sixt/',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&fit=crop',
    result: 'An extra 3m clicks regionally through SEO',
  },
  {
    id: 'dojo',
    category: 'Card Machines',
    period: '[2021-2025]',
    client: 'Dojo – B2B',
    href: '/work/dojo/',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop',
    result: 'A B2B success story for Dojo card machines',
  },
  {
    id: 'magnet',
    category: '',
    period: '[2023-2024]',
    client: 'Magnet Trade – B2B',
    href: '/work/magnet-trade-b2b/',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
    result: 'A full service SEO success story 170%+ increase',
  },
  {
    id: 'esim',
    category: 'Esims',
    period: '[2023-2025]',
    client: 'Leading E Sim brand globally',
    href: '/work/esim-case-study/',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&fit=crop',
    result: 'Increasing brand and non brand visibility UK/ES',
  },
  {
    id: 'jd',
    category: 'Trainers',
    period: '[2025]',
    client: 'JD Sports',
    href: '/work/jd-sports-/',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop',
    result: '65% up YoY in clicks for JDSports FR, IT, ES',
  },
  {
    id: 'parkdean1',
    category: 'Easter Breaks',
    period: '[2019-2025]',
    client: 'Parkdean Resorts',
    href: '/work/parkdean-resorts-easter-breaks/',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop',
    result: 'Dominating Google and AI search',
  },
  {
    id: 'pooky',
    category: 'Rechargeable Lights',
    period: '[2025]',
    client: 'Pooky',
    href: '/work/pooky/',
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a35eb4d55?w=800&q=80&fit=crop',
    result: 'Driving demand for Pooky Rechargeable Lights',
  },
  {
    id: 'parkdean2',
    category: 'UK holidays',
    period: '[2019-2025]',
    client: 'Parkdean Resorts',
    href: '/work/parkdean-resorts-social-search/',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80&fit=crop',
    result: 'Social search and multi channel content to #1',
  },
  {
    id: 'revolution',
    category: 'Beauty Dupes',
    period: '[2022-2025]',
    client: 'Revolution Beauty',
    href: '/work/revolution-beauty/',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&fit=crop',
    result: "Building the UK's leading beauty dupe brand",
  },
  {
    id: 'lloyds',
    category: 'STI tests',
    period: '[2022-23]',
    client: 'Lloyds Pharmacy',
    href: '/work/lloyds-pharmacy/',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&fit=crop',
    result: 'Driving category leadership for STI tests',
  },
  {
    id: 'plt',
    category: 'Outfits',
    period: '[2021-2023]',
    client: 'PrettyLittleThing',
    href: '/work/prettylittlething/',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&fit=crop',
    result: 'Driving discovery for everything "outfits" for PLT',
  },
];

function WorkCard({ item, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="work-card relative block overflow-hidden card-radius bg-[#1a1d26] cursor-pointer"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Image */}
      <img
        src={item.img}
        alt={item.client}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: 'linear-gradient(to top, rgba(13,15,21,0.85) 0%, rgba(13,15,21,0.2) 50%, rgba(13,15,21,0.1) 100%)',
        }}
      />

      {/* Top right: category tag */}
      {item.category && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 z-10">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-white text-xs font-semibold">{item.category}</span>
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      )}

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p className="text-white/60 text-xs font-medium mb-1">{item.period}</p>
        <h3 className="text-white text-xl sm:text-2xl font-black leading-tight">{item.client}</h3>
        <p
          className="text-white/70 text-sm mt-1.5 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
        >
          {item.result}
        </p>
      </div>

      {/* Arrow button */}
      <div
        className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
      >
        <svg className="w-4 h-4 text-[#0d0f15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </motion.a>
  );
}

export default function FeaturedWork() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="featured-work" className="bg-[#e9edf4] pb-6">
      {/* Dark rounded container — exactly like the real site */}
      <div className="mx-3 sm:mx-4 lg:mx-6 bg-[#0d0f15] rounded-3xl overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
          {/* Header */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-white text-2xl font-bold">Featured Work</h2>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workItems.map((item, index) => (
              <WorkCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <a
              href="/work/"
              id="explore-work-btn"
              className="inline-flex items-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#b2f6e3] transition-colors duration-300"
            >
              Explore Our Work
              <span className="text-base">↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
