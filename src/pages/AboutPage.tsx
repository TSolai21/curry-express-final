import { ChefHat, UtensilsCrossed, Heart, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import PageBanner from '../components/PageBanner';
import { childFadeInUp, fadeInLeft, fadeInUp, staggerContainer, viewport } from '../utils/motion';

const highlights = [
  {
    icon: <MapPin className="w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />,
    title: 'Right on Walden Rd',
    desc: 'Easy to find in Montgomery — stop by on your way home.',
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />,
    title: 'Cooked to Order',
    desc: 'Nothing sits under a heat lamp. Your food is made when you order.',
  },
  {
    icon: <Heart className="w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />,
    title: 'Family Recipes',
    desc: 'Curries and biryanis from recipes we have made for years.',
  },
  {
    icon: <ChefHat className="w-8 h-8 text-[#ea580c]" strokeWidth={1.5} />,
    title: 'Small Kitchen, Big Flavor',
    desc: 'Indian classics, Indo-Chinese hits, and a few fusion favorites.',
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageBanner title="About Us" breadcrumbLabel="About" />

      <section className="py-12 md:py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-6 relative group"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeInLeft}
            >
              <div className="absolute inset-4 -right-1.5 -bottom-1.5 bg-[#ea580c]/15 rounded-3xl -z-10" />
              <div className="w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl border-4 border-warm-cream">
                <img
                  src="/chef.jpg"
                  alt="Chef in the kitchen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-6 space-y-6 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer}
            >
              <motion.div variants={childFadeInUp}>
                <span className="text-eyebrow block mb-2">Curry Express</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-snug">
                  Good food, close to home
                </h2>
              </motion.div>

              <motion.p variants={childFadeInUp} className="text-base text-stone-700 leading-relaxed">
                We opened Curry Express to give Montgomery a straightforward place for Indian and
                Indo-Chinese food — butter chicken, biryani, samosas, hakka noodles, and our aloo tikka
                burger when you want something different.
              </motion.p>

              <motion.p variants={childFadeInUp} className="text-base text-stone-700 leading-relaxed">
                Most nights you will find families picking up dinner, neighbors grabbing lunch, and regulars
                who already know their order. That is exactly how we like it.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-warm-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            <motion.span variants={childFadeInUp} className="text-eyebrow block mb-2">
              How We Cook
            </motion.span>
            <motion.h2 variants={childFadeInUp} className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              Simple food, done right
            </motion.h2>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-5 text-base text-stone-700 leading-relaxed text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeInUp}
          >
            <p>
              We prep fresh each day and cook to order. Spices are blended in-house, naan comes from the
              tandoor hot, and our biryanis take time — no shortcuts on the dishes people come back for.
            </p>
            <p>
              Regulars love our <strong>butter chicken</strong>, <strong>chicken biryani</strong>, and{' '}
              <strong>gobi manchurian</strong>. If it is your first visit, any of those is a safe bet.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={childFadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="text-center space-y-4 p-6 rounded-2xl bg-warm-elevated border border-warm-border shadow-sm"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="font-bold text-stone-900 text-sm">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
