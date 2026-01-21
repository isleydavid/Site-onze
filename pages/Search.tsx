
import React, { useState } from 'react';
import { Search as SearchIcon, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const results = query.length > 1 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const suggestions = ["Aliança 18K", "Solitário", "Ouro 10K", "Casamento", "Anatômica"];

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white p-4 border-b border-neutral-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            autoFocus
            type="text"
            placeholder="O que você está procurando?"
            className="w-full bg-neutral-100 pl-10 pr-10 py-3 rounded-full outline-none text-sm border-2 border-transparent focus:border-gold-main transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-neutral-300 rounded-full"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {!query && (
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Sugestões de Busca</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-gold-light/20 rounded-full text-sm text-graphite transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && results.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Resultados para "{query}"</h3>
            <div className="grid grid-cols-2 gap-4">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neutral-400">Nenhum resultado encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
