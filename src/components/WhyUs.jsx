import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pillars = [
  {
    id: 'pioneers',
    title: 'Pioneers',
    icon: '🚀',
    content:
      "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it. We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
  },
  {
    id: 'award-winning',
    title: 'Award Winning',
    icon: '🏆',
    content:
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
  },
  {
    id: 'speed',
    title: 'Speed',
    icon: '⚡',
    content:
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
  },
];

const WhyUs = () => {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="bg-black py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest font-semibold mb-3">Why Rise at Seven</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
            Built <span className="text-[#ff3c00]">Different</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Pillar Tabs */}
          <div className="flex flex-col gap-3">
            {pillars.map((pillar, i) => (
              <motion.button
                key={pillar.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`text-left p-6 border transition-all duration-300 ${
                  active === i
                    ? 'border-[#ff3c00] bg-[#ff3c00]/10'
                    : 'border-white/10 bg-white/3 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{pillar.icon}</span>
                  <div>
                    <h3 className={`text-lg font-black transition-colors duration-300 ${active === i ? 'text-[#ff3c00]' : 'text-white'}`}>
                      {pillar.title}
                    </h3>
                  </div>
                  <div className="ml-auto">
                    <svg
                      className={`w-5 h-5 transition-all duration-300 ${active === i ? 'text-[#ff3c00] rotate-90' : 'text-white/30'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content Panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="text-5xl mb-6">{pillars[active].icon}</div>
            <h3 className="text-3xl font-black text-white mb-4">{pillars[active].title}</h3>
            <p className="text-white/60 text-lg leading-relaxed">{pillars[active].content}</p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mt-16"
        >
          {[
            { value: '79+', label: 'Awards Won' },
            { value: '4', label: 'Global Offices' },
            { value: '60min', label: 'Idea to Result' },
            { value: '3yrs', label: 'Ahead of Trend' },
          ].map((stat) => (
            <div key={stat.label} className="bg-black p-8 text-center">
              <div className="text-4xl lg:text-5xl font-black text-[#ff3c00] mb-2">{stat.value}</div>
              <div className="text-white/50 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
