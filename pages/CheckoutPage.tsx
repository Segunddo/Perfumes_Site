
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 animate-in fade-in duration-1000">
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <a href="#/" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-primary">Home</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <a href="#/cart" className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-primary">Cart</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold tracking-tight mb-4">Finalize Order</h1>
              <p className="text-slate-500 font-medium">Please provide your private details for priority shipping.</p>
            </div>

            <div className="space-y-6">
               <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                  <div className="flex items-center gap-6 py-2">
                      <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                      </div>
                      <div>
                          <p className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Shipping Vault</p>
                          <p className="font-bold text-slate-900 dark:text-white">John Doe, Av. Brigadeiro Faria Lima, 123 - São Paulo, SP</p>
                      </div>
                      <button className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20">Edit</button>
                  </div>
               </div>

               <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <h2 className="text-xl font-bold tracking-tight">Vault Payment Method</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Cardholder Master</label>
                        <input className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm" placeholder="JOHN DOE" type="text"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Card Number Identification</label>
                        <input className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm" placeholder="•••• •••• •••• ••••" type="text"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Expiry</label>
                        <input className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm" placeholder="MM / YY" type="text"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Security Code</label>
                        <input className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm" placeholder="CVV" type="password"/>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <aside className="w-full lg:w-[450px]">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 sticky top-40 overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="material-symbols-outlined text-primary/20 text-4xl">verified</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-10 tracking-tight">Order Architecture</h3>
                <div className="space-y-8 mb-10">
                    <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwf0vLtP9hdx8wU6pdm9r7K_2a2D4r6vpgXGdSyiTdIwL_IhVVikamrPQpOc74CUk1Q4EicPLBq4by0w1NR57b7EbY_PdS8MXYNmDPWvd9gkgEtGOGnTjPvN_6iPSf6uPT5nttJpoiyaS_7FayhL43Pfo52VBlQcNulNV4s9GpXIaqm9AlL0Ea2Id0UpqhvhJg6kVEDkuvGTI4FRY7GXtBN-k6vz34rYL5zEaF_GP6oXIA17iJqwcZa43Lpq4vVBUwwfi6atZobCzl" className="w-full h-full object-cover" alt="item" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold truncate tracking-tight mb-1">IZ Laptop Pro</h4>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity: 1</p>
                            <p className="text-sm font-bold text-primary mt-1">R$ 14.999,00</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNwH07NL66abeGEOptCCYkCsqjxacnaB2XepBRgsqZc9UpLi9Xw-Bmy8i8SCnQRJx61FVKSl-QPy30X5m42OBSDdDzWAdw2AYGWcZ6ZuAFqGwns455nEWKVuHdjjgj9V_f5SaoWw45MW4pT-xdVwC2hScCe4btBHfZmfuPr3Lkj_pIJtFuuz5p_0lI85DxDV7IYWgNLbVnzoCwfguxBRXiaByNyiBsNgo6Q89nNvPCRbXeA-aaRx3tXDF7xolmz1oJkFdpfHVA9Xtv" className="w-full h-full object-cover" alt="item" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold truncate tracking-tight mb-1">Acoustic Pro Max</h4>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity: 1</p>
                            <p className="text-sm font-bold text-primary mt-1">R$ 2.499,00</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      <span>Logistics Tax</span>
                      <span>R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-sm font-bold uppercase tracking-widest">Grand Total</span>
                        <span className="text-4xl font-display font-bold text-primary tracking-tighter">R$ 17.498,00</span>
                    </div>
                </div>

                <button 
                  onClick={() => alert('Order Placed! An advisor will contact you shortly.')} 
                  className="w-full mt-10 bg-slate-900 dark:bg-primary text-white font-bold py-6 rounded-2xl shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-xl">lock</span> Authorize Payment
                </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
