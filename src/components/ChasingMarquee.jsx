import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/* ── Static image used between marquee items ─────────────────────────────── */
const MARQUEE_IMG = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&q=85&fit=crop';

/* ── One set of items: "Chasing Consumers [img] Not Algorithms [img]" ─────── */
function MarqueeSet() {
  const imgStyle = {
    flexShrink: 0,
    display: 'inline-flex',
    alignSelf: 'center',
    width: 'clamp(80px,10vw,155px)',
    height: 'clamp(80px,10vw,155px)',
    borderRadius: 'clamp(14px,1.5vw,24px)',
    overflow: 'hidden',
    marginBottom: 'clamp(8px,1vw,20px)', /* mirrors lg:mb-10 in the real site */
  };

  const textStyle = {
    fontSize: 'clamp(72px,8vw,128px)',
    fontWeight: 500,
    letterSpacing: '-0.03em',
    lineHeight: 0.9,
    color: '#121212',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    paddingBottom: 'clamp(8px,1vw,20px)',
  };

  return (
    <>
      <span style={textStyle}>Chasing Consumers</span>
      <span style={imgStyle}>
        <img src={MARQUEE_IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      </span>
      <span style={textStyle}>Not Algorithms</span>
      <span style={imgStyle}>
        <img src={MARQUEE_IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      </span>
    </>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ChasingMarquee() {
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const cursorRef    = useRef(null);
  const animRef      = useRef(null);
  const [hovered, setHovered]   = useState(false);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  /* ── Marquee GSAP loop ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one frame for DOM to settle and get accurate width
    const raf = requestAnimationFrame(() => {
      const totalW = track.scrollWidth / 2; // Half because items are duplicated

      animRef.current = gsap.to(track, {
        x: -totalW,
        duration: totalW / 60, // ~60px/s — matches real site's speed: 0.5 feel
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(v => parseFloat(v) % totalW),
        },
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      animRef.current?.kill();
    };
  }, []);

  /* ── Custom cursor follow ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    section.addEventListener('mousemove', onMove);

    const ticker = () => {
      const ease = 0.10;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;
      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: cursorPos.current.x,
          y: cursorPos.current.y,
          xPercent: -50,
          yPercent: -50,
        });
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      section.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  /* ── Cursor visibility ── */
  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      opacity: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.6,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [hovered]);

  return (
    <>
      {/* Fixed custom cursor — renders above everything */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          background: '#b2f6e3',
          color: '#121212',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          padding: '14px 22px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        Send Us Your Brief
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 8L8 2M8 2H3M8 2v5" />
        </svg>
      </div>

      {/* Section */}
      <section
        ref={sectionRef}
        style={{
          background: '#efeeec',
          overflow: 'hidden',
          cursor: 'none',
          padding: 'clamp(28px,3vw,48px) 0',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a href="/contact/" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ overflow: 'hidden' }}>
            {/* Track: items duplicated for seamless loop */}
            <div
              ref={trackRef}
              style={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                gap: 'clamp(24px,3.5vw,56px)',
                willChange: 'transform',
              }}
            >
              {/* Two copies for seamless looping */}
              {[0, 1].map(i => (
                <React.Fragment key={i}>
                  <MarqueeSet />
                </React.Fragment>
              ))}
            </div>
          </div>
        </a>
      </section>
    </>
  );
}
