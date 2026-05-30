import { UtensilsCrossed, ChefHat, Bike, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { scaleIn, viewport } from '../utils/motion';

export default function Features() {
  const features = [
    {
      id: 'authentic',
      icon: <UtensilsCrossed className="w-10 h-10 text-[#ea580c]" strokeWidth={1.5} />,
      title: 'Homestyle Indian',
      description: 'Curries, biryanis, and breads the way we make them at home.',
    },
    {
      id: 'recipes',
      icon: <ChefHat className="w-10 h-10 text-[#ea580c]" strokeWidth={1.5} />,
      title: 'Indo-Chinese Too',
      description: 'Noodles, fried rice, and chili dishes when you want something spicy.',
    },
    {
      id: 'delivery',
      icon: <Bike className="w-10 h-10 text-[#ea580c]" strokeWidth={1.5} />,
      title: 'Takeout & Delivery',
      description: 'Order ahead, pick up on Walden Rd, or get it delivered through DoorDash.',
    },
    {
      id: 'ingredients',
      icon: <Leaf className="w-10 h-10 text-[#ea580c]" strokeWidth={1.5} />,
      title: 'Fresh Every Day',
      description: 'We prep in the morning and cook your order when it comes in.',
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-[#111111] relative overflow-hidden" id="features">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/texture.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <motion.div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 md:py-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={scaleIn}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-start text-left gap-5"
            >
              <div className="mb-2">{feat.icon}</div>

              <div className="space-y-3">
                <h4 className="text-white font-bold text-lg font-sans leading-tight">
                  {feat.title}
                </h4>
                <p className="text-stone-300 text-base leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
