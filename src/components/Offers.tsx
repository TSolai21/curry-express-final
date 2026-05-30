import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import thaliComboImage from '../assets/images/thali_combo_1780049451886.png';
import { openDoorDash } from '../constants';
import { childFadeInUp, staggerContainer, viewport } from '../utils/motion';

export default function Offers() {
  const offers = [
    {
      id: 1,
      title: 'Family Dinner Pack',
      desc: 'Chicken biryani, butter naan, samosas, and gulab jamun — enough for the table.',
      image: thaliComboImage,
      discount: 'Save $5',
    },
    {
      id: 2,
      title: 'Weekend Combo',
      desc: 'Two curries, rice, naan, and a drink. A easy Friday night at home.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
      discount: 'Popular',
    },
  ];

  return (
    <section className="py-12 md:py-14 bg-[#1a1a1a] relative overflow-hidden" id="offers">
      {/* Stone texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'url("/texture.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Subtle warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ea580c]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span variants={childFadeInUp} className="text-eyebrow block mb-2">
            This Week
          </motion.span>
          <motion.h2 variants={childFadeInUp} className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Deals & Combos
          </motion.h2>
          <motion.div variants={childFadeInUp} className="w-20 h-1 bg-[#ea580c] mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -3 }}
              onClick={openDoorDash}
              className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-[#2a2a2a] border border-white/5 shadow-2xl cursor-pointer hover:border-[#ea580c]/20 transition-all duration-300"
            >
              {/* Text content */}
              <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 min-h-[160px]">
                <div className="space-y-2">
                  <span className="text-[#ea580c] font-bold text-xs tracking-wide uppercase">
                    {offer.discount}
                  </span>
                  <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-stone-300 text-base leading-relaxed max-w-sm">
                    {offer.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[#ea580c] font-bold text-xs tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-300">
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Image — right side, rounded on outer edge */}
              <div className="relative sm:w-[42%] h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a]/60 via-transparent to-transparent sm:block hidden pointer-events-none" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
