import { useState } from 'react';
import { Tag, Sparkles, Check, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import thaliComboImage from '../assets/images/thali_combo_1780049451886.png';
import { openDoorDash } from '../constants';
import FillHoverButton from './FillHoverButton';

export default function CurryExpressCombos() {
  const [selectedComboId, setSelectedComboId] = useState('combo-butter-chicken');

  const combos = [
    {
      id: 'combo-butter-chicken',
      name: 'Butter Chicken Combo',
      subtitle: 'Butter chicken, rice, garlic naan, and gulab jamun.',
      price: 19.99,
      item: {
        id: 'combo-butter-chicken',
        name: 'Curry Express Butter Chicken Combo',
        price: 19.99,
        description: 'Butter chicken with rice, naan, and dessert.',
        category: 'combo',
        image: thaliComboImage,
        rating: 4.9
      }
    },
    {
      id: 'combo-veg-korma',
      name: 'Veg Korma Combo',
      subtitle: 'Vegetable korma, rice, garlic naan, and gulab jamun.',
      price: 16.99,
      item: {
        id: 'combo-veg-korma',
        name: 'Curry Express Vegetable Korma Combo',
        price: 16.99,
        description: 'Vegetable korma with rice, naan, and dessert.',
        category: 'combo',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=500',
        rating: 4.7
      }
    }
  ];

  const currentCombo = combos.find((c) => c.id === selectedComboId) || combos[0];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-950 text-white relative overflow-hidden" id="combos">
      <div className="absolute inset-0 bg-[#161513] opacity-35 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-eyebrow block mb-2">
                Combo Meals
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-stone-100">
                Feed the <span className="text-amber-400">whole table</span>
              </h2>
            </div>

            <div className="space-y-6">
              {combos.map((combo) => {
                const isSelected = selectedComboId === combo.id;
                return (
                  <div
                    key={combo.id}
                    onClick={() => setSelectedComboId(combo.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-305 cursor-pointer text-left relative ${
                      isSelected
                        ? 'bg-stone-900/80 border-[#ea580c] shadow-lg shadow-[#ea580c]/5'
                        : 'bg-stone-900/30 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 right-4 bg-[#ea580c] text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> BEST VALUE
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className={`font-bold tracking-wide text-lg ${isSelected ? 'text-amber-400 font-extrabold' : 'text-stone-200'}`}>
                        {combo.name}
                      </h3>
                      <span className="text-xl font-black text-[#ea580c]">${combo.price}</span>
                    </div>

                    <p className="text-sm text-stone-300 leading-relaxed mt-1">
                      {combo.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <FillHoverButton
                variant="outline"
                onClick={openDoorDash}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-sm text-xs tracking-wider uppercase shadow-xl active:scale-95 transition-transform justify-center"
                id="combo-order-now-btn"
              >
                ORDER NOW
              </FillHoverButton>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              layout
              className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 w-full max-w-[380px] shadow-2xl relative"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={currentCombo.item.image}
                  alt="Combo Deluxe representation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/10 to-transparent" />

                <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-bold text-[9px] px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Tag className="w-3 h-3" /> BEST DEAL
                </span>
              </div>

              <div className="p-8 text-center space-y-4">
                <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Made fresh
                </div>

                <h4 className="font-serif italic font-extrabold text-2xl text-stone-100">
                  Dinner for two
                </h4>

                <p className="text-sm text-stone-300 leading-relaxed">
                  Curry, rice, bread, and a sweet to finish. Easy takeout for a weeknight.
                </p>

                <div className="border-t border-stone-800 pt-4 flex justify-center gap-4 text-xs text-stone-400 font-semibold tracking-wider">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> Hot from the kitchen
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
