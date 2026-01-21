
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  description: string;
  material: string;
  width: string;
  shape: string;
  rating: number;
  badge?: string;
  stock: number; // Novo campo para controle de estoque
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SelectionState {
  aro1: string;
  aro2: string;
  engraving1: string;
  engraving2: string;
  noEngraving1: boolean;
  noEngraving2: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selection?: SelectionState;
}
