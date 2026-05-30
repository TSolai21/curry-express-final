import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const quickLinks = [
  { name: 'Home', to: '/', sectionId: 'home' },
  { name: 'About', to: '/about', sectionId: 'about' },
  { name: 'Reviews', to: '/reviews', sectionId: 'reviews' },
  { name: 'Menu', to: '/#menu', sectionId: 'menu' },
  { name: 'Contact', to: '/contact', sectionId: 'contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (sectionId: string, e: React.MouseEvent) => {
    if (sectionId === 'about' || sectionId === 'contact' || sectionId === 'reviews') {
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
    <footer className="bg-warm-surface text-stone-800 border-t border-warm-border/80 pt-12 sm:pt-16 md:pt-20 pb-[max(2rem,env(safe-area-inset-bottom))]" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-start mb-10 sm:mb-16 text-left">
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" onClick={() => onNavigate('home')} className="cursor-pointer inline-block">
              <img src="/logo.jpg" alt="Curry Express Logo" className="h-12 w-auto object-contain rounded-full shadow-sm" />
            </Link>
            <p className="text-sm text-stone-700 leading-relaxed max-w-sm">
              Indian and Indo-Chinese food on Walden Road. Dine in, take out, or order delivery — open daily 11 to 9:30.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-eyebrow border-b border-warm-border pb-2 mb-1">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.sectionId}>
                  <Link
                    to={link.to}
                    onClick={(e) => handleLinkClick(link.sectionId, e)}
                    className="cursor-pointer text-sm font-medium text-stone-700 hover:text-[#ea580c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-eyebrow border-b border-warm-border pb-2 mb-1">
              Address & Hours
            </h4>
            <div className="space-y-4">
              <div className="flex gap-2.5 items-start text-sm text-stone-700">
                <MapPin className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Curry Express</strong><br />
                  15190 Walden Rd, Montgomery, TX 77356
                </p>
              </div>
              <div className="flex gap-2.5 items-start text-sm text-stone-700">
                <Clock className="w-4 h-4 text-[#ea580c] flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block text-stone-750">Hours</span>
                  <p>Daily · 11:00 AM – 9:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-eyebrow border-b border-warm-border pb-2 mb-1">
              Follow & Contact
            </h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer w-9 h-9 rounded-full bg-stone-250/20 text-stone-600 hover:bg-[#ea580c] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer w-9 h-9 rounded-full bg-stone-250/20 text-stone-600 hover:bg-[#037AFA] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-3 space-y-3">
              <a href="tel:+13468631124" className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-[#ea580c] transition-colors">
                <Phone className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span className="font-bold">+1 (346) 863-1124</span>
              </a>
              <a href="mailto:info@curryexpresstexas.com" className="flex items-center gap-2.5 text-sm text-stone-700 hover:text-[#ea580c] transition-colors">
                <Mail className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                <span className="font-medium">info@curryexpresstexas.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-stone-600">
          <p className="font-medium">
            © Copyright {currentYear} Curry Express. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="cursor-pointer hover:underline">Privacy Policy</a>
            <span className="text-stone-300">|</span>
            <a href="#" className="cursor-pointer hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
