import React from 'react';
import { motion } from 'framer-motion';

const TextTicker = () => {
  const phrases = [
    'Driving Demand',
    '&',
    'Discovery',
    'Driving Demand',
    '&',
    'Discovery',
    'Driving Demand',
    '&',
    'Discovery',
    'Driving Demand',
    '&',
    'Discovery',
  ];

  return (
    <section className="bg-[#ff3c00] py-6 overflow-hidden">
      <div className="relative flex overflow-hidden">
        <div className="ticker-animate flex gap-8 whitespace-nowrap items-center">
          {phrases.map((phrase, i) => (
            <span
              key={i}
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
                phrase === '&' ? 'text-black' : 'text-white'
              }`}
            >
              {phrase}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {phrases.map((phrase, i) => (
            <span
              key={`dup-${i}`}
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
                phrase === '&' ? 'text-black' : 'text-white'
              }`}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextTicker;
