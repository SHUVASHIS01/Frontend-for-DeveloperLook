import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Work data ───────────────────────────────────────────────────────────── */
const WORK = [
  {
    id:         'sixt',
    client:     'SIXT',
    period:     '[2023–2025]',
    category:   'Car rental',
    result:     'An extra 3m clicks regionally through SEO',
    href:       '/work/sixt/',
    img:        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85&fit=crop',
    overlayBg:  '#c8702a',
  },
  {
    id:         'dojo',
    client:     'Dojo – B2B',
    period:     '[2021–2025]',
    category:   'Card Machines',
    result:     'A B2B success story for Dojo card machines',
    href:       '/work/dojo/',
    img:        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&fit=crop',
    overlayBg:  '#5bbfb5',
  },
  {
    id:         'magnet',
    client:     'Magnet',
    period:     '[2023–2024]',
    category:   'Kitchen',
    result:     'Full-service SEO success story — 170%+ increase',
    href:       '/work/magnet-trade-b2b/',
    img:        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85&fit=crop',
    overlayBg:  '#3a3a5c',
  },
  {
    id:         'jd',
    client:     'JD Sports',
    period:     '[2025]',
    category:   'Trainers',
    result:     '65% up YoY in clicks for JDSports FR, IT, ES',
    href:       '/work/jd-sports-/',
    img:        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=85&fit=crop',
    overlayBg:  '#c8a020',
  },
  {
    id:         'revolution',
    client:     'Revolution Beauty',
    period:     '[2022–2025]',
    category:   'Beauty',
    result:     "Building the UK's leading beauty dupe brand",
    href:       '/work/revolution-beauty/',
    img:        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=85&fit=crop',
    overlayBg:  '#8b2252',
  },
];

