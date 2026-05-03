import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  {
    label: 'Services',
    key: 'services',
    items: [
      { label: 'Search & Growth Strategy', href: '/services/strategy-growth/' },
      { label: 'Onsite SEO', href: '/services/onsite-seo/' },
      { label: 'Content Experience', href: '/services/content-experience/' },
      { label: 'B2B Marketing', href: '/services/b2b-marketing/' },
      { label: 'Digital PR', href: '/services/digital-pr/' },
      { label: 'Social Media & Campaigns', href: '/services/social/' },
      { label: 'Data & Insights', href: '/services/data-insights/' },
      { label: 'Social SEO/Search', href: '/services/social-seo-tiktok-youtube/' },
    ],
    viewAll: { label: 'View all services', href: '/services/' },
  },
  {
    label: 'International',
    key: 'international',
    items: [
      { label: 'US Digital PR', href: '/international/us-digital-pr/' },
      { label: 'Spain Digital PR', href: '/spain-digital-pr/' },
      { label: 'Germany Digital PR', href: '/germany-digital-pr/' },
      { label: 'Netherlands Digital PR', href: '/netherlands-digital-pr/' },
    ],
  },
  {
    label: 'About',
    key: 'about',
    items: [
      { label: 'About Us', href: '/about/' },
      { label: 'Meet The Risers', href: '/meet-the-team/' },
      { label: 'Culture', href: '/culture/' },
      { label: 'Testimonials', href: '/testimonials/' },
    ],
  },
  { label: 'Work', href: '/work/', badge: '25' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Webinar', href: '/webinars/', featured: true },
];

function Dropdown({ items, viewAll }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-xl rounded-2xl overflow-hidden min-w-[220px] z-50 border border-black/5"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-5 py-3 text-sm font-medium text-[#0d0f15] hover:bg-[#e9edf4] transition-colors border-b border-black/5 last:border-0"
        >
          {item.label}
        </a>
      ))}
      {viewAll && (
        <a
          href={viewAll.href}
          className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-[#0d0f15] bg-[#e9edf4] hover:bg-[#d8dce6] transition-colors"
        >
          {viewAll.label}
          <span className="text-base">↗</span>
        </a>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const openDropdown = (key) => {
    clearTimeout(hoverTimeout.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 100);
  };

  return (
    <>
      {/* Alert Bar — mint green */}
      <div className="bg-[#b2f6e3] text-[#0d0f15] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold">
        <a href="/multi-channel-search-report-2026-/" id="alert-bar-link" className="hover:underline">
          🚨 Where are your customers actually searching?{' '}
          <span className="underline">Download the report</span>
        </a>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <a href="/" aria-label="Rise at Seven" className="text-[#0d0f15] font-bold text-lg tracking-tight flex-shrink-0">
            Rise at Seven
          </a>

          {/* Desktop links */}
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                      activeDropdown === link.key
                        ? 'text-[#0d0f15]'
                        : 'text-[#0d0f15] hover:text-[#0d0f15]/70'
                    }`}
                  >
                    {link.label}
                    <span className="text-sm font-medium leading-none ml-0.5">+</span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.key && (
                      <Dropdown items={link.items} viewAll={link.viewAll} />
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium text-[#0d0f15] hover:text-[#0d0f15]/70 transition-colors duration-150 ${
                    link.featured ? 'border border-[#0d0f15]/30 rounded-full px-4 hover:border-[#0d0f15]/60' : ''
                  }`}
                >
                  {link.badge && (
                    <span className="absolute -top-1 right-0 bg-[#b2f6e3] text-[#0d0f15] text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="/connect-with-us/"
              id="nav-cta-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-white hover:bg-[#0d0f15] hover:text-white text-[#0d0f15] text-sm font-semibold px-5 py-2.5 rounded-full border border-black/15 transition-all duration-200"
            >
              Get in touch
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-black/8 overflow-hidden"
            >
              <div className="max-h-[80svh] overflow-y-auto px-5 py-3 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.items ? (
                    <div key={link.key}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.key ? null : link.key)}
                        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[#0d0f15]"
                      >
                        {link.label}
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileExpanded === link.key ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
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
                                className="block pl-4 py-2.5 text-sm text-[#6b7280] hover:text-[#0d0f15] transition-colors"
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
                      className="flex items-center gap-2 py-3 text-sm font-semibold text-[#0d0f15]"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="bg-[#0d0f15] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                )}
                <a
                  href="/connect-with-us/"
                  className="mt-3 flex items-center justify-center gap-2 bg-[#0d0f15] text-white text-sm font-semibold px-5 py-3 rounded-full"
                >
                  Get in touch ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
