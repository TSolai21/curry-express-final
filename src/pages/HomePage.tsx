import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import PopularFoodItems from '../components/PopularFoodItems';
import Offers from '../components/Offers';
import Features from '../components/Features';
import About from '../components/About';
import DeliveryBanner from '../components/DeliveryBanner';
import Feedback from '../components/Feedback';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="flex-1">
      <Hero 
        onViewMenu={() => navigate('/menu')}
        onViewOffers={() => {
          const el = document.getElementById('offers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewReviews={() => {
          const el = document.getElementById('reviews');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <Gallery />
      <PopularFoodItems />
      <Offers />
      <About />
      <Features />
      <DeliveryBanner overlapBottom={true} />
      <Feedback />
    </main>
  );
}
