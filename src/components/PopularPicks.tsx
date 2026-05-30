import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import alooTikkaBurgerImage from '../assets/images/aloo_tikka_burger_1780049412009.png';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';
import FillHoverButton from './FillHoverButton';

export default function PopularPicks() {
  const swiperRef = useRef<any>(null);
  const [activePickId, setActivePickId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
  };

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight max-w-xl leading-snug">
              Popular picks
            </h2>
          </motion.div>

          <motion.div variants={childFadeInUp} className="flex gap-4 pb-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="swiper-button-prev-custom w-14 h-14 rounded-full border border-warm-border bg-warm-white flex items-center justify-center text-[#ea580c] hover:bg-warm-surface transition-all cursor-pointer shadow-sm z-20"
            >
              <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="z-20">
              <FillHoverButton
                type="button"
                className="swiper-button-next-custom h-14 w-14 rounded-full p-0 shadow-md"
                aria-label="Next slide"
              >
                <ArrowRight className="w-6 h-6 stroke-[1.5]" />
              </FillHoverButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Picks Swiper Slider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActivePickId(picks[swiper.realIndex]?.id ?? null);
            }}
            onSlideChange={(swiper) => setActivePickId(picks[swiper.realIndex]?.id ?? null)}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            className="w-full pb-12 overflow-visible"
          >
            {picks.map((pick, i) => {
              const isActive = isMobile && activePickId === pick.id;
              return (
                <SwiperSlide key={pick.id} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: (i % 3) * 0.15, duration: 0.5 }}
                    className={`group rounded-xl p-8 flex flex-col items-center text-center shadow-md relative border transition-all duration-500 delay-150 overflow-hidden h-full ${isActive ? 'bg-[#ea580c] border-[#ea580c] shadow-[0_20px_50px_rgba(234,88,12,0.22)]' : 'bg-warm-cream border border-stone-100 hover:bg-[#ea580c] hover:border-[#ea580c]'}`}
                  >
                    {/* Food Texture Background */}
                    <div className={`absolute inset-[-50px] z-0 ${isActive ? 'opacity-15' : 'opacity-[0.02]'} transition-all duration-[3000ms] delay-150 ease-out pointer-events-none transform translate-x-0 translate-y-0 scale-100 ${isActive ? '' : 'group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:scale-105'} bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')]`} />

                    {/* Top Left Name (Hover) */}
                    <div className={`absolute top-8 left-8 text-sm font-black uppercase tracking-widest text-white transition-opacity duration-500 delay-150 z-20 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {pick.name}
                    </div>

                    {/* Left Splash SVG (Hover) */}
                    <svg className={`absolute left-6 top-[55%] -translate-y-1/2 w-16 h-16 text-white drop-shadow-md transition-all duration-500 delay-150 group-hover:delay-[150ms] z-20 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100'}`} viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="15" cy="40" r="10" />
                      <path d="M 20 50 C 40 80, 80 60, 95 55 C 75 50, 50 40, 30 40 Z" />
                    </svg>

                    {/* Right Splash SVG (Hover) */}
                    <svg className={`absolute right-4 top-[25%] w-16 h-16 text-white drop-shadow-md transition-all duration-500 delay-150 group-hover:delay-[300ms] z-20 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100'}`} viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="85" cy="65" r="10" />
                      <path d="M 80 55 C 60 25, 20 45, 5 50 C 25 55, 50 65, 70 65 Z" />
                    </svg>

                    {/* Image */}
                    <div className={`relative flex-shrink-0 w-60 h-60 mt-10 mb-8 rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 delay-150 z-10 bg-warm-cream ${isActive ? 'shadow-[0_20px_40px_rgba(0,0,0,0.25)]' : 'group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]'}`}>
                      <img
                        src={pick.image}
                        alt={pick.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Divider */}
                    <div className={`w-16 h-[3px] mb-8 transition-colors duration-500 delay-150 z-10 ${isActive ? 'bg-warm-cream' : 'bg-[#e03131] group-hover:bg-warm-cream'}`} />

                    {/* Title Container */}
                    <div className="mt-auto pb-4 relative w-full h-[70px] flex items-center justify-center z-10">
                      {/* Default Title */}
                      <h3 className={`absolute font-black text-2xl uppercase tracking-wider text-stone-900 transition-opacity duration-300 delay-150 ${isActive ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                        {pick.name}
                      </h3>

                      {/* Hover Title */}
                      <h3
                        className={`absolute text-2xl font-black text-white transition-opacity duration-500 delay-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
