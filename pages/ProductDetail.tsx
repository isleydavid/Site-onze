
import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronRight, 
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Ruler, 
  MessageCircle, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Heart,
  X,
  CircleDot,
  Fingerprint,
  Info
} from 'lucide-react';
import { MOCK_PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import { SelectionState } from '../types';
import { useCart } from '../context/CartContext';

const SizeSelector: React.FC<{ 
  selected: string, 
  onSelect: (val: string) => void,
  label: string 
}> = ({ selected, onSelect, label }) => {
  const sizes = Array.from({ length: 27 }, (_, i) => (i + 8).toString().padStart(2, '0'));
  const allSizes = [...sizes.slice(0, 5), '00', ...sizes.slice(5)];
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 100 : scrollLeft + 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6 lg:mb-8 overflow-visible">
      <label className="block text-[10px] lg:text-[11px] font-bold text-brand-graphite uppercase tracking-widest mb-3 lg:mb-4">{label}</label>
      <div className="flex items-center gap-1.5 lg:gap-2 overflow-visible">
        <button 
          onClick={() => scroll('left')} 
          className="p-1.5 text-brand-gold bg-white border border-neutral-100 rounded-full shadow-sm active:scale-90"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto no-scrollbar gap-0 border border-neutral-200 rounded-xl lg:rounded-2xl bg-white items-center h-12 lg:h-16 shadow-inner py-1 px-1.5"
        >
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => onSelect(size)}
              className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-xs lg:text-sm transition-all duration-300 relative mx-0.5 rounded-lg
                ${selected === size ? 'z-10 font-bold' : 'text-neutral-400'}`}
            >
              {selected === size && (
                <div className="absolute inset-0 border-2 border-brand-gold bg-white rounded-lg shadow-sm flex flex-col items-center justify-center scale-110">
                   <div className="absolute -top-1.5 bg-brand-gold w-1 h-1 rounded-full ring-2 ring-white"></div>
                   <span className="text-brand-gold text-base lg:text-lg">{size === '00' ? '...' : size}</span>
                </div>
              )}
              {selected !== size && (size === '00' ? '...' : size)}
            </button>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="p-1.5 text-brand-gold bg-white border border-neutral-100 rounded-full shadow-sm active:scale-90"
        >
          <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </div>
  );
};

const MeasurementModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-graphite/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] lg:rounded-[3rem] shadow-2xl p-6 lg:p-12 no-scrollbar"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-neutral-50 rounded-full hover:bg-neutral-100">
              <X className="w-5 h-5 text-brand-graphite" />
            </button>

            <div className="text-center mb-8 lg:mb-12">
              <Ruler className="w-8 h-8 lg:w-10 lg:h-10 text-brand-gold mx-auto mb-3 lg:mb-4" />
              <h2 className="text-2xl lg:text-3xl font-serif text-brand-graphite uppercase tracking-widest">Guia de Medidas</h2>
              <p className="text-[9px] lg:text-[10px] text-neutral-400 font-bold uppercase tracking-[0.3em] mt-2">Escolha o tamanho perfeito</p>
            </div>

            <div className="space-y-8 lg:space-y-12">
              <section className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-xs lg:text-base">01</div>
                  <h3 className="text-xs lg:text-sm font-bold text-brand-graphite uppercase tracking-widest">Método do Barbante</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {[
                    { step: "Envolva um barbante no seu dedo.", icon: <Fingerprint className="w-4 h-4"/> },
                    { step: "Marque onde as pontas se encontram.", icon: <CircleDot className="w-4 h-4"/> },
                    { step: "Estique e veja a medida em cm.", icon: <Ruler className="w-4 h-4"/> },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-neutral-50 p-4 lg:p-6 rounded-xl border border-neutral-100 flex items-center md:flex-col md:text-center gap-4">
                      <div className="text-brand-gold shrink-0">{item.icon}</div>
                      <p className="text-[10px] lg:text-[11px] text-neutral-500 leading-tight font-medium uppercase tracking-wider">{item.step}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-brand-graphite rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-8 text-white">
                <h3 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold text-center mb-6 lg:mb-8">Conversão</h3>
                <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4">
                  {[
                    { cm: "5.0", aro: "10" }, { cm: "5.4", aro: "14" },
                    { cm: "5.8", aro: "18" }, { cm: "6.2", aro: "22" },
                    { cm: "6.6", aro: "26" }, { cm: "7.0", aro: "30" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center py-2 border border-white/10 rounded-lg">
                      <span className="text-[8px] text-white/40 font-bold uppercase">{item.cm} cm</span>
                      <span className="text-xs lg:text-sm font-bold text-brand-gold">{item.aro}</span>
                    </div>
                  ))}
                </div>
              </section>

              <button 
                onClick={onClose}
                className="w-full bg-brand-gold text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl uppercase text-[10px] lg:text-[11px] tracking-[0.3em] shadow-xl"
              >
                Entendi
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [isMeasurementModalOpen, setIsMeasurementModalOpen] = useState(false);
  const [shippingResult, setShippingResult] = useState<{ days: string, price: string, isJP: boolean } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [selection, setSelection] = useState<SelectionState>({
    aro1: '16',
    aro2: '22',
    engraving1: '',
    engraving2: '',
    noEngraving1: false,
    noEngraving2: false
  });
  const [cep, setCep] = useState('');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center">
        <h2 className="text-xl font-serif mb-4">Produto não encontrado</h2>
        <button onClick={() => navigate('/')} className="text-brand-gold font-bold uppercase text-xs">Voltar</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selection);
  };

  const handleCalculateShipping = () => {
    if (cep.length < 8) return;
    setIsCalculating(true);
    setShippingResult(null);

    setTimeout(() => {
      const isJP = cep.startsWith('580');
      setShippingResult({
        days: isJP ? 'No mesmo dia*' : '3 a 5 dias',
        price: 'Grátis',
        isJP
      });
      setIsCalculating(false);
    }, 1000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Quero detalhes da: *${product.name}*`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white pb-10">
      <div className="px-4 py-3 flex items-center gap-1.5 text-[9px] text-neutral-400 uppercase tracking-widest overflow-x-auto no-scrollbar whitespace-nowrap border-b border-neutral-50">
        <Link to="/" className="hover:text-brand-gold">Home</Link>
        <ChevronRight className="w-2.5 h-2.5" />
        <Link to={`/categoria/${product.category}`} className="hover:text-brand-gold">{product.category}</Link>
        <ChevronRight className="w-2.5 h-2.5" />
        <span className="text-brand-graphite font-bold truncate">{product.name}</span>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-10 max-w-7xl mx-auto">
        {/* Galeria - Refinado */}
        <div className="relative">
          <div className="aspect-square w-full bg-neutral-50 overflow-hidden lg:rounded-3xl border-b lg:border border-neutral-100">
            <img
              src={product.gallery[activeImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-brand-graphite shadow-lg">
              <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          
          <div className="flex gap-2.5 px-4 py-4 overflow-x-auto no-scrollbar lg:px-0">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-xl border-2 transition-all overflow-hidden bg-neutral-50
                  ${activeImage === idx ? 'border-brand-gold scale-105 shadow-sm' : 'border-transparent opacity-60'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info & Personalização */}
        <div className="px-4 lg:px-0 mt-4 lg:mt-0">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-xl lg:text-3xl font-serif text-brand-graphite leading-tight mb-2 uppercase tracking-wider font-semibold">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-brand-gold">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.2em] border-l border-neutral-100 pl-3">Top Rated</span>
            </div>
          </div>

          <div className="bg-white p-5 lg:p-7 rounded-[1.5rem] lg:rounded-[2rem] border border-neutral-100 mb-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col mb-4 lg:mb-6">
              <span className="text-[10px] text-neutral-400 line-through mb-0.5">
                De: {product.oldPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || (product.price * 1.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold text-brand-graphite font-serif">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="bg-green-50 text-green-600 text-[8px] font-bold px-2 py-0.5 rounded-full border border-green-100 uppercase">
                  Pix
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full bg-brand-graphite text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2.5 hover:bg-black transition-all uppercase text-[10px] lg:text-[11px] tracking-[0.3em] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" /> Adicionar
            </button>
          </div>

          <div className="bg-neutral-50 rounded-[2rem] overflow-visible mb-10 border border-neutral-100 px-1 pb-1">
            <div className="flex justify-center -mt-4">
              <div className="bg-brand-graphite text-brand-gold border-2 border-brand-gold text-[9px] lg:text-[11px] font-bold px-8 lg:px-12 py-2.5 rounded-full shadow-lg uppercase tracking-[0.2em]">
                Personalize Sua Joia
              </div>
            </div>
            
            <div className="p-5 pt-10 space-y-10">
              {/* Aro 1 */}
              <div>
                <SizeSelector 
                  label="Tamanho Primeiro Aro" 
                  selected={selection.aro1} 
                  onSelect={(val) => setSelection(prev => ({...prev, aro1: val}))} 
                />
                <div className="mt-4">
                  <div className={`relative bg-white border rounded-xl p-3 flex items-center justify-between ${selection.noEngraving1 ? 'opacity-50' : 'shadow-sm border-neutral-200'}`}>
                    <input 
                      type="text"
                      placeholder="Gravação..."
                      maxLength={30}
                      disabled={selection.noEngraving1}
                      value={selection.engraving1}
                      onChange={(e) => setSelection(prev => ({...prev, engraving1: e.target.value}))}
                      className="flex-1 bg-transparent outline-none text-xs text-brand-graphite placeholder:text-neutral-300 font-medium"
                    />
                    <div className="flex items-center gap-2 ml-2 pl-3 border-l border-neutral-100">
                      <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">Não gravar</span>
                      <input 
                        type="checkbox" 
                        checked={selection.noEngraving1}
                        onChange={(e) => setSelection(prev => ({...prev, noEngraving1: e.target.checked}))}
                        className="w-4 h-4 accent-brand-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Aro 2 */}
              <div className="border-t border-neutral-100 pt-10">
                <SizeSelector 
                  label="Tamanho Segundo Aro" 
                  selected={selection.aro2} 
                  onSelect={(val) => setSelection(prev => ({...prev, aro2: val}))} 
                />
                <div className="mt-4">
                  <div className={`relative bg-white border rounded-xl p-3 flex items-center justify-between ${selection.noEngraving2 ? 'opacity-50' : 'shadow-sm border-neutral-200'}`}>
                    <input 
                      type="text"
                      placeholder="Gravação..."
                      maxLength={30}
                      disabled={selection.noEngraving2}
                      value={selection.engraving2}
                      onChange={(e) => setSelection(prev => ({...prev, engraving2: e.target.value}))}
                      className="flex-1 bg-transparent outline-none text-xs text-brand-graphite placeholder:text-neutral-300 font-medium"
                    />
                    <div className="flex items-center gap-2 ml-2 pl-3 border-l border-neutral-100">
                      <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">Não gravar</span>
                      <input 
                        type="checkbox" 
                        checked={selection.noEngraving2}
                        onChange={(e) => setSelection(prev => ({...prev, noEngraving2: e.target.checked}))}
                        className="w-4 h-4 accent-brand-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsMeasurementModalOpen(true)}
              className="w-full bg-brand-graphite py-5 text-white text-[10px] font-bold flex items-center justify-center gap-2 rounded-b-[2rem] uppercase tracking-widest"
            >
              Como medir? <span className="border-b border-brand-gold text-brand-gold">Ver Tabela</span>
            </button>
          </div>

          {/* Frete Mobile Refinado */}
          <div className="border-t border-neutral-100 pt-8 mb-10">
             <label className="block text-[10px] lg:text-[11px] font-bold text-brand-graphite uppercase tracking-widest mb-3">Prazo e Frete</label>
             <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Seu CEP: 58000-000"
                  maxLength={9}
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'))}
                  className="flex-1 px-4 py-3.5 rounded-xl border border-neutral-200 focus:border-brand-gold outline-none text-xs transition-all"
                />
                <button 
                  onClick={handleCalculateShipping}
                  disabled={isCalculating || cep.length < 8}
                  className="bg-brand-graphite text-white px-6 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest active:scale-95 disabled:opacity-50"
                >
                  {isCalculating ? '...' : 'OK'}
                </button>
             </div>
             
             <AnimatePresence>
               {shippingResult && (
                 <motion.div 
                   initial={{ opacity: 0, y: -5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2.5"
                 >
                   <div className="flex items-center justify-between text-[10px]">
                     <span className="text-neutral-400 uppercase font-bold tracking-widest">Entrega</span>
                     <span className={`font-bold uppercase ${shippingResult.isJP ? 'text-green-600' : 'text-brand-graphite'}`}>
                       {shippingResult.days}
                     </span>
                   </div>
                   
                   {shippingResult.isJP && (
                     <div className="mt-2 p-3 rounded-lg bg-brand-gold/5 border border-brand-gold/20 flex items-start gap-2">
                       <Info className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                       <p className="text-[9px] text-brand-gold-dark font-bold leading-tight uppercase tracking-tight">
                         <span className="text-brand-gold-dark font-black">João Pessoa:</span> Pedidos até 12h chegam hoje!
                       </p>
                     </div>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-1 border-t border-neutral-100 pt-8">
            {[
              { label: "Material", val: product.material },
              { label: "Largura", val: product.width },
              { label: "Formato", val: product.shape },
            ].map((spec, i) => (
              <div key={i} className="flex justify-between py-3.5 border-b border-neutral-50">
                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">{spec.label}</span>
                <span className="text-[9px] font-bold text-brand-graphite uppercase tracking-widest">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <MeasurementModal isOpen={isMeasurementModalOpen} onClose={() => setIsMeasurementModalOpen(false)} />

      <button onClick={handleWhatsApp} className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProductDetail;
