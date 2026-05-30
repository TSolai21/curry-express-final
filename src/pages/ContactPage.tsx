import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import PageBanner from '../components/PageBanner';
import FillHoverButton from '../components/FillHoverButton';
import { childFadeInUp, fadeInUp, staggerContainer, viewport } from '../utils/motion';

const ADDRESS = '15190 Walden Rd, Montgomery, TX 77356';
const PHONE = '+1 (346) 863-1124';
const PHONE_HREF = 'tel:+13468631124';
const EMAIL = 'info@curryexpresstexas.com';
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&ie=UTF8&iwloc=&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['15190 Walden Rd', 'Montgomery, TX 77356'],
    href: DIRECTIONS_URL,
    linkLabel: 'Get directions',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: [PHONE],
    href: PHONE_HREF,
    linkLabel: 'Call now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [EMAIL],
    href: `mailto:${EMAIL}`,
    linkLabel: 'Send email',
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Open daily', '11:00 AM – 9:30 PM'],
    href: undefined,
    linkLabel: undefined,
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageBanner title="Contact" breadcrumbLabel="Contact" />

      <section className="py-10 sm:py-12 md:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            <motion.span variants={childFadeInUp} className="text-eyebrow block mb-3">
              Find Us
            </motion.span>
            <motion.h2
              variants={childFadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-4"
            >
              Come see us on Walden Road
            </motion.h2>
            <motion.p variants={childFadeInUp} className="text-base text-stone-700 leading-relaxed">
              Dine in, pick up, or plan your route — we are in Montgomery, easy to reach from Lake Conroe
              and the surrounding area.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <motion.div
              className="lg:col-span-4 flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer}
            >
              {contactCards.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={childFadeInUp}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-warm-elevated border border-orange-100/80 shadow-[0_3px_12px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#ea580c]" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-stone-900 text-base mb-1">{item.title}</h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-base text-stone-700 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    {item.href && item.linkLabel && (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="cursor-pointer text-xs font-bold uppercase tracking-wider text-[#ea580c] hover:text-[#c2410c] transition-colors pl-[3.75rem]"
                      >
                        {item.linkLabel} →
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <motion.div variants={childFadeInUp} className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                <FillHoverButton
                  onClick={() => window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer')}
                  className="w-full justify-center px-6 py-3.5 rounded-sm text-xs tracking-widest uppercase"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </FillHoverButton>
                <FillHoverButton
                  onClick={() => {
                    window.location.href = PHONE_HREF;
                  }}
                  className="w-full justify-center px-6 py-3.5 rounded-sm text-xs tracking-widest uppercase"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </FillHoverButton>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-8 min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeInUp}
            >
              <div className="h-full rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 relative">
                <iframe
                  title="Curry Express on Google Maps"
                  src={MAP_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-center text-sm text-stone-600">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-[#ea580c] font-semibold hover:underline"
                >
                  Open in Google Maps
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
