import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import alooTikkaBurgerImage from '../assets/images/aloo_tikka_burger_1780049412009.png';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

export default function PopularPicks() {
  // Hardcoded mapping to match the exact items in image
  const picks = [
    {
      id: 'app-paneer-chilli-item',
      name: 'PANEER CHILLI',
      price: 13.99,
      description: 'Paneer with peppers and onions in a spicy sauce.',
      category: 'appetizer',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
    },
    {
      id: 'burgers-aloo-burger-item',
      name: 'ALOO TIKKA BURGER',
      price: 10.99,
      description: 'Crispy potato patty with chutney, tomato, and onion.',
      category: 'burgers-wraps',
      image: alooTikkaBurgerImage,
      rating: 4.8,
    },
    {
      id: 'main-chicken-tikka-dish',
      name: 'CHICKEN TIKKA',
      price: 17.99,
      description: 'Tandoor-grilled chicken with house spices.',
      category: 'main-course',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
    },
    {
      id: 'extra-butter-chicken-item',
      name: 'BUTTER CHICKEN',
      price: 16.99,
      description: 'Classic creamy tomato curry with tender chicken pieces.',
      category: 'main-course',
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="popular-picks">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Title */}
        <motion.div
          className="flex md:flex-row md:items-end justify-between mb-16 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={childFadeInUp} className="text-left">
            <span className="text-xs font-bold tracking-wide text-[#d12a2a] block uppercase mb-3">
              Customer favorites
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight font-sans max-w-xl leading-[1.15]">
              Popular picks
            </h2>
          </motion.div>

          <motion.div variants={childFadeInUp} className="flex gap-4 pb-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="swiper-button-prev-custom w-14 h-14 rounded-full border border-stone-200 bg-[#fdfbf7] flex items-center justify-center text-[#ea580c] hover:bg-stone-50 transition-all cursor-pointer shadow-sm z-20"
            >
              <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="swiper-button-next-custom w-14 h-14 rounded-full bg-[#ea580c] hover:bg-[#c2410c] flex items-center justify-center text-white transition-all shadow-md cursor-pointer z-20"
            >
              <ArrowRight className="w-6 h-6 stroke-[1.5]" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Picks Swiper Slider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            className="w-full pb-12 overflow-visible"
          >
            {picks.map((pick, i) => {
              return (
                <SwiperSlide key={pick.id} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: (i % 3) * 0.15, duration: 0.5 }}
                    className="group rounded-xl p-8 flex flex-col items-center text-center shadow-md relative bg-[#FAF8F5] border border-stone-100 hover:bg-[#ea580c] hover:border-[#ea580c] transition-all duration-500 overflow-hidden h-full"
                  >
                    {/* Food Texture Background */}
                    <div className="absolute inset-[-50px] z-0 opacity-[0.02] group-hover:opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')] mix-blend-multiply transition-all duration-[3000ms] ease-out pointer-events-none transform translate-x-0 translate-y-0 scale-100 group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:scale-105" />

                    {/* Top Left Name (Hover) */}
                    <div className="absolute top-8 left-8 text-sm font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      {pick.name}
                    </div>

                    {/* Left Splash SVG (Hover) */}
                    <svg className="absolute left-6 top-[55%] -translate-y-1/2 w-16 h-16 text-white drop-shadow-md opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 group-hover:delay-[150ms] z-20" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="15" cy="40" r="10" />
                      <path d="M 20 50 C 40 80, 80 60, 95 55 C 75 50, 50 40, 30 40 Z" />
                    </svg>

                    {/* Right Splash SVG (Hover) */}
                    <svg className="absolute right-4 top-[25%] w-16 h-16 text-white drop-shadow-md opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 group-hover:delay-[300ms] z-20" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="85" cy="65" r="10" />
                      <path d="M 80 55 C 60 25, 20 45, 5 50 C 25 55, 50 65, 70 65 Z" />
                    </svg>

                    {/* Image */}
                    <div className="relative flex-shrink-0 w-60 h-60 mt-10 mb-8 rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-500 z-10 bg-[#FAF8F5]">
                      <img
                        src={pick.image}
                        alt={pick.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Divider */}
                    <div className="w-16 h-[3px] mb-8 bg-[#e03131] group-hover:bg-[#FAF8F5] transition-colors duration-500 z-10" />

                    {/* Title Container */}
                    <div className="mt-auto pb-4 relative w-full h-[70px] flex items-center justify-center z-10">
                      {/* Default Title */}
                      <h3 className="absolute font-black text-2xl uppercase tracking-wider text-stone-900 group-hover:opacity-0 transition-opacity duration-300">
                        {pick.name}
                      </h3>

                      {/* Hover Title */}
                      <h3
                        className="absolute text-2xl font-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        ${pick.price.toFixed(2)}
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}
