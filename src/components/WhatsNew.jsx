import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ────────────────────────────────────────────────────────────────── */
const blogPosts = [
  {
    id: 1,
    readTime: '3 mins',
    author: 'Ray Saddiq',
    authorImg: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&fit=crop&crop=faces',
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    href: '/blog/hollie-lovell/',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=85&fit=crop',
  },
  {
    id: 2,
    readTime: '2 mins',
    author: 'Ray Saddiq',
    authorImg: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80&fit=crop&crop=faces',
    title: 'Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion',
    href: '/blog/manchester-hq/',
    img: 'https://images.unsplash.com/photo-1572099606223-6e29045d7de3?w=700&q=85&fit=crop',
  },
  {
    id: 3,
    readTime: '2 mins',
    author: 'Carrie Rose',
    authorImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80&fit=crop&crop=faces',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    href: '/blog/ryan-mcnamara/',
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=700&q=85&fit=crop',
  },
];

/* ── Arrow SVG ────────────────────────────────────────────────────────────── */
const ArrowSVG = ({ size = 14, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── Clock SVG ────────────────────────────────────────────────────────────── */
const ClockSVG = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 5v3.5l2 1.5" />
  </svg>
);

/* ── BlogCard ─────────────────────────────────────────────────────────────── */
function BlogCard({ post, cardRef, imgWrapRef, blurOverlayRef }) {
  return (
    <a
      ref={cardRef}
      href={post.href}
      className="group block"
      style={{ cursor: 'none', willChange: 'transform', textDecoration: 'none' }}
    >
      {/* ── Image area ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '1/1',
          background: '#d5cfc8',
          transform: 'translateZ(0)', // Force HW acceleration for clip/blur
        }}
      >
        {/* Actual image */}
        <div ref={imgWrapRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
          <img
            src={post.img}
            alt={post.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Blurry overlay that slides up from bottom */}
        <div
          ref={blurOverlayRef}
          style={{
            position: 'absolute',
            top: '100%', left: '-15%', right: '-15%',
            height: '130%',
            borderRadius: '50% 50% 0 0',
            backdropFilter: 'blur(12px) brightness(0.82)',
            WebkitBackdropFilter: 'blur(12px) brightness(0.82)',
            background: 'rgba(0,0,0,0.06)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Hover arrow (revealed on hover) */}
        <div
          data-hover-arrow
          style={{
            position: 'absolute', bottom: 14, left: 14,
            width: 36, height: 36,
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', opacity: 0,
            zIndex: 2,
          }}
        >
          <ArrowSVG size={13} />
        </div>
      </div>

      {/* ── Metadata chips ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
        {/* Author chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: 999,
          padding: '5px 10px 5px 5px',
          fontSize: 12, fontWeight: 500, color: '#282828',
        }}>
          {/* Avatar */}
          <div style={{
            width: 24, height: 24, borderRadius: '50%', overflow: 'hidden',
            background: '#e0e0e0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {post.authorImg ? (
              <img src={post.authorImg} alt={post.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              post.author.charAt(0)
            )}
          </div>
          {post.author}
        </div>

        {/* Time chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: 999,
          padding: '5px 10px',
          fontSize: 12, color: '#282828',
        }}>
          <ClockSVG />
          {post.readTime}
        </div>
      </div>

      {/* ── Title ── */}
      <h3
        data-title
        style={{
          marginTop: 12,
          fontSize: 'clamp(15px, 1.3vw, 18px)',
          fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          color: '#282828',
          transition: 'color 0.3s',
        }}
      >
        {post.title}
      </h3>
    </a>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function WhatsNew() {
  const sectionRef      = useRef(null);
  const cursorRef       = useRef(null);
  const cardRefs        = useRef([]);
  const imgWrapRefs     = useRef([]);
  const blurOverlayRefs = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const cards    = cardRefs.current.filter(Boolean);
    const imgWraps = imgWrapRefs.current.filter(Boolean);
    if (!cards.length) return;

    /* 1 ── Set initial hidden state for all cards immediately (before scroll) */
    gsap.set(cards, { opacity: 0, y: 48 });

    /* 2 ── Entrance: animate cards in when section scrolls into view */
    const entranceAnim = gsap.to(cards, {
      opacity: 1, y: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    /* 3 — Mobile: entrance only */
    if (isMobile) {
      return () => entranceAnim.kill();
    }

    /* 4 — Desktop: init cursor GSAP state (xPercent/yPercent for centering — no CSS % transforms) */
    const cursor = cursorRef.current;
    if (!cursor) return () => entranceAnim.kill();
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none', overwrite: true });
    };

    /* Section enter: make cursor visible but still scaled=0 (cards will scale it up) */
    const section = sectionRef.current;
    section.style.cursor = 'none';
    const onSectionEnter = () => gsap.to(cursor, { autoAlpha: 1, duration: 0.15 });
    const onSectionLeave = () => {
      gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.2 });
      section.style.cursor = '';
    };

    window.addEventListener('mousemove', onMove);
    section.addEventListener('mouseenter', onSectionEnter);
    section.addEventListener('mouseleave', onSectionLeave);

    /* 5 — Per-card hover: blur overlay slides up, card lifts, cursor grows */
    const cleanups = cards.map((card, i) => {
      const img         = imgWraps[i];
      const blurOverlay = blurOverlayRefs.current[i];
      const arrowEl     = card.querySelector('[data-hover-arrow]');
      const titleEl     = card.querySelector('[data-title]');

      const onEnter = () => {
        gsap.to(cursor,      { scale: 1,    duration: 0.3,  ease: 'back.out(1.4)' });
        gsap.to(img,         { scale: 1.06, duration: 0.5,  ease: 'power2.out' });
        gsap.to(blurOverlay, { top: '-30%', duration: 0.6,  ease: 'power2.out' });
        gsap.to(card,        { y: -10, scale: 1.015, duration: 0.35, ease: 'power2.out' });
        if (arrowEl) gsap.to(arrowEl, { opacity: 1, duration: 0.25 });
        if (titleEl) gsap.to(titleEl, { color: '#555', duration: 0.3 });
      };
      const onLeave = () => {
        gsap.to(cursor,      { scale: 0,    duration: 0.2,  ease: 'power2.in' });
        gsap.to(img,         { scale: 1,    duration: 0.5,  ease: 'power2.out' });
        gsap.to(blurOverlay, { top: '100%', duration: 0.5,  ease: 'power2.inOut' });
        gsap.to(card,        { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
        if (arrowEl) gsap.to(arrowEl, { opacity: 0, duration: 0.2 });
        if (titleEl) gsap.to(titleEl, { color: '#282828', duration: 0.3 });
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseenter', onSectionEnter);
      section.removeEventListener('mouseleave', onSectionLeave);
      cleanups.forEach(fn => fn());
      entranceAnim.kill();
    };
  }, []);

  return (
    <section
      id="whats-new"
      ref={sectionRef}
      style={{
        background: '#efeeec',
        padding: 'clamp(40px,4vw,64px) 0',
        position: 'relative',
        zIndex: 7,
        borderRadius: '28px 28px 0 0',
        marginTop: -28,
      }}
    >
      {/* ── Custom cursor — GSAP controls ALL transforms (no CSS percentage transforms) ── */}
      <div
        ref={cursorRef}
        style={{
          position:      'fixed',
          top: 0, left: 0,
          width: 48, height: 48,
          borderRadius:  '50%',
          background:    '#b2f6e3',
          color:         '#282828',
          display:       'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          zIndex:        9999,
          opacity:       0,
          visibility:    'hidden',
          willChange:    'transform',
        }}
      >
        <ArrowSVG size={16} strokeWidth={1.8} />
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* ── Header ── */}
        <div className="whats-new-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{
            fontSize: 'clamp(52px,7vw,96px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#282828',
            display: 'flex',
            alignItems: 'center',
            gap: '0.22em',
            flexWrap: 'wrap',
          }}>
            <span>What's</span>
            {/* Inline image pill between the two words */}
            <span style={{
              display: 'inline-block',
              width: 'clamp(52px,4.5vw,82px)',
              height: 'clamp(52px,4.5vw,82px)',
              borderRadius: 14,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
              top: '0.04em',
            }}>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=85&fit=crop"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </span>
            <span>New</span>
          </h2>
          <a
            href="/blog/"
            className="whats-new-cta hidden md:flex"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              color: '#282828',
              fontSize: 13, fontWeight: 500,
              padding: '10px 20px',
              borderRadius: 999,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#282828'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#282828'; }}
          >
            Explore More Thoughts <ArrowSVG size={12} />
          </a>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.10)', marginBottom: 36 }} />

        {/* ── Cards grid ── */}
        <div className="whats-new-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {blogPosts.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              cardRef={el => { cardRefs.current[i] = el; }}
              imgWrapRef={el => { imgWrapRefs.current[i] = el; }}
              blurOverlayRef={el => { blurOverlayRefs.current[i] = el; }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
