
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';


import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

      </div>
    </HashRouter>
  );
};

export default App;
