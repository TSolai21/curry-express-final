import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES, MENU_ITEMS } from '../data';
import DeliveryBanner from '../components/DeliveryBanner';
import PageBanner from '../components/PageBanner';
import MenuSearchInput from '../components/MenuSearchInput';
import { Star, Heart } from 'lucide-react';
import { openDoorDash } from '../constants';
import { fadeInUp, viewport } from '../utils/motion';
import { matchesSearch } from '../utils/search';

export default function CategoryMenuPage() {
  const { categoryId } = useParams();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const activeCardIdRef = useRef<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const categoryItems = MENU_ITEMS.filter((item) => item.category === categoryId);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return categoryItems;
    return categoryItems.filter((item) =>
      matchesSearch(query, item.name, item.description)
    );
  }, [categoryItems, searchQuery]);

  useEffect(() => {
    setSearchQuery('');
  }, [categoryId]);

  useEffect(() => {
    activeCardIdRef.current = activeCardId;
  }, [activeCardId]);

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveCard = () => {
      if (window.innerWidth >= 768) {
        if (activeCardIdRef.current !== null) {
          setActiveCardId(null);
        }
        return;
      }

      let bestId: string | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;
      const viewportCenter = window.scrollY + window.innerHeight / 2;

      cardRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const cardCenter = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      if (bestId && bestId !== activeCardIdRef.current) {
        setActiveCardId(bestId);
      }
    };

    const onScroll = () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveCard);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActiveCard();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [filteredItems]);

  if (!category) {
    return (
      <motion.main
        className="flex-1 min-h-[50vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-stone-800">Category not found</h2>
        <Link to="/" className="mt-4 text-[#ea580c] hover:underline">Return to Home</Link>
      </motion.main>
    );
  }

  return (
    <main className="flex-1">
      <PageBanner title={category.name} breadcrumbLabel={category.name} />

      <section className="max-w-[1200px] mx-auto px-6 py-10 md:py-12">
        {categoryItems.length > 0 && (
          <MenuSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${category.name.toLowerCase()}...`}
            className="mb-10"
          />
        )}

        {categoryItems.length === 0 ? (
          <motion.p
            className="text-center text-stone-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No items found in this category yet.
          </motion.p>
        ) : filteredItems.length === 0 ? (
          <motion.p
            className="text-center text-stone-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No items match &ldquo;{searchQuery.trim()}&rdquo;.
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {filteredItems.map((item, index) => {
              const isActive = activeCardId === item.id;
              return (
                <motion.div
                  key={item.id}
                  data-card-id={item.id}
                  ref={(el) => {
                    if (el) {
                      cardRefs.current.set(item.id, el);
                    } else {
                      cardRefs.current.delete(item.id);
                    }
                  }}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group h-full p-4 pt-6 pb-24 ${isActive ? 'bg-[#ea580c] shadow-md border-transparent' : 'bg-orange-50'} rounded-2xl text-center flex flex-col items-center shadow-[0_3px_12px_rgba(0,0,0,0.02)] border border-orange-100 transition-colors duration-300 hover:bg-[#ea580c] hover:shadow-md hover:border-transparent relative overflow-hidden cursor-pointer ${isActive ? 'border-amber-500 ring-2 ring-amber-200' : ''}`}
                  onClick={() => openDoorDash()}
                >
                  <div className={`absolute inset-[-50px] z-0 ${isActive ? 'opacity-[0.03]' : 'opacity-0'} group-hover:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1wPSc1JyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLCAyMCkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTMgMTJhOSA5IDAgMCAxIDE4IDAiIC8+CiAgICA8cGF0aCBkPSJNeCAxMmgxOCIgLz4KICAgIDxwYXRoIGQ9Ik00IDE2YTIgMiAwIDAgMCAyIDJoMTJhMiAwIDAgMCAyLTIiIC8+CiAgICA8cGF0aCBkPSJNNCAxNmgxNiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwLCA1MCkgcm90YXRlKDQ1KSBzY2FsZSgyKSI+CiAgICA8cGF0aCBkPSJNMTUgMkwzIDIyaDI0WiIgLz4KICAgIDxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNCIgY3k9IjE2IiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDEyMCkgcm90YXRlKC0xNSkgc2NhbGUoMikiPgogICAgPHBhdGggZD0iTTYgOGgxMmwtMS41IDEySDcuNVoiIC8+CiAgICA8cGF0aCBkPSJNNCA4aDE2IiAvPgogICAgPHBhdGggZD0iTTEyIDJ2NiIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMwLCAxNDApIHJvdGF0ZSgxNSkgc2NhbGUoMikiPgogICAgPHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgiIHJ4PSI0IiAvPgogICAgPHBhdGggZD0iTTQgMTJoMTYiIC8+CiAgPC9nPgo8L3N2Zz4=')] mix-blend-multiply transition-opacity duration-500 pointer-events-none`} />

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + (index % 6) * 0.05, duration: 0.35 }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#222222] shadow-sm flex items-center justify-center text-white transition-colors cursor-pointer z-10 hover:bg-stone-700 group/heart"
                    aria-label="Add to Favorites"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 transition-colors group-hover/heart:text-[#ea580c] group-hover/heart:fill-[#ea580c]" />
                  </motion.button>

                  <div className="w-32 h-32 sm:w-40 sm:h-40 mt-2 mb-4 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden bg-[#FAF8F5] transition-all duration-700 ease-in-out rounded-[64%_36%_27%_73%/55%_58%_42%_45%] group-hover:rounded-[33%_67%_58%_42%/63%_68%_32%_37%] border-4 border-[#FAF8F5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <p className={`font-black text-lg mb-1 transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-[#ea580c] group-hover:text-white'}`}>
                    ${item.price.toFixed(2)}
                  </p>

                  <h3 className={`font-bold ${isActive ? 'text-white' : 'text-stone-900'} group-hover:text-white text-[15px] uppercase tracking-wide mb-2 line-clamp-2 transition-colors duration-300 z-10 min-h-[40px] flex items-center justify-center`}>
                    {item.name}
                  </h3>

                  <p className={`text-sm mb-4 px-1 leading-relaxed transition-colors duration-300 z-10 ${isActive ? 'text-white/90' : 'text-stone-500 group-hover:text-white/90'}`}>
                    {item.description}
                  </p>

                  <div className="flex gap-1 mt-auto z-10 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-colors duration-300 ${i < Math.floor(item.rating)
                          ? isActive
                            ? 'fill-white text-white'
                            : 'fill-amber-400 text-amber-400 group-hover:fill-white group-hover:text-white'
                          : isActive
                            ? 'text-white/40'
                            : 'text-stone-300 group-hover:text-white/40'
                          }`}
                      />
                    ))}
                  </div>

                  <div className={`absolute bottom-5 left-0 right-0 px-6 transition-all duration-300 z-10 ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'} group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDoorDash();
                      }}
                      className="w-full h-[36px] flex items-center justify-center bg-[#222222] text-white text-[13px] font-bold rounded-full shadow-md hover:bg-black cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      <DeliveryBanner />
    </main>
  );
}
