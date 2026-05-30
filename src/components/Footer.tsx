import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const quickLinks = [
  { name: 'Home', to: '/', sectionId: 'home' },
  { name: 'About', to: '/about', sectionId: 'about' },
  { name: 'Menu', to: '/#menu', sectionId: 'menu' },
  { name: 'Contact', to: '/contact', sectionId: 'contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (sectionId: string, e: React.MouseEvent) => {
    if (sectionId === 'about' || sectionId === 'contact') {
      e.preventDefault();
      onNavigate(sectionId);
      return;
    }
    if (sectionId === 'home' || sectionId === 'menu') {
      e.preventDefault();
      onNavigate(sectionId);
    }
  };

  return (
    <footer className="bg-[#FAF8F5] text-stone-800 border-t border-stone-200/80 pt-20 pb-8" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16 text-left">
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" onClick={() => onNavigate('home')}>
              <img src="/logo.jpg" alt="Curry Express Logo" className="h-12 w-auto object-contain rounded-full shadow-sm" />
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed font-sans max-w-sm">
              Indian and Indo-Chinese food on Walden Road. Dine in, take out, or order delivery — open daily 11 to 9:30.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-xs tracking-wider uppercase text-stone-900 border-b border-stone-200 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.sectionId}>
                  <Link
                    to={link.to}
                    onClick={(e) => handleLinkClick(link.sectionId, e)}
                    className="text-xs font-semibold text-stone-600 hover:text-[#ea580c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-xs tracking-wider uppercase text-stone-900 border-b border-stone-200 pb-2">
              Address & Hours
            </h4>
            <div className="space-y-4">
              <div className="flex gap-2.5 items-start text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Curry Express</strong><br />
                  15190 Walden Rd, Montgomery, TX 77356
                </p>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-stone-600">
                <Clock className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block text-stone-750">Hours</span>
                  <p>Daily · 11:00 AM – 9:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-xs tracking-wider uppercase text-stone-900 border-b border-stone-200 pb-2">
              Follow & Contact
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-250/20 text-stone-600 hover:bg-[#ea580c] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-250/20 text-stone-600 hover:bg-[#037AFA] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-3 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-stone-600">
                <Phone className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span className="font-bold">+1 (346) 863-1124</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-600">
                <Mail className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span className="font-bold uppercase text-[10px] sm:text-xs">info@curryexpresstexas.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
          <p className="font-medium">
            © Copyright {currentYear} Curry Express. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span className="text-stone-300">|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
