
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, ShieldCheck, Heart, User, MapPin, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  // Agora utiliza a propriedade isAdmin definida no login
  const isAdmin = user.isAdmin;

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      <div className="bg-white border-b border-neutral-100 py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-3xl font-serif border-2 border-brand-gold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-serif text-brand-graphite mb-1">{user.name}</h1>
            <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-bold">{user.email}</p>
          </div>
          <div className="flex flex-col gap-3">
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:text-brand-gold-dark transition-colors border border-brand-gold/20 px-4 py-2 rounded-lg bg-brand-gold/5"
              >
                <Settings className="w-4 h-4" /> Painel Admin
              </button>
            )}
            <button 
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors px-4 py-2"
            >
              <LogOut className="w-4 h-4" /> Sair da conta
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Favoritos', icon: <Heart className="w-5 h-5" />, value: '04' },
            { label: 'Pedidos', icon: <Package className="w-5 h-5" />, value: '02' },
            { label: 'Endereços', icon: <MapPin className="w-5 h-5" />, value: '01' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-brand-gold">{stat.icon}</div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <span className="text-xl font-serif font-bold text-brand-graphite">{stat.value}</span>
            </div>
          ))}
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-brand-graphite uppercase tracking-[0.3em]">Meu Histórico</h2>
            <div className="h-px bg-neutral-200 flex-1"></div>
          </div>

          <div className="space-y-4">
            {user.history.map((order) => (
              <motion.div 
                key={order.id}
                whileHover={{ y: -2 }}
                className="bg-white p-6 lg:p-8 rounded-[2rem] border border-neutral-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center">
                    <Package className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-brand-graphite uppercase tracking-widest mb-1">Pedido #{order.id}</h3>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-50">
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Entregue' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-brand-gold/5 text-brand-gold border border-brand-gold/10'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-bold text-brand-graphite">{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="mt-12 bg-brand-graphite rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-serif mb-1">Garantia Eterna</h3>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Suas joias protegidas para sempre</p>
            </div>
          </div>
          <button className="bg-brand-gold text-white font-bold px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-brand-gold-dark transition-all">
            Ver Certificados
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
