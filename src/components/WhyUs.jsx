import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Card data ────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 'pioneers',
    title: 'Pioneers',
    body1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    body2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85&fit=crop',
    bg: '#000000',
    textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.52)',
    rotation: 4,
  },
  {
    id: 'award',
    title: 'Award Winning',
    body1: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London.",
    body2: 'We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.',
    img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=85&fit=crop',
    bg: '#b2f6e3',
    textColor: '#111212',
    mutedColor: 'rgba(17,18,18,0.52)',
    rotation: 8,
  },
  {
    id: 'speed',
    title: 'Speed',
    body1: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster.",
    body2: "We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85&fit=crop',
    bg: '#ffffff',
    textColor: '#111212',
    mutedColor: 'rgba(17,18,18,0.52)',
    rotation: 12,
  },
];

/* ── Arrow SVG ────────────────────────────────────────────────────────────── */
const Arrow = () => (
  <svg width={11} height={11} viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── Card ─────────────────────────────────────────────────────────────────── */
function Card({ data }) {
  return (
    <div style={{
      background:     data.bg,
      borderRadius:   'clamp(20px,2.2vw,32px)',
      boxShadow:      '0 24px 72px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        'clamp(28px,3.5vw,52px) clamp(24px,4vw,56px)',
      boxSizing:      'border-box',
      textAlign:      'center',
      gap:            'clamp(14px,1.8vh,22px)',
      width:          '100%',
    }}>
      {/* Image */}
      <div style={{
        width:        'clamp(160px,18vw,240px)',
        height:       'clamp(160px,18vw,240px)',
        borderRadius: 'clamp(14px,1.6vw,20px)',
        overflow:     'hidden',
        flexShrink:   0,
      }}>
        <img
          src={data.img}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        color:         data.textColor,
        fontSize:      'clamp(32px,4.2vw,64px)',
        fontWeight:    500,
        letterSpacing: '-0.03em',
        lineHeight:    1,
        margin:        0,
        width:         '100%',
      }}>
        {data.title}
      </h3>

      {/* Body */}
      <div style={{ width: '100%' }}>
        <p style={{ color: data.mutedColor, fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.68, margin: '0 0 6px' }}>
          {data.body1}
        </p>
        <p style={{ color: data.mutedColor, fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.68, margin: 0 }}>
          {data.body2}
        </p>
      </div>

      {/* Learn more */}
      <a href="/about/" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: data.textColor, fontSize: 13, fontWeight: 500,
        textDecoration: 'none', opacity: 0.58,
      }}>
        Learn more <Arrow />
      </a>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function WhyUs() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      const SCROLL_PER_CARD = window.innerHeight * 0.85;
      const TOTAL_SCROLL    = SCROLL_PER_CARD * cards.length;

      /* ── Initial deck state — fanned left/right like a held hand of cards ──
         card[0] (Pioneers)      : front/center, slight clockwise tilt
         card[1] (Award Winning) : peeking LEFT, counter-clockwise tilt
         card[2] (Speed)         : peeking RIGHT, more clockwise tilt         */
      gsap.set(cards[0], { zIndex: 3, rotation:  4, x:   0, y:  0, transformOrigin: 'center center' });
      gsap.set(cards[1], { zIndex: 2, rotation: -6, x: -32, y:  8, transformOrigin: 'center center' });
      gsap.set(cards[2], { zIndex: 1, rotation: 12, x:  32, y: 16, transformOrigin: 'center center' });

      /* ── Single timeline bound to one ScrollTrigger ──
         Using one timeline avoids per-property animation conflicts when
         the same card's y is animated in multiple phases.

         Timeline duration = 2 units (one unit per card-exit phase).
         Phase 0→1 : Pioneers exits; Award Winning + Speed shift forward.
         Phase 1→2 : Award Winning exits; Speed shifts forward.             */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:    sectionRef.current,
          start:      'top top',
          end:        `+=${TOTAL_SCROLL}`,
          pin:        true,
          pinSpacing: true,
          scrub:      0.5,
        },
      });

      /* ── Phase 1 — Pioneers slides straight up to stacked position ──
         Award Winning + Speed fan in from left/right to take their positions  */
      tl.to(cards[0], { y: '-62%', x:  '6%', rotation:  6, ease: 'none', duration: 1 }, 0)
        .to(cards[1], { y:      0, x:    0,  rotation:  8, ease: 'none', duration: 1 }, 0)
        .to(cards[2], { y:     10, x:   14,  rotation: 12, ease: 'none', duration: 1 }, 0);

      /* ── Phase 2 — Pioneers exits fully; Award Winning stacks up ── */
      tl.to(cards[0], { y: '-128%', x: '12%', ease: 'none', duration: 1 }, 1)
        .to(cards[1], { y:  '-62%', x:  '6%', rotation: 10, ease: 'none', duration: 1 }, 1)
        .to(cards[2], { y:       0, x:     0, rotation: 12, ease: 'none', duration: 1 }, 1);

      /* ── Phase 3 — Award Winning exits fully; Speed stacks up ── */
      tl.to(cards[1], { y: '-128%', x: '12%', ease: 'none', duration: 1 }, 2)
        .to(cards[2], { y:  '-62%', x:  '6%', rotation: 14, ease: 'none', duration: 1 }, 2);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background:     '#efeeec',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        'clamp(60px,7vh,100px) clamp(16px,4vw,48px)',
        overflow:       'hidden',
      }}
    >
      {/* Heading */}
      <div style={{
        textAlign:    'center',
        marginBottom: 'clamp(40px,6vh,72px)',
        width:        '100%',
      }}>
        <h2 style={{
          fontSize:      'clamp(20px,2vw,28px)',
          fontWeight:    500,
          color:         '#282828',
          letterSpacing: '-0.02em',
          lineHeight:    1,
          margin:        0,
        }}>
          Legacy In The Making
        </h2>
      </div>

      {/* Stacked card deck — first card is relative (sets wrapper height),
          the rest are absolute (overlaid on top) */}
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width:    'clamp(340px,52vw,660px)',
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position:    i === 0 ? 'relative' : 'absolute',
              top:         0,
              left:        0,
              right:       0,
              willChange:  'transform',
            }}
          >
            <Card data={card} />
          </div>
        ))}
      </div>
    </section>
  );
}
