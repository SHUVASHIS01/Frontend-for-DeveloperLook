import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Logos ───────────────────────────────────────────────────────────────── */
const logos = [
  { name: 'Red Bull',           src: 'https://logo.clearbit.com/redbull.com' },
  { name: 'JD Sports',          src: 'https://logo.clearbit.com/jdsports.co.uk' },
  { name: 'Kroger',             src: 'https://logo.clearbit.com/kroger.com' },
  { name: 'HubSpot',            src: 'https://logo.clearbit.com/hubspot.com' },
  { name: 'Xbox',               src: 'https://logo.clearbit.com/xbox.com' },
  { name: 'Samsung',            src: 'https://logo.clearbit.com/samsung.com' },
  { name: 'Nike',               src: 'https://logo.clearbit.com/nike.com' },
  { name: 'Spotify',            src: 'https://logo.clearbit.com/spotify.com' },
  { name: 'PlayStation',        src: 'https://logo.clearbit.com/playstation.com' },
  { name: 'Airbnb',             src: 'https://logo.clearbit.com/airbnb.com' },
  { name: 'Shopify',            src: 'https://logo.clearbit.com/shopify.com' },
  { name: 'Stripe',             src: 'https://logo.clearbit.com/stripe.com' },
  { name: 'Notion',             src: 'https://logo.clearbit.com/notion.so' },
  { name: 'Figma',              src: 'https://logo.clearbit.com/figma.com' },
  { name: 'SIXT',               src: 'https://logo.clearbit.com/sixt.com' },
  { name: 'Revolution Beauty',  src: 'https://logo.clearbit.com/revolutionbeauty.com' },
  { name: 'Dojo',               src: 'https://logo.clearbit.com/dojo.tech' },
  { name: 'Capital One',        src: 'https://logo.clearbit.com/capitalone.com' },
];

/* Duplicated so the seamless loop never shows a gap */
const loopLogos = [...logos, ...logos];

/* ── Logo item (falls back to bold text if image fails) ──────────────────── */
function LogoItem({ logo }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <span style={{
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '-0.01em',
        color: 'rgba(40,40,40,0.38)',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}>
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
      style={{
        height: 28,
        width: 'auto',
        objectFit: 'contain',
        filter: 'grayscale(1)',
        opacity: 0.45,
        flexShrink: 0,
        userSelect: 'none',
        transition: 'opacity 0.3s',
      }}
      draggable={false}
    />
  );
}

/* ── Arrow icon ──────────────────────────────────────────────────────────── */
const ArrowSVG = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── Main component ──────────────────────────────────────────────────────── */
export default function BrandsAndIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      ref={ref}
      style={{ background: '#efeeec', paddingTop: 'clamp(40px,5vw,80px)', paddingBottom: 0 }}
    >

      {/* ══ TOP ROW: label + marquee on the same horizontal line ══ */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'clamp(28px,4vw,52px)' }}>

        {/* "The agency behind" — fixed left label */}
        <div style={{
          flexShrink: 0,
          paddingLeft: 'clamp(16px,4vw,48px)',
          paddingRight: 20,
          minWidth: 'clamp(130px,11%,180px)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(40,40,40,0.45)',
            whiteSpace: 'nowrap',
          }}>
            The agency behind
          </p>
        </div>

        {/* Scrolling logo strip — fills remaining width */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}>
          {/* logo-track drives the CSS animation (right → left, 38 s) */}
          <div className="logo-track" style={{ display: 'flex', alignItems: 'center', gap: 52 }}>
            {loopLogos.map((logo, i) => (
              <LogoItem key={i} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.10)', marginBottom: 'clamp(36px,5vw,64px)' }} />

        {/* ── Two-column grid: description LEFT · heading RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start pb-20 lg:pb-28">

          {/* LEFT — description paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.135, 0.9, 0.15, 1] }}
            style={{
              fontSize: 'clamp(16px,1.55vw,22px)',
              fontWeight: 600,
              lineHeight: 1.28,
              letterSpacing: '-0.02em',
              color: '#282828',
            }}
          >
            A global team of search-first content marketers engineering semantic
            relevancy &amp; category signals for both the internet and people
          </motion.p>

          {/* RIGHT — heading + CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.135, 0.9, 0.15, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {/* Heading: "Driving Demand & Discovery [inline-img]" */}
            <h2 style={{
              fontSize: 'clamp(40px,5.5vw,90px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#282828',
            }}>
              Driving Demand &amp;{' '}
              <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                Discovery
                {/* Inline rounded image, just like the real site */}
                <span style={{
                  display: 'inline-block',
                  width: 'clamp(50px,4.8vw,78px)',
                  height: 'clamp(50px,4.8vw,78px)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginLeft: '0.1em',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: '-0.06em',
                  flexShrink: 0,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&q=85&fit=crop"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </span>
              </span>
            </h2>

            {/* CTA buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {/* Pill button */}
              <a
                href="/about/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.12)',
                  color: '#282828',
                  fontSize: 14, fontWeight: 500,
                  padding: '11px 22px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  transition: 'background 0.25s, color 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#282828';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#282828';
                }}
              >
                Our Story <ArrowSVG />
              </a>

              {/* Ghost / text link */}
              <a
                href="/services/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: '#282828',
                  fontSize: 14, fontWeight: 500,
                  padding: '11px 4px',
                  textDecoration: 'none',
                  opacity: 1,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.55'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Our Services <ArrowSVG />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
