import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pillars = [
  {
    id: 'pioneers',
    title: 'Pioneers',
    img: 'https://rise-atseven.transforms.svdcdn.com/production/images/Emirates-airpline-in-flight.avif?w=800&h=560&q=85&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85',
    body1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    body2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    link: '/about/',
  },
  {
    id: 'award',
    title: 'Award Winning',
    img: 'https://rise-atseven.transforms.svdcdn.com/production/images/spaseekers.png?w=800&h=560&q=85&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=85',
    body1: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London.",
    body2: 'We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.',
    link: '/about/',
  },
  {
    id: 'speed',
    title: 'Speed',
    img: 'https://rise-atseven.transforms.svdcdn.com/production/images/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.jpg?w=800&h=560&q=85&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85',
    body1: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster.",
    body2: "We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    link: '/about/',
  },
];

const CYCLE_DURATION = 5000;

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [imgSrcs, setImgSrcs] = useState(pillars.map(p => p.img));
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  /* Auto-cycle tabs */
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % pillars.length), CYCLE_DURATION);
    return () => clearInterval(id);
  }, []);

  const handleImgError = (i) => {
    setImgSrcs(prev => {
      const next = [...prev];
      next[i] = pillars[i].fallback;
      return next;
    });
  };

  return (
    <section id="why-us" className="bg-[#efeeec] py-6 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mb-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.135, 0.9, 0.15, 1] }}
          className="text-[clamp(36px,5vw,64px)] font-medium text-[#282828] leading-tight tracking-tight"
        >
          Legacy In The Making
        </motion.h2>
      </div>
      <div className="mx-3 sm:mx-4 lg:mx-6">
        {/* Dark rounded panel */}
        <div className="bg-[#121212] rounded-3xl overflow-hidden">
          <div className="max-w-[1400px] mx-auto">

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`flex-1 py-5 text-sm font-medium tracking-tight transition-all duration-300 ${
                    active === i
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[480px]">
              {/* Images — all stacked, crossfade */}
              <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                {pillars.map((p, i) => (
                  <img
                    key={p.id}
                    src={imgSrcs[i]}
                    alt={p.title}
                    onError={() => handleImgError(i)}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/50 to-transparent pointer-events-none" />
              </div>

              {/* Text */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.135, 0.9, 0.15, 1] }}
                  >
                    <h3 className="text-white text-3xl lg:text-4xl xl:text-5xl font-medium mb-5 tracking-tight leading-tight">
                      {pillars[active].title}
                    </h3>
                    <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-3">
                      {pillars[active].body1}
                    </p>
                    <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-7">
                      {pillars[active].body2}
                    </p>
                    <a
                      href={pillars[active].link}
                      className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-[#b2f6e3] transition-colors duration-300"
                    >
                      Learn more
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5"/>
                      </svg>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar — animated with CSS, resets on tab change */}
            <div className="flex">
              {pillars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex-1 h-1 bg-white/10 relative overflow-hidden focus:outline-none"
                >
                  {active === i && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: CYCLE_DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                  {active !== i && (
                    <div className="absolute inset-0 bg-transparent" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
