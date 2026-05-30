import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { childFadeInUp, easeOut, staggerContainer } from '../utils/motion';

interface PageBannerProps {
  title: string;
  breadcrumbLabel: string;
  children?: ReactNode;
}

export default function PageBanner({ title, breadcrumbLabel, children }: PageBannerProps) {
  return (
    <section className="bg-gradient-to-br from-[#ffd4bc] via-[#ffccb3] to-[#ffb899] relative overflow-hidden py-12 md:py-20 flex items-center justify-center min-h-[260px]">
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOut }}
        style={{
          backgroundImage: 'url("/category-banner-texture.svg")',
          backgroundSize: '240px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-20"
        style={{
          backgroundImage: 'url("/texture.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-warm-cream/25 rounded-full blur-[100px] pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
      />

      <motion.div
        className="relative z-20 w-full max-w-6xl mx-auto text-center px-4 sm:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={childFadeInUp}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 drop-shadow-md"
        >
          {title}
        </motion.h1>
        <motion.div
          variants={childFadeInUp}
          className="flex items-center justify-center gap-2 text-sm font-medium text-[#ea580c] bg-warm-cream/80 backdrop-blur-sm py-1.5 px-4 rounded-full shadow-sm inline-flex"
        >
          <Link to="/" className="cursor-pointer hover:text-[#c2410c] transition-colors">Home</Link>
          <span className="text-stone-500">&gt;</span>
          <span className="text-stone-800">{breadcrumbLabel}</span>
        </motion.div>
        {children ? (
          <motion.div variants={childFadeInUp} className="mt-8 w-full">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
