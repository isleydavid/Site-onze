
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ChevronRight, QrCode, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cpf: '',
    zip: '',
    address: '',
    number: '',
    city: '',
    state: ''
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-serif text-brand-graphite mb-4 uppercase tracking-widest">Carrinho Vazio</h2>
        <button onClick={() => navigate('/')} className="text-brand-gold font-bold uppercase text-[10px] tracking-widest border-b border-brand-gold">
          Voltar para Loja
        </button>
      </div>
    );
  }

  const pixDiscount = totalPrice * 0.1;
  const finalPricePix = totalPrice - pixDiscount;

  const handleFinish = () => {
    setStep(3);
    clearCart();
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-10">
      <div className="bg-white border-b border-neutral-100 px-4 py-3 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={handleGoBack} className="flex items-center gap-1.5 text-neutral-400">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Voltar</span>
          </button>
          <div className="flex items-baseline font-serif text-lg font-bold tracking-tighter">
            <span className="text-brand-graphite">11</span>
            <span className="text-brand-gold">11</span>
          </div>
          <div className="w-12 lg:w-32"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* Barra de Progresso Mobile-First */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-3 lg:gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-gold' : 'text-neutral-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${step >= 1 ? 'border-brand-gold bg-brand-gold text-white' : 'border-neutral-300'}`}>1</div>
              <span className="text-[9px] font-bold uppercase tracking-widest">Entrega</span>
            </div>
            <div className="w-6 lg:w-8 h-px bg-neutral-200" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-gold' : 'text-neutral-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${step >= 2 ? 'border-brand-gold bg-brand-gold text-white' : 'border-neutral-300'}`}>2</div>
              <span className="text-[9px] font-bold uppercase tracking-widest">Pagamento</span>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-neutral-100">
                    <h2 className="text-base lg:text-lg font-serif text-brand-graphite mb-6 lg:mb-8 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-brand-gold" /> Entrega
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4 lg:gap-6">
                      <input type="email" placeholder="E-mail" className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      <input type="text" placeholder="Nome Completo" className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <div className="grid grid-cols-2 gap-3 lg:gap-4">
                        <input type="text" placeholder="CPF" className="px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" />
                        <input type="text" placeholder="CEP" className="px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" />
                      </div>
                      <input type="text" placeholder="Endereço" className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" />
                      <div className="grid grid-cols-3 gap-3 lg:gap-4">
                        <input type="text" placeholder="Nº" className="px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" />
                        <input type="text" placeholder="Cidade" className="col-span-2 px-5 py-3.5 rounded-xl bg-neutral-50 text-sm outline-none" />
                      </div>
                    </div>

                    <button onClick={() => setStep(2)} className="w-full bg-brand-graphite text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl mt-8 flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg">
                      Ir para Pagamento <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-neutral-100">
                    <h2 className="text-base lg:text-lg font-serif text-brand-graphite mb-6 lg:mb-8 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-brand-gold" /> Pagamento
                    </h2>

                    <div className="grid grid-cols-1 gap-3 lg:gap-4 mb-6">
                      <button onClick={() => setPaymentMethod('pix')} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-brand-gold bg-brand-gold/5' : 'border-neutral-100'}`}>
                        <div className="flex items-center gap-3">
                          <QrCode className="w-5 h-5 text-brand-gold" />
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-brand-graphite uppercase tracking-widest">PIX</p>
                            <p className="text-[8px] text-green-600 font-bold uppercase">10% OFF</p>
                          </div>
                        </div>
                        <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'pix' ? 'text-brand-gold' : 'text-neutral-200'}`} />
                      </button>

                      <button onClick={() => setPaymentMethod('card')} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-brand-gold bg-brand-gold/5' : 'border-neutral-100'}`}>
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-brand-gold" />
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-brand-graphite uppercase tracking-widest">Cartão</p>
                            <p className="text-[8px] text-neutral-400 font-bold uppercase">Até 10x sem juros</p>
                          </div>
                        </div>
                        <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'card' ? 'text-brand-gold' : 'text-neutral-200'}`} />
                      </button>
                    </div>

                    <button onClick={handleFinish} className="w-full bg-brand-gold text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl mt-4 flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-xl hover:bg-brand-gold-dark transition-all">
                      Finalizar Agora <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 lg:p-12 rounded-[2rem] text-center shadow-xl border border-neutral-100 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-serif text-brand-graphite mb-3">Pedido Confirmado!</h1>
                  <p className="text-neutral-400 text-xs max-w-xs mx-auto mb-8">Sua joia está sendo preparada com carinho. Você receberá as atualizações por e-mail.</p>
                  <button onClick={() => navigate('/')} className="bg-brand-graphite text-white font-bold px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-lg">
                    Voltar ao Início
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resumo Sidebar */}
          {step < 3 && (
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] shadow-sm border border-neutral-100">
                <h3 className="text-xs font-bold text-brand-graphite uppercase tracking-widest mb-4 pb-3 border-b border-neutral-50">Resumo</h3>
                <div className="space-y-4 mb-6 max-h-48 overflow-y-auto no-scrollbar">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-50 border border-neutral-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold text-brand-graphite uppercase truncate">{item.name}</p>
                        <p className="text-[10px] font-bold text-brand-gold">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-neutral-50">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-neutral-400 uppercase">Subtotal</span>
                    <span className="text-brand-graphite">{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-neutral-400 uppercase">Total</span>
                    <span className="text-xl font-serif text-brand-graphite">{(paymentMethod === 'pix' ? finalPricePix : totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
