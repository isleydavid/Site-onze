
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS as INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'gallery'>) => void;
  updateStock: (productId: string, newStock: number) => void;
  deleteProduct: (productId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('1111-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Inicializa com os mocks se não houver nada no storage
      const productsWithStock = INITIAL_PRODUCTS.map(p => ({ ...p, stock: p.stock || 10 }));
      setProducts(productsWithStock);
      localStorage.setItem('1111-products', JSON.stringify(productsWithStock));
    }
  }, []);

  const saveAndSet = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('1111-products', JSON.stringify(newProducts));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'gallery'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      rating: 5.0,
      gallery: [productData.image],
    };
    saveAndSet([newProduct, ...products]);
  };

  const updateStock = (productId: string, newStock: number) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p
    );
    saveAndSet(updated);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveAndSet(updated);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateStock, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
