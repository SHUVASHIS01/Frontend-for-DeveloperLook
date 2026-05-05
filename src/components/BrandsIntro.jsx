import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logos = [
  { name: 'JD Sports',          src: 'https://logo.clearbit.com/jdsports.co.uk' },
  { name: 'Kroger',             src: 'https://logo.clearbit.com/kroger.com' },
  { name: 'HubSpot',            src: 'https://logo.clearbit.com/hubspot.com' },
  { name: 'Xbox',               src: 'https://logo.clearbit.com/xbox.com' },
  { name: 'SIXT',               src: 'https://logo.clearbit.com/sixt.com' },
  { name: 'Revolution Beauty',  src: 'https://logo.clearbit.com/revolutionbeauty.com' },
  { name: 'PlayStation',        src: 'https://logo.clearbit.com/playstation.com' },
  { name: 'Red Bull',           src: 'https://logo.clearbit.com/redbull.com' },
  { name: 'Capital One',        src: 'https://logo.clearbit.com/capitalone.com' },
  { name: 'Parkdean',           src: 'https://logo.clearbit.com/parkdeanresorts.co.uk' },
  { name: 'PrettyLittleThing',  src: 'https://logo.clearbit.com/prettylittlething.com' },
  { name: 'Dojo',               src: 'https://logo.clearbit.com/dojo.tech' },
];

// Doubled for seamless infinite loop
const loopLogos = [...logos, ...logos];

function LogoItem({ logo }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <span className="text-[#282828] font-black text-sm sm:text-lg tracking-tight opacity-35 hover:opacity-65 transition-opacity duration-300 flex-shrink-0 whitespace-nowrap select-none">
        {logo.name.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logo.src}
      alt={logo.name}
      title={logo.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-6 sm:h-8 lg:h-9 w-auto object-contain grayscale opacity-50 hover:opacity-90 hover:grayscale-0 transition-all duration-300 flex-shrink-0 select-none"
      draggable={false}
    />
  );
}

export default function BrandsAndIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-[#efeeec] pt-12 pb-0" ref={ref}>

      {/* "The agency behind..." label */}
      <motion.div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: [0.135, 0.9, 0.15, 1] }}
      >
        <p className="text-[#282828]/50 text-sm font-medium">The agency behind ...</p>
      </motion.div>

      {/* ── Seamless logo marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative overflow-hidden mb-12"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
      >
        <div className="logo-track flex items-center gap-10 sm:gap-14 py-2">
          {loopLogos.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-px bg-black/10 mb-14" />

        {/* Driving Demand & Discovery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.135, 0.9, 0.15, 1] }}
            className="text-[clamp(40px,5.5vw,72px)] font-black text-[#282828] leading-[0.95] tracking-[-0.03em]"
          >
            Driving Demand<br />&amp; Discovery
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.135, 0.9, 0.15, 1] }}
            className="flex flex-col justify-between h-full"
          >
            <p className="text-[#282828]/70 text-lg leading-relaxed mb-8">
              A global team of search-first content marketers engineering semantic relevancy &amp; category signals for both the internet and people
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/about/"
                id="intro-our-story-btn"
                className="flex items-center justify-center gap-2 bg-white text-[#282828] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#282828] hover:text-white transition-all duration-300 shadow-sm border border-black/10"
              >
                Our Story <span className="text-base">↗</span>
              </a>
              <a
                href="/services/"
                id="intro-services-btn"
                className="flex items-center justify-center gap-2 bg-white text-[#282828] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#282828] hover:text-white transition-all duration-300 shadow-sm border border-black/10"
              >
                Our Services <span className="text-base">↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
