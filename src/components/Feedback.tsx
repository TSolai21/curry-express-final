import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

export default function Feedback() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    setReviews(INITIAL_REVIEWS);
  }, []);

  useEffect(() => {
    if (!selectedReview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedReview(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedReview]);

  const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  const openReview = (review: Review) => setSelectedReview(review);

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
          <motion.span variants={childFadeInUp} className="text-eyebrow block mb-4">
            From Our Neighbors
          </motion.span>
          <motion.h2 variants={childFadeInUp} className="text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight leading-snug">
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

          <div
            className={`flex w-max animate-marquee gap-6 ${selectedReview ? '[animation-play-state:paused]' : 'hover:[animation-play-state:paused]'}`}
          >
            {marqueeReviews.map((rev, idx) => (
              <motion.button
                key={`${rev.id}-${idx}`}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => openReview(rev)}
                className="w-[300px] sm:w-[400px] p-6 sm:p-8 bg-stone-900/80 rounded-3xl border border-stone-800 space-y-5 shadow-xl shrink-0 transition-colors hover:border-[#ea580c]/40 hover:bg-stone-800/80 cursor-pointer text-left"
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
                      <span className="text-sm text-stone-500">{rev.timeAgo || rev.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < rev.rating ? 'fill-current' : 'text-stone-700'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-base text-stone-300 leading-relaxed text-left grow line-clamp-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {rev.reviewImage && (
                  <div className="w-full h-32 rounded-xl overflow-hidden mt-3 border border-stone-800 relative bg-stone-950">
                    <img src={rev.reviewImage} alt="Customer meal" className="w-full h-full object-cover" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedReview && (
          <div
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={() => setSelectedReview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25 }}
              className="bg-stone-900 rounded-2xl border border-stone-800 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 cursor-pointer z-10"
                aria-label="Close review"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-4 pr-8">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedReview.name.replace(/\s+/g, '')}&backgroundColor=0A8842,ea580c,111111&textColor=ffffff`}
                    alt={selectedReview.name}
                    className="w-14 h-14 rounded-full border-2 border-stone-700 bg-stone-800 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 id="review-modal-title" className="font-bold text-stone-100 text-lg">
                      {selectedReview.name}
                    </h3>
                    <p className="text-sm text-stone-600 font-bold mt-1">
                      {selectedReview.timeAgo || selectedReview.date}
                    </p>
                    <div className="flex gap-0.5 text-amber-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < selectedReview.rating ? 'fill-current' : 'text-stone-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-stone-200 leading-relaxed">
                  &ldquo;{selectedReview.comment}&rdquo;
                </p>

                {selectedReview.reviewImage && (
                  <div className="w-full min-h-[200px] max-h-[50vh] rounded-xl overflow-hidden border border-stone-800 bg-stone-950 flex items-center justify-center">
                    <img
                      src={selectedReview.reviewImage}
                      alt={`Meal photo from ${selectedReview.name}`}
                      className="max-h-[50vh] w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
