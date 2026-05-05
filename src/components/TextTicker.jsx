import React from 'react';

const words = ['Driving', 'Demand', '&', 'Discovery'];

const TextTicker = () => {
  // Repeat words enough times to fill wide screens
  const items = Array(8).fill(words).flat();

  return (
    <section className="bg-[#ff3c00] py-5 overflow-hidden select-none">
      <div className="relative flex">
        {/* First track */}
        <div
          className="flex gap-6 items-center whitespace-nowrap pr-6"
          style={{
            animation: 'marquee 22s linear infinite',
          }}
        >
          {items.map((word, i) => (
            <span
              key={i}
              className={`text-[clamp(36px,5vw,64px)] font-medium leading-none tracking-tight flex-shrink-0 ${
                word === '&' ? 'text-black' : 'text-white'
              }`}
            >
              {word}
              {word !== '&' && i < items.length - 1 && (
                <span className="text-black mx-1">·</span>
              )}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless looping */}
        <div
          className="flex gap-6 items-center whitespace-nowrap pr-6 absolute left-full top-0"
          style={{
            animation: 'marquee 22s linear infinite',
          }}
        >
          {items.map((word, i) => (
            <span
              key={`d-${i}`}
              className={`text-[clamp(36px,5vw,64px)] font-medium leading-none tracking-tight flex-shrink-0 ${
                word === '&' ? 'text-black' : 'text-white'
              }`}
            >
              {word}
              {word !== '&' && i < items.length - 1 && (
                <span className="text-black mx-1">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default TextTicker;
