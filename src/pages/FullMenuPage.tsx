import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import CategoryCard from '../components/CategoryCard';
import MenuSearchInput from '../components/MenuSearchInput';
import { CATEGORIES } from '../data';
import { matchesSearch } from '../utils/search';

export default function FullMenuPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return CATEGORIES;
    return CATEGORIES.filter((category) =>
      matchesSearch(query, category.name, category.description, category.id.replace(/-/g, ' '))
    );
  }, [searchQuery]);

  return (
    <main className="flex-1">
      <PageBanner title="Full Menu" breadcrumbLabel="Full Menu">
        <MenuSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search categories..."
          className="max-w-full"
        />
      </PageBanner>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14 bg-warm-white">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between mb-8 sm:mb-10">
          <div>
            <p className="text-eyebrow mb-2">Full Menu</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900">
              Browse every category
            </h1>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <p className="text-center text-base text-stone-700 py-8">
            No categories match &ldquo;{searchQuery.trim()}&rdquo;.
          </p>
        ) : (
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => navigate(`/category/${category.id}`)}
                footerLabel="View Menu"
                footerVisibleOnHoverOnly
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
