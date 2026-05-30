export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  rating: number;
  isFavorite?: boolean;
  description?: string;
}

export interface CartItem {
  id: string; // unique cart item ID (combines item.id + spiceLevel)
  item: MenuItem;
  quantity: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  date: string;
  timeAgo?: string;
  reviewImage?: string;
}
