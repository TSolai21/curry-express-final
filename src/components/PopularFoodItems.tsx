import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { useNavigate } from 'react-router-dom';
import MenuItemCard from './MenuItemCard';
import FillHoverButton from './FillHoverButton';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

const TOP_ITEMS = MENU_ITEMS.filter(item => item.isPopular).slice(0, 3);
// Fallback if not enough popular items
const DISPLAY_ITEMS = TOP_ITEMS.length >= 3 ? TOP_ITEMS : MENU_ITEMS.slice(0, 3);

export default function PopularFoodItems() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-warm-white" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between mb-8 sm:mb-12"
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
              Popular Dishes
            </motion.h2>
            <motion.div variants={childFadeInUp} className="w-12 h-1 bg-[#ea580c] mx-auto md:mx-0 mt-4" />
          </div>
          <motion.div variants={childFadeInUp} className="w-full md:w-auto">
            <FillHoverButton
              type="button"
              onClick={() => navigate('/menu')}
              className="w-full md:w-auto rounded-sm px-6 py-3 text-xs font-bold uppercase tracking-wide justify-center"
            >
              View Full Menu
            </FillHoverButton>
          </motion.div>
        </motion.div>

        {/* Top items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
            {DISPLAY_ITEMS.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                animationIndex={index}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
