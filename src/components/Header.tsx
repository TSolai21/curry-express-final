import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openDoorDash } from '../constants';
import FillHoverButton from './FillHoverButton';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'MENU', id: 'menu' },
    { name: 'OFFERS', id: 'offers' },
    { name: 'ABOUT', id: 'about' },
    { name: 'REVIEWS', id: 'reviews' },
    { name: 'CONTACT', id: 'contact' },
  ];

  const isLinkActive = (id: string) => activeSection === id;

  const navTextClass = (id: string) => {
    if (isLinkActive(id)) return 'text-[#ea580c] border-b-2 border-[#ea580c] pb-1';
    if (isScrolled || mobileMenuOpen || !isHome) return 'text-stone-800';
    return 'text-white/90';
  };

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || mobileMenuOpen || !isHome
            ? 'bg-warm-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleLinkClick('home')}
            >
              <img src="/logo.jpg" alt="Curry Express Logo" className="h-12 w-auto object-contain rounded-full shadow-sm" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-semibold tracking-wide hover:text-[#ea580c] transition-colors focus:outline-none cursor-pointer ${navTextClass(link.id)}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Call to Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <FillHoverButton
                variant={isScrolled || mobileMenuOpen || !isHome ? 'solid' : 'outline'}
                onClick={openDoorDash}
                className="px-3 sm:px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase shadow-lg active:scale-95 transition-transform"
                id="header-order-online-btn"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Order Online</span>
                <span className="sm:hidden">Order</span>
              </FillHoverButton>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-panel"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={`md:hidden touch-target flex items-center justify-center hover:text-[#ea580c] focus:outline-none cursor-pointer transition-colors ${isScrolled || mobileMenuOpen || !isHome ? 'text-stone-800' : 'text-white'}`}
                id="header-mobile-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 top-[60px] z-30 bg-stone-950/40 md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[60px] bg-warm-white z-40 md:hidden flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-xl border-t border-warm-border/80 overflow-y-auto overscroll-contain safe-top"
            id="mobile-nav-panel"
          >
            <div className="flex flex-col space-y-2 mt-2">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-lg font-bold tracking-wide min-h-12 flex items-center py-2 border-b border-black cursor-pointer ${
                    isLinkActive(link.id) ? 'text-[#ea580c]' : 'text-stone-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-stone-600">
                  <Phone className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <span className="text-sm font-semibold">+1 (346) 863-1124</span>
                </div>
                <div className="flex items-start gap-3 text-stone-600">
                  <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold leading-relaxed">
                    15190 Walden Rd, <br/>
                    Montgomery, TX 77356
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
