import { ChevronRight } from 'lucide-react';
import FillHoverButton from './FillHoverButton';
import { motion } from 'motion/react';
import burgerImage from '../assets/images/burger_hero_foreground.png';
import heroBgImage from '../assets/images/hero_bg.png';
import { childFadeInUp, easeOut, staggerContainer } from '../utils/motion';

interface HeroProps {
  onViewMenu: () => void;
  onViewOffers: () => void;
  onViewReviews: () => void;
}

export default function Hero({ onViewMenu, onViewOffers, onViewReviews }: HeroProps) {
  const heroContent = {
    subtitle: 'Walden Rd · Montgomery, TX',
    title: 'Indian & Indo-Chinese Made Fresh Daily',
    image: burgerImage,
  };

  const accentWords = new Set(['INDIAN', 'FRESH', 'DAILY']);
  const words = heroContent.title.split(' ');

  return (
    <div className="relative bg-stone-950 text-white min-h-[100dvh] sm:min-h-screen lg:min-h-[680px] flex items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))]" id="home">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <img src={heroBgImage} alt="Authentic Indian Food Background" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-stone-950/50 md:bg-gradient-to-r md:from-stone-950/90 md:via-stone-950/40 md:to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-12 md:py-20">
        <motion.div
          className="lg:col-span-12 max-w-4xl mx-auto flex flex-col items-center gap-3 sm:gap-4 text-center px-1"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={childFadeInUp} className="inline-block">
            <span className="ransom-band text-[10px] sm:text-xs">{heroContent.subtitle}</span>
          </motion.span>

          <motion.h1
            variants={childFadeInUp}
            className="text-3xl leading-tight sm:text-5xl lg:text-[48px] font-extrabold tracking-tight text-white sm:leading-[1.15]"
          >
            {words.map((word, i) => {
              const isColored = accentWords.has(word.replace(/[^A-Za-z]/g, '').toUpperCase());
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.45, ease: easeOut }}
                  className={isColored ? 'text-[#ea580c] inline-block mr-2' : 'inline-block mr-2'}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.div variants={childFadeInUp} className="pt-6 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-[440px] mx-auto">
            <motion.div className="col-span-2 w-full" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <FillHoverButton
                variant="primary"
                onClick={onViewMenu}
                className="w-full px-8 py-3.5 sm:py-4 rounded-sm text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:shadow-orange-900/30 flex justify-center items-center"
                id="hero-view-menu-btn"
              >
                VIEW MENU
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </FillHoverButton>
            </motion.div>
            <motion.div className="col-span-1 w-full" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <FillHoverButton
                variant="outline"
                onClick={onViewOffers}
                className="w-full px-2 sm:px-8 py-3.5 sm:py-4 rounded-sm text-[10px] sm:text-xs tracking-widest uppercase shadow-lg hover:shadow-orange-900/30 flex justify-center items-center"
                id="hero-view-offers-btn"
              >
                OFFERS
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </FillHoverButton>
            </motion.div>
            <motion.div className="col-span-1 w-full" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <FillHoverButton
                variant="outline"
                onClick={onViewReviews}
                className="w-full px-2 sm:px-8 py-3.5 sm:py-4 rounded-sm text-[10px] sm:text-xs tracking-widest uppercase shadow-lg hover:shadow-orange-900/30 flex justify-center items-center"
                id="hero-view-reviews-btn"
              >
                REVIEWS
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </FillHoverButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 bg-warm-white rounded-t-[100%] pointer-events-none z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: easeOut }}
      />
    </div>
  );
}
