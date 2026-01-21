
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const { setIsSidebarOpen } = useUI();

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Topbar Informativa - Ajustada para mobile */}
      <div className="bg-brand-graphite text-white text-[9px] lg:text-[10px] py-2 px-4 text-center font-bold tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden">
        Frete Grátis acima de R$ 499 para todo o Brasil
      </div>
      
      <div className="border-b border-neutral-100 px-4 lg:px-8 py-3 lg:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Menu & Search (Esquerda no Desktop) */}
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 text-brand-graphite hover:text-brand-gold transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center bg-neutral-100 rounded-full px-4 py-2 w-64 group focus-within:ring-1 ring-brand-gold transition-all">
              <Search className="w-4 h-4 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Buscar joias..." 
                className="bg-transparent border-none outline-none text-xs ml-2 w-full text-brand-graphite"
                onFocus={() => navigate('/busca')}
              />
            </div>
            <button onClick={() => navigate('/busca')} className="lg:hidden p-1 text-brand-graphite">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo Centralizado */}
          <Link to="/" className="flex flex-col items-center flex-1">
            <div className="flex items-baseline font-serif text-xl lg:text-3xl font-bold tracking-tighter">
              <span className="text-brand-graphite">11</span>
              <span className="text-brand-gold">11</span>
            </div>
            <span className="text-[6px] lg:text-[8px] tracking-[0.4em] uppercase text-brand-gold-dark -mt-1 font-bold">Joias</span>
          </Link>

          {/* Icons (Direita) */}
          <div className="flex items-center justify-end gap-1.5 lg:gap-5 flex-1">
            <button 
              onClick={() => navigate(isAuthenticated ? '/perfil' : '/login')}
              className="p-1 text-brand-graphite hover:text-brand-gold transition-colors relative"
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand-gold rounded-full ring-2 ring-white"></span>
              )}
            </button>
            <button className="hidden lg:block p-1 text-brand-graphite hover:text-brand-gold transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-brand-graphite relative hover:text-brand-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
