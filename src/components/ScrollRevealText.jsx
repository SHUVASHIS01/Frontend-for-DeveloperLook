import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'Ready to rise at Seven?';

export default function ScrollRevealText() {
  const sectionRef  = useRef(null);
  const lettersRef  = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const letters = lettersRef.current.filter(Boolean);
    if (!section || !letters.length) return;

    /* Set every letter invisible and high up — like water waiting in a bottle */
    gsap.set(letters, { opacity: 0, y: -72, rotateX: -90 });

    /* Pour them in once the section enters the viewport */
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(letters, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          /* Each letter pours out 38ms after the previous — a continuous stream */
          stagger: 0.038,
          ease: 'power4.out',
          /* Perspective so the rotateX flip reads as 3-D drop */
          transformOrigin: '50% 0%',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const chars = TEXT.split('');

  return (
    <section
      ref={sectionRef}
      className="bg-[#efeeec] py-20 lg:py-28 overflow-hidden"
      style={{ perspective: '600px' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2
          className="font-medium tracking-tight leading-[0.9] text-[#282828]"
          style={{ fontSize: 'clamp(44px, 8.5vw, 128px)', perspective: '600px' }}
          aria-label={TEXT}
        >
          {chars.map((char, i) =>
            char === ' ' ? (
              <span
                key={i}
                style={{ display: 'inline-block', width: '0.28em' }}
                aria-hidden="true"
              />
            ) : (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
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
