import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCart } from '../services/cartService';
import { Product } from '../types';

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

interface FormData {
  // Personal Data
  fullName: string;
  phone: string;
  email: string; // Optional
  cpf: string;

  // Address - Removed
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    cpf: '',
  });

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      setCartItems(items);
    };
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = ['cpf', 'phone'];

    if (numericFields.includes(name)) {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemsList = cartItems.map(item =>
      `- ${item.quantity || 1}x ${item.name} (${item.price})`
    ).join('\n');

    const message = `*Novo Pedido - Marta Perfumes*

*Dados do Cliente:*
Nome: ${formData.fullName}
Telefone: ${formData.phone}
CPF: ${formData.cpf}

*Itens do Pedido:*
${itemsList}

*Total do Pedido:* ${formatPrice(total)}

--------------------------------
Aguardo contato para finalizar o pagamento e combinar a entrega.`;
    const targetNumber: number = 5583996394713;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${targetNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 animate-in fade-in duration-1000 w-full">
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <a href="#/" className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">Início</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <a href="#/cart" className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">Carrinho</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-widest bg-primary/10 text-primary px-4 py-2 rounded-full">Finalizar Pedido</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Finalizar Pedido</h1>
              <p className="text-slate-500 font-medium">Por favor, forneça seus dados abaixo.</p>
            </div>

            <div className="space-y-8">
              {/* Personal Data Section */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">person</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Dados Pessoais</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nome Completo *</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="João Silva" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">CPF *</label>
                    <input required name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="000.000.000-00" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Telefone *</label>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="(00) 00000-0000" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email <span className="normal-case tracking-normal text-slate-300">(Opcional)</span></label>
                    <input name="email" value={formData.email} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="joao@exemplo.com" type="email" />
                  </div>
                </div>
              </section>




              {/* Payment Notification Section */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Pagamento / Finalização</h2>
                </div>

                <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 flex flex-col items-center text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-3xl">mark_chat_read</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Finalizar Pedido</h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Após reservar seu pedido, um de nossos atendentes entrará em contato para combinar o pagamento e a entrega.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[450px]">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 sticky top-40 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary/20 text-4xl">verified</span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-10 tracking-tight text-slate-900 dark:text-white">Detalhes do Pedido</h3>
              <div className="space-y-8 mb-10">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                      <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold truncate tracking-tight mb-1 text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantidade: {item.quantity || 1}</p>
                      <p className="text-sm font-bold text-primary mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
                {cartItems.length === 0 && <p className="text-slate-400 text-sm text-center">Seu carrinho parece estar vazio.</p>}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Total:</span>
                  <span className="text-4xl font-display font-bold text-primary tracking-tighter">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full mt-10 bg-slate-900 dark:bg-primary text-white font-bold py-6 rounded-2xl shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest ${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <span className="material-symbols-outlined text-xl">lock</span> Reservar Pedido
              </button>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
