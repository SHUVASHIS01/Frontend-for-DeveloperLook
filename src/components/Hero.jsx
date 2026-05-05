import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* Real hero images from the site's CDN */
const HERO_IMAGES = [
  'https://rise-atseven.transforms.svdcdn.com/production/images/Emirates-airpline-in-flight.avif?w=1330&h=700&q=90&auto=format&fit=crop',
  'https://rise-atseven.transforms.svdcdn.com/production/images/spaseekers.png?w=1330&h=700&q=90&auto=format&fit=crop',
  'https://rise-atseven.transforms.svdcdn.com/production/images/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.jpg?w=1330&h=700&q=90&auto=format&fit=crop',
];

/* Fallback in case CDN fails */
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=85&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85&fit=crop',
];

/* Real award logos from their CDN */
const AWARD_LOGOS = [
  {
    src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/global-search-awards.png?w=400&q=80&fm=webp&fit=crop',
    alt: 'Global Search Awards',
  },
  {
    src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Placeholder-logos/Mask-group.png?w=400&q=80&fm=webp&fit=crop',
    alt: 'The Drum',
  },
  {
    src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Awards/White/UKSocial-Media-Awards-White.png?w=400&q=80&fm=webp&fit=crop',
    alt: 'UK Social Media Awards',
  },
  {
    src: 'https://rise-atseven.transforms.svdcdn.com/production/images/Logos/Awards/White/UK-Content-Awards-White.png?w=400&q=80&fm=webp&fit=crop',
    alt: 'UK Content Awards',
    desktopOnly: true,
  },
];

/* Laurel SVG — exact from source */
const LaurelSVG = ({ flip }) => (
  <svg viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-5 fill-current text-white"
    style={flip ? { transform: 'scaleX(-1)' } : {}}>
    <path d="M25.826 36.2423C24.1628 35.2302 22.3284 34.9354 20.4357 34.7259C19.6852 34.6204 18.9236 34.4691 18.193 34.2705C17.3545 34.0474 16.5347 33.7576 15.7419 33.4062L16.4438 31.9431C17.2169 30.332 16.5375 28.3991 14.9263 27.6261L14.0759 29.3985C13.5361 30.5234 13.7046 31.805 14.4037 32.7394C13.3196 32.1373 12.3026 31.4146 11.3802 30.5845L12.6328 29.1752C13.8199 27.8396 13.6998 25.7945 12.364 24.6072L11.0579 26.0765C10.0602 27.199 9.98609 28.8225 10.7806 30.0168C10.6575 29.8939 10.5358 29.7692 10.4166 29.6422C9.49052 28.6654 8.6932 27.5814 8.02681 26.4223L9.41226 25.5441C10.9217 24.5875 11.3698 22.5885 10.4131 21.0791L8.75281 22.1315C7.7684 22.7554 7.23555 23.8229 7.24942 24.9087C6.7712 23.8595 6.39118 22.7641 6.11088 21.6429L7.61991 21.1998C9.33444 20.6962 10.3162 18.8982 9.81266 17.1835L7.92644 17.7374C6.85358 18.0523 6.06774 18.8744 5.75319 19.8655C5.57825 18.727 5.50281 17.5732 5.52904 16.4239L7.2633 16.4128C9.05024 16.4013 10.4897 14.9435 10.4782 13.1565L8.5124 13.1691C7.23035 13.1773 6.12736 13.93 5.61055 15.0146C5.73 13.7312 5.98818 12.4645 6.37211 11.2376L8.06062 11.7101C9.78144 12.1916 11.5669 11.1871 12.0486 9.46623L10.1554 8.93641C8.90673 8.58696 7.62424 9.02009 6.83038 9.94142C7.30904 8.72939 7.91213 7.56635 8.62664 6.47593L10.1355 7.40528C11.6568 8.34265 13.6501 7.86898 14.5873 6.3476L12.9135 5.31658C11.788 4.62331 10.4045 4.70222 9.38126 5.40589C9.87033 4.76053 10.4008 4.14639 10.9692 3.56888C11.3054 3.84679 11.7648 3.98423 12.2801 3.86023C12.6898 3.7616 13.1 3.57083 13.4724 3.24067C15.26 1.65751 15.26 0.0708753 15.26 0.0708753C13.0683 -0.225683 11.698 0.452629 10.855 1.28334C10.1931 1.93542 10.3013 2.86694 10.8194 3.42667C10.0988 4.13143 9.44456 4.88605 8.85752 5.68142C9.29 4.30204 8.75303 2.75334 7.46577 1.96057L5.792 0.929551C4.85463 2.45093 5.3283 4.44425 6.84968 5.3814L8.39642 6.33437C7.60321 7.51085 6.94961 8.76602 6.43887 10.0721C6.32463 8.76906 5.42108 7.61187 4.087 7.23857L2.19384 6.70876C1.71237 8.42958 2.71694 10.215 4.43776 10.6967L6.05409 11.1491C5.63353 12.4429 5.34824 13.7772 5.2004 15.1264C4.69182 13.9916 3.54916 13.2042 2.22571 13.2127L0.259922 13.2252C0.271412 15.0122 1.72927 16.4516 3.51621 16.4401L5.10068 16.4299C5.03933 17.8386 5.12691 19.2542 5.36667 20.6479C4.57671 19.6171 3.20665 19.1237 1.88601 19.5115L0 20.0652C0.503586 21.7797 2.30158 22.7615 4.01633 22.2579L5.59928 21.7931C5.90776 23.1092 6.35563 24.398 6.94419 25.6345C5.91621 24.9679 4.55222 24.917 3.44966 25.6157L1.78932 26.6681C2.74598 28.1776 4.74494 28.6257 6.25439 27.669L7.56983 26.8353C8.22039 27.9801 9.00038 29.0699 9.91151 30.0823C8.7617 29.767 7.48073 30.1015 6.63528 31.053L5.32916 32.5224C6.66476 33.7095 8.70989 33.5894 9.89721 32.2535L10.9189 31.1042C11.9553 32.0671 13.113 32.8948 14.3532 33.5737C13.0642 33.4781 11.7889 34.1658 11.196 35.4014L10.3455 37.1739C11.9566 37.9469 13.8895 37.2675 14.6625 35.6564L15.4065 34.1057C16.8386 34.7702 18.36 35.2451 19.9167 35.5122C20.2867 35.5738 20.73 35.6432 21.0908 35.6865C23.2018 35.9542 24.9211 36.55 26.5574 37.9224L27.162 37.1667C26.7397 36.8346 26.2964 36.5207 25.8264 36.2426L25.826 36.2423Z"/>
  </svg>
);

