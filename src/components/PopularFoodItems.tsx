import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import FillHoverButton from './FillHoverButton';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

const TOP_CATEGORIES = CATEGORIES.slice(0, 3);

export default function PopularFoodItems() {
  const [favorites, setFavorites] = useState<string[]>([]);
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
    <section className="py-20 bg-warm-white" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="text-center md:text-left">
            <motion.span variants={childFadeInUp} className="text-eyebrow block mb-2">
              Our Menu
            </motion.span>
            <motion.h2 variants={childFadeInUp} className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              Browse by category
            </motion.h2>
            <motion.div variants={childFadeInUp} className="w-12 h-1 bg-[#ea580c] mx-auto md:mx-0 mt-4" />
          </div>
          <motion.div variants={childFadeInUp}>
            <FillHoverButton
              type="button"
              onClick={() => navigate('/menu')}
              className="rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-wide"
            >
              View Full Menu
            </FillHoverButton>
          </motion.div>
        </motion.div>

        {/* Top categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {TOP_CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                showFavorite
                isFavorite={favorites.includes(category.id)}
                onFavoriteToggle={(e) => toggleFavorite(category.id, e)}
                onClick={() => navigate(`/category/${category.id}`)}
                footerLabel="View Menu"
                footerVisibleOnHoverOnly
                className="w-full min-w-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
