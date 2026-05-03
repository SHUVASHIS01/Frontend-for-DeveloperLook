import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pillars = [
  {
    id: 'pioneers',
    title: 'Pioneers',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85',
    body1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    body2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
  },
  {
    id: 'award',
    title: 'Award Winning',
    img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=85',
    body1: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London.",
    body2: 'We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.',
  },
  {
    id: 'speed',
    title: 'Speed',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85',
    body1: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster.",
    body2: "We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="bg-[#e9edf4] py-6 pb-16">
      <div className="mx-3 sm:mx-4 lg:mx-6">
        {/* Dark rounded panel */}
        <div className="bg-[#0d0f15] rounded-3xl overflow-hidden" ref={ref}>
          <div className="max-w-[1400px] mx-auto">

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`flex-1 py-5 text-sm font-bold transition-all duration-200 ${
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
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: '360px' }}>
                  <img
                    src={pillars[active].img}
                    alt={pillars[active].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15]/60 to-transparent" />
                </div>

                {/* Text */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-white text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                    {pillars[active].title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-4">
                    {pillars[active].body1}
                  </p>
                  <p className="text-white/70 text-base leading-relaxed">
                    {pillars[active].body2}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="flex">
              {pillars.map((_, i) => (
                <div key={i} className="flex-1 h-1 bg-white/10">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: active === i ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
