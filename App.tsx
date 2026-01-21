
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { UIProvider } from './context/UIContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNav = location.pathname === '/busca' || location.pathname === '/checkout' || location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className="min-h-screen font-sans selection:bg-brand-gold/20">
      {!hideNav && <Navbar />}
      <Sidebar />
      <CartDrawer />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
      <footer className="bg-white border-t border-neutral-100 py-16 px-6 pb-24 text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-baseline font-serif text-4xl font-bold tracking-tighter mb-1">
            <span className="text-brand-graphite font-medium">11</span>
            <span className="text-brand-gold">11</span>
          </div>
          <span className="text-[9px] tracking-[0.5em] uppercase text-brand-gold-dark font-bold">Joias Exclusivas</span>
        </div>
        
        <div className="flex justify-center gap-8 mb-10">
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-graphite hover:text-brand-gold transition-colors">Instagram</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-graphite hover:text-brand-gold transition-colors">WhatsApp</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-graphite hover:text-brand-gold transition-colors">Políticas</a>
        </div>
        
        <div className="max-w-xs mx-auto mb-10">
          <div className="h-px bg-neutral-100 w-full mb-6"></div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest leading-relaxed">
            Símbolo do seu eterno amor. Design premium e curadoria exclusiva 1111.
          </p>
        </div>
        
        <p className="text-[9px] text-neutral-300 uppercase tracking-widest">
          © 2024 1111 Joias. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasShownSplash', 'true');
    }
  }, []);

  return (
    <AuthProvider>
      <UIProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              ) : (
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categoria/:id" element={<Category />} />
                    <Route path="/produto/:id" element={<ProductDetail />} />
                    <Route path="/busca" element={<Search />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </Layout>
              )}
            </Router>
          </CartProvider>
        </ProductProvider>
      </UIProvider>
    </AuthProvider>
  );
};

export default App;
