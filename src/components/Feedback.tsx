import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

export default function Feedback() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setReviews(INITIAL_REVIEWS);
  }, []);

  const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 md:py-16 !pt-30 bg-[#111111] relative overflow-hidden" id="feedback">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/texture.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeInUp}
      >
        <motion.div
          className="text-center mb-8 md:mb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span variants={childFadeInUp} className="text-xs font-bold tracking-[0.25em] text-[#ea580c] block uppercase mb-4 font-mono">
            From Our Neighbors
          </motion.span>
          <motion.h2 variants={childFadeInUp} className="text-3xl sm:text-4xl font-black text-stone-100 tracking-tight leading-tight font-sans">
            What people are saying
          </motion.h2>
        </motion.div>

        <motion.div
          className="relative w-full overflow-hidden flex flex-col gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
            {marqueeReviews.map((rev, idx) => (
              <motion.div
                key={`${rev.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="w-[300px] sm:w-[400px] p-6 sm:p-8 bg-stone-900/80 rounded-3xl border border-stone-800 space-y-5 shadow-xl shrink-0 transition-colors hover:border-stone-700 hover:bg-stone-800/80"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${rev.name.replace(/\s+/g, '')}&backgroundColor=0A8842,ea580c,111111&textColor=ffffff`}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full border-2 border-stone-700 bg-stone-800 object-cover shadow-sm"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-stone-100 text-sm sm:text-base">{rev.name}</span>
                      <span className="font-mono text-[10px] text-stone-500 font-bold">{rev.timeAgo || rev.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < rev.rating ? 'fill-current' : 'text-stone-700'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-stone-400 font-sans leading-relaxed text-left grow">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {rev.reviewImage && (
                  <div className="w-full h-32 rounded-xl overflow-hidden mt-3 border border-stone-800 relative">
                    <img src={rev.reviewImage} alt="Customer meal" className="w-full h-full object-cover" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
