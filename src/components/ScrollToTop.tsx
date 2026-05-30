import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      setScrollProgress(Math.min(100, Math.max(0, scrollPercentRounded)));

      // Show the button when scrolled down
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to handle initial load position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <button 
        onClick={scrollToTop}
        className="relative group flex items-center justify-center w-[52px] h-[52px] bg-transparent rounded-full focus:outline-none transition-transform active:scale-95"
        aria-label="Scroll to top"
      >
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 52 52">
          {/* Background Track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            className="stroke-stone-200"
            strokeWidth="3.5"
          />
          {/* Progress Indicator */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            className="stroke-[#de2b2b] transition-all duration-150 ease-linear"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="w-5 h-5 text-[#de2b2b] z-10 transition-transform" strokeWidth={3} />
      </button>
    </div>
  );
}
