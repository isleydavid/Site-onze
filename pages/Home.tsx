
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, PenTool, MessageCircle, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, WHATSAPP_NUMBER } from '../constants';
import { useProducts } from '../context/ProductContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de escolher uma joia especial.`, '_blank');
  };

  return (
    <div className="pb-10 bg-white">
      {/* Hero Banner Principal */}
      <section className="relative w-full overflow-hidden h-[80vh] lg:h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1596944210900-247cb8820f7f?q=80&w=2000&auto=format&fit=crop"
          alt="Joias criadas para fazer parte da sua história"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent lg:from-black/30 lg:via-transparent lg:to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 lg:px-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4 lg:mb-6"
            >
              <div className="w-6 lg:w-8 h-px bg-brand-gold"></div>
              <span className="text-brand-gold-light text-[9px] lg:text-xs font-bold tracking-[0.4em] uppercase">1111 Joias Exclusivas</span>
            </motion.div>
            
            <h1 className="text-white font-serif text-3xl lg:text-6xl mb-4 lg:mb-6 leading-[1.1] uppercase tracking-wider logo-text-shadow">
              Joias criadas para <br/>
              fazer parte da <br/>
              <span className="text-brand-gold italic">sua história</span>
            </h1>
            
            <p className="text-white font-light text-xs lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-xs lg:max-w-md drop-shadow-sm">
              A gente acredita que uma joia não é só um acessório. 
              Ela marca momentos e acompanha quem você é.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-5 w-full sm:w-auto">
              <button
                onClick={() => navigate('/categoria/aliancas')}
                className="bg-brand-gold text-white font-bold px-8 lg:px-10 py-4 lg:py-5 rounded-full text-[10px] lg:text-[11px] uppercase tracking-[0.2em] hover:bg-brand-gold-dark hover:scale-105 transition-all shadow-xl shadow-brand-gold/20"
              >
                Conhecer Alianças
              </button>
              <button
                onClick={() => navigate('/categoria/todos')}
                className="bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold px-8 lg:px-10 py-4 lg:py-5 rounded-full text-[10px] lg:text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-brand-graphite transition-all"
              >
                Ver Joias
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
          <span className="text-white/60 text-[9px] uppercase tracking-[0.5em] font-bold">Scroll para explorar</span>
        </div>
      </section>

      {/* Categorias Circulares */}
      <section className="py-10 lg:py-16 px-4">
        <div className="flex gap-4 lg:gap-14 overflow-x-auto no-scrollbar justify-start lg:justify-center pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categoria/${cat.id}`)}
              className="flex-shrink-0 flex flex-col items-center group"
            >
              <div className="w-16 h-16 lg:w-32 lg:h-32 rounded-full overflow-hidden border border-neutral-100 p-0.5 group-hover:border-brand-gold group-hover:rotate-6 transition-all duration-500 shadow-sm">
                <div className="w-full h-full rounded-full bg-neutral-50 flex items-center justify-center text-2xl lg:text-4xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
              </div>
              <span className="text-[9px] lg:text-xs font-bold uppercase tracking-[0.2em] text-brand-graphite mt-3 group-hover:text-brand-gold transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Seção ALIANÇAS - Imagem removida e conteúdo centralizado */}
      <section className="py-12 lg:py-24 bg-neutral-50 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5 lg:space-y-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 lg:w-12 h-px bg-brand-gold"></div>
            <span className="text-brand-gold text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.4em]">Símbolo de Compromisso</span>
            <div className="w-8 lg:w-12 h-px bg-brand-gold"></div>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif text-brand-graphite leading-tight">
            Alianças que representam <span className="text-brand-gold">escolhas reais</span>
          </h2>
          <p className="text-neutral-500 text-sm lg:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Alianças não precisam ser complicadas para serem especiais. Elas precisam ter significado. Criamos modelos que unem design e conforto — para casais que valorizam o agora.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 lg:gap-4 pt-4">
            <button 
              onClick={() => navigate('/categoria/aliancas')}
              className="bg-brand-graphite text-white font-bold px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-black transition-all"
            >
              Escolher minha aliança
            </button>
            <button 
              onClick={handleWhatsApp}
              className="border border-brand-gold text-brand-gold font-bold px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all"
            >
              Personalizar agora
            </button>
          </div>
        </div>
      </section>

      {/* Vitrine Favoritos Dinâmica */}
      <section className="py-12 lg:py-20 overflow-hidden">
        <div className="px-6 mb-8 lg:mb-12 flex flex-col items-center text-center">
          <Sparkles className="w-5 h-5 text-brand-gold mb-3" />
          <h2 className="text-2xl lg:text-3xl font-serif text-brand-graphite uppercase tracking-widest">Favoritos</h2>
          <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.3em] mt-2">Mais amados da comunidade</p>
        </div>
        <div className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar px-6 pb-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Benefits */}
      <section className="py-12 lg:py-24 bg-brand-graphite text-white mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 px-6">
          <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gold" />
            </div>
            <h4 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.3em]">Envio Seguro</h4>
            <p className="text-[8px] lg:text-[10px] text-white/50 leading-tight">Seguro total em cada entrega.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gold" />
            </div>
            <h4 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.3em]">Garantia</h4>
            <p className="text-[8px] lg:text-[10px] text-white/50 leading-tight">Ouro 18K com certificado.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gold" />
            </div>
            <h4 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.3em]">1ª Troca Grátis</h4>
            <p className="text-[8px] lg:text-[10px] text-white/50 leading-tight">Sem custos na primeira vez.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <PenTool className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gold" />
            </div>
            <h4 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.3em]">Gravação</h4>
            <p className="text-[8px] lg:text-[10px] text-white/50 leading-tight">Personalize nomes e datas.</p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 lg:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all"
      >
        <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>
    </div>
  );
};

export default Home;
