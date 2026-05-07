import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Logos — Simple Icons CDN (free, no auth, SVG icons) ────────────────── */
/* URL: https://cdn.simpleicons.org/{slug}/282828  → dark-coloured SVG       */
const si = (slug) => `https://cdn.simpleicons.org/${slug}/666666`;

const logos = [
  { name: 'Red Bull',    src: si('redbull')       },
  { name: 'HubSpot',     src: si('hubspot')        },
  { name: 'Xbox',        src: si('xbox')           },
  { name: 'Samsung',     src: si('samsung')        },
  { name: 'Nike',        src: si('nike')           },
  { name: 'Spotify',     src: si('spotify')        },
  { name: 'PlayStation', src: si('playstation')    },
  { name: 'Airbnb',      src: si('airbnb')         },
  { name: 'Shopify',     src: si('shopify')        },
  { name: 'Stripe',      src: si('stripe')         },
  { name: 'Notion',      src: si('notion')         },
  { name: 'Figma',       src: si('figma')          },
  { name: 'Apple',       src: si('apple')          },
  { name: 'Google',      src: si('google')         },
  { name: 'Amazon',      src: si('amazon')         },
  { name: 'Netflix',     src: si('netflix')        },
  { name: 'Adidas',      src: si('adidas')         },
  { name: 'TikTok',      src: si('tiktok')         },
  { name: 'Discord',     src: si('discord')        },
  { name: 'Twitch',      src: si('twitch')         },
  { name: 'LinkedIn',    src: si('linkedin')       },
  { name: 'Meta',        src: si('meta')           },
  { name: 'Microsoft',   src: si('microsoft')      },
  { name: 'Adobe',       src: si('adobe')          },
  { name: 'Uber',        src: si('uber')           },
  { name: 'Slack',       src: si('slack')          },
  { name: 'GitHub',      src: si('github')         },
  { name: 'Zoom',        src: si('zoom')           },
  { name: 'PayPal',      src: si('paypal')         },
  { name: 'Tesla',       src: si('tesla')          },
  { name: 'BMW',         src: si('bmw')            },
  { name: 'IKEA',        src: si('ikea')           },
  { name: 'Visa',        src: si('visa')           },
  { name: 'Intel',       src: si('intel')          },
  { name: 'Nvidia',      src: si('nvidia')         },
  { name: 'YouTube',     src: si('youtube')        },
];

const loopLogos = [...logos, ...logos];

/* ── Logo image ──────────────────────────────────────────────────────────── */
function LogoItem({ logo }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return null;

  return (
    <img
      src={logo.src}
      alt={logo.name}
      title={logo.name}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{
        height: 30,
        maxWidth: 120,
        width: 'auto',
        objectFit: 'contain',
        opacity: 0.28,
        flexShrink: 0,
        userSelect: 'none',
        transition: 'opacity 0.3s',
      }}
      draggable={false}
    />
  );
}

/* ── Arrow icon ──────────────────────────────────────────────────────────── */
const ArrowSVG = () => (
  <svg width={12} height={12} viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

/* ── Slide-up button — same effect as footer links, no color change ───────── */
function SlideButton({ href, children, pill }) {
  const pillStyle = pill ? {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.12)',
    padding: '11px 22px',
    borderRadius: 999,
  } : {
    padding: '11px 4px',
  };

  return (
    <a
      href={href}
      className="group inline-flex items-center"
      style={{
        ...pillStyle,
        color: '#282828',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {/* overflow-hidden on the inner span clips the incoming copy — same pattern as footer FooterLink */}
      <span className="relative inline-flex items-center gap-2 overflow-hidden" style={{ lineHeight: 1.2 }}>
        {/* Outgoing — slides up on hover */}
        <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        {/* Incoming — rises from below on hover */}
        <span
          className="absolute inset-0 inline-flex items-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </a>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function BrandsAndIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      ref={ref}
      style={{ background: '#efeeec', paddingTop: 'clamp(40px,5vw,80px)', paddingBottom: 0 }}
    >

      {/* ══ TOP ROW: label + marquee on the same horizontal line ══ */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'clamp(28px,4vw,52px)' }}>

        {/* "The agency behind" — fixed left label */}
        <div style={{
          flexShrink: 0,
          paddingLeft: 'clamp(16px,4vw,48px)',
          paddingRight: 20,
          minWidth: 'clamp(130px,11%,180px)',
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(40,40,40,0.45)',
            whiteSpace: 'nowrap',
            fontFamily: "'saans', ui-sans-serif, system-ui, sans-serif",
          }}>
            The agency behind
          </p>
        </div>

        {/* Scrolling logo strip — fills remaining width, images only */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}>
          <div className="logo-track" style={{ display: 'flex', alignItems: 'center', gap: 88 }}>
            {loopLogos.map((logo, i) => (
              <LogoItem key={i} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.10)', marginBottom: 'clamp(36px,5vw,64px)' }} />

        {/* ── Two-column grid: description LEFT · heading RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start pb-20 lg:pb-28">

          {/* LEFT — description paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.135, 0.9, 0.15, 1] }}
            style={{
              fontSize: 'clamp(15px,1.4vw,20px)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '-0.015em',
              color: '#282828',
              fontFamily: "'saans', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            A global team of search-first content marketers engineering semantic
            relevancy &amp; category signals for both the internet and people
          </motion.p>

          {/* RIGHT — heading + CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.135, 0.9, 0.15, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {/* Heading with inline image after "Discovery" */}
            <h2 style={{
              fontSize: 'clamp(40px,5.5vw,90px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#282828',
              fontFamily: "'saans', ui-sans-serif, system-ui, sans-serif",
            }}>
              Driving Demand &amp;{' '}
              <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                Discovery
                <span style={{
                  display: 'inline-block',
                  width: 'clamp(50px,4.8vw,78px)',
                  height: 'clamp(50px,4.8vw,78px)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginLeft: '0.1em',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: '-0.06em',
                  flexShrink: 0,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&q=85&fit=crop"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </span>
              </span>
            </h2>

            {/* CTA buttons — slide-up hover, no color change */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <SlideButton href="/about/" pill>
                Our Story <ArrowSVG />
              </SlideButton>
              <SlideButton href="/services/">
                Our Services <ArrowSVG />
              </SlideButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
