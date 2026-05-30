import { Search, X } from 'lucide-react';

interface MenuSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MenuSearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: MenuSearchInputProps) {
  return (
    <div className={`relative max-w-md mx-auto w-full ${className}`}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-12 pr-10 py-3 rounded-full border border-orange-100/80 bg-warm-elevated text-stone-800 placeholder:text-stone-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]/30 focus:border-[#ea580c] transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex cursor-pointer items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
