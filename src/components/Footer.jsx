import React, { useState } from 'react';

/* ── Rise at Seven SVG wordmark (same paths as Navbar) ──────────────────── */
const RiseWordmark = () => (
  <svg className="w-full h-full object-contain fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 21" fill="none">
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
    <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z"/>
    <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z"/>
  </svg>
);

/* ── Social icon SVGs ────────────────────────────────────────────────────── */
const socialLinks = [
  {
    id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/riseatseven',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    id: 'twitter', label: 'X', href: 'https://x.com/riseatseven',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/riseatseven/',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCAjOP9BgpZPTgae-QT9HGCw',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@riseatseven',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  },
  {
    id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/riseatseven/',
    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

/* Nav columns — exact from source */
const col1 = [
  { label: 'Services',       href: '/services/' },
  { label: 'Work',           href: '/work/' },
  { label: 'About',          href: '/about/' },
  { label: 'Culture',        href: '/culture/' },
  { label: 'Meet The Risers',href: '/meet-the-team/' },
];
const col2 = [
  { label: 'Testimonials',    href: '/testimonials/' },
  { label: 'Blog & Resources', href: '/blog/' },
  { label: 'Webinars',     href: '/webinars/' },
  { label: 'Careers',      href: '/careers/' },
];
const col3 = [
  { label: 'Sheffield',  href: 'https://g.co/kgs/4Br7JaS', external: true },
  { label: 'Manchester', href: 'https://g.co/kgs/9vh5imK', external: true },
  { label: 'London',     href: 'https://g.co/kgs/hsv6LhR', external: true },
  { label: 'New York',   href: 'https://g.co/kgs/NxzhAKU', external: true },
  { label: 'Contact',    href: '/contact/' },
];

/* Arrow up-right icon */
const ArrowIcon = () => (
  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5"/>
  </svg>
);

/* Hover-slide link (text slides up on hover) */
const FooterLink = ({ href, label, highlight, external }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={`group inline-flex font-medium tracking-tight leading-tight text-lg lg:text-xl overflow-hidden transition-colors duration-300 ${
      highlight ? 'text-[#b2f6e3]' : 'text-white hover:text-[#b2f6e3]'
    }`}
  >
    <span className="relative overflow-hidden inline-block">
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">{label}</span>
      <span className="absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">{label}</span>
    </span>
  </a>
);

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    /* Outer wrapper: p-2 matches the real site's card-with-padding style */
    <footer id="footer" className="w-full p-2 bg-[#efeeec]" style={{ position: 'relative', zIndex: 2 }}>
      <div className="w-full bg-[#111212] rounded-3xl overflow-hidden">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-12 pt-14 pb-6 lg:py-10 px-4 md:px-7 gap-x-3 md:gap-x-5 gap-y-3 md:gap-y-7">

          {/* Left: newsletter + socials */}
          <div className="flex flex-col items-start justify-start col-span-12 mb-10 lg:mb-0 lg:col-span-4 gap-y-3 md:gap-y-5">

            <h2 className="inline-flex flex-wrap text-balance text-white text-2xl xl:text-3xl font-medium tracking-tight leading-none">
              Stay updated with Rise news
            </h2>

            {/* Email form */}
            <form
              onSubmit={e => { e.preventDefault(); setEmail(''); }}
              className="w-full relative"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="appearance-none w-full bg-[#282828] rounded-full text-white font-medium tracking-tight leading-none text-lg px-5 py-4 lg:text-xl lg:px-6 lg:py-5 placeholder:text-white/50 focus:outline-none focus:ring-[3px] focus:ring-white/15 transition"
              />
              <div className="absolute top-0 right-0 p-2">
                <button
                  type="submit"
                  className="w-9 h-9 lg:w-13 lg:h-13 bg-[#b2f6e3] text-[#111212] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:rotate-90"
                >
                  <ArrowIcon />
                </button>
              </div>
            </form>

            {/* Social pills */}
            <div className="flex gap-1 flex-wrap">
              {socialLinks.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-x-2.5 rounded-xl text-xs px-2 py-1 bg-white text-[#111212] hover:rounded-sm transition-all duration-300"
                >
                  <span className="inline-flex items-center">{s.icon}</span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>

          {/* Right: nav columns */}
          <div className="footer-nav-cols flex justify-between col-span-12 flex-wrap md:flex-row md:col-span-11 lg:col-span-6 lg:col-start-6 gap-y-8">

            {/* Col 1 */}
            <div className="flex flex-col items-start gap-y-1.5 border-l border-white/20 pl-3 w-1/2 md:w-auto">
              {col1.map(l => <FooterLink key={l.label} {...l} />)}
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-start gap-y-1.5 border-l border-white/20 pl-3 w-1/2 md:w-auto">
              {col2.map(l => <FooterLink key={l.label} {...l} />)}
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-start gap-y-1.5 border-l border-white/20 pl-3 w-1/2 md:w-auto">
              {col3.map(l => <FooterLink key={l.label} {...l} />)}
            </div>

          </div>

          {/* ── Giant wordmark ── */}
          <div className="footer-wordmark col-span-12 mt-10 lg:mt-32 text-white">
            <RiseWordmark />
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom col-span-12 flex justify-between flex-col mt-4 items-start md:flex-row md:items-center lg:mt-2">

            <div className="flex gap-x-2 gap-y-1 flex-wrap items-center">
              {[
                '© 2025 Rise at Seven Ltd. All rights reserved',
                'Company Number 11955187',
                'VAT Registered GB 322402945',
              ].map((text, i) => (
                <React.Fragment key={text}>
                  <span className="text-white font-light leading-tight text-[0.675rem] md:text-xs">{text}</span>
                  <span className="w-1 h-1 rounded-full bg-white inline-flex" />
                </React.Fragment>
              ))}
              <a href="/privacy-policy/" className="text-white font-light leading-tight text-[0.675rem] md:text-xs hover:text-[#b2f6e3] transition-colors">
                Privacy Policy
              </a>
              <span className="w-1 h-1 rounded-full bg-white inline-flex" />
              <a href="/terms-conditions/" className="text-white font-light leading-tight text-[0.675rem] md:text-xs hover:text-[#b2f6e3] transition-colors">
                Terms &amp; conditions
              </a>
            </div>

            <div className="mt-1 md:mt-0 md:ml-auto md:text-right">
              <a href="https://madebyshape.co.uk" target="_blank" rel="noopener noreferrer"
                className="text-white font-light leading-tight text-[0.675rem] md:text-xs hover:text-[#b2f6e3] transition-colors">
                Website MadeByShape
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
