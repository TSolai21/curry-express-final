import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { Category } from '../types';

const MotionDiv = motion.div;

type MotionDivProps = React.ComponentPropsWithoutRef<typeof MotionDiv>;

export interface CategoryCardProps extends MotionDivProps {
    category: Category;
    isFavorite?: boolean;
    onFavoriteToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isActive?: boolean;
    showFavorite?: boolean;
    footerLabel?: string;
    footerVisibleOnHoverOnly?: boolean;
}

export default function CategoryCard({
    category,
    isFavorite,
    onFavoriteToggle,
    isActive,
    showFavorite = false,
    footerLabel = 'View Menu',
    footerVisibleOnHoverOnly = false,
    onClick,
    className = '',
    ...motionProps
}: CategoryCardProps) {
    const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onFavoriteToggle?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        event.currentTarget.style.setProperty('--card-hover-x', `${x}px`);
        event.currentTarget.style.setProperty('--card-hover-y', `${y}px`);
    };

    return (
        <MotionDiv
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            onPointerMove={handlePointerMove}
            className={`group w-full h-full p-4 pt-6 pb-[60px] rounded-2xl cursor-pointer text-center flex flex-col items-center shadow-[0_3px_12px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden ${isActive ? 'bg-[#ea580c] shadow-md border-transparent' : 'bg-orange-50'} hover:shadow-md border border-orange-100 ${className}`}
            {...motionProps}
        >
            <div
                className={`absolute inset-0 bg-[#ea580c] opacity-80 pointer-events-none transition-none group-hover:transition-[clip-path] group-hover:duration-500 ease-out ${isActive ? '' : 'group-hover:[--card-hover-size:150%]'}`}
                style={{
                    clipPath: `circle(${isActive ? '150%' : 'var(--card-hover-size, 0)'} at var(--card-hover-x, 50%) var(--card-hover-y, 50%))`,
                    ...(isActive ? { '--card-hover-size': '150%' } : {}),
                } as React.CSSProperties}
            />
            <div className={`absolute inset-[-50px] z-0 ${isActive ? 'opacity-[0.03]' : 'opacity-0'} group-hover:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')] mix-blend-multiply transition-opacity duration-500 pointer-events-none`} />
            {showFavorite && (
                <button
                    type="button"
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#222222] shadow-sm flex items-center justify-center text-white transition-colors cursor-pointer z-10"
                    aria-label={`Toggle favorite ${category.name}`}
                >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ea580c] text-[#ea580c]' : ''}`} />
                </button>
            )}

            <div className="relative z-10 mx-auto mt-6 mb-2 flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
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
                <div className="relative h-44 w-44 overflow-hidden rounded-full bg-gradient-to-br from-[#ede0d4] via-[#f0e6da] to-[#e8ddd0] shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 ease-in-out group-hover:scale-105 sm:h-56 sm:w-56">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            <h3 className="font-semibold text-base sm:text-lg tracking-normal text-stone-900 group-hover:text-white transition-colors mt-4 mb-2 line-clamp-2 min-h-[40px] flex items-center justify-center z-10">
                {category.name}
            </h3>

            {category.description && (
                <p className="text-sm sm:text-base leading-relaxed text-stone-700 group-hover:text-white/90 transition-colors z-10 px-4">
                    {category.description}
                </p>
            )}

            <div className="flex gap-1 mt-4 z-10">
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

            <div className={`absolute bottom-5 left-0 right-0 px-6 z-10 transition-all duration-300 ease-out ${footerVisibleOnHoverOnly ? 'opacity-0 translate-y-6 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto' : 'opacity-100'}`}>
                <div className="w-full h-[36px] flex items-center justify-center bg-[#222222] text-white text-sm font-bold rounded-full shadow-md">
                    {footerLabel}
                </div>
            </div>
        </MotionDiv>
    );
}
