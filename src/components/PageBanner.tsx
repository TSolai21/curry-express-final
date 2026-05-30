import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { childFadeInUp, easeOut, staggerContainer } from '../utils/motion';

interface PageBannerProps {
  title: string;
  breadcrumbLabel: string;
}

export default function PageBanner({ title, breadcrumbLabel }: PageBannerProps) {
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
        className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-white/25 rounded-full blur-[100px] pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
      />

      <motion.div
        className="relative z-20 text-center px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={childFadeInUp}
          className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase mb-4 drop-shadow-md"
        >
          {title}
        </motion.h1>
        <motion.div
          variants={childFadeInUp}
          className="flex items-center justify-center gap-2 text-sm font-bold text-[#ea580c] tracking-widest uppercase bg-[#FAF8F5]/80 backdrop-blur-sm py-1.5 px-4 rounded-full shadow-sm inline-flex"
        >
          <Link to="/" className="hover:text-[#c2410c] transition-colors">HOME</Link>
          <span className="text-stone-400">&gt;</span>
          <span className="text-stone-800">{breadcrumbLabel}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
