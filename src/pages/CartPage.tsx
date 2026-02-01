
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartQuantity } from '../services/cartService';
import { Product } from '../types';

// Converter texto "$299.00" em número 299.00
const parsePrice = (priceString: string): number => {
  if (!priceString) return 0;

  let clean = priceString.replace(/[^0-9.,]/g, '');

  if (clean.match(/,\d{2}$/)) {
    clean = clean.replace(/\./g, '').replace(',', '.');
  } else {
    clean = clean.replace(/,/g, '');
  }
  return parseFloat(clean) || 0;
};

const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      setCartItems(items);
    };
    fetchCart();
  }, []);

  const handleRemove = async (index: number) => {
    await removeFromCart(index);
    const updatedItems = await getCart();
    setCartItems(updatedItems);
  };

  const handleUpdateQuantity = async (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartQuantity(index, newQuantity);
    // Recarrega o carrinho para atualizar o total
    const updatedItems = await getCart();
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce((sum, item) =>
    sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-40 pb-24 flex-grow animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <a href="#/" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-primary transition-all group mb-8">
              <span className="material-symbols-outlined text-lg mr-3 group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Voltar
            </a>
            <h1 className="text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Seu Carrinho</h1>
            <p className="text-slate-400 mt-2 font-medium">Revise seus itens antes de finalizar o pedido.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-12">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-slate-100 dark:border-white/5 group">
                  <div className="w-48 h-48 bg-slate-50 dark:bg-white/5 rounded-3xl overflow-hidden flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 tracking-tight">{item.name}</h3>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{item.detail}</p>
                      </div>
                      <p className="text-2xl font-bold tracking-tight text-primary">{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-white/10">
                        <button
                          onClick={() => handleUpdateQuantity(idx, (item.quantity || 1) - 1)}
                          className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="px-5 text-sm font-bold">{item.quantity || 1}</span>
                        <button
                          onClick={() => handleUpdateQuantity(idx, (item.quantity || 1) + 1)}
                          className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(idx)}
                        className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span> Remover Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                <h2 className="text-2xl font-display font-bold mb-10 tracking-tight">DETALHES DO PEDIDO</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Valor Total</span>
                    <p className="text-4xl font-display font-bold tracking-tighter text-slate-900 dark:text-white">{formatPrice(total)}</p>
                  </div>
                </div>
                <a
                  href="#/checkout"
                  className="w-full inline-block text-center py-6 bg-primary text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all mb-6 shadow-2xl shadow-primary/30"
                >
                  Realizar Pagamento
                </a>
                <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="material-symbols-outlined text-lg">lock</span> Pagamento Seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  );
};

export default CartPage;
