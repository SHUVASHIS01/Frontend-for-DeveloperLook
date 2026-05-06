import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ────────────────────────────────────────────────────────────────── */
const blogPosts = [
  {
    id: 1,
    category: 'News',
    categoryStyle: { background: 'rgba(20,20,20,0.80)', color: '#fff' },
    readTime: '2 mins',
    author: 'Carrie Rose',
    authorBg: 'linear-gradient(135deg,#c9b99a,#e2d4c0)',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    href: '/blog/global-operations-director-promotion/',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=85&fit=crop&crop=faces',
    featured: true,
  },
  {
    id: 2,
    category: 'Food/Hospitality/Drink',
    categoryStyle: { background: 'rgba(255,255,255,0.78)', color: '#282828', backdropFilter: 'blur(8px)' },
    readTime: '2 mins',
    author: 'Ray Saddiq',
    authorBg: 'linear-gradient(135deg,#a8c0d6,#c5d8e8)',
    title: 'Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category',
    href: '/blog/coneys-chooses-riseatseven-for-demand-brief-2/',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=85&fit=crop&crop=faces',
  },
  {
    id: 3,
    category: 'Food/Hospitality/Drink',
    categoryStyle: { background: 'rgba(255,255,255,0.78)', color: '#282828', backdropFilter: 'blur(8px)' },
    readTime: '2 mins',
    author: 'Carrie Rose',
    authorBg: 'linear-gradient(135deg,#c9b99a,#e2d4c0)',
    title: 'Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz',
    href: '/blog/noomz-chooses-riseatseven-for-demand-brief/',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=85&fit=crop',
    searchTag: 'Freeze Dried Sweets',
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

/* ── Custom cursor ────────────────────────────────────────────────────────── */
function CustomCursor({ ref: cursorRef }) {
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 48, height: 48,
        borderRadius: '50%',
        background: '#b2f6e3',
        color: '#282828',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%) scale(0)',
        transition: 'background 0.2s',
        willChange: 'transform',
      }}
    >
      <ArrowSVG size={16} strokeWidth={1.8} />
    </div>
  );
}

/* ── BlogCard ─────────────────────────────────────────────────────────────── */
function BlogCard({ post, cardRef, imgWrapRef, pulseRef }) {
  return (
    <a
      ref={cardRef}
      href={post.href}
      className="group block"
      style={{ cursor: 'none', willChange: 'transform' }}
    >
      {/* ── Image area ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '4/5',
          background: '#d5cfc8',
        }}
      >
        {/* Actual image — blur/zoom handled by GSAP on imgWrapRef */}
        <div ref={imgWrapRef} style={{ position: 'absolute', inset: 0, willChange: 'transform, filter' }}>
          <img
            src={post.img}
            alt={post.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Category badge */}
        <span
          style={{
            position: 'absolute', top: 14, left: 14,
            ...post.categoryStyle,
            fontSize: 11, fontWeight: 500,
            padding: '5px 12px',
            borderRadius: 999,
            letterSpacing: '0.01em',
            zIndex: 2,
          }}
        >
          {post.category}
        </span>

        {/* Search tag (card 3 only) */}
        {post.searchTag && (
          <div style={{
            position: 'absolute', bottom: 14, right: 14,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
            color: '#282828', fontSize: 11, fontWeight: 500,
            padding: '5px 10px', borderRadius: 999,
            display: 'flex', alignItems: 'center', gap: 5,
            zIndex: 2,
          }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <circle cx="6.5" cy="6.5" r="5" /><path d="M10.5 10.5l3 3" />
            </svg>
            {post.searchTag}
            <ArrowSVG size={10} />
          </div>
        )}

        {/* Featured card: pulsing mint circle arrow */}
        {post.featured && (
          <div
            ref={pulseRef}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <div style={{
              width: 80, height: 80,
              background: '#b2f6e3',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(178,246,227,0.45)',
            }}>
              <ArrowSVG size={20} strokeWidth={1.5} />
            </div>
          </div>
        )}

        {/* Non-featured: arrow bottom-right, revealed on hover via GSAP */}
        {!post.featured && (
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
        )}
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
            background: post.authorBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#5a4a3a', flexShrink: 0,
          }}>
            {post.author.charAt(0)}
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
  const sectionRef  = useRef(null);
  const cursorRef   = useRef(null);
  const cardRefs    = useRef([]);
  const imgWrapRefs = useRef([]);
  const pulseRef    = useRef(null);

  useEffect(() => {
    const cards    = cardRefs.current.filter(Boolean);
    const imgWraps = imgWrapRefs.current.filter(Boolean);
    if (!cards.length) return;

    /* 1 ── ScrollTrigger entrance (staggered) */
    gsap.fromTo(cards,
      { opacity: 0, y: 64 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );

    /* 2 ── Floating pulse on featured button */
    if (pulseRef.current) {
      gsap.to(pulseRef.current.firstElementChild, {
        scale: 1.14,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }

    /* 3 ── Custom cursor tracking */
    const cursor = cursorRef.current;
    const onMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX, y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };
    window.addEventListener('mousemove', onMove);

    /* 4 ── Per-card hover animations */
    const cleanups = cards.map((card, i) => {
      const img       = imgWraps[i];
      const arrowEl   = card.querySelector('[data-hover-arrow]');
      const titleEl   = card.querySelector('[data-title]');

      const onEnter = () => {
        /* Show cursor */
        gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'back.out(1.4)' });

        /* Image: blur + zoom */
        gsap.to(img, { scale: 1.07, filter: 'blur(5px) brightness(0.8)', duration: 0.5, ease: 'power2.out' });

        /* Card: subtle scale + shadow via filter */
        gsap.to(card, { scale: 1.015, duration: 0.4, ease: 'power2.out' });

        /* Non-featured arrow */
        if (arrowEl) gsap.to(arrowEl, { opacity: 1, duration: 0.25 });

        /* Title: slight upward nudge */
        if (titleEl) gsap.to(titleEl, { y: -3, color: '#555', duration: 0.3, ease: 'power2.out' });
      };

      const onLeave = () => {
        /* Hide cursor */
        gsap.to(cursor, { scale: 0, duration: 0.2, ease: 'power2.in' });

        /* Reset image */
        gsap.to(img, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 0.5, ease: 'power2.out' });

        /* Reset card */
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });

        /* Reset arrow */
        if (arrowEl) gsap.to(arrowEl, { opacity: 0, duration: 0.2 });

        /* Reset title */
        if (titleEl) gsap.to(titleEl, { y: 0, color: '#282828', duration: 0.3, ease: 'power2.out' });
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
      cleanups.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="whats-new"
      ref={sectionRef}
      style={{ background: '#efeeec', padding: 'clamp(60px,6vw,100px) 0' }}
    >
      {/* Custom cursor */}
      <CustomCursor ref={cursorRef} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{
            fontSize: 'clamp(36px,5vw,72px)',
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
        <div style={{
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
              pulseRef={post.featured ? pulseRef : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
