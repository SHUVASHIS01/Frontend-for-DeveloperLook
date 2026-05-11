import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Rise at Seven SVG wordmark ──────────────────────────────────────────── */
const RiseLogo = ({ className = '' }) => (
  <svg className={`w-full h-full object-contain fill-current ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 21" fill="none">
    <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z"/>
    <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z"/>
    <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z"/>
    <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z"/>
    <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z"/>
    <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z"/>
    <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z"/>
    <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z"/>
    <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z"/>
    <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z"/>
    <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z"/>
    <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z"/>
  </svg>
);

/* ── Navigation Data ─────────────────────────────────────────────────────── */
const navLinks = [
  {
    label: 'Services', key: 'services', href: '/services/', hasDropdown: true,
    megaTitle: 'Core Services',
    menuWidth: 960,
    columns: 2,
    viewAll: { label: 'View All Services', href: '/services/' },
    items: [
      { label: 'Search & Growth Strategy', href: '/services/strategy-growth/', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
      { label: 'Onsite SEO', href: '/services/onsite-seo/', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
      { label: 'Content Experience', href: '/services/content-experience/', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
      { label: 'B2B Marketing', href: '/services/b2b-marketing/', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80' },
      { label: 'Digital PR', href: '/services/digital-pr/', image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=600&q=80' },
      { label: 'Social Media & Campaigns', href: '/services/social/', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80' },
      { label: 'Data & Insights', href: '/services/data-insights/', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
      { label: 'Social SEO/Search', href: '/services/social-seo-tiktok-youtube/', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80' },
    ],
  },
  {
    label: 'Industries', key: 'industries', href: '/industries/', hasDropdown: true,
    menuWidth: 680,
    columns: 1,
    viewAll: { label: 'View All Industries', href: '/industries/' },
    items: [
      { label: 'Retail', href: '/industries/retail/', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
      { label: 'Travel', href: '/industries/travel/', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80' },
      { label: 'Finance', href: '/industries/finance/', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80' },
      { label: 'Automotive', href: '/industries/automotive/', image: 'https://images.unsplash.com/photo-1503376713246-815259e86798?w=600&q=80' },
    ],
  },
  {
    label: 'International', key: 'international', href: '/international/', hasDropdown: true,
    menuWidth: 680,
    columns: 1,
    viewAll: { label: 'View All Regions', href: '/international/' },
    items: [
      { label: 'US Digital PR', href: '/international/us-digital-pr/', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80' },
      { label: 'Spain Digital PR', href: '/spain-digital-pr/', image: 'https://images.unsplash.com/photo-1539037116277-4db20202d03e?w=600&q=80' },
      { label: 'Germany Digital PR', href: '/germany-digital-pr/', image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80' },
      { label: 'Netherlands Digital PR', href: '/netherlands-digital-pr/', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80' },
    ],
  },
  {
    label: 'About', key: 'about', href: '/about/', hasDropdown: true,
    menuWidth: 680,
    columns: 1,
    viewAll: { label: 'Discover More', href: '/about/' },
    items: [
      { label: 'About Us', href: '/about/', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
      { label: 'Meet The Risers', href: '/meet-the-team/', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80' },
      { label: 'Culture', href: '/culture/', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80' },
      { label: 'Testimonials', href: '/testimonials/', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80' },
    ],
  },
  { label: 'Work', key: 'work', href: '/work/', badge: '25' },
  { label: 'Careers', key: 'careers', href: '/careers/' },
  {
    label: 'Blog & Resources', key: 'blog', href: '/blog/', hasDropdown: true,
    menuWidth: 680,
    columns: 1,
    viewAll: { label: 'View All Posts', href: '/blog/' },
    items: [
      { label: 'Blog', href: '/blog/', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80' },
      { label: 'Category Leaderboard', href: '/blog/guides/', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&q=80' },
      { label: 'Multi-Channel Search Report', href: '/webinars/', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80' },
    ],
  },
  { label: 'Webinar', key: 'webinar', href: '/webinars/' },
];

/* ── Dynamic Mega Menu ───────────────────────────────────────────────────── */
function MegaMenu({ link }) {
  const { items, viewAll, megaTitle, menuWidth, columns } = link;
  const [hoveredImage, setHoveredImage] = useState(items[0]?.image);

  // Reset image when switching dropdowns
  useEffect(() => {
    setHoveredImage(items[0]?.image);
  }, [link.key]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full mt-2 z-50 left-1/2 -translate-x-1/2 origin-top"
      style={{ width: `${menuWidth}px` }}
    >
      <div className="bg-white rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-black/5 flex overflow-hidden min-h-[340px]">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
          }}
          className={`flex-1 p-10 pt-8 ${columns === 1 ? 'flex flex-col justify-center' : ''}`}
        >
          {megaTitle && (
            <motion.p 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } }
              }}
              className="text-[#282828]/50 text-xs font-semibold uppercase tracking-wider mb-6"
            >
              {megaTitle}
            </motion.p>
          )}
          <div className={`grid gap-x-8 gap-y-4 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {items.map(item => (
              <a key={item.label} href={item.href}
                onMouseEnter={() => setHoveredImage(item.image)}
                className={`group block overflow-hidden py-0.5 ${
                  columns === 2 ? 'text-[17px]' : 'text-[28px] leading-[1.1]'
                }`}
              >
                <motion.div
                  variants={{
                    hidden: { y: '120%' },
                    visible: { y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="relative block overflow-hidden"
                >
                  <span className="block text-[#121212] font-semibold tracking-tight transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 block text-[#282828]/50 font-semibold tracking-tight transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                    {item.label}
                  </span>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.div>
        
        <div className="relative w-[340px] flex-shrink-0 p-3">
           <div className="w-full h-full relative rounded-[20px] overflow-hidden bg-gray-100">
              <AnimatePresence initial={false}>
                <motion.img
                  key={hoveredImage}
                  src={hoveredImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              
              <div className="absolute bottom-5 left-5 right-5">
                <a href={viewAll.href}
                  className="group flex items-center justify-center gap-2 bg-[#121212] text-white text-[13px] font-semibold px-5 py-3.5 rounded-full w-full hover:bg-black transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden flex items-center">
                    <span className="flex items-center gap-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      {viewAll.label} <span className="text-[10px] mt-0.5">↗</span>
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center gap-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-white">
                      {viewAll.label} <span className="text-[10px] mt-0.5">↗</span>
                    </span>
                  </div>
                </a>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Chevron icon ────────────────────────────────────────────────────────── */
const ChevronDown = ({ isOpen }) => (
  <svg
    width={18} height={18} viewBox="0 0 18 18" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
  >
    <path d="M4 7l5 5 5-5" />
  </svg>
);

/* ── Navbar ───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [hidden,         setHidden]         = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  
  const hoverTimeout = useRef(null);
  const lastScrollY = useRef(0);

  // Scroll detection for Smart Sticky Header
  useEffect(() => {
    let lastScrollYVal = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY <= 150) {
        setHidden(false); // Always show when near the top
      } else if (currentScrollY > lastScrollYVal + 5) {
        setHidden(true);  // Scrolling down
      } else if (currentScrollY < lastScrollYVal - 5) {
        setHidden(false); // Scrolling up
      }

      lastScrollYVal = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openDropdown  = (key) => { clearTimeout(hoverTimeout.current); setActiveDropdown(key); };
  const closeDropdown = ()    => { hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 150); };

  const onDark = !scrolled;
  const activeLink = activeDropdown ? navLinks.find(l => l.key === activeDropdown) : null;

  return (
    <>
      {/* ── Alert bar ── */}
      <div className="pt-2.5 px-2.5 w-full bg-[#efeeec]">
        <a
          href="/multi-channel-search-report-2026-/"
          className="navbar-alert flex justify-center items-center text-xs w-full py-2 px-5 text-center tracking-tight leading-none font-semibold rounded-2xl bg-[#b2f6e3] text-[#121212] hover:rounded-md transition-all duration-300"
        >
          🚨 Where are your customers actually searching? Download the report
        </a>
      </div>

      {/* ── Sticky Smart Header ── */}
      <header 
        className={`w-full sticky top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden ? '-translate-y-[150%]' : 'translate-y-0'
        }`}
        onMouseLeave={closeDropdown}
      >
        <div className={`w-full flex items-center justify-between relative z-20 px-4 transition-all duration-700 lg:px-3 lg:rounded-full ${
          scrolled ? 'bg-white/60 backdrop-blur-md shadow-sm border-b lg:border border-black/5' : ''
        }`} style={{ height: '72px' }}>

          {/* Logo */}
          <a href="/" aria-label="Rise at Seven"
            className={`flex w-28 ml-1 md:w-36 transition-colors duration-300 ${onDark ? 'text-white' : 'text-[#121212]'}`}>
            <div style={{ aspectRatio: '168/21' }}>
              <RiseLogo />
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="relative ml-6 hidden lg:inline-flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeDropdown === link.key;
              return (
                <div key={link.key} className="z-10 relative" onMouseEnter={() => openDropdown(link.key)}>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full z-[-1] ${onDark ? 'bg-white' : 'bg-[#efeeec]'}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <a
                    href={link.href}
                    className={`inline-flex items-center tracking-tight leading-tight py-2.5 px-4 font-semibold relative duration-300 transition-colors ${
                      isActive 
                        ? 'text-[#121212]'
                        : (onDark ? 'text-white hover:text-white/80' : 'text-[#121212] hover:text-[#121212]/60')
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <span className="ml-1 text-[10px]">+</span>}
                    {link.badge && (
                      <span className={`absolute -top-1 right-0 translate-x-1/2 bg-[#b2f6e3] text-[#121212] text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-transform duration-300`}>
                        {link.badge}
                      </span>
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="/connect-with-us/"
              className={`group hidden lg:inline-flex items-center gap-2 text-[14px] font-semibold px-6 py-2.5 rounded-3xl transition-all duration-300 hover:scale-105 shadow-sm border border-black/5 ${
                onDark ? 'bg-white text-[#121212]' : 'bg-[#121212] text-white'
              }`}
            >
              <div className="relative overflow-hidden flex items-center">
                <span className="flex items-center gap-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  Get in touch <span className="text-[10px] mt-0.5 font-bold">↗</span>
                </span>
                <span className={`absolute inset-0 flex items-center gap-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 ${onDark ? 'text-[#121212]' : 'text-white'}`}>
                  Get in touch <span className="text-[10px] mt-0.5 font-bold">↗</span>
                </span>
              </div>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-8 flex flex-col items-center justify-center gap-1.5 rounded transition-colors ${onDark ? 'text-white' : 'text-[#121212]'}`}
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-500 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-500 ${mobileOpen ? '-rotate-45 -translate-y-0' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Global Mega Menu Container ── */}
        <AnimatePresence>
          {activeLink && activeLink.hasDropdown && (
            <MegaMenu link={activeLink} />
          )}
        </AnimatePresence>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                padding: 8,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              {/* Dark card — full height inner container */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'rgba(14,14,14,0.97)',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                padding: '16px 20px 24px',
                boxSizing: 'border-box',
              }}>

                {/* ── Header: logo + close ── */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <a href="/" style={{ width: 120, color: '#fff', display: 'block' }}>
                    <div style={{ aspectRatio: '168/21' }}><RiseLogo /></div>
                  </a>
                  <button
                    onClick={() => setMobileOpen(false)}
                    style={{
                      width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: '#ffffff', flexShrink: 0,
                    }}
                    aria-label="Close menu"
                  >
                    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                      <path d="M2 2l14 14M16 2L2 16" />
                    </svg>
                  </button>
                </div>

                {/* ── Nav items ── */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {navLinks.map(link => (
                    <div key={link.key} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 14, paddingBottom: 14,
                      }}>
                        <a
                          href={link.href}
                          style={{
                            color: '#ffffff',
                            fontWeight: 700,
                            lineHeight: 1,
                            fontSize: 'clamp(36px,5.8vw,60px)',
                            letterSpacing: '-0.02em',
                            textDecoration: 'none',
                          }}
                        >
                          {link.label}
                        </a>
                        {link.hasDropdown && (
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === link.key ? null : link.key)}
                            style={{
                              width: 34, height: 34, borderRadius: '50%',
                              border: '1px solid rgba(255,255,255,0.25)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'rgba(255,255,255,0.65)',
                              flexShrink: 0,
                              background: 'transparent',
                              cursor: 'pointer',
                            }}
                          >
                            <ChevronDown isOpen={mobileExpanded === link.key} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {mobileExpanded === link.key && link.items && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                            style={{ overflow: 'hidden' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16, paddingLeft: 4 }}>
                              {link.items.map(item => (
                                <a key={item.label} href={item.href}
                                  style={{
                                    color: 'rgba(255,255,255,0.55)',
                                    fontSize: 15,
                                    letterSpacing: '-0.01em',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                  }}>
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* ── Get In Touch CTA ── */}
                <div style={{ paddingTop: 20, paddingBottom: 4 }}>
                  <a
                    href="/connect-with-us/"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#ffffff',
                      color: '#121212',
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '12px 22px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Get In Touch <span style={{ fontSize: 12 }}>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
