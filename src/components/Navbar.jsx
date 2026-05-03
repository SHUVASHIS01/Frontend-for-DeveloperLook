import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { label: 'Search & Growth Strategy', href: '/services/strategy-growth/' },
  { label: 'Onsite SEO', href: '/services/onsite-seo/' },
  { label: 'Content Experience', href: '/services/content-experience/' },
  { label: 'B2B Marketing', href: '/services/b2b-marketing/' },
  { label: 'Digital PR', href: '/services/digital-pr/' },
  { label: 'Social Media & Campaigns', href: '/services/social/' },
  { label: 'Data & Insights', href: '/services/data-insights/' },
  { label: 'Social SEO/Search', href: '/services/social-seo-tiktok-youtube/' },
];

const international = [
  { label: 'US Digital PR', href: '/international/us-digital-pr/' },
  { label: 'Spain Digital PR', href: '/spain-digital-pr/' },
  { label: 'Germany Digital PR', href: '/germany-digital-pr/' },
  { label: 'Netherlands Digital PR', href: '/netherlands-digital-pr/' },
];

const about = [
  { label: 'About Us', href: '/about/' },
  { label: 'Meet The Risers', href: '/meet-the-team/' },
  { label: 'Culture', href: '/culture/' },
  { label: 'Testimonials', href: '/testimonials/' },
];

// Logo Component - matches Rise at Seven branding
const Logo = () => (
  <a href="/" aria-label="Rise at Seven Home" className="flex-shrink-0">
    <div className="flex items-center gap-0 font-black text-[26px] tracking-tight leading-none">
      <span className="text-white">rise</span>
      <span className="text-[#ff3c00]">@</span>
      <span className="text-white">7</span>
    </div>
  </a>
);

const DropdownMenu = ({ items, viewAllHref, viewAllLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    transition={{ duration: 0.18 }}
    className="absolute top-full left-0 mt-0 bg-white text-black min-w-[230px] shadow-2xl z-50"
  >
    <div className="py-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#ff3c00] transition-colors duration-150 border-b border-gray-100 last:border-0"
        >
          {item.label}
        </a>
      ))}
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="flex items-center gap-1 px-5 py-3 text-sm font-bold text-[#ff3c00] bg-red-50 hover:bg-red-100 transition-colors duration-150"
        >
          {viewAllLabel || 'View all'}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (key) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinks = [
    { label: 'Services', key: 'services', items: services, viewAllHref: '/services/', viewAllLabel: 'View all services' },
    { label: 'International', key: 'international', items: international },
    { label: 'About', key: 'about', items: about },
    { label: 'Work', href: '/work/', badge: '25' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Webinar', href: '/webinars/' },
  ];

  return (
    <>
      {/* Alert Bar */}
      <div className="bg-[#ff3c00] text-white text-center py-2.5 px-4 font-medium text-xs sm:text-sm">
        <a
          href="/multi-channel-search-report-2026-/"
          id="alert-bar-link"
          className="hover:underline"
        >
          🚨 Where are your customers actually searching?{' '}
          <span className="underline font-bold">Download the report</span>
        </a>
      </div>

      {/* Main Nav */}
      <header
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/96 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
            : 'bg-black'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-5 lg:px-10 xl:px-14 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center">
            {navLinks.map((link) =>
              link.items ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                      activeDropdown === link.key ? 'text-[#ff3c00]' : 'text-white hover:text-[#ff3c00]'
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.key && (
                      <DropdownMenu
                        items={link.items}
                        viewAllHref={link.viewAllHref}
                        viewAllLabel={link.viewAllLabel}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-white hover:text-[#ff3c00] transition-colors duration-200"
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-[#ff3c00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm leading-none">
                      {link.badge}
                    </span>
                  )}
                </a>
              )
            )}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/connect-with-us/"
              id="nav-cta-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#ff3c00] hover:bg-[#d43300] text-white text-[13px] font-bold px-5 py-2.5 transition-colors duration-200"
            >
              Get in touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="lg:hidden bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
            >
              <div className="max-h-[calc(100svh-120px)] overflow-y-auto px-5 py-4 flex flex-col">
                {navLinks.map((link) =>
                  link.items ? (
                    <div key={link.key}>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === link.key ? null : link.key)
                        }
                        className="w-full flex items-center justify-between py-3.5 text-base font-bold text-white border-b border-white/8"
                      >
                        {link.label}
                        <svg
                          className={`w-4 h-4 text-white/40 transition-transform duration-200 ${mobileExpanded === link.key ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-white/3"
                          >
                            {link.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block px-5 py-3 text-sm text-white/60 hover:text-[#ff3c00] border-b border-white/5 last:border-0 transition-colors"
                              >
                                {item.label}
                              </a>
                            ))}
                            {link.viewAllHref && (
                              <a
                                href={link.viewAllHref}
                                className="flex items-center gap-1 px-5 py-3 text-sm text-[#ff3c00] font-bold"
                              >
                                {link.viewAllLabel} →
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 py-3.5 text-base font-bold text-white border-b border-white/8 hover:text-[#ff3c00] transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="bg-[#ff3c00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                )}
                <a
                  href="/connect-with-us/"
                  className="mt-5 flex items-center justify-center gap-2 bg-[#ff3c00] hover:bg-[#d43300] text-white text-sm font-bold px-5 py-3.5 transition-colors duration-200"
                >
                  Get in touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
