import { X, Star, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-sm" id="item-detail-modal">
      
      {/* Background click close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border-t sm:border border-stone-200 z-10 flex flex-col max-h-[90vh] sm:max-h-[85vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-900/40 hover:bg-stone-900/60 text-white flex items-center justify-center cursor-pointer transition-all border border-white/20 touch-manipulation"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Scrollable interior */}
        <div className="overflow-y-auto custom-scrollbar flex-1 pb-6">
          {/* Cover photo of high quality */}
          <div className="h-56 relative bg-stone-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent opacity-95" />
          </div>

          <div className="px-6 space-y-6 relative -mt-4 text-left">
            {/* Title & Ratings */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#ea580c] font-bold">
                {item.category.replace('-', ' ')}
              </span>
              <h3 className="text-2xl font-black text-stone-950 tracking-tight leading-sm">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <span className="font-bold font-mono text-stone-700">{item.rating}</span>
                <span className="text-stone-300">|</span>
                <span className="text-xs text-stone-500 font-semibold">House favorite</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-2">
              <span className="text-2xl font-black text-[#ea580c] font-mono">${item.price.toFixed(2)}</span>
            </div>

            {/* Description */}
            <p className="text-stone-605 text-sm inline-block leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Floating action bar button (Close) */}
        <div className="p-4 bg-[#FAF8F5] border-t border-stone-150 relative z-20">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-stone-900 hover:bg-black"
          >
            CLOSE
          </button>
        </div>

      </motion.div>
    </div>
  );
}
