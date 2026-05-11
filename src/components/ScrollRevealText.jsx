import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Ready to Rise at Seven?';

/*
  "Ready to Rise at Seven?"
  Indices:  R(0) e(1) a(2) d(3) y(4) [5] t(6) o(7) [8] R(9) i(10) s(11) e(12) [13] a(14) t(15) [16] S(17) e(18) v(19) e(20) n(21) ?(22)
  "Rise" word = char indices 9, 10, 11, 12  → final resting rotation (upward tilt)
*/
const RISE_FINAL_ROTATION = { 9: -8, 10: -6, 11: -5, 12: -4 };

export default function ScrollRevealText() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const lettersRef  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;

      /* Build ordered list of non-space chars with their original char index */
      const letterData = TEXT.split('').reduce((acc, char, i) => {
        const el = lettersRef.current[i];
        if (char !== ' ' && el) acc.push({ el, charIdx: i });
        return acc;
      }, []);

      if (!letterData.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start:   'top bottom',   /* heading enters viewport from below  */
          end:     'top 18%',      /* heading nearly at top of viewport   */
          scrub:   1.3,
        },
      });

      letterData.forEach(({ el, charIdx }, idx) => {
        const finalRotation = RISE_FINAL_ROTATION[charIdx] ?? 0;

        tl.fromTo(
          el,
          {
            x:        180,
            y:        -120,
            opacity:  0,
            scale:    0.45,
            rotation: -32,
          },
          {
            x:        0,
            y:        0,
            opacity:  1,
            scale:    1,
            rotation: finalRotation,    /* "Rise" letters rest with upward tilt */
            ease:     'power4.out',
            duration: 0.85,
          },
          idx * 0.032          /* stagger — each letter lags slightly behind prev */
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chars = TEXT.split('');

  return (
    <section
      ref={sectionRef}
      style={{
        background:    '#efeeec',
        paddingTop:    'clamp(80px,18vh,220px)',
        paddingBottom: 'clamp(60px,8vh,100px)',
        overflow:      'hidden',
      }}
    >
      <div style={{
        maxWidth: 1400,
        margin:   '0 auto',
        padding:  '0 clamp(16px,4vw,48px)',
      }}>
        <h2
          ref={headingRef}
          style={{
            fontSize:      'clamp(52px,9vw,130px)',
            fontWeight:    700,
            letterSpacing: '-0.03em',
            lineHeight:    0.92,
            color:         '#121212',
            margin:        0,
          }}
          aria-label={TEXT}
        >
          {chars.map((char, i) =>
            char === ' ' ? (
              <span
                key={i}
                style={{ display: 'inline-block', width: '0.24em' }}
                aria-hidden="true"
              />
            ) : (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el; }}
                style={{
                  display:         'inline-block',
                  willChange:      'transform, opacity',
                  transformOrigin: 'center bottom',
                }}
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
