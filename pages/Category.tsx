
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';

const CATEGORY_COPIES: Record<string, { title: string, subtitle: string, desc: string }> = {
  'aliancas': {
    title: 'Alianças que representam escolhas reais',
    subtitle: 'Alianças não precisam ser complicadas para serem especiais. Elas precisam ter significado.',
    desc: 'Criamos modelos que unem design, conforto e personalidade — para casais que valorizam o agora, o caminho e tudo que ainda vem pela frente. Aqui, cada aliança é um símbolo de compromisso feito do seu jeito.'
  },
  'colares': {
    title: 'Peças que falam sem dizer uma palavra',
    subtitle: 'Correntes e colares são mais do que estilo — são identidade.',
    desc: 'Do discreto ao marcante, nossas peças foram pensadas para combinar com diferentes momentos, looks e personalidades. Sozinhas ou em composição, elas carregam presença e significado.'
  },
  'brincos': {
    title: 'Delicadeza que se impõe',
    subtitle: 'Joias femininas feitas para acompanhar sua rotina, suas fases e suas escolhas.',
    desc: 'Leves, elegantes e cheias de personalidade, são peças que completam o visual sem tirar sua essência — porque quem brilha é você.'
  },
  'pulseiras': {
    title: 'Detalhes que fazem a diferença',
    subtitle: 'Pulseiras são aquele toque final que transforma tudo.',
    desc: 'Criamos modelos versáteis, confortáveis e cheios de estilo — para usar todos os dias ou em ocasiões especiais. Sozinhas ou combinadas, elas acompanham seu ritmo.'
  }
};

const Category: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('relevancia');

  const filteredProducts = id === 'todos' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === id);

  const categoryName = id === 'todos' 
    ? 'Todas as Joias' 
    : (CATEGORIES.find(c => c.id === id)?.name || 'Joias');

  const copy = CATEGORY_COPIES[id || ''] || {
    title: categoryName,
    subtitle: 'Exclusividade em cada detalhe.',
    desc: 'Curadoria de joias exclusivas da 1111 para marcar seus melhores momentos.'
  };

  return (
    <div className="pb-20 min-h-screen bg-white">
      {/* Category Header with Enhanced Copy */}
      <div className="px-6 py-16 lg:py-24 border-b border-neutral-100 bg-neutral-50/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-6 h-6 text-brand-gold animate-pulse" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif text-brand-graphite leading-tight">{copy.title}</h1>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
          <p className="text-lg text-brand-gold font-medium uppercase tracking-[0.2em]">{copy.subtitle}</p>
          <p className="text-sm lg:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            {copy.desc}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-neutral-100 shadow-sm">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-[11px] font-bold text-brand-graphite uppercase tracking-widest hover:text-brand-gold transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>
          <span className="hidden lg:block text-[10px] text-neutral-300 font-bold uppercase tracking-widest">
            {filteredProducts.length} itens encontrados
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-graphite uppercase tracking-widest group cursor-pointer hover:text-brand-gold transition-colors">
          <span>Ordenar por: {sortBy}</span>
          <ChevronDown className="w-4 h-4 text-brand-gold group-hover:translate-y-1 transition-transform" />
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6 max-w-7xl mx-auto">
        {filteredProducts.map(product => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">✨</div>
          <h3 className="text-2xl font-serif mb-4 text-brand-graphite uppercase tracking-widest">Novidades em breve</h3>
          <p className="text-sm text-neutral-400 mb-10 max-w-xs leading-relaxed uppercase tracking-widest">Estamos preparando joias exclusivas para esta categoria. Que tal explorar nossas alianças?</p>
          <button 
            onClick={() => navigate('/categoria/aliancas')}
            className="bg-brand-graphite text-white font-bold px-12 py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
          >
            Ver Alianças
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
