import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Ready to Rise at Seven?';
const DELAY = 0.2; // seconds before first char animates (matches riseatseven source)

export default function ScrollRevealText() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const charsRef = useRef([]); // only non-space chars

  useLayoutEffect(() => {
    const charEls = charsRef.current.filter(Boolean);

    // Each char starts 125% below its own line (clipped by overflow:hidden on wrapper)
    gsap.set(charEls, { y: '125%' });

    // Animate each char up, staggered 15ms — exactly as riseatseven source does
    gsap.to(charEls, {
      y: '0%',
      duration: 0.5,
      ease: 'power4.out',
      stagger: 0.015,
      delay: DELAY,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // Split TEXT into chars; track ref index separately (skip spaces in ref array)
  let refIndex = 0;
  const chars = TEXT.split('');

  return (
    <section
      ref={sectionRef}
      aria-label={TEXT}
      className="scroll-reveal-section bg-[#efeeec] overflow-hidden"
      style={{
        paddingTop: 'clamp(80px, 18vh, 220px)',
        paddingBottom: 'clamp(60px, 8vh, 100px)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap');

        .rise-heading {
          font-family: 'Roboto Flex', 'saans', sans-serif;
          font-size: clamp(52px, 9vw, 130px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #121212;
          margin: 0;
        }

        /* Each char sits inside an overflow:hidden clip so y-slide is invisible outside */
        .rise-char-wrap {
          display: inline-flex;
          flex-direction: column;
          overflow: hidden;
          vertical-align: top;
          height: 1em;
        }

        .rise-char {
          display: block;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 48px)',
        }}
      >
        <h2 ref={headingRef} className="rise-heading">
          {chars.map((char, i) => {
            if (char === ' ') {
              return (
                <span key={i} style={{ display: 'inline-block', width: '0.28em' }} aria-hidden="true" />
              );
            }
            const idx = refIndex++;
            return (
              // outer wrap clips the y-sliding char
              <span key={i} className="rise-char-wrap" aria-hidden="true">
                <span
                  className="rise-char"
                  ref={(el) => { charsRef.current[idx] = el; }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
