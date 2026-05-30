import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, MenuItem } from '../types';
import { CATEGORIES, MENU_ITEMS } from '../data';
import { useNavigate } from 'react-router-dom';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

interface PopularFoodItemsProps {
  onSelectItem: (item: MenuItem) => void;
}

export default function PopularFoodItems({ onSelectItem }: PopularFoodItemsProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Load initial favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('curryexpress-favs');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent selecting the category or item
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('curryexpress-favs', JSON.stringify(updated));
  };


  return (
    <section className="py-20 bg-stone-50" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.span variants={childFadeInUp} className="text-xs font-bold tracking-wide text-[#ea580c] block uppercase mb-2">
            Our Menu
          </motion.span>
          <motion.h2 variants={childFadeInUp} className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight font-sans">
            Browse by category
          </motion.h2>
          <motion.div variants={childFadeInUp} className="w-12 h-1 bg-[#ea580c] mx-auto mt-4" />
        </motion.div>

        {/* Categories Horizontal Marquee */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
        <div
          className="overflow-hidden relative w-full mb-16 -mx-4 px-4 sm:mx-0 sm:px-0 flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#FDFBF7] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#FDFBF7] to-transparent z-20 pointer-events-none" />

          <div
            className="flex w-max gap-6 animate-marquee"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((category, index) => {
              const isFav = favorites.includes(category.id);
              return (
                <motion.div
                  key={`${category.id}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % CATEGORIES.length) * 0.06, duration: 0.45 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className={`group w-[280px] sm:w-[320px] shrink-0 h-full p-4 pt-6 pb-[60px] rounded-2xl cursor-pointer text-center flex flex-col items-center shadow-[0_3px_12px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden bg-orange-50 hover:bg-[#ea580c] hover:shadow-md hover:border-transparent border border-orange-100`}
                >
                  {/* Background Texture (Hover/Selected) */}
                  <div className={`absolute inset-[-50px] z-0 opacity-0 group-hover:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')] mix-blend-multiply transition-opacity duration-500 pointer-events-none`} />

                  {/* Heart Toggle at Top Right */}
                  <button
                    onClick={(e) => toggleFavorite(category.id, e)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#222222] shadow-sm flex items-center justify-center text-white transition-colors cursor-pointer z-10"
                    aria-label="Toggle Favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#ea580c] text-[#ea580c]' : ''}`} />
                  </button>

                  {/* Uneven Blob image */}
                  <div
                    className="w-28 h-28 sm:w-36 sm:h-36 mt-6 mb-2 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden bg-[#FAF8F5] transition-all duration-700 ease-in-out rounded-[64%_36%_27%_73%/55%_58%_42%_45%] group-hover:rounded-[33%_67%_58%_42%/63%_68%_32%_37%]"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>


                  {/* Subtitle / Title */}
                  <h3 className="font-bold text-[13px] sm:text-[15px] tracking-[0.02em] text-stone-900 group-hover:text-white transition-colors mt-4 mb-2 uppercase line-clamp-2 min-h-[40px] flex items-center justify-center z-10">
                    {category.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex gap-1 mt-auto z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors duration-300 ${i < Math.floor(category.rating)
                          ? 'fill-amber-400 text-amber-400 group-hover:fill-white group-hover:text-white'
                          : 'text-stone-300 group-hover:text-white/40'
                          }`}
                      />
                    ))}
                  </div>

                  {/* View Menu Button (Appears on Hover) */}
                  <div className={`absolute bottom-5 left-0 right-0 px-6 transition-all duration-300 z-10 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}>
                    <div className="w-full h-[36px] flex items-center justify-center bg-[#222222] text-white text-[13px] font-bold rounded-full shadow-md">
                      View Menu
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
