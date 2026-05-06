import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Ready to rise at Seven?';

export default function ScrollRevealText() {
  const sectionRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const letters = lettersRef.current.filter(Boolean);
    if (!section || !letters.length) return;

    /* Reset initial state */
    gsap.set(letters, { opacity: 0, x: -24 });

    /* Build a single timeline where each letter occupies its own
       slice of the scroll range so they cascade left → right. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',   /* start when section top hits 75% of viewport */
        end:   'top 15%',   /* finish when section top reaches 15% (near top) */
        scrub: 1.2,          /* smooth lag between scroll & animation */
      },
    });

    letters.forEach((el, i) => {
      const offset = i / letters.length;      /* 0 → 1 across the timeline */
      const duration = 0.6 / letters.length;  /* each letter's own duration slice */

      tl.to(
        el,
        {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          duration,
        },
        offset              /* stagger position in timeline */
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* Split TEXT into letter spans, preserving spaces as non-breaking */
  const chars = TEXT.split('');

  return (
    <section
      ref={sectionRef}
      className="bg-[#efeeec] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2
          className="font-medium tracking-tight leading-[0.9] text-[#282828]"
          style={{ fontSize: 'clamp(44px, 8.5vw, 128px)' }}
          aria-label={TEXT}
        >
          {chars.map((char, i) =>
            char === ' ' ? (
              /* Spaces: keep them semantic but don't animate */
              <span
                key={i}
                style={{ display: 'inline-block', width: '0.28em' }}
                aria-hidden="true"
              />
            ) : (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el; }}
                style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                aria-hidden="true"
              >
                {char}
              </span>
            )
          )}
        </h2>
      </div>
    </section>
  );
}
