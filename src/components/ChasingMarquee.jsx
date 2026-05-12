import React, { useRef, useEffect } from 'react';
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
    marginBottom: 'clamp(8px,1vw,20px)',
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
      <span className="chasing-text" style={textStyle}>Chasing Consumers</span>
      <span className="chasing-img" style={imgStyle}>
        <img src={MARQUEE_IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      </span>
      <span className="chasing-text" style={textStyle}>Not Algorithms</span>
      <span className="chasing-img" style={imgStyle}>
        <img src={MARQUEE_IMG} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      </span>
    </>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ChasingMarquee() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const cursorRef  = useRef(null);
  const animRef    = useRef(null);

  /* ── Marquee GSAP loop ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf = requestAnimationFrame(() => {
      const totalW = track.scrollWidth / 2;
      animRef.current = gsap.to(track, {
        x: -totalW,
        duration: totalW / 60,
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

  /* ── Custom cursor: RAF loop + direct DOM style — no React state, no GSAP conflicts ── */
  useEffect(() => {
    const section = sectionRef.current;
    const cursor  = cursorRef.current;
    if (!section || !cursor) return;

    let targetX = window.innerWidth  / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;
    let inside = false;

    /* Always track mouse globally so position is ready before entering */
    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onEnter = () => {
      inside = true;
      cursor.style.opacity   = '1';
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(1)`;
    };

    const onLeave = () => {
      inside = false;
      cursor.style.opacity = '0';
    };

    const loop = () => {
      /* Smooth lerp */
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseenter', onEnter);
    section.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseenter', onEnter);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Fixed custom cursor pill — no React state updates, DOM-only */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.25s ease',
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

      {/* Section — cursor:none on section + all children hides system cursor everywhere */}
      <section
        ref={sectionRef}
        className="chasing-section-wrap"
        style={{
          background: '#efeeec',
          overflow: 'hidden',
          padding: 'clamp(28px,3vw,48px) 0',
          cursor: 'none',
          borderRadius: '28px 28px 0 0',
          marginTop: -28,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <style>{`
          .chasing-section, .chasing-section * { cursor: none !important; }
        `}</style>
        <a href="/contact/" className="chasing-section" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ overflow: 'hidden' }}>
            <div
              ref={trackRef}
              style={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                gap: 'clamp(24px,3.5vw,56px)',
                willChange: 'transform',
              }}
            >
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
