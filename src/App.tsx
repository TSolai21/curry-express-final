import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FullMenuPage from './pages/FullMenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top or specific hash on page change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          // Adjust scroll position for header offset
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Sync scroll positions to highlight appropriate navigation items
  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveSection('about');
      return;
    }
    if (location.pathname === '/contact') {
      setActiveSection('contact');
      return;
    }
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    const sections = ['home', 'menu', 'offers', 'about', 'reviews'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // offset for navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'about') {
      if (location.pathname === '/') {
        setActiveSection('about');
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/about');
        setActiveSection('about');
      }
      return;
    }

    if (sectionId === 'contact') {
      navigate('/contact');
      setActiveSection('contact');
      return;
    }

    if (sectionId === 'home') {
      navigate('/');
      setActiveSection('home');
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setActiveSection(sectionId);
      return;
    }

    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-warm-white text-stone-700 flex flex-col font-sans selection:bg-[#ea580c]/10 selection:text-[#ea580c]">
      {/* Absolute top spacer representing header layout alignment */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<FullMenuPage />} />
        <Route path="/category/:categoryId" element={<Navigate to="/menu" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons */}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
