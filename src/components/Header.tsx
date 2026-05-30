import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openDoorDash } from '../constants';

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

  const navLinks = [
    { name: 'HOME', id: 'home' },
    { name: 'MENU', id: 'menu' },
    { name: 'OFFERS', id: 'offers' },
    { name: 'ABOUT', id: 'about' },
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
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-md py-3'
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
                  className={`text-sm font-bold tracking-widest hover:text-[#ea580c] transition-colors focus:outline-none cursor-pointer ${navTextClass(link.id)}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Call to Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={openDoorDash}
                className="relative bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-sm font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-lg focus:outline-none cursor-pointer active:scale-95"
                id="header-order-online-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Order Online</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden hover:text-[#ea580c] p-1 focus:outline-none cursor-pointer transition-colors ${isScrolled || mobileMenuOpen || !isHome ? 'text-stone-800' : 'text-white'}`}
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] bg-[#FDFBF7] z-30 md:hidden flex flex-col p-6 shadow-xl border-t border-stone-200/50"
            id="mobile-nav-panel"
          >
            <div className="flex flex-col space-y-6 mt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-lg font-bold tracking-wider py-2 border-b border-stone-100 ${
                    isLinkActive(link.id) ? 'text-[#ea580c]' : 'text-stone-850'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-6 border-t border-stone-200 flex flex-col gap-4">
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
        )}
      </AnimatePresence>
    </>
  );
}
