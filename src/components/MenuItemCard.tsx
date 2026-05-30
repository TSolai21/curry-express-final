import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { MenuItem } from '../types';
import { openDoorDash } from '../constants';

const MotionDiv = motion.div;

type MotionDivProps = React.ComponentPropsWithoutRef<typeof MotionDiv>;

const CARD_TEXTURE =
  "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')]";

export interface MenuItemCardProps extends MotionDivProps {
  item: MenuItem;
  isActive?: boolean;
  animationIndex?: number;
}

const MenuItemCard = forwardRef<HTMLDivElement, MenuItemCardProps>(function MenuItemCard(
  {
    item,
    isActive,
    animationIndex = 0,
    onClick,
    className = '',
    ...motionProps
  },
  ref
) {
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty('--card-hover-x', `${x}px`);
    event.currentTarget.style.setProperty('--card-hover-y', `${y}px`);
  };

  const handleClick = onClick ?? (() => openDoorDash());

  return (
    <MotionDiv
      ref={ref}
      data-card-id={item.id}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      className={`group h-full p-3 sm:p-4 pt-5 sm:pt-6 pb-20 sm:pb-24 rounded-2xl text-center flex flex-col items-center shadow-[0_3px_12px_rgba(0,0,0,0.02)] border border-orange-100 transition-all duration-300 relative overflow-hidden cursor-pointer hover:shadow-md ${isActive ? 'bg-[#ea580c] shadow-md border-transparent ring-2 ring-amber-200' : 'bg-orange-50'} ${className}`}
      {...motionProps}
    >
      <div
        className={`absolute inset-0 bg-[#ea580c] opacity-80 pointer-events-none transition-none group-hover:transition-[clip-path] group-hover:duration-500 ease-out ${isActive ? '' : 'group-hover:[--card-hover-size:150%]'}`}
        style={{
          clipPath: `circle(${isActive ? '150%' : 'var(--card-hover-size, 0)'} at var(--card-hover-x, 50%) var(--card-hover-y, 50%))`,
          ...(isActive ? { '--card-hover-size': '150%' } : {}),
        } as React.CSSProperties}
      />
      <div
        className={`absolute inset-[-50px] z-0 ${isActive ? 'opacity-[0.03]' : 'opacity-0'} group-hover:opacity-[0.03] ${CARD_TEXTURE} mix-blend-multiply transition-opacity duration-500 pointer-events-none`}
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 + (animationIndex % 6) * 0.05, duration: 0.35 }}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#222222] shadow-sm flex items-center justify-center text-white transition-colors cursor-pointer z-10 hover:bg-stone-700 group/heart"
        aria-label="Add to Favorites"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart className="w-4 h-4 transition-colors group-hover/heart:text-[#ea580c] group-hover/heart:fill-[#ea580c]" />
      </motion.button>

      <div className="relative z-10 mx-auto mt-2 mb-3 sm:mb-4 flex h-48 w-48 items-center justify-center sm:h-60 sm:w-60 md:h-72 md:w-72">
        <span
          className="absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none"
          aria-hidden
        />
        <span
          className="absolute -inset-3 rounded-full border border-[#ea580c]/20 bg-warm-cream/40 pointer-events-none sm:-inset-4"
          aria-hidden
        />
        <span
          className="absolute -inset-6 rounded-full border border-orange-200/30 pointer-events-none sm:-inset-7"
          aria-hidden
        />
        <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-warm-cream bg-warm-cream shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-transform duration-700 ease-in-out group-hover:scale-105 sm:h-48 sm:w-48 md:h-56 md:w-56">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <p
        className={`font-black text-lg mb-1 transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-[#ea580c] group-hover:text-white'}`}
      >
        ${item.price.toFixed(2)}
      </p>

      <h3
        className={`font-semibold text-base sm:text-lg tracking-normal mb-2 line-clamp-2 transition-colors duration-300 z-10 min-h-[40px] flex items-center justify-center ${isActive ? 'text-white' : 'text-stone-900 group-hover:text-white'}`}
      >
        {item.name}
      </h3>

      <p
        className={`text-sm sm:text-base mb-4 px-1 leading-relaxed transition-colors duration-300 z-10 ${isActive ? 'text-white/90' : 'text-stone-700 group-hover:text-white/90'}`}
      >
        {item.description}
      </p>

      <div className="flex gap-1 mt-auto z-10 mb-2">
        {[...Array(5)].map((_, i) => {
          const filled = i < Math.floor(item.rating);
          return (
            <Star
              key={i}
              className={`w-4 h-4 transition-colors duration-300 ${
                filled
                  ? isActive
                    ? 'fill-white text-white'
                    : 'fill-amber-400 text-amber-400 group-hover:fill-white group-hover:text-white'
                  : isActive
                    ? 'text-white/40'
                    : 'text-stone-300 group-hover:text-white/40'
              }`}
            />
          );
        })}
      </div>

      <div
        className={`absolute bottom-4 sm:bottom-5 left-0 right-0 px-4 sm:px-6 z-10 transition-all duration-300 ease-out ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none max-md:opacity-0'} group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openDoorDash();
          }}
          className="w-full min-h-11 flex items-center justify-center bg-[#222222] text-white text-sm font-bold rounded-full shadow-md hover:bg-black cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </MotionDiv>
  );
});

export default MenuItemCard;
