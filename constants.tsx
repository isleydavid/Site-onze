
import { Heart, Watch, Gem, ShoppingBag } from 'lucide-react';
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'aliancas', name: 'Alianças', icon: '💍' },
  { id: 'aneis', name: 'Anéis', icon: '💎' },
  { id: 'brincos', name: 'Brincos', icon: '✨' },
  { id: 'pingentes', name: 'Pingentes', icon: '💝' },
  { id: 'pulseiras', name: 'Pulseiras', icon: '⛓️' },
  { id: 'colares', name: 'Colares', icon: '📿' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aliança Ouro 18K Tradicional 4mm',
    price: 1890,
    oldPrice: 2200,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543062234-a698a391500d?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'aliancas',
    description: 'Nossa aliança tradicional em ouro 18k possui acabamento polido e conforto anatômico.',
    material: 'Ouro 18K',
    width: '4mm',
    shape: 'Arredondada',
    rating: 4.9,
    badge: '10% OFF',
    stock: 12
  },
  {
    id: '2',
    name: 'Aliança Quadrada Diamond Ouro 10K',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1603561591411-071c4f713932?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1603561591411-071c4f713932?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'aliancas',
    description: 'Design moderno e sofisticado com bordas quadradas e brilho intenso.',
    material: 'Ouro 10K',
    width: '6mm',
    shape: 'Quadrada',
    rating: 4.8,
    badge: 'LANÇAMENTO',
    stock: 8
  },
  {
    id: '3',
    name: 'Anel de Noivado Solitaire 1111',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1627252824844-01b18124b48a?q=80&w=600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1627252824844-01b18124b48a?q=80&w=600&auto=format&fit=crop',
    ],
    category: 'aneis',
    description: 'O clássico solitário elevado com o selo de qualidade 1111 Joias.',
    material: 'Ouro 18K',
    width: '2mm',
    shape: 'Anatômica',
    rating: 5.0,
    badge: 'MAIS VENDIDO',
    stock: 15
  }
];

export const WHATSAPP_NUMBER = "5511999999999";
