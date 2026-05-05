import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'Services',
    key: 'services',
    mega: true,
    items: [
      { label: 'Search & Growth Strategy', href: '/services/strategy-growth/' },
      { label: 'Onsite SEO',               href: '/services/onsite-seo/' },
      { label: 'Content Experience',        href: '/services/content-experience/' },
      { label: 'B2B Marketing',             href: '/services/b2b-marketing/' },
      { label: 'Digital PR',                href: '/services/digital-pr/' },
      { label: 'Social Media & Campaigns',  href: '/services/social/' },
      { label: 'Data & Insights',           href: '/services/data-insights/' },
      { label: 'Social SEO/Search',         href: '/services/social-seo-tiktok-youtube/' },
    ],
    viewAll: { label: 'View All Services', href: '/services/' },
  },
  {
    label: 'International',
    key: 'international',
    items: [
      { label: 'US Digital PR',          href: '/international/us-digital-pr/' },
      { label: 'Spain Digital PR',       href: '/spain-digital-pr/' },
      { label: 'Germany Digital PR',     href: '/germany-digital-pr/' },
      { label: 'Netherlands Digital PR', href: '/netherlands-digital-pr/' },
    ],
  },
  {
    label: 'About',
    key: 'about',
    items: [
      { label: 'About Us',        href: '/about/' },
      { label: 'Meet The Risers', href: '/meet-the-team/' },
      { label: 'Culture',         href: '/culture/' },
      { label: 'Testimonials',    href: '/testimonials/' },
    ],
  },
  { label: 'Work',    href: '/work/',     badge: '25' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Blog',    href: '/blog/' },
  { label: 'Webinar', href: '/webinars/', featured: true },
];

/* ── Services mega-menu ───────────────────────────────────────────────────── */
function ServicesMegaMenu({ items, viewAll }) {
  const left  = items.slice(0, 4);
  const right = items.slice(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: [0.135, 0.9, 0.15, 1] }}
      className="absolute top-full mt-2 z-50"
      style={{ left: '50%', transform: 'translateX(-30%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-black/6 overflow-hidden flex"
           style={{ width: '760px' }}>

        {/* Left: service links */}
        <div className="flex-1 p-8 pt-7">
          <p className="text-[#282828]/40 text-[10px] font-bold uppercase tracking-[0.18em] mb-5">
            Core Services
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
            {[...left, ...right].map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#282828] text-[15px] font-semibold leading-snug hover:text-[#282828]/50 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: image + CTA */}
        <div className="relative w-[290px] flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=580&q=85&fit=crop"
            alt="Rise at Seven team"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient so button is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-4 right-4">
            <a
              href={viewAll.href}
              className="flex items-center justify-center gap-2 bg-[#121212] text-white text-sm font-semibold px-5 py-3 rounded-full w-full hover:bg-[#282828] transition-colors duration-300"
            >
              {viewAll.label} ↗
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular small dropdown (International, About) ───────────────────────── */
function Dropdown({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.135, 0.9, 0.15, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-xl rounded-2xl overflow-hidden min-w-[220px] z-50 border border-black/5"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-5 py-3 text-sm font-medium text-[#282828] hover:bg-[#efeeec] transition-colors border-b border-black/5 last:border-0"
        >
          {item.label}
        </a>
      ))}
    </motion.div>
  );
}

/* ── Navbar ───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openDropdown  = (key) => { clearTimeout(hoverTimeout.current); setActiveDropdown(key); };
  const closeDropdown = ()    => { hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 120); };

  return (
    <>
      {/* ── Alert bar ── */}
      <div className="bg-[#b2f6e3] text-[#282828] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold">
        <a href="/multi-channel-search-report-2026-/" id="alert-bar-link" className="hover:underline">
          🚨 Where are your customers actually searching?{' '}
          <span className="underline font-bold">Download the report</span>
        </a>
      </div>

      {/* ── Sticky header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#efeeec]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-[64px]">

          {/* Logo */}
          <a href="/" aria-label="Rise at Seven"
             className="font-bold text-[17px] tracking-tight flex-shrink-0 text-[#282828]">
            Rise at Seven
            <sup className="text-[8px] ml-0.5 opacity-60">®</sup>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.items ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.key)}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeDropdown === link.key
                        ? 'bg-white border border-black/12 shadow-sm text-[#282828]'
                        : 'text-[#282828] hover:text-[#282828]/60'
                    }`}
                  >
                    {link.label}
                    <span className="text-sm font-semibold leading-none">+</span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.key && (
                      link.mega
                        ? <ServicesMegaMenu items={link.items} viewAll={link.viewAll} />
                        : <Dropdown items={link.items} />
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium text-[#282828] hover:text-[#282828]/60 transition-colors duration-200 ${
                    link.featured
                      ? 'border border-[#282828]/25 rounded-full hover:border-[#282828]/50'
                      : ''
                  }`}
                >
                  {link.badge && (
                    <span className="absolute -top-2 -right-1 bg-[#b2f6e3] text-[#282828] text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="/connect-with-us/"
              id="nav-cta-btn"
              className="hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-[#282828] hover:text-white text-[#282828] text-sm font-semibold px-5 py-2.5 rounded-full border border-black/15 transition-all duration-300"
            >
              Get In Touch
              <span className="text-base">↗</span>
            </a>
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#efeeec] border-t border-black/8 overflow-hidden"
            >
              <div className="max-h-[80svh] overflow-y-auto px-5 py-3 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.items ? (
                    <div key={link.key}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.key ? null : link.key)}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[#282828]"
                      >
                        {link.label}
                        <span className="text-base font-medium">{mobileExpanded === link.key ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.key && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            {link.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block pl-4 py-2.5 text-sm text-[#6a6a6a] hover:text-[#282828] transition-colors"
                              >
                                {item.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 py-3 text-sm font-semibold text-[#282828]"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="bg-[#b2f6e3] text-[#282828] text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                )}
                <a
                  href="/connect-with-us/"
                  className="mt-3 flex items-center justify-center gap-2 bg-[#282828] text-white text-sm font-semibold px-5 py-3 rounded-full"
                >
                  Get In Touch ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
