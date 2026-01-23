
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage: React.FC = () => {
  const cartItems = [
    { id: 5, name: "IZ Laptop Pro", price: "R$ 14.999,00", detail: "Midnight | 1TB | 32GB RAM", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwf0vLtP9hdx8wU6pdm9r7K_2a2D4r6vpgXGdSyiTdIwL_IhVVikamrPQpOc74CUk1Q4EicPLBq4by0w1NR57b7EbY_PdS8MXYNmDPWvd9gkgEtGOGnTjPvN_6iPSf6uPT5nttJpoiyaS_7FayhL43Pfo52VBlQcNulNV4s9GpXIaqm9AlL0Ea2Id0UpqhvhJg6kVEDkuvGTI4FRY7GXtBN-k6vz34rYL5zEaF_GP6oXIA17iJqwcZa43Lpq4vVBUwwfi6atZobCzl" },
    { id: 1, name: "Acoustic Pro Max", price: "R$ 2.499,00", detail: "Space Gray | Noise Cancelling", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNwH07NL66abeGEOptCCYkCsqjxacnaB2XepBRgsqZc9UpLi9Xw-Bmy8i8SCnQRJx61FVKSl-QPy30X5m42OBSDdDzWAdw2AYGWcZ6ZuAFqGwns455nEWKVuHdjjgj9V_f5SaoWw45MW4pT-xdVwC2hScCe4btBHfZmfuPr3Lkj_pIJtFuuz5p_0lI85DxDV7IYWgNLbVnzoCwfguxBRXiaByNyiBsNgo6Q89nNvPCRbXeA-aaRx3tXDF7xolmz1oJkFdpfHVA9Xtv" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-40 pb-24 flex-grow animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <a href="#/" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors group mb-8">
              <span className="material-symbols-outlined text-lg mr-3 group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Return to Gallery
            </a>
            <h1 className="text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white">Your Selections</h1>
            <p className="text-slate-400 mt-2 font-medium">Review your curated basket before checkout.</p>
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
                        <button className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center transition-all"><span className="material-symbols-outlined text-lg">remove</span></button>
                        <span className="px-5 text-sm font-bold">1</span>
                        <button className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center transition-all"><span className="material-symbols-outlined text-lg">add</span></button>
                      </div>
                      <button className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">delete</span> Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                <h2 className="text-2xl font-display font-bold mb-10 tracking-tight">Order Insight</h2>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>R$ 17.498,00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">
                    <span>Priority Shipping</span>
                    <span className="text-primary font-bold">Complimentary</span>
                  </div>
                  <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Total Amount</span>
                    <p className="text-4xl font-display font-bold tracking-tighter text-slate-900 dark:text-white">R$ 17.498,00</p>
                  </div>
                </div>
                <a
                  href="#/checkout"
                  className="w-full inline-block text-center py-6 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all mb-6 shadow-2xl shadow-primary/30"
                >
                  Proceed to Checkout
                </a>
                <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="material-symbols-outlined text-lg">lock</span> 256-Bit Encrypted Secure Connection
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