/* ── Arrow SVG ───────────────────────────────────────────────────────────── */
const Arrow = ({ size = 16, color = '#121212' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none"
    stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── Component ───────────────────────────────────────────────────────────── */
export default function FeaturedWork() {
  const sectionRef  = useRef(null);
  const labelRefs   = useRef([]);
  const cardRefs    = useRef([]);
  const cursorRef   = useRef(null);
  const activeIdx   = useRef(0);

  useEffect(() => {
    const labels = labelRefs.current.filter(Boolean);
    const cards  = cardRefs.current.filter(Boolean);
    if (!labels.length || !cards.length) return;

    /* ── Initial label states ── */
    gsap.set(labels,      { opacity: 0.18 });
    gsap.set(labels[0],   { opacity: 1 });

    /* ── Activate helper ── */
    const activate = (i) => {
      if (activeIdx.current === i) return;
      activeIdx.current = i;
      gsap.to(labels,    { opacity: 0.18, duration: 0.45, ease: 'power2.out' });
      gsap.to(labels[i], { opacity: 1,    duration: 0.45, ease: 'power2.out' });
    };

    /* ── ScrollTrigger per card — no pinning ── */
    const triggers = cards.map((card, i) =>
      ScrollTrigger.create({
        trigger:     card,
        start:       'top 60%',
        end:         'bottom 40%',
        onEnter:     () => activate(i),
        onEnterBack: () => activate(i),
      })
    );

    /* ── Custom cursor RAF loop ── */
    const cursor = cursorRef.current;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    let raf;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop   = () => {
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    /* ── Card hover animations ── */
    const cleanups = cards.map((card) => {
      const overlay  = card.querySelector('[data-overlay]');
      const img      = card.querySelector('[data-img]');
      const caption  = card.querySelector('[data-caption]');

      /* Set initial GSAP state so nothing fights CSS */
      gsap.set(overlay,  { opacity: 0 });
      gsap.set(caption,  { opacity: 0, y: 14 });
      gsap.set(img,      { scale: 1, filter: 'brightness(1) blur(0px)' });

      const onEnter = () => {
        gsap.to(cursor,  { scale: 1,    duration: 0.3,  ease: 'back.out(1.7)' });
        gsap.to(overlay, { opacity: 1,  duration: 0.45, ease: 'power3.out' });
        gsap.to(img,     { scale: 1.04, filter: 'brightness(0.28) blur(3px)', duration: 0.5, ease: 'power3.out' });
        gsap.to(caption, { opacity: 1,  y: 0, duration: 0.38, ease: 'power3.out', delay: 0.06 });
      };

      const onLeave = () => {
        gsap.to(cursor,  { scale: 0,    duration: 0.22, ease: 'power2.in' });
        gsap.to(overlay, { opacity: 0,  duration: 0.38, ease: 'power3.out' });
        gsap.to(img,     { scale: 1,    filter: 'brightness(1) blur(0px)', duration: 0.42, ease: 'power3.out' });
        gsap.to(caption, { opacity: 0,  y: 14, duration: 0.28, ease: 'power3.in' });
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    /* ── Section enter/leave for cursor visibility ── */
    const section = sectionRef.current;
    const onSectionLeave = () => gsap.to(cursor, { scale: 0, duration: 0.2 });
    section.addEventListener('mouseleave', onSectionLeave);

    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onSectionLeave);
      cancelAnimationFrame(raf);
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      {/* ── Fixed custom cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position:      'fixed',
          top: 0, left: 0,
          zIndex:        9998,
          pointerEvents: 'none',
          transform:     'translate(-50%,-50%) scale(0)',
          width: 56, height: 56,
          background:    '#ffffff',
          borderRadius:  '50%',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          willChange:    'transform',
          boxShadow:     '0 4px 20px rgba(0,0,0,0.18)',
        }}
      >
        <Arrow size={16} color="#121212" />
      </div>

      {/* ── Responsive grid styles ── */}
      <style>{`
        .fw-grid {
          display: grid;
          grid-template-columns: clamp(240px,38%,460px) 1fr;
          align-items: start;
        }
        .fw-left {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 767px) {
          .fw-grid {
            grid-template-columns: 1fr;
          }
          .fw-left {
            position: relative;
            height: auto;
            padding-bottom: 0 !important;
          }
        }
      `}</style>

      {/* ── Section wrapper (matches page's dark card style) ── */}
      <section
        id="featured-work"
        ref={sectionRef}
        className="bg-[#efeeec]"
        style={{ paddingBottom: 24 }}
      >
        {/* overflow:clip keeps rounded corners without breaking sticky */}
        <div
          className="mx-3 sm:mx-4 lg:mx-6 rounded-3xl"
          style={{ background: '#0d0d0d', overflow: 'clip' }}
        >

          {/* ── 2-col grid: sticky left + scrolling right ── */}
          <div className="fw-grid">

            {/* ══ LEFT — sticky label panel ══ */}
            <div
              className="fw-left"
              style={{
                padding:     'clamp(32px,5vw,64px) clamp(24px,4vw,52px)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Section label */}
              <p style={{
                color:         'rgba(255,255,255,0.35)',
                fontSize:      12,
                fontWeight:    500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  'clamp(28px,4vh,48px)',
              }}>
                Featured Work
              </p>

              {/* Client list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1.2vh,14px)' }}>
                {WORK.map((item, i) => (
                  <a
                    key={item.id}
                    ref={el => { labelRefs.current[i] = el; }}
                    href={item.href}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{
                        color:         '#ffffff',
                        fontSize:      'clamp(22px,2.8vw,40px)',
                        fontWeight:    700,
                        letterSpacing: '-0.03em',
                        lineHeight:    1.1,
                      }}>
                        {item.client}
                      </span>
                      <span style={{
                        color:         'rgba(255,255,255,0.4)',
                        fontSize:      'clamp(9px,0.8vw,12px)',
                        fontWeight:    400,
                        letterSpacing: '0.04em',
                        flexShrink:    0,
                      }}>
                        {item.period}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* View all */}
              <a
                href="/work/"
                style={{
                  marginTop:     'clamp(28px,4vh,48px)',
                  display:       'inline-flex',
                  alignItems:    'center',
                  gap:           8,
                  color:         'rgba(255,255,255,0.38)',
                  fontSize:      12,
                  fontWeight:    500,
                  letterSpacing: '0.04em',
                  textDecoration:'none',
                  transition:    'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
              >
                View all work <Arrow size={10} color="currentColor" />
              </a>
            </div>

            {/* ══ RIGHT — scrolling cards ══ */}
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           'clamp(16px,2vw,24px)',
              padding:       'clamp(24px,4vw,48px)',
            }}>
              {WORK.map((item, i) => (
                <a
                  key={item.id}
                  ref={el => { cardRefs.current[i] = el; }}
                  href={item.href}
                  style={{
                    position:       'relative',
                    display:        'block',
                    borderRadius:   'clamp(16px,1.8vw,28px)',
                    overflow:       'hidden',
                    minHeight:      'clamp(320px,62vh,700px)',
                    cursor:         'none',
                    textDecoration: 'none',
                    flexShrink:     0,
                  }}
                >
                  {/* Image */}
                  <img
                    data-img
                    src={item.img}
                    alt={item.client}
                    loading="lazy"
                    style={{
                      position:        'absolute',
                      inset:           0,
                      width:           '100%',
                      height:          '100%',
                      objectFit:       'cover',
                      display:         'block',
                      transformOrigin: 'center center',
                    }}
                  />

                  {/* Subtle bottom gradient (always visible) */}
                  <div style={{
                    position:   'absolute',
                    bottom:     0, left: 0, right: 0,
                    height:     '45%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    zIndex:     1,
                    pointerEvents: 'none',
                  }} />

                  {/* Default bottom-right: category tag */}
                  {item.category && (
                    <div style={{
                      position:       'absolute',
                      bottom:         'clamp(14px,2vw,22px)',
                      right:          'clamp(14px,2vw,22px)',
                      zIndex:         2,
                      display:        'flex',
                      alignItems:     'center',
                      gap:            6,
                      background:     'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(10px)',
                      padding:        '6px 14px',
                      borderRadius:   999,
                      fontSize:       12,
                      fontWeight:     500,
                      color:          '#fff',
                      letterSpacing:  '0.02em',
                    }}>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <circle cx="6.5" cy="6.5" r="5" /><path d="M10.5 10.5l3 3" />
                      </svg>
                      {item.category}
                      <Arrow size={10} color="#ffffff" />
                    </div>
                  )}

                  {/* Color overlay (GSAP-controlled, starts opacity:0) */}
                  <div
                    data-overlay
                    style={{
                      position:   'absolute',
                      inset:      0,
                      background: item.overlayBg,
                      zIndex:     3,
                    }}
                  />

                  {/* Hover caption (GSAP-controlled, starts opacity:0 y:14) */}
                  <div
                    data-caption
                    style={{
                      position:        'absolute',
                      inset:           0,
                      zIndex:          4,
                      display:         'flex',
                      flexDirection:   'column',
                      justifyContent:  'space-between',
                      padding:         'clamp(24px,3.5vw,48px)',
                      pointerEvents:   'none',
                    }}
                  >
                    {/* Result text */}
                    <p style={{
                      color:         '#121212',
                      fontSize:      'clamp(22px,2.8vw,42px)',
                      fontWeight:    500,
                      letterSpacing: '-0.03em',
                      lineHeight:    1.15,
                      maxWidth:      '72%',
                    }}>
                      {item.result}
                    </p>

                    {/* Bottom row */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      {/* Mint circle arrow */}
                      <div style={{
                        width:           'clamp(56px,5.5vw,80px)',
                        height:          'clamp(56px,5.5vw,80px)',
                        background:      '#b2f6e3',
                        borderRadius:    '50%',
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                        flexShrink:      0,
                        boxShadow:       '0 8px 28px rgba(178,246,227,0.3)',
                      }}>
                        <Arrow size={20} color="#121212" />
                      </div>

                      {/* Category badge (hover version) */}
                      {item.category && (
                        <div style={{
                          display:        'flex',
                          alignItems:     'center',
                          gap:            6,
                          background:     'rgba(255,255,255,0.9)',
                          padding:        '7px 16px',
                          borderRadius:   999,
                          fontSize:       12,
                          fontWeight:     600,
                          color:          '#121212',
                          letterSpacing:  '0.02em',
                        }}>
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#121212" strokeWidth={2} strokeLinecap="round">
                            <circle cx="6.5" cy="6.5" r="5" /><path d="M10.5 10.5l3 3" />
                          </svg>
                          {item.category}
                          <Arrow size={10} color="#121212" />
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}

              {/* Explore CTA at bottom */}
              <div style={{ textAlign: 'center', paddingTop: 8 }}>
                <a
                  href="/work/"
                  style={{
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            8,
                    background:     '#ffffff',
                    color:          '#121212',
                    fontSize:       14,
                    fontWeight:     500,
                    padding:        '13px 28px',
                    borderRadius:   999,
                    textDecoration: 'none',
                    transition:     'background 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#b2f6e3'}
                  onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                >
                  Explore Our Work <Arrow size={11} color="#121212" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
