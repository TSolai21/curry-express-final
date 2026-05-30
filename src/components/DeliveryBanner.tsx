import { useState } from 'react';
import { Truck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { childFadeInUp, fadeInRight, staggerContainer, viewport } from '../utils/motion';
import { openDoorDash } from '../constants';

interface DeliveryBannerProps {
  overlapBottom?: boolean;
}

export default function DeliveryBanner({ overlapBottom = false }: DeliveryBannerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState('');

  const partners = [
    {
      name: 'Grubhub',
      color: 'bg-[#FF8000] hover:bg-[#e67300]',
      logo: <span className="font-black text-[11px] tracking-wider text-white">GRUBHUB</span>
    },
    {
      name: 'DoorDash',
      color: 'bg-[#EB1700] hover:bg-[#cc1400]',
      logo: (
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M23.098 13.948c0-3.32-2.613-5.267-6.04-5.267H7.72c-.854 0-1.547.693-1.547 1.547 0 .853.693 1.546 1.547 1.546h9.338c1.68 0 2.946.854 2.946 2.174 0 1.32-1.266 2.173-2.946 2.173H2.08c-.853 0-1.546.693-1.546 1.546s.693 1.547 1.546 1.547h14.978c3.427 0 6.04-1.947 6.04-5.266z" />
          </svg>
          <span className="font-bold text-[9px] tracking-widest text-white mt-0.5">DOORDASH</span>
        </div>
      )
    },
    {
      name: 'UberEats',
      color: 'bg-[#06C167] hover:bg-[#05a357]',
      logo: (
        <div className="flex flex-col text-black font-bold leading-none tracking-tight">
          <span className="text-xl">Uber</span>
          <span className="text-xl">Eats</span>
        </div>
      )
    }
  ];

  const handlePartnerClick = (name: string) => {
    if (name === 'DoorDash') {
      openDoorDash();
      return;
    }
    setSelectedPartner(name);
    setModalOpen(true);
  };

  return (
    <section className={`py-2 relative z-20 ${overlapBottom ? '-mb-20' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Dynamic Green Banner Container */}
        <motion.div
          className="bg-gradient-to-br from-[#ea580c] to-[#c2410c] rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl flex flex-col md:flex-row items-center justify-between mt-16 "
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >

          {/* Food texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-40 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url("/food-texture.svg")`,
              backgroundSize: '240px',
              backgroundRepeat: 'repeat',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-15 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url("/texture.avif")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Warm light glow */}
          <div className="absolute -top-10 -right-10 w-[350px] h-[350px] bg-white/10 rounded-full blur-[80px] pointer-events-none z-0" />

          {/* Left Side: Text and Buttons */}
          <motion.div
            className="relative z-10 w-full md:w-[60%] flex flex-col space-y-4"
            variants={childFadeInUp}
          >
            <span className="text-[#FFB800] font-bold text-xs uppercase tracking-widest font-sans">
              Delivery & Takeout
            </span>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-[1.2] text-white font-sans max-w-xl">
              Order from Curry Express on DoorDash, Grubhub, or Uber Eats
            </h3>

            <div className="flex gap-4 mt-4 pt-2">
              {partners.map((partner, i) => (
                <motion.button
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePartnerClick(partner.name)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer ${partner.color}`}
                >
                  {partner.logo}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Delivery Man Illustration */}
          <motion.div
            className="relative z-10 mt-10 md:mt-0 md:w-[40%] flex justify-end items-end h-full"
            variants={fadeInRight}
          >
            <motion.img
              src="/delivery_man.png"
              alt="Delivery Man"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-48 h-48 md:w-[350px] md:h-[350px] object-contain mix-blend-multiply absolute bottom-0 right-0 md:right-10 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </motion.div>
      </div>

      {/* Direct Order vs Partner Comparison Interactive Modal Popup */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm" id="delivery-partner-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FDFBF7] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-stone-200"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-[#0A733E]/10 text-[#0A733E] rounded-full mx-auto flex items-center justify-center border border-[#0A733E]/20">
                  <Truck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight">Order on {selectedPartner}?</h3>
                  <p className="text-sm text-stone-500 max-w-sm mx-auto">
                    You will be taken to {selectedPartner} to place your order. For the fastest pickup, DoorDash works great.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      openDoorDash();
                    }}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white py-3 rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Use DoorDash
                  </button>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      if (selectedPartner === 'DoorDash') {
                        openDoorDash();
                      } else {
                        window.open(`https://www.google.com/search?q=Curry+Express+${selectedPartner}`, '_blank');
                      }
                    }}
                    className="border border-stone-300 hover:border-stone-400 text-stone-700 py-3 rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
