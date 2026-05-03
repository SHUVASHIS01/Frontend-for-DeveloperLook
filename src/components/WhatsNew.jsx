import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const blogPosts = [
  {
    id: 1,
    category: 'News',
    readTime: '2 mins',
    author: 'Carrie Rose',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    href: '/blog/global-operations-director-promotion/',
    authorColor: '#ff3c00',
  },
  {
    id: 2,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Ray Saddiq',
    title: 'Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category',
    href: '/blog/coneys-chooses-riseatseven-for-demand-brief-2/',
    authorColor: '#ff3c00',
  },
  {
    id: 3,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Carrie Rose',
    title: 'Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz',
    href: '/blog/noomz-chooses-riseatseven-for-demand-brief/',
    authorColor: '#ff3c00',
  },
];

const categoryColors = {
  'News': 'bg-blue-500/20 text-blue-400',
  'Food/Hospitality/Drink': 'bg-amber-500/20 text-amber-400',
};

const BlogCard = ({ post, index, inView }) => (
  <motion.a
    href={post.href}
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="group block bg-white/3 border border-white/10 hover:border-[#ff3c00]/50 transition-all duration-300 overflow-hidden"
  >
    {/* Colored top bar */}
    <div className="h-1 bg-[#ff3c00] w-0 group-hover:w-full transition-all duration-500" />

    <div className="p-7">
      {/* Meta */}
      <div className="flex items-center gap-3 mb-5">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${categoryColors[post.category] || 'bg-white/10 text-white/60'}`}>
          {post.category}
        </span>
        <span className="text-white/30 text-xs">{post.readTime}</span>
      </div>

      {/* Title */}
      <h3 className="text-white text-lg font-black leading-snug mb-6 group-hover:text-[#ff3c00] transition-colors duration-300 line-clamp-3">
        {post.title}
      </h3>

      {/* Author */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#ff3c00] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {post.author.charAt(0)}
          </div>
          <span className="text-white/50 text-sm font-medium">{post.author}</span>
        </div>
        <svg
          className="w-5 h-5 text-white/20 group-hover:text-[#ff3c00] transition-colors duration-300"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </div>
  </motion.a>
);

const WhatsNew = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="whats-new" className="bg-[#0d0d0d] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold mb-3">Latest</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              What's<span className="text-[#ff3c00]">New</span>
            </h2>
          </div>
          <a
            href="/blog/"
            id="explore-blog-btn"
            className="hidden sm:inline-flex items-center gap-2 text-white border border-white/20 hover:border-[#ff3c00] hover:text-[#ff3c00] text-sm font-semibold px-6 py-3 transition-all duration-300"
          >
            Explore More Thoughts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} inView={inView} />
          ))}
        </div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white/3 border border-white/10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Stay updated with Rise news</h3>
            <p className="text-white/50 text-sm">Get the latest insights, case studies and industry news.</p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto min-w-[300px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#ff3c00] transition-colors duration-200"
            />
            <button
              type="submit"
              id="newsletter-submit"
              className="bg-[#ff3c00] hover:bg-[#e03500] text-white text-sm font-bold px-6 py-3 transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 text-white border border-white/20 hover:border-[#ff3c00] hover:text-[#ff3c00] text-sm font-semibold px-6 py-3 transition-all duration-300"
          >
            Explore More Thoughts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
