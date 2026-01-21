
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Home, 
  ShoppingBag, 
  User, 
  Settings, 
  ChevronRight, 
  Instagram, 
  MessageCircle,
  Gem,
  Sparkles,
  PlusCircle,
  Layers
} from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../constants';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useUI();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Agora utiliza a propriedade isAdmin definida no login
  const isAdmin = user?.isAdmin;

  const closeAndNavigate = (path: string) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-brand-graphite/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-[300px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header do Sidebar */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-baseline font-serif text-2xl font-bold tracking-tighter">
                <span className="text-brand-graphite">11</span>
                <span className="text-brand-gold">11</span>
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-brand-graphite" />
              </button>
            </div>

            {/* Links de Navegação */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-6">
              <div className="px-6 mb-8">
                <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.3em] mb-4">Navegação</p>
                <div className="space-y-1">
                  <button 
                    onClick={() => closeAndNavigate('/')}
                    className="w-full flex items-center gap-4 py-3 text-brand-graphite hover:text-brand-gold transition-colors group"
                  >
                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Início</span>
                  </button>
                  <button 
                    onClick={() => closeAndNavigate('/categoria/todos')}
                    className="w-full flex items-center gap-4 py-3 text-brand-graphite hover:text-brand-gold transition-colors group"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Coleção Completa</span>
                  </button>
                </div>
              </div>

              <div className="px-6 mb-8">
                <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.3em] mb-4">Categorias</p>
                <div className="grid grid-cols-1 gap-1">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => closeAndNavigate(`/categoria/${cat.id}`)}
                      className="w-full flex items-center justify-between py-3 text-brand-graphite hover:text-brand-gold transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-widest">{cat.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Seção Admin Condicional */}
              {isAdmin && (
                <div className="px-6 pt-6 border-t border-neutral-100 bg-neutral-50/50 pb-6">
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Settings className="w-3 h-3" /> Área Administrativa
                  </p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => closeAndNavigate('/admin')}
                      className="w-full flex items-center gap-4 py-3 text-brand-graphite hover:text-brand-gold transition-colors group px-2 rounded-lg hover:bg-white"
                    >
                      <Layers className="w-4 h-4 text-brand-gold" />
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest">Gestão de Catálogo</p>
                        <p className="text-[8px] uppercase tracking-tighter opacity-60">Visualizar Joias Criadas</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => closeAndNavigate('/admin')}
                      className="w-full flex items-center gap-4 py-3 text-brand-graphite hover:text-brand-gold transition-colors group px-2 rounded-lg hover:bg-white"
                    >
                      <PlusCircle className="w-4 h-4 text-brand-gold" />
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest">Cadastro de Itens</p>
                        <p className="text-[8px] uppercase tracking-tighter opacity-60">Adicionar Novos Itens</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="px-6 pt-6 border-t border-neutral-50">
                <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.3em] mb-4">Minha Conta</p>
                <div className="space-y-1">
                  <button 
                    onClick={() => closeAndNavigate(isAuthenticated ? '/perfil' : '/login')}
                    className="w-full flex items-center gap-4 py-3 text-brand-graphite hover:text-brand-gold transition-colors group"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {isAuthenticated ? 'Meu Perfil' : 'Entrar / Cadastrar'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer do Sidebar */}
            <div className="p-8 bg-neutral-50 space-y-6">
              <div className="flex justify-center gap-6">
                <a href="#" className="p-3 bg-white rounded-full text-brand-graphite hover:text-brand-gold transition-all shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-white rounded-full text-brand-graphite hover:text-brand-gold transition-all shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.3em]">1111 Joias Exclusivas</p>
                <p className="text-[8px] text-neutral-300 mt-1 uppercase tracking-widest">João Pessoa, Paraíba</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
