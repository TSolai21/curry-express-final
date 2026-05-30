import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageBanner from '../components/PageBanner';
import { childFadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewport } from '../utils/motion';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-[#ea580c]" />,
      title: 'Visit Us',
      lines: ['15190 Walden Rd', 'Montgomery, TX 77356'],
    },
    {
      icon: <Phone className="w-5 h-5 text-[#ea580c]" />,
      title: 'Call Us',
      lines: ['+1 (346) 863-1124'],
    },
    {
      icon: <Mail className="w-5 h-5 text-[#ea580c]" />,
      title: 'Email Us',
      lines: ['info@curryexpresstexas.com'],
    },
    {
      icon: <Clock className="w-5 h-5 text-[#ea580c]" />,
      title: 'Hours',
      lines: ['Open Daily', '11:00 AM – 9:30 PM'],
    },
  ];

  return (
    <main className="flex-1">
      <PageBanner title="Contact" breadcrumbLabel="Contact" />

      <section className="py-12 md:py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeInLeft}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-6"
              >
                <motion.div variants={childFadeInUp}>
                  <span className="text-xs font-bold tracking-[0.25em] text-[#ea580c] block uppercase mb-2">
                    Say Hello
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                    Questions? Just ask.
                  </h2>
                </motion.div>

                <motion.p variants={childFadeInUp} className="text-sm text-stone-600 leading-relaxed">
                  Call us for takeout, ask about catering, or send a note below. We usually reply the same day.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={childFadeInUp}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex gap-4 p-5 rounded-2xl bg-white border border-stone-100 shadow-sm"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm mb-1">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-xs text-stone-500 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeInRight}
            >
              <div className="bg-white rounded-2xl border border-stone-100 shadow-lg p-6 sm:p-8">
                <h3 className="font-bold text-stone-900 text-lg mb-6">Send a message</h3>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="py-12 text-center space-y-3"
                    >
                      <p className="text-[#ea580c] font-bold text-lg">Thank you!</p>
                      <p className="text-sm text-stone-500">
                        Got it — we will get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div variants={childFadeInUp}>
                          <label htmlFor="name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/30 transition-colors"
                            placeholder="Your name"
                          />
                        </motion.div>
                        <motion.div variants={childFadeInUp}>
                          <label htmlFor="email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/30 transition-colors"
                            placeholder="you@example.com"
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div variants={childFadeInUp} initial="hidden" animate="visible">
                        <label htmlFor="phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                          Phone <span className="text-stone-400 font-normal normal-case">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/30 transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </motion.div>

                      <motion.div variants={childFadeInUp} initial="hidden" animate="visible">
                        <label htmlFor="message" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/30 transition-colors resize-none"
                          placeholder="Tell us what you need"
                        />
                      </motion.div>

                      <motion.div variants={childFadeInUp} initial="hidden" animate="visible">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-3.5 rounded-sm font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          SEND MESSAGE
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
