import React from 'react';
import Hero from '../components/Hero';
import PopularPicks from '../components/PopularPicks';
import PopularFoodItems from '../components/PopularFoodItems';
import Offers from '../components/Offers';
import Features from '../components/Features';
import About from '../components/About';
import DeliveryBanner from '../components/DeliveryBanner';
import Feedback from '../components/Feedback';
import { MenuItem } from '../types';

interface HomePageProps {
  onSelectItem: (item: MenuItem) => void;
}

export default function HomePage({ onSelectItem }: HomePageProps) {
  return (
    <main className="flex-1">
      <Hero onViewMenu={() => {
        const el = document.getElementById('menu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />
      <PopularPicks onSelectItem={onSelectItem} />
      <Offers />
      <PopularFoodItems onSelectItem={onSelectItem} />
      <Features />
      <About />
      <DeliveryBanner overlapBottom={true} />
      <Feedback />
    </main>
  );
}
