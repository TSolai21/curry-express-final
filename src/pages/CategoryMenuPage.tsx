import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES, MENU_ITEMS } from '../data';
import DeliveryBanner from '../components/DeliveryBanner';
import PageBanner from '../components/PageBanner';
import MenuSearchInput from '../components/MenuSearchInput';
import MenuItemCard from '../components/MenuItemCard';
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
        <Link to="/" className="mt-4 cursor-pointer text-[#ea580c] hover:underline">Return to Home</Link>
      </motion.main>
    );
  }

  return (
    <main className="flex-1">
      <PageBanner title={category.name} breadcrumbLabel={category.name}>
        {categoryItems.length > 0 && (
          <MenuSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${category.name.toLowerCase()}...`}
            className="max-w-full"
          />
        )}
      </PageBanner>

      <section className="max-w-[1200px] mx-auto px-6 py-10 md:py-12 bg-warm-white">
        {categoryItems.length === 0 ? (
          <motion.p
            className="text-center text-stone-600 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No items found in this category yet.
          </motion.p>
        ) : filteredItems.length === 0 ? (
          <motion.p
            className="text-center text-stone-600 py-12"
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
            {filteredItems.map((item, index) => (
              <MenuItemCard
                key={item.id}
                ref={(el) => {
                  if (el) {
                    cardRefs.current.set(item.id, el);
                  } else {
                    cardRefs.current.delete(item.id);
                  }
                }}
                item={item}
                isActive={activeCardId === item.id}
                animationIndex={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              />
            ))}
          </motion.div>
        )}
      </section>

      <DeliveryBanner />
    </main>
  );
}
