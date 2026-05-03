import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const socialLinks = [
  {
    id: 'facebook',
    href: 'https://www.facebook.com/riseatseven',
    label: 'Facebook',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    href: 'https://twitter.com/riseatseven',
    label: 'X (Twitter)',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/rise-at-seven/',
    label: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@riseatseven',
    label: 'YouTube',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@riseatseven',
    label: 'TikTok',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/riseatseven/',
    label: 'Instagram',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const navCols = [
  [
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Culture', href: '/culture/' },
    { label: 'Meet The Risers', href: '/meet-the-team/' },
  ],
  [
    { label: 'Testimonials', href: '/testimonials/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Webinars', href: '/webinars/' },
    { label: 'Careers', href: '/careers/' },
  ],
];

const offices = [
  { label: 'Sheffield', href: 'https://g.co/kgs/4Br7JaS' },
  { label: 'Manchester', href: 'https://g.co/kgs/9vh5imK' },
  { label: 'London', href: 'https://g.co/kgs/hsv6LhR' },
  { label: 'New York', href: 'https://g.co/kgs/NxzhAKU' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <footer
      ref={ref}
      id="footer"
      className="bg-[#0d0f15] text-white pt-12 pb-8"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-2xl font-black mb-5">Stay updated with Rise news</h3>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex items-center gap-2 max-w-[500px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="flex-1 bg-white/10 text-white placeholder-white/30 text-sm px-5 py-3.5 rounded-full border border-white/10 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              id="newsletter-submit"
              className="w-12 h-12 bg-white text-[#0d0f15] rounded-full flex items-center justify-center hover:bg-[#b2f6e3] transition-colors flex-shrink-0"
            >
              <span className="text-lg">↗</span>
            </button>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200"
            >
              {s.icon}
              <span className="text-[11px] uppercase tracking-wide font-bold">↗</span>
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-10" />

        {/* Nav columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
        >
          {navCols.map((col, ci) => (
            <div key={ci}>
              {col.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 hover:text-white text-sm font-medium mb-3 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Offices */}
          <div>
            {offices.map((o) => (
              <a
                key={o.label}
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/50 hover:text-white text-sm font-medium mb-3 transition-colors duration-200"
              >
                {o.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <a
              href="/contact/"
              className="block text-white/50 hover:text-white text-sm font-medium mb-3 transition-colors"
            >
              Contact
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="h-px bg-white/10 mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#ffffff]/30 text-xs">
          <p>© {new Date().getFullYear()} Rise at Seven</p>
          <div className="flex gap-5">
            <a href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-conditions/" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="https://madebyshape.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Website MadeByShape
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
