
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="flex-shrink-0 w-[170px] md:w-[240px] bg-white group">
      <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden bg-neutral-50 rounded-2xl border border-neutral-100">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-brand-gold text-white text-[9px] font-bold px-2 py-1 rounded shadow-sm">
            {product.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-brand-graphite hover:text-red-500 transition-all shadow-sm">
          <Heart className="w-3.5 h-3.5" />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white/90 backdrop-blur-md text-brand-graphite text-[10px] font-bold py-2 rounded-lg shadow-lg flex items-center justify-center gap-1">
            <ShoppingBag className="w-3 h-3" /> VER DETALHES
          </button>
        </div>
      </Link>
      
      <div className="mt-4 text-center">
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-[10px] font-bold text-brand-graphite line-clamp-2 leading-relaxed uppercase tracking-wider px-2 h-8">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-col items-center">
          <span className="text-sm font-bold text-deep-black">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-[9px] text-green-600 font-bold">
            10x de {(product.price / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
