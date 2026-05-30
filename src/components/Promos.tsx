import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import palakPaneerImage from '../assets/images/palak_paneer_dish_1780049396646.png'; // Wait, let's use palakPaneerImage if imported. Oh, palakPaneerImage is palak_paneer_dish_1780049430917.png under /src/assets/images!
// Let's import the correct path:
import palakPaneerFile from '../assets/images/palak_paneer_dish_1780049430917.png';
import { openDoorDash } from '../constants';
import { MenuItem } from '../types';

interface PromosProps {
  onSelectItem: (item: MenuItem) => void;
}

export default function Promos({ onSelectItem }: PromosProps) {
  const palakPaneerItem: MenuItem = {
    id: 'main-palak-paneer-item',
    name: 'Creamy Palak Paneer',
    price: 16.99,
    description: 'Handpicked fresh garden spinach cooked velvety fine with ground ginger, garlic, and cumin, topped with delicate cottage cheese cubes.',
    category: 'main-course',
    image: palakPaneerFile,
    rating: 4.8,
  };

  const butterChickenItem: MenuItem = {
    id: 'main-butter-chicken',
    name: 'Classic Butter Chicken',
    price: 18.99,
    description: 'Succulent tandoori-roasted shredded chicken simmered slowly inside a glossy, creamy spiced tomato butter sauce.',
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500',
    rating: 4.9,
  };

  return (
    <section className="py-6 bg-[#FDFBF7]" id="promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Palak Paneer Promo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={openDoorDash}
            className="bg-[#122A1E] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-xl transition-all relative overflow-hidden group"
          >
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(16,185,129,0.15),_transparent_45%)]" />
            
            <div className="space-y-4 max-w-sm text-left relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                RICH, CREAMY, AND PACKED WITH FLAVOR
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif italic text-stone-100">
                Palak <br className="hidden sm:inline" /> Paneer
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Hand-crushed spinach gravy, slow-churned cream, and tandoor grilled cottage cheese cubes.
              </p>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-transform mt-4">
                ORDER SPECIALTY <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Overlapping circular image representing palak paneer */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex-shrink-0 border-4 border-amber-950/40 shadow-2xl relative z-10">
              <img
                src={palakPaneerFile}
                alt="Palak Paneer Special"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Card 2: Butter Chicken Chef Special Promo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={openDoorDash}
            className="bg-[#781B15] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-xl transition-all relative overflow-hidden group"
          >
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(234,88,12,0.15),_transparent_45%)]" />

            <div className="space-y-4 max-w-sm text-left relative z-10 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-400/10 border border-orange-500/20 text-orange-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                RICH & CREAMY CHEF SPECIAL
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif italic text-stone-100">
                Butter <br className="hidden sm:inline" /> Chicken
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Slow-simmered tandoori roasted chicken breast in velvety cardamom-tomato clear butter base.
              </p>
              <div className="flex items-center gap-2 text-orange-300 text-xs font-bold tracking-widest uppercase group-hover:translate-x-1.5 transition-transform mt-4">
                GET DEAL <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Overlapping circular image representing butter chicken */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex-shrink-0 border-4 border-orange-950/40 shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400"
                alt="Butter Chicken Special"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
