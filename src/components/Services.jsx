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
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── ServiceItem ─────────────────────────────────────────────────────────── */
function ServiceItem({ service }) {
  const itemRef  = useRef(null);
  const bgRef    = useRef(null);
  const labelRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    /* Initial states */
    gsap.set(bgRef.current,    { opacity: 0, borderRadius: 28 });
    gsap.set(arrowRef.current, { opacity: 0, x: -8 });

    const onEnter = () => {
      gsap.to(bgRef.current,    { opacity: 1, borderRadius: 28, duration: 0.45, ease: 'power3.out' });
      gsap.to(labelRef.current, { color: '#ffffff', x: 8, duration: 0.3, ease: 'power2.out' });
      gsap.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(bgRef.current,    { opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(labelRef.current, { color: '#282828', x: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(arrowRef.current, { opacity: 0, x: -8, duration: 0.3, ease: 'power2.out' });
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
        overflow: 'visible',
        padding: 'clamp(22px,3vw,40px) clamp(16px,2.2vw,28px)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Background image — fades in on hover, rounded corners applied here */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: 28,
          overflow: 'hidden',
        }}
      >
        <img
          src={service.img}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient: dark left → lighter right */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 45%, rgba(10,10,10,0.28) 100%)',
        }} />
      </div>

      {/* Content row */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Arrow — slides in on hover */}
        <span ref={arrowRef} style={{ color: '#fff', flexShrink: 0, lineHeight: 0 }}>
          <ArrowSVG size={18} />
        </span>
        {/* Label */}
        <span
          ref={labelRef}
          style={{
            fontSize: 'clamp(20px,3vw,44px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: '#282828',
            willChange: 'color, transform',
          }}
        >
          {service.label}
        </span>
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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}
        >
          {/* "Our [img] Services" */}
          <h2 style={{
            fontSize: 'clamp(48px,7vw,100px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#282828',
            display: 'flex',
            alignItems: 'center',
            gap: '0.18em',
            flexWrap: 'wrap',
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

          {/* View All Services — slide-up hover, no color change */}
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
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, overflow: 'hidden', lineHeight: 1.2 }}>
              <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View All Services <ArrowSVG size={12} />
              </span>
              <span className="absolute inset-0 inline-flex items-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative' }}>
                {/* Vertical column divider */}
                <div style={{
                  position: 'absolute', left: '50%', top: 0, bottom: 0,
                  width: 1, background: 'rgba(0,0,0,0.10)',
                  pointerEvents: 'none',
                }} />
                {row.map(service => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
              {/* Row divider */}
              <div style={{ height: 1, background: 'rgba(0,0,0,0.10)' }} />
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
