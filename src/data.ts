import laalMaasImage from './assets/images/laal_maas_hero_1780049396646.png';
import alooTikkaBurgerImage from './assets/images/aloo_tikka_burger_1780049412009.png';
import palakPaneerImage from './assets/images/palak_paneer_dish_1780049430917.png';
import thaliComboImage from './assets/images/thali_combo_1780049451886.png';

import { Category, MenuItem } from './types';

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=500`;

const MENU_IMAGES = {
  tomatoSoup: img('1548943487-a2e4f43b4859'),
  hotSourSoup: img('1582878826629-29b7ad1cdc43'),
  sweetCornSoup: img('1547595628-c61a29f496f0'),
  manchowSoup: img('1617096916193-2397b571f49e'),
  samosa: img('1589301760014-d929f39ce9b1'),
  springRolls: img('1626700051179-68148932445'),
  pakoda: img('1630387340193-64abad324358'),
  potatoWedges: img('1573080496215-845ca028ee90'),
  cheeseSticks: img('1574481320610-dbb2484d902d'),
  gobiManchurian: img('1606491956689-2ea866880c84'),
  dalMakhani: img('1585937421612-70a008356fbe'),
  vegKorma: img('164282037649-377b07590deb'),
  saagPaneer: palakPaneerImage,
  paneerTikkaMasala: img('1601050660573-496481474c02'),
  kadaiPaneer: img('1601050660573-496481474c02'),
  paneerButterMasala: img('1563379091339-03b21ab4a4f8'),
  channaMasala: img('1631451188081-a96a4d224f6f'),
  alooGobi: img('1606491956689-2ea866880c84'),
  chicken65: img('1608039819467-1bb3bb58b633'),
  chilliChicken: img('1603131171717-e7b3544d55e8'),
  chickenManchurian: img('1565557623262-b51c2513a641'),
  friedFish: img('1580957345920-dfb5c26459ca'),
  momos: img('1627304605857-b11393d1d69e'),
  chickenCurry: img('1603894584373-5ac82b2ae398'),
  chickenSaag: img('1546832790-272c4142984b'),
  kadaiChicken: img('1588166521212-580f0aaa641e'),
  butterChicken: img('1563379091339-03b21ab4a4f8'),
  chickenTikkaMasala: img('1565557623262-b51c2513a641'),
  chickenVindaloo: img('1585937421612-70a008356fbe'),
  chickenKorma: img('1603894584373-5ac82b2ae398'),
  madrasChicken: img('1588166521212-580f0aaa641e'),
  chettinadChicken: img('1603131171717-e7b3544d55e8'),
  goanFishCurry: img('1580957345920-dfb5c26459ca'),
  coastalFishCurry: img('1512058564366-7521c4388a9a'),
  shrimpCurry: img('1559847844-d72106819595'),
  shrimpVindaloo: img('1559847844-d72106819595'),
  goatCurry: laalMaasImage,
  goatKorma: img('1643830730780-152a8592830a'),
  kadaiGoat: img('1588166521212-580f0aaa641e'),
  goatVindaloo: img('1585937421612-70a008356fbe'),
  goatTikkaMasala: laalMaasImage,
  madrasGoat: img('1643830730780-152a8592830a'),
  roganJosh: laalMaasImage,
  cheeseBurger: img('1568901346375-23c9450c58fb'),
  specialBurger: alooTikkaBurgerImage,
  bbqBurger: img('1550540334-d057ab6760a3'),
  chickenSandwich: img('1606755962772-e994c41b27ab'),
  chickenBiryani: img('1633945274405-b6c8069047b0'),
  gilmaBiryani: img('1596797038530-2c107229654b'),
  goatBiryani: img('164282037649-377b07590deb'),
  shrimpBiryani: img('1559847844-d72106819595'),
  eggBiryani: img('1482049016867-d2e08999a5cd'),
  vegBiryani: img('164282037649-377b07590deb'),
  paneerBiryani: img('1601050660573-496481474c02'),
  garlicNaan: img('1626132647523-66f5bf380027'),
  butterNaan: img('1626132647523-66f5bf380027'),
  paratha: img('1601050660573-496481474c02'),
  rasmalai: img('1630321151526-465f21f1a35a'),
  gulabJamun: img('1587314168485-3236d6710814'),
  riceKheer: img('1571875257737-25611603a35e'),
  strawberryLassi: img('1553530666-ba11a7da3888'),
  mangoLassi: img('1626074357142-4c9d1f4c67d1'),
  hakkaNoodles: img('1585032226651-759b368d7246'),
  bombayNoodles: img('1612929639517-378b33f3e4c0'),
  frenchFries: img('1573080496215-845ca028ee90'),
  chickenNuggets: img('1608039819467-1bb3bb58b633'),
  chickenTenders: img('1562967912-3678210bea37'),
  chickenWings: img('1562967912-3678210bea37'),
  shrimpNuggets: img('1559847844-d72106819595'),
  chickenOverRice: img('1626844131082-256783844137'),
  quesadilla: img('1618040904253-75c31a5fb2da'),
  burrito: img('1628845775950-d3153680de42'),
  cornDog: img('1619741341128-520276f4c315'),
  nachos: img('1513451036272-b1213261eb3a'),
} as const;

export const CATEGORIES: Category[] = [
  {
    id: 'soups',
    name: 'SOUPS',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4859?auto=format&fit=crop&q=80&w=400',
    rating: 4.2,
    isFavorite: false,
    description: 'Hot soups to start your meal.'
  },
  {
    id: 'veg-appetizers',
    name: 'VEG APPETIZERS',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    isFavorite: true,
    description: 'Samosas, pakoras, and veggie starters.'
  },
  {
    id: 'veg-entrees',
    name: 'VEG ENTREES',
    image: palakPaneerImage,
    rating: 4.8,
    isFavorite: false,
    description: 'Paneer dishes, dal, and vegetable curries.'
  },
  {
    id: 'non-veg-appetizers',
    name: 'NON-VEG APPETIZERS',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    isFavorite: true,
    description: 'Chicken 65, chili chicken, momos, and more.'
  },
  {
    id: 'non-veg-entrees',
    name: 'NON-VEG ENTREES',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    isFavorite: true,
    description: 'Butter chicken, tikka masala, and seafood curries.'
  },
  {
    id: 'goat-curry',
    name: 'GOAT CURRY',
    image: laalMaasImage,
    rating: 4.9,
    isFavorite: false,
    description: 'Slow-cooked goat curry, served with rice.'
  },
  {
    id: 'burger-fusions',
    name: 'BURGER FUSIONS',
    image: alooTikkaBurgerImage,
    rating: 4.6,
    isFavorite: true,
    description: 'Indian-style burgers and sandwiches.'
  },
  {
    id: 'hyderabadi-dum-biryani',
    name: 'HYDERABADI DUM BIRYANI',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    isFavorite: true,
    description: 'Fragrant rice with your choice of protein.'
  },
  {
    id: 'breads',
    name: 'BREADS',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    isFavorite: false,
    description: 'Naan, paratha, and rice sides.'
  },
  {
    id: 'desserts',
    name: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    isFavorite: false,
    description: 'Gulab jamun, rasmalai, and kheer.'
  },
  {
    id: 'beverages',
    name: 'BEVERAGES',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    isFavorite: false,
    description: 'Mango and strawberry lassi.'
  },
  {
    id: 'indo-chinese',
    name: 'INDO-CHINESE',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    isFavorite: true,
    description: 'Hakka and Bombay noodles.'
  },
  {
    id: 'kids-menu',
    name: 'KIDS MENU',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    isFavorite: false,
    description: 'Nuggets, fries, and wings for the kids.'
  },
  {
    id: 'indo-mexican',
    name: 'INDO-MEXICAN & INDO-AMERICAN',
    image: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=400',
    rating: 4.4,
    isFavorite: false,
    description: 'Burritos, quesadillas, and chicken over rice.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // SOUPS
  { id: 'soup-1', name: 'Tomato Soup', price: 4.99, description: 'Classic tomato soup.', category: 'soups', image: MENU_IMAGES.tomatoSoup, rating: 4.2 },
  { id: 'soup-2', name: 'Hot and Sour Soup', price: 4.99, description: 'Veg/Chicken/Egg/Shrimp. Add-ons: Chicken, Egg, or Shrimp +$1', category: 'soups', image: MENU_IMAGES.hotSourSoup, rating: 4.5 },
  { id: 'soup-3', name: 'Sweet Corn Soup', price: 4.99, description: 'Veg/Chicken/Egg/Shrimp. Add-ons: Chicken, Egg, or Shrimp +$1', category: 'soups', image: MENU_IMAGES.sweetCornSoup, rating: 4.4 },
  { id: 'soup-4', name: 'Manchow Soup', price: 4.99, description: 'Veg/Chicken/Egg/Shrimp. Add-ons: Chicken, Egg, or Shrimp +$1', category: 'soups', image: MENU_IMAGES.manchowSoup, rating: 4.6 },

  // VEG APPETIZERS
  { id: 'vapp-1', name: 'Veg Samosa (2 pcs)', price: 5.99, description: 'Crispy pastry filled with spiced potatoes.', category: 'veg-appetizers', image: MENU_IMAGES.samosa, rating: 4.7, isPopular: true },
  { id: 'vapp-2', name: 'Veg Spring Rolls (5 pcs)', price: 5.99, description: 'Crispy rolls stuffed with mixed vegetables.', category: 'veg-appetizers', image: MENU_IMAGES.springRolls, rating: 4.5 },
  { id: 'vapp-3', name: 'Veg Pakoda', price: 7.99, description: 'Assorted vegetable fritters.', category: 'veg-appetizers', image: MENU_IMAGES.pakoda, rating: 4.6 },
  { id: 'vapp-4', name: 'Crispy Potato Wedges', price: 4.99, description: 'Perfectly seasoned potato wedges.', category: 'veg-appetizers', image: MENU_IMAGES.potatoWedges, rating: 4.4 },
  { id: 'vapp-5', name: 'Mozzarella Cheese Sticks', price: 5.99, description: 'Fried cheese sticks with marinara.', category: 'veg-appetizers', image: MENU_IMAGES.cheeseSticks, rating: 4.3 },
  { id: 'vapp-6', name: 'Gobi Manchurian', price: 12.99, description: 'Crispy cauliflower in tangy sauce.', category: 'veg-appetizers', image: MENU_IMAGES.gobiManchurian, rating: 4.8, isPopular: true },

  // VEG ENTREES
  { id: 'vent-1', name: 'Dhal Makhani', price: 12.99, description: 'Creamy black lentils slow-cooked to perfection.', category: 'veg-entrees', image: MENU_IMAGES.dalMakhani, rating: 4.7 },
  { id: 'vent-2', name: 'Veg Korma', price: 12.99, description: 'Mixed vegetables in a rich cashew sauce.', category: 'veg-entrees', image: MENU_IMAGES.vegKorma, rating: 4.6 },
  { id: 'vent-3', name: 'Saag Paneer', price: 13.99, description: 'Cottage cheese cubes in creamy spinach sauce.', category: 'veg-entrees', image: MENU_IMAGES.saagPaneer, rating: 4.8, isPopular: true },
  { id: 'vent-4', name: 'Paneer Tikka Masala', price: 13.99, description: 'Paneer cooked in a rich tomato-based gravy.', category: 'veg-entrees', image: MENU_IMAGES.paneerTikkaMasala, rating: 4.9, isPopular: true },
  { id: 'vent-5', name: 'Kadai Paneer', price: 13.99, description: 'Paneer with bell peppers and onions in a spiced wok.', category: 'veg-entrees', image: MENU_IMAGES.kadaiPaneer, rating: 4.7 },
  { id: 'vent-6', name: 'Paneer Butter Masala', price: 13.99, description: 'Paneer in a buttery, creamy tomato sauce.', category: 'veg-entrees', image: MENU_IMAGES.paneerButterMasala, rating: 4.8, isPopular: true },
  { id: 'vent-7', name: 'Channa Masala', price: 12.99, description: 'Spiced chickpea curry.', category: 'veg-entrees', image: MENU_IMAGES.channaMasala, rating: 4.6 },
  { id: 'vent-8', name: 'Aloo Gobi', price: 12.99, description: 'Potato and cauliflower cooked with Indian spices.', category: 'veg-entrees', image: MENU_IMAGES.alooGobi, rating: 4.5 },

  // NON-VEG APPETIZERS
  { id: 'nvapp-1', name: 'Chicken 65 Boneless', price: 12.99, description: 'Spicy, deep-fried chicken appetizer.', category: 'non-veg-appetizers', image: MENU_IMAGES.chicken65, rating: 4.8, isPopular: true },
  { id: 'nvapp-2', name: 'Chilli Chicken', price: 12.99, description: 'Sweet, spicy & slightly sour crispy appetizer.', category: 'non-veg-appetizers', image: MENU_IMAGES.chilliChicken, rating: 4.7 },
  { id: 'nvapp-3', name: 'Chicken Manchurian', price: 12.99, description: 'Fried chicken in tangy Manchurian sauce.', category: 'non-veg-appetizers', image: MENU_IMAGES.chickenManchurian, rating: 4.6 },
  { id: 'nvapp-4', name: 'Drunk’n Fish', price: 16.99, description: 'Signature fish appetizer.', category: 'non-veg-appetizers', image: MENU_IMAGES.friedFish, rating: 4.9, isPopular: true },
  { id: 'nvapp-5', name: 'Kurkuree Momos', price: 12.99, description: 'Extra crispy dumplings.', category: 'non-veg-appetizers', image: MENU_IMAGES.momos, rating: 4.8 },
  { id: 'nvapp-6', name: 'Masala Momos', price: 12.99, description: 'Momos tossed in spicy masala.', category: 'non-veg-appetizers', image: MENU_IMAGES.momos, rating: 4.7 },

  // NON-VEG ENTREES
  { id: 'nvent-1', name: 'Curry Express Special Chicken Curry', price: 14.99, description: 'Our signature house chicken curry.', category: 'non-veg-entrees', image: MENU_IMAGES.chickenCurry, rating: 4.9, isPopular: true },
  { id: 'nvent-2', name: 'Murg Saagwala', price: 14.99, description: 'Chicken cooked with fresh spinach.', category: 'non-veg-entrees', image: MENU_IMAGES.chickenSaag, rating: 4.7 },
  { id: 'nvent-3', name: 'Kadai Chicken', price: 14.99, description: 'Chicken wok-tossed with bell peppers and onions.', category: 'non-veg-entrees', image: MENU_IMAGES.kadaiChicken, rating: 4.8 },
  { id: 'nvent-4', name: 'Butter Chicken', price: 14.99, description: 'Creamy tomato butter sauce with tender chicken.', category: 'non-veg-entrees', image: MENU_IMAGES.butterChicken, rating: 4.9, isPopular: true },
  { id: 'nvent-5', name: 'Chicken Tikka Masala', price: 14.99, description: 'Roasted chicken chunks in spicy sauce.', category: 'non-veg-entrees', image: MENU_IMAGES.chickenTikkaMasala, rating: 4.9, isPopular: true },
  { id: 'nvent-6', name: 'Chicken Vindaloo', price: 14.99, description: 'Fiery chicken curry with potatoes.', category: 'non-veg-entrees', image: MENU_IMAGES.chickenVindaloo, rating: 4.7 },
  { id: 'nvent-7', name: 'Chicken Korma', price: 14.99, description: 'Mild and creamy chicken curry.', category: 'non-veg-entrees', image: MENU_IMAGES.chickenKorma, rating: 4.8 },
  { id: 'nvent-8', name: 'Madras Chicken', price: 14.99, description: 'Spicy chicken curry from South India.', category: 'non-veg-entrees', image: MENU_IMAGES.madrasChicken, rating: 4.6 },
  { id: 'nvent-9', name: 'Chicken Chettinadu', price: 14.99, description: 'Highly spiced chicken curry.', category: 'non-veg-entrees', image: MENU_IMAGES.chettinadChicken, rating: 4.8 },
  { id: 'nvent-10', name: 'Goan Fish Curry', price: 15.99, description: 'Tangy and spicy coastal fish curry.', category: 'non-veg-entrees', image: MENU_IMAGES.goanFishCurry, rating: 4.7 },
  { id: 'nvent-11', name: 'Coastal Fish Curry', price: 15.99, description: 'Rich fish curry with coconut milk.', category: 'non-veg-entrees', image: MENU_IMAGES.coastalFishCurry, rating: 4.8 },
  { id: 'nvent-12', name: 'Coastal Shrimp Curry', price: 16.99, description: 'Flavorful shrimp cooked in coastal spices.', category: 'non-veg-entrees', image: MENU_IMAGES.shrimpCurry, rating: 4.9, isPopular: true },
  { id: 'nvent-13', name: 'Shrimp Vindaloo', price: 16.99, description: 'Spicy and tangy shrimp curry.', category: 'non-veg-entrees', image: MENU_IMAGES.shrimpVindaloo, rating: 4.8 },

  // GOAT CURRY
  { id: 'goat-1', name: 'Goat Curry', price: 16.99, description: 'Traditional homestyle goat curry.', category: 'goat-curry', image: MENU_IMAGES.goatCurry, rating: 4.8 },
  { id: 'goat-2', name: 'Goat Korma', price: 16.99, description: 'Rich and creamy goat curry.', category: 'goat-curry', image: MENU_IMAGES.goatKorma, rating: 4.7 },
  { id: 'goat-3', name: 'Kadai Goat', price: 16.99, description: 'Goat meat cooked with bell peppers and onions.', category: 'goat-curry', image: MENU_IMAGES.kadaiGoat, rating: 4.8 },
  { id: 'goat-4', name: 'Goat Vindaloo', price: 16.99, description: 'Fiery and tangy goat curry.', category: 'goat-curry', image: MENU_IMAGES.goatVindaloo, rating: 4.7 },
  { id: 'goat-5', name: 'Goat Tikka Masala', price: 16.99, description: 'Goat chunks in a spiced tomato sauce.', category: 'goat-curry', image: MENU_IMAGES.goatTikkaMasala, rating: 4.9, isPopular: true },
  { id: 'goat-6', name: 'Madras Goat', price: 16.99, description: 'Spicy South Indian style goat curry.', category: 'goat-curry', image: MENU_IMAGES.madrasGoat, rating: 4.8 },
  { id: 'goat-7', name: 'Mutton Rogan Josh', price: 16.99, description: 'Aromatic Kashmiri goat curry.', category: 'goat-curry', image: MENU_IMAGES.roganJosh, rating: 4.9, isPopular: true },

  // BURGER FUSIONS
  { id: 'burg-1', name: 'Half Pound Cheese Burger (B/C)', price: 12.99, description: 'Juicy half-pound burger with cheese.', category: 'burger-fusions', image: MENU_IMAGES.cheeseBurger, rating: 4.7 },
  { id: 'burg-2', name: 'Curry Express Special Burger (B/C)', price: 12.99, description: 'Our signature spiced fusion burger.', category: 'burger-fusions', image: MENU_IMAGES.specialBurger, rating: 4.9, isPopular: true },
  { id: 'burg-3', name: 'BBQ Cheese Burger (B/C)', price: 12.99, description: 'Classic BBQ flavor with Indian twist.', category: 'burger-fusions', image: MENU_IMAGES.bbqBurger, rating: 4.6 },
  { id: 'burg-4', name: 'Crispy Chicken Sandwich', price: 12.99, description: 'Extra crispy chicken with house sauces.', category: 'burger-fusions', image: MENU_IMAGES.chickenSandwich, rating: 4.8 },

  // HYDERABADI DUM BIRYANI
  { id: 'biry-1', name: 'Chicken Biryani', price: 14.99, description: 'Classic Hyderabadi chicken dum biryani.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.chickenBiryani, rating: 4.9, isPopular: true },
  { id: 'biry-2', name: 'Chicken Gilma Biryani', price: 15.99, description: 'Specialty spiced chicken biryani.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.gilmaBiryani, rating: 4.8 },
  { id: 'biry-3', name: 'Goat Biryani', price: 15.99, description: 'Tender goat meat slow-cooked with basmati.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.goatBiryani, rating: 4.9, isPopular: true },
  { id: 'biry-4', name: 'Shrimp Biryani', price: 15.99, description: 'Aromatic basmati rice with spiced shrimp.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.shrimpBiryani, rating: 4.8 },
  { id: 'biry-5', name: 'Egg Biryani', price: 12.99, description: 'Fragrant biryani with boiled eggs.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.eggBiryani, rating: 4.5 },
  { id: 'biry-6', name: 'Veg Biryani', price: 12.99, description: 'Mixed vegetables and paneer biryani.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.vegBiryani, rating: 4.6 },
  { id: 'biry-7', name: 'Paneer Biryani', price: 13.99, description: 'Basmati rice cooked with paneer chunks.', category: 'hyderabadi-dum-biryani', image: MENU_IMAGES.paneerBiryani, rating: 4.7 },

  // BREADS
  { id: 'bread-1', name: 'Garlic Naan', price: 3.00, description: 'Freshly baked naan with garlic and cilantro.', category: 'breads', image: MENU_IMAGES.garlicNaan, rating: 4.9, isPopular: true },
  { id: 'bread-2', name: 'Butter Naan', price: 2.50, description: 'Classic buttery naan bread.', category: 'breads', image: MENU_IMAGES.butterNaan, rating: 4.8 },
  { id: 'bread-3', name: 'Malabar Paratha', price: 2.00, description: 'Flaky and layered South Indian flatbread.', category: 'breads', image: MENU_IMAGES.paratha, rating: 4.7 },

  // DESSERTS
  { id: 'dess-1', name: 'Rasamalai', price: 5.99, description: 'Soft cheese patties in sweetened milk.', category: 'desserts', image: MENU_IMAGES.rasmalai, rating: 4.8, isPopular: true },
  { id: 'dess-2', name: 'Gulab Jamun', price: 5.99, description: 'Deep fried dough balls in sugar syrup.', category: 'desserts', image: MENU_IMAGES.gulabJamun, rating: 4.9, isPopular: true },
  { id: 'dess-3', name: 'Rice Kheer', price: 4.99, description: 'Traditional Indian rice pudding.', category: 'desserts', image: MENU_IMAGES.riceKheer, rating: 4.6 },

  // BEVERAGES
  { id: 'bev-1', name: 'Strawberry Lassi', price: 4.99, description: 'Refreshing yogurt drink with strawberries.', category: 'beverages', image: MENU_IMAGES.strawberryLassi, rating: 4.7 },
  { id: 'bev-2', name: 'Mango Lassi', price: 4.99, description: 'Classic sweet mango yogurt drink.', category: 'beverages', image: MENU_IMAGES.mangoLassi, rating: 4.9, isPopular: true },

  // INDO-CHINESE
  { id: 'chi-1', name: 'Hakka Noodles', price: 12.99, description: 'Veg/Chicken/Egg/Shrimp/Paneer/Mix. Add-ons +$2', category: 'indo-chinese', image: MENU_IMAGES.hakkaNoodles, rating: 4.8, isPopular: true },
  { id: 'chi-2', name: 'Bombay Noodles', price: 12.99, description: 'Veg/Chicken/Egg/Shrimp/Paneer/Mix. Add-ons +$2', category: 'indo-chinese', image: MENU_IMAGES.bombayNoodles, rating: 4.7 },

  // KIDS MENU
  { id: 'kids-1', name: 'French Fries', price: 3.99, description: 'Crispy classic fries.', category: 'kids-menu', image: MENU_IMAGES.frenchFries, rating: 4.5 },
  { id: 'kids-2', name: 'Chicken Nuggets (5 pcs)', price: 4.99, description: 'With choice of dipping sauce.', category: 'kids-menu', image: MENU_IMAGES.chickenNuggets, rating: 4.6 },
  { id: 'kids-3', name: 'Chicken Tenders', price: 6.99, description: 'Crispy tender strips.', category: 'kids-menu', image: MENU_IMAGES.chickenTenders, rating: 4.7 },
  { id: 'kids-4', name: 'Chicken Wings', price: 6.99, description: 'Tossed in BBQ, Hot Sauce, Mango Habanero, or Bourbon Teriyaki.', category: 'kids-menu', image: MENU_IMAGES.chickenWings, rating: 4.8 },
  { id: 'kids-5', name: 'Shrimp Nuggets', price: 6.99, description: 'Crispy shrimp bites.', category: 'kids-menu', image: MENU_IMAGES.shrimpNuggets, rating: 4.6 },

  // INDO-MEXICAN & INDO-AMERICAN
  { id: 'mex-1', name: 'Chicken Over Rice', price: 12.99, description: 'Halal cart style chicken over spiced rice.', category: 'indo-mexican', image: MENU_IMAGES.chickenOverRice, rating: 4.8, isPopular: true },
  { id: 'mex-2', name: 'Quesadilla', price: 6.99, description: 'Spiced Indian filling in a toasted tortilla.', category: 'indo-mexican', image: MENU_IMAGES.quesadilla, rating: 4.6 },
  { id: 'mex-3', name: 'Burrito', price: 3.99, description: 'Fusion wrap loaded with flavors.', category: 'indo-mexican', image: MENU_IMAGES.burrito, rating: 4.5 },
  { id: 'mex-4', name: 'Corn Dog', price: 6.99, description: 'Crispy batter-fried corn dog.', category: 'indo-mexican', image: MENU_IMAGES.cornDog, rating: 4.4 },
  { id: 'mex-5', name: 'Nachos', price: 3.99, description: 'Loaded fusion nachos.', category: 'indo-mexican', image: MENU_IMAGES.nachos, rating: 4.7 }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev1',
    name: 'Sarah M.',
    email: 'sarah@example.com',
    comment: 'Best gobi manchurian around here. Crispy and not too greasy — we order it every time.',
    rating: 5,
    date: '2 days ago',
    reviewImage: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'rev2',
    name: 'James T.',
    email: 'james@example.com',
    comment: 'Stopped in on Walden Rd after work. The aloo tikka burger was surprisingly good.',
    rating: 5,
    date: '1 week ago',
    reviewImage: alooTikkaBurgerImage,
  },
  {
    id: 'rev3',
    name: 'Priya R.',
    email: 'priya@example.com',
    comment: 'Chicken biryani tastes like home. My kids love the mango lassi too.',
    rating: 5,
    date: '2 weeks ago',
    reviewImage: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'rev4',
    name: 'David L.',
    email: 'david@example.com',
    comment: 'Solid butter chicken and fresh garlic naan. Friendly staff, quick pickup.',
    rating: 4,
    date: '3 weeks ago',
    reviewImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=500',
  },
];