export default function Hero() {
  const [current, setCurrent]   = useState(0);
  const [imgSrcs, setImgSrcs]   = useState(HERO_IMAGES);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % imgSrcs.length), 4000);
    return () => clearInterval(id);
  }, [imgSrcs.length]);

  const handleImgError = (i) => {
    setImgSrcs(prev => {
      const next = [...prev];
      next[i] = FALLBACK_IMAGES[i] || FALLBACK_IMAGES[0];
      return next;
    });
  };

  return (
    /*
     * The hero section has padding (p-2) and the card itself is rounded-3xl.
     * marginTop: -72px pulls it behind the sticky navbar (72px = nav height).
     */
    <section className="bg-[#efeeec] p-2" style={{ marginTop: '-72px' }}>
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-[#111212]"
        style={{ minHeight: '100svh' }}
      >
        {/* ── Background image crossfade ── */}
        <div className="absolute inset-0 z-0 scale-105">
          {imgSrcs.map((src, i) => (
            <img key={i} src={src} alt="" aria-hidden="true" onError={() => handleImgError(i)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'blur(60px) saturate(1.2) brightness(0.35)',
                opacity: i === current ? 1 : 0,
                transition: 'opacity 1.6s ease',
              }}
            />
          ))}
        </div>

        {/* Dim overlay */}
        <div className="absolute inset-0 z-[1] bg-[#111212]/25" />

        {/* ── Main content ── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-10"
          style={{ minHeight: '100svh', paddingTop: '120px', paddingBottom: '120px' }}
        >
          {/* Award strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.135, 0.9, 0.15, 1] }}
            className="mb-8 flex flex-col items-center"
          >
            <p className="uppercase text-xs font-medium leading-tight tracking-tight max-w-52 text-balance text-center mb-3 text-white">
              #1 Most recommended content marketing agency
            </p>
            <div className="flex items-center gap-x-2">
              <LaurelSVG />
              <div className="flex items-center gap-x-3 sm:gap-x-4 px-3 sm:px-4 border-l border-r border-white/20">
                {AWARD_LOGOS.map((award) => (
                  <div key={award.alt} className={`w-12 relative ${award.desktopOnly ? 'hidden lg:block' : ''}`}
                    style={{ aspectRatio: '20/9' }}>
                    <img src={award.src} alt={award.alt}
                      className="w-full h-full object-contain absolute inset-0"
                      style={{ opacity: 0, transition: 'opacity 0.3s' }}
                      onLoad={e => { e.target.style.opacity = '1'; }}
                    />
                  </div>
                ))}
              </div>
              <LaurelSVG flip />
            </div>
          </motion.div>

          {/* "We Create" + "Category [pill] Leaders" */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.135, 0.9, 0.15, 1] }}
            className="text-white font-medium tracking-tight leading-[0.9] text-[clamp(52px,10.5vw,148px)]"
          >
            <div className="flex flex-wrap justify-center">
              <span className="mr-3">We</span>
              <span>Create</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 mt-1">
              <span>Category</span>

              {/* Floating pill image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex shrink-0 relative overflow-hidden bg-black/10"
                style={{
                  width:  'clamp(56px, 7.5vw, 110px)',
                  height: 'clamp(56px, 7.5vw, 110px)',
                  borderRadius: 'clamp(10px, 1.5vw, 20px)',
                }}
              >
                {imgSrcs.map((src, i) => (
                  <img key={i} src={src} alt="" onError={() => handleImgError(i)}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1s ease' }}
                  />
                ))}
              </motion.div>

              <span>Leaders</span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.135, 0.9, 0.15, 1] }}
            className="text-white font-medium tracking-tight mt-4 lg:mt-5 text-lg sm:text-xl lg:text-2xl xl:text-3xl"
          >
            on every searchable platform
          </motion.div>
        </div>

        {/* ── Bottom-left copy ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-6 left-5 sm:left-7 lg:left-8 z-10 max-w-[280px] sm:max-w-[360px] hidden md:block"
        >
          <p className="text-white text-sm leading-normal">
            Organic media planners creating, distributing &amp; optimising{' '}
            <strong className="font-medium">search-first</strong>{' '}
            content for SEO, Social, PR, Ai and LLM search
          </p>
        </motion.div>

        {/* ── Bottom-right offices ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-6 right-5 sm:right-7 lg:right-8 z-10 text-right"
        >
          <p className="text-white text-sm leading-normal">
            <strong className="font-medium">4 Global Offices serving</strong><br />
            <strong className="font-medium">UK, USA (New York) &amp; EU</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
