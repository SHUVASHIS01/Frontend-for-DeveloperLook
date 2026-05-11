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
  const sectionRef          = useRef(null);
  
  // Left side refs
  const textsContainerRef   = useRef(null);
  const textsRef            = useRef([]);
  
  // Right side refs
  const imagesContainerRef  = useRef(null);
  const imagesRef           = useRef([]);
  
  // Interaction refs
  const cursorRef   = useRef(null);
  const imgRefs     = useRef([]);
  const overlayRefs = useRef([]);
  const captionRefs = useRef([]);

  /* ── 1. ScrollTimeline Setup (Dual Scroll) ── */
  useEffect(() => {
    // Skip GSAP pin on mobile — layout handled by CSS
    if (window.innerWidth <= 768) return;

    let ctx = gsap.context(() => {
      const texts = textsRef.current.filter(Boolean);
      const images = imagesRef.current.filter(Boolean);
      const tContainer = textsContainerRef.current;
      const iContainer = imagesContainerRef.current;

      if (!texts.length || !images.length || !tContainer || !iContainer) return;

      const getCenterY = (el) => -(el.offsetTop + el.offsetHeight / 2);

      // Initial State Setup
      gsap.set(texts, { opacity: 0.2 });
      gsap.set(texts[0], { opacity: 1 });
      
      // Both columns start perfectly centered on the first item
      gsap.set(tContainer, { y: getCenterY(texts[0]) });
      gsap.set(iContainer, { y: getCenterY(images[0]) });

      // Build Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          anticipatePin: 1, // Fixes fast scroll up jumping
          scrub: 1.5,       // Slower scrub for cinematic feel
          start: 'top top',
          end: `+=${WORK.length * 100}%`,
          invalidateOnRefresh: true, // Recalculates offsets on resize
        }
      });

      // Animate transitions between items synchronously
      texts.forEach((text, i) => {
        if (i === 0) return;
        
        // Translate both containers to center the next active item
        tl.to(tContainer, {
          y: () => getCenterY(texts[i]),
          duration: 1,
          ease: 'none'
        }, i);
        
        tl.to(iContainer, {
          y: () => getCenterY(images[i]),
          duration: 1,
          ease: 'none'
        }, i);
        
        // Crossfade text opacity
        tl.to(texts[i - 1], {
          opacity: 0.2,
          duration: 1,
          ease: 'none'
        }, i);
        
        tl.to(texts[i], {
          opacity: 1,
          duration: 1,
          ease: 'none'
        }, i);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── 2. Lightweight Cursor Tracking ── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── 3. Hover Interaction Handlers ── */
  const handleMouseEnter = (i) => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    gsap.to(overlayRefs.current[i], { opacity: 1, duration: 0.45, ease: 'power3.out' });
    gsap.to(imgRefs.current[i], { scale: 1.04, filter: 'brightness(0.28) blur(3px)', duration: 0.5, ease: 'power3.out' });
    gsap.to(captionRefs.current[i], { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out', delay: 0.06 });
  };

  const handleMouseLeave = (i) => {
    gsap.to(cursorRef.current, { scale: 0, duration: 0.22, ease: 'power2.in' });
    gsap.to(overlayRefs.current[i], { opacity: 0, duration: 0.38, ease: 'power3.out' });
    gsap.to(imgRefs.current[i], { scale: 1, filter: 'brightness(1) blur(0px)', duration: 0.42, ease: 'power3.out' });
    gsap.to(captionRefs.current[i], { opacity: 0, y: 14, duration: 0.28, ease: 'power3.in' });
  };

  return (
    <>
      {/* ── Custom cursor — mint circle, only visible on active card hover ── */}
      <div
        ref={cursorRef}
        style={{
          position:      'fixed',
          top: 0, left: 0,
          zIndex:        9998,
          pointerEvents: 'none',
          width: 48, height: 48,
          background:    '#b2f6e3',
          borderRadius:  '50%',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          willChange:    'transform',
        }}
      >
        <Arrow size={16} color="#282828" />
      </div>

      {/* ── Responsive grid styles ── */}
      <style>{`
        .fw-grid {
          display: grid;
          grid-template-columns: clamp(240px,38%,460px) 1fr;
          height: 100%;
        }
        .fw-left {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ── Mobile ≤768px: static stacked, no GSAP ── */
        @media (max-width: 768px) {
          #featured-work { height: auto !important; }
          .fw-grid { grid-template-columns: 1fr !important; height: auto !important; }
          .fw-left { height: auto !important; padding: 16px 16px 0 !important; border-right: none !important; }
          .fw-texts-outer, .fw-view-all { display: none !important; }
          .fw-texts-container { position: static !important; top: unset !important; transform: none !important; }
          .fw-images-container { position: static !important; top: unset !important; transform: none !important; }
          .fw-images-outer { height: auto !important; overflow: visible !important; }
          .fw-image-item { height: clamp(220px,55vw,380px) !important; cursor: auto !important; }
          .fw-right-col { height: auto !important; }
          .fw-category-tag { top: 12px !important; bottom: auto !important; left: auto !important; right: 12px !important; }
          .fw-mobile-client-info { display: flex !important; }
        }

        /* ── Tablet 769–1024px: GSAP-pinned, full-card images, label overlaid ── */
        @media (max-width: 1024px) and (min-width: 769px) {
          /* Grid becomes single-row so fw-right-col fills full card height */
          .fw-grid { grid-template-columns: 1fr !important; grid-template-rows: 1fr !important; height: 100% !important; position: relative !important; }
          /* fw-left floats above the images as an overlay — no grid space consumed */
          .fw-left { position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: auto !important; padding: 20px 24px !important; border-right: none !important; z-index: 10; background: transparent; pointer-events: none; }
          .fw-left > * { pointer-events: auto; }
          .fw-texts-outer, .fw-view-all { display: none !important; }
          /* Right col now fills the entire card */
          .fw-right-col { height: 100% !important; padding: 10px !important; }
          .fw-images-outer { height: 100% !important; }
          /* Taller images for tablet — fill most of the pinned card */
          .fw-image-item { height: clamp(300px,72vh,680px) !important; }
          .fw-category-tag { top: 14px !important; bottom: auto !important; left: auto !important; right: 14px !important; }
          .fw-mobile-client-info { display: flex !important; }
        }
      `}</style>

      {/* ── Section wrapper (Pinned, Full Screen) ── */}
      <section
        id="featured-work"
        ref={sectionRef}
        className="bg-[#efeeec]"
        style={{ 
          height: '100vh', 
          padding: 'clamp(24px, 4vh, 48px) 0', 
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Full-height dark card container */}
        <div
          className="mx-3 sm:mx-4 lg:mx-6 rounded-3xl"
          style={{ background: '#0d0d0d', overflow: 'hidden', flex: 1 }}
        >
          {/* ── 2-col grid ── */}
          <div className="fw-grid">

            {/* ══ LEFT — Scrolling labels ══ */}
            <div
              className="fw-left"
              style={{
                padding:     'clamp(32px,5vw,64px) clamp(24px,4vw,52px)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Static Section label */}
              <p style={{
                color:         'rgba(255,255,255,0.35)',
                fontSize:      12,
                fontWeight:    500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  'clamp(28px,4vh,48px)',
                flexShrink:    0,
              }}>
                Featured Work
              </p>

              {/* Dynamic Scrolling Client List */}
              <div className="fw-texts-outer" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <div ref={textsContainerRef} className="fw-texts-container" style={{ position: 'absolute', top: '50%', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {WORK.map((item, i) => (
                      <a
                        key={item.id}
                        ref={el => { textsRef.current[i] = el; }}
                        href={item.href}
                        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexWrap: 'nowrap' }}>
                          <span style={{
                            color:         '#ffffff',
                            fontSize:      'clamp(48px,5.5vw,96px)',
                            fontWeight:    700,
                            letterSpacing: '-0.04em',
                            lineHeight:    1.05,
                          }}>
                            {item.client}
                          </span>
                          <span style={{
                            color:         'rgba(255,255,255,0.4)',
                            fontSize:      'clamp(10px,0.8vw,14px)',
                            fontWeight:    500,
                            letterSpacing: '0.04em',
                            marginTop:     '12px',
                            flexShrink:    0,
                          }}>
                            {item.period}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Static View all CTA */}
              <a
                className="fw-view-all"
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
                  flexShrink:    0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
              >
                View all work <Arrow size={10} color="currentColor" />
              </a>
            </div>

            {/* ══ RIGHT — Dual Scroll Stacked Images ══ */}
            <div className="fw-right-col" style={{
              position: 'relative',
              height:   '100%',
              padding:  'clamp(24px,4vw,48px)',
            }}>
              {/* Outer boundary that hides overflow */}
              <div className="fw-images-outer" style={{
                position:     'relative',
                height:       '100%',
                width:        '100%',
                borderRadius: 'clamp(16px,1.8vw,28px)',
                overflow:     'hidden',
              }}>
                {/* Translating container for the scroll effect */}
                <div ref={imagesContainerRef} className="fw-images-container" style={{ position: 'absolute', top: '50%', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vh, 48px)' }}>
                    {WORK.map((item, i) => (
                      <a
                        key={item.id}
                        ref={el => { imagesRef.current[i] = el; }}
                        href={item.href}
                        className="fw-image-item"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        style={{
                          position:       'relative',
                          display:        'block',
                          cursor:         'none',
                          textDecoration: 'none',
                          height:         'clamp(320px,62vh,700px)',
                          borderRadius:   'clamp(16px,1.8vw,28px)',
                          overflow:       'hidden',
                          flexShrink:     0,
                        }}
                      >
                        {/* Background Image */}
                        <img
                          ref={el => { imgRefs.current[i] = el; }}
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

                        {/* Category tag — bottom-right on desktop, top-right on mobile */}
                        {item.category && (
                          <div
                            className="fw-category-tag"
                            style={{
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
                          </div>
                        )}

                        {/* Mobile-only: client name + period bottom-left (hidden on desktop) */}
                        <div
                          className="fw-mobile-client-info"
                          style={{
                            display:        'none',
                            position:       'absolute',
                            bottom:         14,
                            left:           14,
                            zIndex:         2,
                            flexDirection:  'column',
                            gap:            2,
                          }}
                        >
                          <span style={{ color: '#fff', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                            {item.client}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 400 }}>
                            {item.period}
                          </span>
                        </div>

                        {/* Color overlay (Starts opacity:0) */}
                        <div
                          ref={el => { overlayRefs.current[i] = el; }}
                          style={{
                            position:   'absolute',
                            inset:      0,
                            background: item.overlayBg,
                            zIndex:     3,
                            opacity:    0,
                          }}
                        />

                        {/* Hover caption (Starts opacity:0 y:14) */}
                        <div
                          ref={el => { captionRefs.current[i] = el; }}
                          style={{
                            position:        'absolute',
                            inset:           0,
                            zIndex:          4,
                            display:         'flex',
                            flexDirection:   'column',
                            justifyContent:  'space-between',
                            padding:         'clamp(24px,3.5vw,48px)',
                            pointerEvents:   'none',
                            opacity:         0,
                            transform:       'translateY(14px)',
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
                            {/* Client name */}
                            <span style={{
                              color:         '#121212',
                              fontSize:      'clamp(13px,1.2vw,16px)',
                              fontWeight:    600,
                              letterSpacing: '-0.01em',
                              opacity:       0.7,
                            }}>
                              {item.client}
                            </span>

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
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
