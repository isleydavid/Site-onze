
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Trash2, 
  Search, 
  LayoutGrid,
  ChevronLeft,
  Image as ImageIcon,
  Save,
  Minus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { products, addProduct, updateStock, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: 'aliancas',
    image: '',
    description: '',
    material: 'Ouro 18K',
    width: '4mm',
    shape: 'Anatômica',
    stock: 5
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct);
    setIsAdding(false);
    setNewProduct({
      name: '', price: 0, category: 'aliancas', image: '', 
      description: '', material: 'Ouro 18K', width: '4mm', 
      shape: 'Anatômica', stock: 5
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header Admin */}
      <div className="bg-brand-graphite text-white pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button onClick={() => navigate('/perfil')} className="flex items-center gap-2 text-white/50 mb-4 hover:text-brand-gold transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Voltar ao Perfil</span>
            </button>
            <h1 className="text-3xl font-serif uppercase tracking-widest">Painel de Gestão</h1>
            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Controle de Inventário e Catálogo</p>
          </div>
          
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-brand-gold hover:bg-brand-gold-dark text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all shadow-xl shadow-brand-gold/20 uppercase text-[10px] tracking-widest"
          >
            <Plus className="w-5 h-5" /> Adicionar Produto
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">Total Itens</p>
              <p className="text-xl font-bold text-brand-graphite">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">Ativos</p>
              <p className="text-xl font-bold text-brand-graphite">{products.filter(p => p.stock > 0).length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">Estoque Baixo</p>
              <p className="text-xl font-bold text-brand-graphite">{products.filter(p => p.stock < 3).length}</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            <input 
              type="text" 
              placeholder="Buscar no catálogo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-neutral-100 outline-none text-sm focus:border-brand-gold transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white rounded-xl border border-neutral-100 text-brand-graphite shadow-sm">
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Produto</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Categoria</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Preço</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Estoque</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                          <img src={product.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <span className="text-sm font-bold text-brand-graphite uppercase tracking-tight line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-brand-graphite">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => updateStock(product.id, product.stock - 1)}
                          className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-brand-gold/10 hover:text-brand-gold transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`w-10 text-center font-bold text-sm ${product.stock < 3 ? 'text-red-500' : 'text-brand-graphite'}`}>
                          {product.stock}
                        </span>
                        <button 
                          onClick={() => updateStock(product.id, product.stock + 1)}
                          className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-brand-gold/10 hover:text-brand-gold transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Adicionar Produto */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-brand-graphite/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 lg:p-12 no-scrollbar"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif text-brand-graphite uppercase tracking-widest">Novo Item</h2>
                </div>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-neutral-50 rounded-full">
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Nome da Joia</label>
                    <input 
                      required type="text" placeholder="Ex: Aliança Ouro Noble"
                      value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                    <input 
                      required type="number" placeholder="2990"
                      value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Categoria</label>
                    <select 
                      value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all appearance-none"
                    >
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Estoque Inicial</label>
                    <input 
                      required type="number"
                      value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">URL da Imagem</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                    <input 
                      required type="url" placeholder="https://images.unsplash.com/..."
                      value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Descrição</label>
                  <textarea 
                    required rows={3} placeholder="Descreva a peça e detalhes técnicos..."
                    value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Material</label>
                    <input 
                      type="text" value={newProduct.material} onChange={e => setNewProduct({...newProduct, material: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Largura</label>
                    <input 
                      type="text" value={newProduct.width} onChange={e => setNewProduct({...newProduct, width: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Formato</label>
                    <input 
                      type="text" value={newProduct.shape} onChange={e => setNewProduct({...newProduct, shape: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-brand-gold outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-graphite text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all uppercase text-[11px] tracking-[0.3em] shadow-xl pt-4"
                >
                  <Save className="w-5 h-5" /> Cadastrar no Catálogo
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
