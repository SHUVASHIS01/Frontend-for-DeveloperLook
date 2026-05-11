import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const text = 'Ready to rise at seven?';

export default function ReadyToScroll() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);

  useLayoutEffect(() => {
    // 1. Initialize variable font properties
    lettersRef.current.forEach((char) => {
      if (!char) return;
      char.scrollWdth = 100;
      char.mouseWdth = 0;

      char.updateFont = () => {
        const totalWdth = Math.min(151, Math.max(25, char.scrollWdth + char.mouseWdth));
        char.style.fontVariationSettings = `"wght" 500, "wdth" ${totalWdth}`;
      };

      char.updateFont();
    });

    // 2. GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      const chars = lettersRef.current.filter(Boolean);
      if (!chars.length) return;

      const rects = chars.map(char => char.getBoundingClientRect());

      // Fixed entry point: just off the right edge of the screen
      const entryX_abs = window.innerWidth + 100;
      // Fixed "surface" point on the right side where characters land
      const surfaceX_abs = window.innerWidth * 0.85;
      // Height from which characters are fired (top-right)
      const launchY = -window.innerHeight * 0.6;

      // ── Master timeline ──
      const masterTl = gsap.timeline();

      // Set ALL characters hidden & at the launch point
      chars.forEach((char, i) => {
        const rect = rects[i];
        const launchRelX = entryX_abs - rect.left;
        gsap.set(char, { x: launchRelX, y: launchY, opacity: 0 });
      });

      chars.forEach((char, i) => {
        const rect = rects[i];
        const surfaceRelX = surfaceX_abs - rect.left;

        const charTl = gsap.timeline();

        // Step 1: Appear and fall diagonally from top-right to the fixed surface
        charTl.set(char, { opacity: 1 })
        .to(char, {
          x: surfaceRelX,
          y: 0,
          ease: 'power2.in',
          duration: 0.5
        })
        // Step 2: Slide left along the surface to final position
        .to(char, {
          x: 0,
          ease: 'power3.out',
          duration: 1
        });

        // Very tight stagger = continuous chain
        masterTl.add(charTl, i * 0.03);
      });

      // ── ScrollTrigger ──
      // Starts when section enters → ends when footer bottom reaches viewport bottom.
      // This scrubs the FULL animation across both section AND footer,
      // so the animation keeps playing while the footer scrolls up over it.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 95%',
        endTrigger: '#footer',
        end: 'bottom bottom',
        scrub: 1,
        animation: masterTl,
        onUpdate: () => {
          const footerEl = document.getElementById('footer');
          if (footerEl && contentRef.current) {
            const footerTop = footerEl.getBoundingClientRect().top;
            const vh = window.innerHeight;
            if (footerTop < vh) {
              contentRef.current.style.bottom = (vh - footerTop) + 'px';
              contentRef.current.style.height = 'auto';
            } else {
              contentRef.current.style.bottom = '0px';
              contentRef.current.style.height = '100vh';
            }
          }
        },
        onEnter: () => {
          if (contentRef.current) contentRef.current.style.opacity = '1';
        },
        onLeaveBack: () => {
          if (contentRef.current) {
            contentRef.current.style.opacity = '0';
            contentRef.current.style.bottom = '0px';
            contentRef.current.style.height = '100vh';
          }
        }
      });

      // Refresh triggers after layout settles
      const refreshGSAP = () => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };
      const t1 = setTimeout(refreshGSAP, 100);
      const t2 = setTimeout(refreshGSAP, 500);
      window.addEventListener('load', refreshGSAP);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('load', refreshGSAP);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3. Mouse Proximity Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      lettersRef.current.forEach((char) => {
        if (!char) return;
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2));
        const maxDist = 250;

        if (distance < maxDist) {
          const factor = 1 - distance / maxDist;
          const easeFactor = Math.pow(factor, 1.5);
          gsap.to(char, {
            mouseWdth: 40 * easeFactor,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => char.updateFont()
          });
        } else {
          gsap.to(char, {
            mouseWdth: 0,
            duration: 0.6,
            ease: 'power3.out',
            onUpdate: () => char.updateFont()
          });
        }
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Ready to section"
      style={{ height: '10vh', position: 'relative', background: '#e9e9ea' }}
    >
      {/* Fixed content layer — stays on screen while footer scrolls over it */}
      <div
        ref={contentRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '24px',
          zIndex: 1,
          opacity: 0,
          background: '#e9e9ea',
          pointerEvents: 'none',
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap');
          
          .var-font-text {
            font-family: 'Roboto Flex', 'saans', sans-serif;
            color: #121212;
          }
        `}</style>

        <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'flex-end', paddingRight: 'clamp(20px, 10vw, 160px)' }}>
          <p className="whitespace-nowrap select-none pointer-events-none text-[clamp(80px,14vw,220px)] font-medium leading-[0.85] tracking-[-0.04em] var-font-text">
            {text.split('').map((char, index) => (
              <span
                key={`${char}-${index}`}
                ref={(el) => {
                  lettersRef.current[index] = el;
                }}
                className="inline-block will-change-transform pointer-events-auto"
                style={{ opacity: 0 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
