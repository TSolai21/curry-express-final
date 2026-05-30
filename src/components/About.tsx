import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { childFadeInUp, fadeInLeft, staggerContainer, viewport } from '../utils/motion';

export default function About() {
  return (
    <section className="py-12 md:py-14 bg-[#FDFBF7]" id="about">
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
            <div className="w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
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
              <span className="text-xs font-bold tracking-[0.25em] text-[#ea580c] block uppercase mb-2">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-[1.15] font-sans">
                Your neighborhood spot for{' '}
                <span className="text-[#ea580c]">Indian food</span>
              </h2>
            </motion.div>

            <motion.p variants={childFadeInUp} className="text-sm text-stone-600 leading-relaxed font-sans">
              <strong>Curry Express</strong> is a small kitchen on Walden Road serving curries, biryani,
              Indo-Chinese plates, and fusion favorites to folks in Montgomery and Lake Conroe. Dine in,
              grab takeout, or order delivery — same homestyle cooking either way.
            </motion.p>

            <motion.div variants={childFadeInUp} className="pt-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about"
                  className="inline-block bg-[#000000] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-sm font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-md"
                  id="about-more-us-btn"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
