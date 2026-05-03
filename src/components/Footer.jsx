import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const footerLinks = {
  main: [
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Culture', href: '/culture/' },
    { label: 'Meet The Risers', href: '/meet-the-team/' },
    { label: 'Testimonials', href: '/testimonials/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Webinars', href: '/webinars/' },
    { label: 'Careers', href: '/careers/' },
  ],
  offices: [
    { label: 'Sheffield', href: 'https://g.co/kgs/4Br7JaS' },
    { label: 'Manchester', href: 'https://g.co/kgs/9vh5imK' },
    { label: 'London', href: 'https://g.co/kgs/hsv6LhR' },
    { label: 'New York', href: 'https://g.co/kgs/NxzhAKU' },
  ],
  contact: [
    { label: 'Contact', href: '/contact/' },
  ],
};

const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rise-at-seven/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: 'https://twitter.com/riseatseven',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/riseatseven/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@riseatseven',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <footer ref={ref} id="footer" className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="inline-block mb-5">
              <svg width="120" height="28" viewBox="0 0 200 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="38" fontFamily="Inter, sans-serif" fontSize="36" fontWeight="900" fill="white" letterSpacing="-1">
                  rise<tspan fill="#ff3c00">@</tspan>7
                </text>
              </svg>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              A search-first content marketing agency with offices in London, Sheffield, Manchester &amp; New York.
            </p>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/40 hover:border-[#ff3c00] hover:text-[#ff3c00] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.main.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 text-sm hover:text-white hover:text-[#ff3c00] transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5">Our Offices</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.offices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-sm hover:text-[#ff3c00] transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get in touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5">Get Started</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Ready to grow your organic presence? Let's talk.
            </p>
            <a
              href="/connect-with-us/"
              id="footer-cta-btn"
              className="inline-flex items-center gap-2 bg-[#ff3c00] hover:bg-[#e03500] text-white text-sm font-bold px-5 py-3 transition-colors duration-200"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Rise at Seven. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="/privacy-policy/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-conditions/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Terms &amp; Conditions
            </a>
            <a
              href="https://madebyshape.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-xs hover:text-white/50 transition-colors"
            >
              Website MadeByShape
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
