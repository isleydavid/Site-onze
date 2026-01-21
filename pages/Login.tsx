
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, ChevronLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isLogin ? 'Cliente VIP' : name);
    navigate('/perfil');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
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
            {isLogin ? 'Bem-vindo de volta' : 'Criar sua conta'}
          </h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">
            {isLogin ? 'Acesse seu histórico de joias' : 'Faça parte da nossa história'}
          </p>
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

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest hover:text-brand-gold">Esqueci minha senha</button>
            </div>
          )}

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
