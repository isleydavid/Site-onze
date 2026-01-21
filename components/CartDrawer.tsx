
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h2 className="font-serif text-lg font-bold text-brand-graphite uppercase tracking-widest">Seu Carrinho</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-brand-graphite" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-neutral-300" />
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">Seu carrinho está vazio.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-brand-gold font-bold text-xs uppercase tracking-widest border-b border-brand-gold"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-[11px] font-bold text-brand-graphite uppercase tracking-wider line-clamp-1">{item.name}</h3>
                        {item.selection && (
                          <div className="mt-1 space-y-0.5">
                            <p className="text-[9px] text-neutral-400 uppercase font-bold tracking-tighter">Aros: {item.selection.aro1} e {item.selection.aro2}</p>
                            {!item.selection.noEngraving1 && (
                              <p className="text-[9px] text-brand-gold italic">Grav. 1: {item.selection.engraving1}</p>
                            )}
                          </div>
                        )}
                        <p className="mt-1 text-xs font-bold text-brand-graphite">
                          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg h-8">
                          <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="px-2 text-neutral-400 hover:text-brand-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-bold text-brand-graphite">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="px-2 text-neutral-400 hover:text-brand-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Estimado</span>
                  <span className="text-xl font-bold text-brand-graphite font-serif">
                    {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-graphite text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-brand-graphite/10 uppercase text-[11px] tracking-[0.3em]"
                >
                  Finalizar Pedido <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center mt-4 text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
                  Frete e descontos calculados no checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
