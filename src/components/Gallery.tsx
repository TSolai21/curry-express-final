import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { CATEGORIES } from '../data';

// Extract images and names from our menu data
const allItems = CATEGORIES.filter(c => c.image).map(c => ({
  src: c.image,
  name: c.name
}));

// Split them roughly into 4 arrays for the 4 sliders
const items1 = allItems.slice(0, 4);
const items2 = allItems.slice(4, 8);
const items3 = allItems.slice(8, 12);
const items4 = allItems.slice(11, 15); // Slight overlap to ensure 4 images

export default function Gallery() {
  const renderSlide = (item: { src: string, name: string }, i: number) => (
    <SwiperSlide key={i} className="h-full relative group cursor-pointer overflow-hidden rounded-2xl">
      <img src={item.src} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <span className="text-white font-bold text-lg sm:text-xl text-center tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
          {item.name}
        </span>
      </div>
    </SwiperSlide>
  );

  return (
    <section className="py-12 md:py-20 bg-warm-white overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16 text-center">
          <span className="text-xs font-bold tracking-wide text-[#ea580c] block uppercase mb-3">
            Our Moments
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Gallery
          </h2>
        </div>

        {/* Mobile Single Slider (shows all items) */}
        <div className="block md:hidden max-w-[320px] mx-auto w-full">
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            direction="horizontal"
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            speed={1000}
            slidesPerView={1}
            allowTouchMove={true}
            className="w-full aspect-[3/4] rounded-2xl shadow-2xl"
          >
            {allItems.map(renderSlide)}
          </Swiper>
        </div>

        {/* Desktop 4-Column Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {/* Slider 1: Vertical Up */}
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            direction="vertical"
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1000}
            slidesPerView={1}
            allowTouchMove={false}
            className="w-full aspect-[3/4] rounded-2xl shadow-xl"
          >
            {items1.concat(items1).map(renderSlide)}
          </Swiper>

          {/* Slider 2: Horizontal Left */}
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            direction="horizontal"
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            speed={1000}
            slidesPerView={1}
            allowTouchMove={false}
            className="w-full aspect-[3/4] rounded-2xl shadow-xl"
          >
            {items2.concat(items2).map(renderSlide)}
          </Swiper>

          {/* Slider 3: Vertical Down */}
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            direction="vertical"
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false, reverseDirection: true }}
            speed={1000}
            slidesPerView={1}
            allowTouchMove={false}
            className="w-full aspect-[3/4] rounded-2xl shadow-xl"
          >
            {items3.concat(items3).map(renderSlide)}
          </Swiper>

          {/* Slider 4: Horizontal Right */}
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            direction="horizontal"
            loop={true}
            autoplay={{ delay: 5500, disableOnInteraction: false, reverseDirection: true }}
            speed={1000}
            slidesPerView={1}
            allowTouchMove={false}
            className="w-full aspect-[3/4] rounded-2xl shadow-xl"
          >
            {items4.concat(items4).map(renderSlide)}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
