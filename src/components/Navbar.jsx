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

const DropdownMenu = ({ items, viewAllHref, viewAllLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full left-0 mt-2 bg-white text-black min-w-[220px] shadow-2xl z-50"
  >
    <div className="py-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="block px-5 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-[#ff3c00] transition-colors duration-150"
        >
          {item.label}
        </a>
      ))}
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="block px-5 py-2.5 text-sm font-bold text-[#ff3c00] border-t border-gray-100 mt-1 hover:bg-gray-50 transition-colors duration-150"
        >
          {viewAllLabel || 'View all'} →
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (key) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
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
      <div className="bg-[#ff3c00] text-white text-center text-xs sm:text-sm py-2.5 px-4 font-medium">
        <a href="/multi-channel-search-report-2026-/" className="hover:underline">
          🚨 Where are your customers actually searching?{' '}
          <span className="underline font-semibold">Download the report</span>
        </a>
      </div>

      {/* Main Nav */}
      <header
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a href="/" className="flex-shrink-0" aria-label="Rise at Seven Home">
            <svg width="120" height="28" viewBox="0 0 200 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="38" fontFamily="Inter, sans-serif" fontSize="36" fontWeight="900" fill="white" letterSpacing="-1">
                rise<tspan fill="#ff3c00">@</tspan>7
              </text>
            </svg>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.items ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-[#ff3c00] transition-colors duration-200">
                    {link.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.key ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
                  className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-[#ff3c00] transition-colors duration-200"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-0.5 bg-[#ff3c00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </a>
              )
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/connect-with-us/"
              id="nav-cta-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#ff3c00] hover:bg-[#e03500] text-white text-sm font-semibold px-5 py-2.5 transition-colors duration-200"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              id="hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black border-t border-white/10 overflow-y-auto max-h-[calc(100vh-120px)]"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  link.items ? (
                    <div key={link.key}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.key ? null : link.key)}
                        className="w-full flex items-center justify-between py-3 text-base font-semibold text-white border-b border-white/10"
                      >
                        {link.label} +
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {link.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block pl-4 py-2.5 text-sm text-white/70 hover:text-[#ff3c00] transition-colors"
                              >
                                {item.label}
                              </a>
                            ))}
                            {link.viewAllHref && (
                              <a
                                href={link.viewAllHref}
                                className="block pl-4 py-2.5 text-sm text-[#ff3c00] font-semibold"
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
                      className="flex items-center gap-2 py-3 text-base font-semibold text-white border-b border-white/10 hover:text-[#ff3c00] transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="bg-[#ff3c00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  )
                ))}
                <a
                  href="/connect-with-us/"
                  className="mt-4 inline-flex items-center justify-center gap-2 bg-[#ff3c00] text-white text-sm font-semibold px-5 py-3 transition-colors duration-200"
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
