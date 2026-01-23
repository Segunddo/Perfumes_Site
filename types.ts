
export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  category: string;
  rating: number;
  reviews?: number;
  tag?: string;
  img: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedDetail?: string;
}

export interface Category {
  title: string;
  count: string;
  img: string;
  icon: string;
}
