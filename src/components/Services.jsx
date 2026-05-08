import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Service data ────────────────────────────────────────────────────────── */
const services = [
  {
    id: 'digital-pr',
    label: 'Digital PR',
    href: '/services/digital-pr/',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80&fit=crop',
  },
  {
    id: 'organic-social',
    label: 'Organic Social & Content',
    href: '/services/social/',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80&fit=crop',
  },
  {
    id: 'search-strategy',
    label: 'Search & Growth Strategy',
    href: '/services/strategy-growth/',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop',
  },
  {
    id: 'content-experience',
    label: 'Content Experience',
    href: '/services/content-experience/',
    img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=80&fit=crop',
  },
  {
    id: 'data-insights',
    label: 'Data & Insights',
    href: '/services/data-insights/',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop',
  },
  {
    id: 'onsite-seo',
    label: 'Onsite SEO',
    href: '/services/onsite-seo/',
    img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80&fit=crop',
  },
];

/* Pair services into rows: [0,1], [2,3], [4,5] */
const rows = [];
for (let i = 0; i < services.length; i += 2) rows.push(services.slice(i, i + 2));

/* ── Arrow SVG ───────────────────────────────────────────────────────────── */
const ArrowSVG = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── ServiceItem ─────────────────────────────────────────────────────────── */
/*
  Matches the real site's exact hover mechanic:
  - Arrow: absolute, starts at (-100%, 100%, -45deg) → (0, 0, 0deg) on hover
  - Label: always x:40 on desktop, shifts to x:56 on hover, turns white
  - Background: full pill (border-radius 9999px), image at opacity 0.6, slight scale on hover
  - Color transition on the content row via GSAP
*/
function ServiceItem({ service }) {
  const itemRef    = useRef(null);
  const bgRef      = useRef(null);
  const imgRef     = useRef(null);
  const labelRef   = useRef(null);
  const arrowRef   = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // Initial states
    gsap.set(bgRef.current,    { opacity: 0 });
    gsap.set(arrowRef.current, { x: '-100%', y: '100%', rotation: -45 });
    gsap.set(labelRef.current, { x: 40, color: '#282828' });

    const onEnter = () => {
      gsap.to(bgRef.current,    { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.to(imgRef.current,   { scale: 1.05, duration: 0.65, ease: 'power2.out' });
      gsap.to(arrowRef.current, { x: '0%', y: '0%', rotation: 0, duration: 0.42, ease: 'power3.out' });
      gsap.to(labelRef.current, { x: 56, color: '#ffffff', duration: 0.4, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(bgRef.current,    { opacity: 0, duration: 0.45, ease: 'power2.out' });
      gsap.to(imgRef.current,   { scale: 1, duration: 0.5, ease: 'power2.out' });
      gsap.to(arrowRef.current, { x: '-100%', y: '100%', rotation: -45, duration: 0.35, ease: 'power2.in' });
      gsap.to(labelRef.current, { x: 40, color: '#282828', duration: 0.35, ease: 'power2.out' });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <a
      ref={itemRef}
      href={service.href}
      style={{
        display: 'block',
        position: 'relative',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* ── Content row — always on top ── */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 2,
          padding: 'clamp(12px,1vw,16px) clamp(12px,1.2vw,18px)',
          display: 'flex', alignItems: 'center', gap: 0,
        }}
      >
        {/* Arrow container — overflow hidden clips the diagonal fly-in */}
        <div style={{
          position: 'relative',
          width: 'clamp(18px,1.8vw,26px)',
          height: 'clamp(18px,1.8vw,26px)',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <span
            ref={arrowRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              color: '#fff',
              lineHeight: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
            }}
          >
            <ArrowSVG size={20} />
          </span>
        </div>

        {/* Label — starts offset x:40, shifts to x:56 on hover */}
        <span
          ref={labelRef}
          style={{
            fontSize: 'clamp(20px,2.5vw,40px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            color: '#282828',
            willChange: 'color, transform',
          }}
        >
          {service.label}
        </span>
      </div>

      {/* ── Background — full pill shape, absolutely positioned so it doesn't affect row height ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', inset: '2px 0',
          zIndex: 1,
          borderRadius: 9999,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <img
          ref={imgRef}
          src={service.img}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            opacity: 0.62,
            transformOrigin: 'center center',
          }}
        />
      </div>
    </a>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="services" style={{ background: '#efeeec', padding: 'clamp(60px,6vw,100px) 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }} ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.135, 0.9, 0.15, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', marginBottom: 24 }}
        >
          {/* "Our [img] Services" */}
          <h2 style={{
            fontSize: 'clamp(48px,7vw,100px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#282828',
            display: 'flex',
            alignItems: 'center',
            gap: '0.18em',
            flexWrap: 'wrap',
            margin: 0,
          }}>
            <span>Our</span>
            <span style={{
              display: 'inline-block',
              width: 'clamp(46px,5vw,72px)',
              height: 'clamp(46px,5vw,72px)',
              borderRadius: 12,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              top: '0.04em',
            }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=85&fit=crop"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </span>
            <span>Services</span>
          </h2>

          {/* View All Services — slide-up text, no color change, border-radius shrinks on hover */}
          <a
            href="/services/"
            className="group"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.12)',
              color: '#282828',
              fontSize: 14, fontWeight: 500,
              padding: '11px 22px',
              borderRadius: 999,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              overflow: 'hidden',
              transition: 'border-radius 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderRadius = '12px'; }}
            onMouseLeave={e => { e.currentTarget.style.borderRadius = '9999px'; }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, overflow: 'hidden', lineHeight: 1.2 }}>
              <span
                className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                View All Services <ArrowSVG size={12} />
              </span>
              <span
                className="absolute inset-0 inline-flex items-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                aria-hidden="true"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                View All Services <ArrowSVG size={12} />
              </span>
            </span>
          </a>
        </motion.div>

        {/* Top divider */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.10)' }} />

        {/* ── Service rows: 2-column grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {rows.map((row, rowIdx) => (
            <div key={rowIdx}>
              {/* 2-column grid with gap-x-2 and vertical column divider */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 8px', position: 'relative' }}>
                {/* Vertical column divider — inset 48px each side like the real site */}
                <div style={{
                  position: 'absolute', left: '50%', top: '12px', bottom: '12px',
                  width: 1, background: 'rgba(0,0,0,0.10)',
                  pointerEvents: 'none',
                }} />
                {row.map(service => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
              {/* Row divider — inset 48px each side matching real site's px-12 */}
              <div style={{ height: 1, background: 'rgba(0,0,0,0.10)', margin: '0 48px' }} />
            </div>
          ))}
        </motion.div>

        {/* ── "Chasing Consumers" CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.135, 0.9, 0.15, 1] }}
          style={{ marginTop: 'clamp(48px,5vw,80px)', background: '#121212', borderRadius: 24, overflow: 'hidden' }}
        >
          {/* Scrolling marquee rows */}
          <div style={{ paddingTop: 'clamp(32px,4vw,56px)', overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
                {Array(6).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span style={{ fontSize: 'clamp(42px,6.5vw,100px)', fontWeight: 500, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      Chasing Consumers
                    </span>
                    <span style={{ fontSize: 'clamp(42px,6.5vw,100px)', fontWeight: 500, color: 'rgba(255,255,255,0.15)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 8 }}>
              <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center', gap: 40, animationDirection: 'reverse', animationDuration: '20s' }}>
                {Array(6).fill(null).map((_, i) => (
                  <React.Fragment key={i}>
                    <span style={{ fontSize: 'clamp(42px,6.5vw,100px)', fontWeight: 500, color: 'rgba(255,255,255,0.15)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      Chasing Consumers
                    </span>
                    <span style={{ fontSize: 'clamp(42px,6.5vw,100px)', fontWeight: 500, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      Not Algorithms
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA row */}
          <div style={{
            padding: 'clamp(24px,3vw,40px) clamp(24px,4vw,48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
              We chase consumers, not algorithms — creating content that puts brands at the centre of what people are actually searching for.
            </p>
            <a
              href="/contact/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#b2f6e3',
                color: '#121212',
                fontSize: 14, fontWeight: 500,
                padding: '12px 24px',
                borderRadius: 999,
                textDecoration: 'none',
                transition: 'background 0.25s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#b2f6e3'; }}
            >
              Work With Us <ArrowSVG size={12} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
