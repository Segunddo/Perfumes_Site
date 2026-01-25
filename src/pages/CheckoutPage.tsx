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

  // Address
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;

  // Payment
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
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

    const numericFields = ['cpf', 'phone', 'cep', 'number', 'cardNumber', 'cvv', 'expiry'];

    if (numericFields.includes(name)) {
      if (name === 'expiry') {
        const numericValue = value.replace(/[^0-9/]/g, '');
        setFormData(prev => ({ ...prev, [name]: numericValue }));
        return;
      }

      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order Placed for ${formatPrice(total)} via ${paymentMethod.toUpperCase()}! An advisor will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 animate-in fade-in duration-1000 w-full">
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <a href="#/" className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">Home</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <a href="#/cart" className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">Cart</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-widest bg-primary/10 text-primary px-4 py-2 rounded-full">Secure Checkout</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Finalize Order</h1>
              <p className="text-slate-500 font-medium">Please provide your details below.</p>
            </div>

            <div className="space-y-8">
              {/* Personal Data Section */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">person</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Personal Data</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name *</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="John Doe" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">CPF *</label>
                    <input required name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="000.000.000-00" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Cellphone *</label>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="(00) 00000-0000" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email <span className="normal-case tracking-normal text-slate-300">(Optional)</span></label>
                    <input name="email" value={formData.email} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="john@example.com" type="email" />
                  </div>
                </div>
              </section>

              {/* Address Section */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">home_pin</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Address</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">CEP *</label>
                    <input required name="cep" value={formData.cep} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="00000-000" type="text" />
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Street Address *</label>
                    <input required name="street" value={formData.street} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="Av. Brigadeiro Faria Lima" type="text" />
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Number *</label>
                    <input required name="number" value={formData.number} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="123" type="text" />
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Neighborhood *</label>
                    <input required name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="Jardim Paulistano" type="text" />
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">City *</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="São Paulo" type="text" />
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">State *</label>
                    <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="SP" type="text" />
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Delivery Method</h2>
                </div>
                <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Standard Delivery</p>
                    <p className="text-xs text-slate-500 mt-1">3-5 Business Days</p>
                  </div>
                  <span className="text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">GRÁTIS</span>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-10 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Payment Method</h2>
                </div>

                <div className="flex gap-4 mb-8">
                  <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2 ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50'}`}>Credit Card</button>
                  <button type="button" onClick={() => setPaymentMethod('pix')} className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2 ${paymentMethod === 'pix' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50'}`}>Pix</button>
                  <button type="button" onClick={() => setPaymentMethod('boleto')} className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2 ${paymentMethod === 'boleto' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50'}`}>Boleto</button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Cardholder Name *</label>
                      <input required name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="JOHN DOE" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Card Number *</label>
                      <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="•••• •••• •••• ••••" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Expiry *</label>
                      <input required name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="MM / YY" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">CVV *</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full h-14 px-6 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm text-slate-900 dark:text-white" placeholder="123" type="password" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="text-center py-10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">qr_code_2</span>
                    <p className="text-slate-500 max-w-md mx-auto">Complete your order to generate a standard Pix QR Code. Payment is instant and secure.</p>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="text-center py-10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">barcode</span>
                    <p className="text-slate-500 max-w-md mx-auto">A boletos bank slip will be generated after confirming your order. It may take up to 3 business days to clear.</p>
                  </div>
                )}
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[450px]">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 sticky top-40 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary/20 text-4xl">verified</span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-10 tracking-tight text-slate-900 dark:text-white">Order Architecture</h3>
              <div className="space-y-8 mb-10">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                      <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold truncate tracking-tight mb-1 text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Quantity: {item.quantity || 1}</p>
                      <p className="text-sm font-bold text-primary mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
                {cartItems.length === 0 && <p className="text-slate-400 text-sm text-center">Your cart appears to be empty.</p>}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <span>Logistics Tax</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Grand Total</span>
                  <span className="text-4xl font-display font-bold text-primary tracking-tighter">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full mt-10 bg-slate-900 dark:bg-primary text-white font-bold py-6 rounded-2xl shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest ${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <span className="material-symbols-outlined text-xl">lock</span> Authorize Payment
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
