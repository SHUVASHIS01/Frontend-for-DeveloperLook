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
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85',
  },
  {
    id: 2,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Ray Saddiq',
    title: 'Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth for them in the Chocolate Confectionery Category',
    href: '/blog/coneys-chooses-riseatseven-for-demand-brief-2/',
    img: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=600&q=85',
  },
  {
    id: 3,
    category: 'Food/Hospitality/Drink',
    readTime: '2 mins',
    author: 'Carrie Rose',
    title: 'Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz',
    href: '/blog/noomz-chooses-riseatseven-for-demand-brief/',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=85',
  },
];

const categoryColors = {
  'News': 'bg-[#0d0f15] text-white',
  'Food/Hospitality/Drink': 'bg-[#0d0f15] text-white',
};

export default function WhatsNew() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="whats-new" className="bg-[#e9edf4] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-[#0d0f15] leading-tight tracking-[-0.03em]">
            What's New
          </h2>
          <a
            href="/blog/"
            id="explore-blog-btn"
            className="hidden sm:inline-flex items-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#0d0f15] hover:text-white transition-all duration-300 shadow-sm border border-black/10"
          >
            Explore More Thoughts ↗
          </a>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex-shrink-0 w-[78vw] sm:w-auto block overflow-hidden card-radius bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[post.category] || 'bg-white text-[#0d0f15]'}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#0d0f15] text-base font-bold leading-snug mb-4 group-hover:text-[#0d0f15]/70 transition-colors line-clamp-3">
                  {post.title}
                </h3>

                {/* Footer */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-7 h-7 rounded-full bg-[#e9edf4] flex items-center justify-center text-[#0d0f15] text-xs font-black flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0d0f15] text-xs font-semibold">{post.author}</p>
                    <p className="text-[#0d0f15]/50 text-xs">{post.readTime}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-7 h-7 bg-[#e9edf4] rounded-full flex items-center justify-center text-xs group-hover:bg-[#0d0f15] group-hover:text-white transition-all duration-200">
                      ↗
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-6 text-center">
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 bg-white text-[#0d0f15] text-sm font-semibold px-6 py-3 rounded-full border border-black/10"
          >
            Explore More Thoughts ↗
          </a>
        </div>
      </div>
    </section>
  );
}
