
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, ChevronLeft, ShieldCheck, UserCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = (role: 'admin' | 'client') => {
    if (role === 'admin') {
      login('admin@1111joias.com.br', 'Administrador Master', true);
      navigate('/admin');
    } else {
      login('cliente@email.com', 'Cliente VIP', false);
      navigate('/perfil');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por padrão, o formulário manual loga como cliente
    login(email, isLogin ? 'Cliente VIP' : name, false);
    navigate('/perfil');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-neutral-50/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 lg:p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm"
      >
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-400 mb-8 hover:text-brand-gold transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Voltar</span>
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-brand-graphite mb-2 uppercase tracking-wider">
            {isLogin ? 'Identifique-se' : 'Criar sua conta'}
          </h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">
            {isLogin ? 'Escolha como deseja acessar a plataforma' : 'Faça parte da nossa história'}
          </p>
        </div>

        {/* Botões de Acesso Rápido - Conforme solicitado */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button 
            onClick={() => handleQuickLogin('client')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-neutral-50 hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all group"
          >
            <UserCircle className="w-6 h-6 text-neutral-400 group-hover:text-brand-gold" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Acesso Cliente</span>
          </button>
          <button 
            onClick={() => handleQuickLogin('admin')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-neutral-50 hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all group"
          >
            <ShieldCheck className="w-6 h-6 text-neutral-400 group-hover:text-brand-gold" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Acesso Admin</span>
          </button>
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100"></div>
          </div>
          <div className="relative flex justify-center text-[8px] uppercase font-bold tracking-[0.4em] text-neutral-300">
            <span className="bg-white px-4">Ou use seu e-mail</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="Seu nome completo" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300">
              <Mail className="w-4 h-4" />
            </div>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300">
              <Lock className="w-4 h-4" />
            </div>
            <input 
              type="password" 
              placeholder="Sua senha" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-graphite text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all uppercase text-[11px] tracking-[0.3em] shadow-xl mt-4"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-neutral-50 text-center">
          <p className="text-xs text-neutral-400 mb-4">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-bold text-brand-gold uppercase tracking-widest border-b-2 border-brand-gold pb-1"
          >
            {isLogin ? 'Criar minha conta agora' : 'Fazer login agora'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
