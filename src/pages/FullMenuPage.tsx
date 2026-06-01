import { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import PageBanner from '../components/PageBanner';
import MenuSearchInput from '../components/MenuSearchInput';
import MenuItemCard from '../components/MenuItemCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data';
import { matchesSearch } from '../utils/search';
import { fadeInUp, viewport } from '../utils/motion';

export default function FullMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]?.id || '');
  const sectionRefs = useRef(new Map<string, HTMLElement>());
  const tabContainerRef = useRef<HTMLUListElement>(null);

  // Group items by category
  const filteredItemsByCategory = useMemo(() => {
    const query = searchQuery.trim();
    const grouped = new Map<string, typeof MENU_ITEMS>();

    CATEGORIES.forEach(cat => {
      let items = MENU_ITEMS.filter(item => item.category === cat.id);
      if (query) {
        items = items.filter(item => matchesSearch(query, item.name, item.description, cat.name));
      }
      if (items.length > 0) {
        grouped.set(cat.id, items);
      }
    });
    return grouped;
  }, [searchQuery]);

  // Scroll spy effect
  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveTab = () => {
      let bestId: string | null = null;
      const offset = 220; // Accounts for header + sticky tabs

      sectionRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        // If the top of the element is above the offset, or it takes up the viewport
        if (rect.top <= offset) {
          bestId = id;
        }
      });

      // Default to first if scrolled at very top
      if (window.scrollY < 100) {
        bestId = CATEGORIES[0]?.id || null;
      }

      if (bestId && bestId !== activeTab) {
        setActiveTab(bestId);
        
        // Scroll the tab container so the active tab is visible
        const tabEl = document.getElementById(`tab-${bestId}`);
        if (tabEl && tabContainerRef.current) {
          const container = tabContainerRef.current;
          const scrollLeft = tabEl.offsetLeft - (container.offsetWidth / 2) + (tabEl.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }

      // Header push logic
      const anchor = document.getElementById('menu-tabs-anchor');
      const headerEl = document.getElementById('app-header');
      if (anchor && headerEl) {
        let anchorTop = anchor.offsetTop;
        let parent = anchor.offsetParent as HTMLElement;
        while (parent) {
          anchorTop += parent.offsetTop;
          parent = parent.offsetParent as HTMLElement;
        }

        const headerHeight = headerEl.offsetHeight;
        
        if (window.scrollY >= anchorTop - headerHeight) {
          const pushAmount = Math.min(window.scrollY - (anchorTop - headerHeight), headerHeight);
          headerEl.style.transform = `translateY(-${pushAmount}px)`;
        } else {
          headerEl.style.transform = 'translateY(0px)';
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveTab);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActiveTab(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      
      // Reset header transform on unmount
      const headerEl = document.getElementById('app-header');
      if (headerEl) headerEl.style.transform = 'translateY(0px)';
    };
  }, [activeTab]);

  const handleTabClick = (categoryId: string) => {
    const el = document.getElementById(`category-section-${categoryId}`);
    if (el) {
      // Offset scrolling to account for sticky tabs at top-0 (no header)
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(categoryId);
    }
  };

  return (
    <main className="flex-1 bg-warm-white">
      <PageBanner title="Full Menu" breadcrumbLabel="Full Menu">
        <MenuSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search items or categories..."
          className="max-w-full"
        />
      </PageBanner>

      {/* Sticky Tab Navigation */}
      <div id="menu-tabs-anchor" className="h-0" />
      <div className="sticky top-0 z-40 bg-warm-white border-b border-stone-200 shadow-sm py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 group/tabs">
          <button
            onClick={() => tabContainerRef.current?.scrollBy({ left: -250, behavior: 'smooth' })}
            className="shrink-0 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-stone-600 hover:text-[#ea580c] transition-colors border border-stone-100 opacity-0 group-hover/tabs:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <ul 
            ref={tabContainerRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto scroll-smooth whitespace-nowrap py-2 px-4 sm:px-8 -mx-2 sm:-mx-4 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)' 
            }}
          >
            {CATEGORIES.filter(cat => filteredItemsByCategory.has(cat.id)).map(category => (
              <li key={category.id}>
                <button
                  id={`tab-${category.id}`}
                  onClick={() => handleTabClick(category.id)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 border ${
                    activeTab === category.id
                      ? 'bg-[#ea580c] text-white border-transparent shadow-md'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-[#ea580c] hover:text-[#ea580c]'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => tabContainerRef.current?.scrollBy({ left: 250, behavior: 'smooth' })}
            className="shrink-0 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-stone-600 hover:text-[#ea580c] transition-colors border border-stone-100 opacity-0 group-hover/tabs:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {filteredItemsByCategory.size === 0 ? (
          <p className="text-center text-base text-stone-700 py-12">
            No items match &ldquo;{searchQuery.trim()}&rdquo;.
          </p>
        ) : (
          <div className="flex flex-col gap-12 sm:gap-16">
            {CATEGORIES.map(category => {
              const items = filteredItemsByCategory.get(category.id);
              if (!items) return null;

              return (
                <section 
                  key={category.id} 
                  id={`category-section-${category.id}`}
                  ref={el => {
                    if (el) sectionRefs.current.set(category.id, el);
                    else sectionRefs.current.delete(category.id);
                  }}
                  className="scroll-mt-[200px]"
                >
                  <div className="mb-6 sm:mb-8 border-b border-stone-200 pb-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-stone-600 mt-2 text-base">
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.08 } },
                    }}
                  >
                    {items.map((item, index) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        animationIndex={index}
                        variants={fadeInUp}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      />
                    ))}
                  </motion.div>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
