import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Real CDN image for the heading thumbnail pill ── */
const HEADING_THUMB =
  'https://rise-atseven.transforms.svdcdn.com/production/images/spaseekers.png?w=200&h=200&q=80&auto=format&fit=crop';

const blogPosts = [
  {
    id: 1,
    category: 'News',
    readTime: '2 mins',
    author: 'Carrie Rose',
    authorColor: '#e8d5c4',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    href: '/blog/global-operations-director-promotion/',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=85&fit=crop',
    featured: true,
  },
  {
    id: 2,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Ray Saddiq',
    authorColor: '#c4d5e8',
    title: 'Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category',
    href: '/blog/coneys-chooses-riseatseven-for-demand-brief-2/',
    img: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=700&q=85&fit=crop',
  },
  {
    id: 3,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Carrie Rose',
    authorColor: '#e8d5c4',
    title: 'Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz',
    href: '/blog/noomz-chooses-riseatseven-for-demand-brief/',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=85&fit=crop',
  },
];

/* Category badge colours — matching the real site's palette */
const categoryStyle = {
  'News':                   'bg-[#1a1a1a] text-white',
  'Food/Hospitality/Drink': 'bg-white/85 text-[#282828] backdrop-blur-sm',
};

/* Clock icon */
const ClockIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="8" cy="8" r="6.5" />
    <path strokeLinecap="round" d="M8 5v3.5l2 1.5" />
  </svg>
);

/* Arrow up-right */
const ArrowIcon = ({ size = 'w-3 h-3' }) => (
  <svg className={size} fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 8L8 2M8 2H3M8 2v5" />
  </svg>
);

function BlogCard({ post, index, inView }) {
  return (
    <motion.a
      href={post.href}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.135, 0.9, 0.15, 1] }}
      className="group flex-shrink-0 w-[78vw] sm:w-auto flex flex-col"
    >
      {/* ── Image card ── */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[#e0deda] w-full"
        style={{ aspectRatio: '4/5' }}
      >
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            post.featured ? 'brightness-50' : ''
          }`}
        />

        {/* Category badge — top left */}
        <span
          className={`absolute top-3 left-3 text-[11px] font-medium px-3 py-1.5 rounded-full leading-none z-10 ${
            categoryStyle[post.category] ?? 'bg-white/85 text-[#282828]'
          }`}
        >
          {post.category}
        </span>

        {/* Featured first card: large mint circle CTA */}
        {post.featured ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#b2f6e3] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ArrowIcon size="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        ) : (
          /* Non-featured: small arrow bottom-right */
          <div className="absolute bottom-3 right-3 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowIcon />
          </div>
        )}
      </div>

      {/* ── Content below image ── */}
      <div className="pt-4 pb-1 flex flex-col flex-1">
        <h3 className="text-[#282828] text-sm lg:text-base font-medium leading-snug mb-4 line-clamp-3 group-hover:text-[#282828]/60 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Author row */}
        <div className="flex items-center gap-2.5 mt-auto">
          {/* Avatar circle */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#282828] text-xs font-medium shrink-0"
            style={{ background: post.authorColor }}
          >
            {post.author.charAt(0)}
          </div>

          {/* Name + time */}
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-[#282828] text-xs font-medium">{post.author}</span>
            <span className="text-[#282828]/50 text-[11px] flex items-center gap-1">
              <ClockIcon />
              {post.readTime}
            </span>
          </div>

          {/* Arrow circle — right side */}
          <div className="ml-auto w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-[#282828] group-hover:bg-[#282828] group-hover:text-white group-hover:border-[#282828] transition-all duration-300 shrink-0">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function WhatsNew() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="whats-new" className="bg-[#efeeec] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.135, 0.9, 0.15, 1] }}
          className="flex items-center justify-between"
        >
          {/* Heading with embedded image pill */}
          <h2
            className="font-medium text-[#282828] tracking-tight leading-none flex items-center gap-3 flex-wrap"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            <span>What's</span>

            {/* Floating thumbnail — same style as Hero pill */}
            <span
              className="inline-block relative overflow-hidden shrink-0 align-middle"
              style={{
                width:  'clamp(40px, 4.5vw, 64px)',
                height: 'clamp(40px, 4.5vw, 64px)',
                borderRadius: 'clamp(8px, 1vw, 14px)',
              }}
            >
              <img
                src={HEADING_THUMB}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </span>

            <span>New</span>
          </h2>

          {/* CTA — white outlined pill */}
          <a
            href="/blog/"
            className="hidden sm:inline-flex items-center gap-2 bg-white text-[#282828] text-sm font-medium px-6 py-3 rounded-full border border-black/10 hover:bg-[#282828] hover:text-white hover:border-[#282828] transition-all duration-300 shrink-0"
          >
            Explore More Thoughts
            <ArrowIcon />
          </a>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-black/10 mt-6 mb-10" />

        {/* ── Cards grid ── */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Mobile CTA ── */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 bg-white text-[#282828] text-sm font-medium px-6 py-3 rounded-full border border-black/10"
          >
            Explore More Thoughts
            <ArrowIcon />
          </a>
        </div>

      </div>
    </section>
  );
}
