import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data.length === 0) throw new Error("No products found (Connection failed?)");
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Unknown Error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury lifestyle hero"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHBQv-fYUaToJ_pws8KMzMCI3Jxld7oTebnlTJc0gwHrGxHer9kVAe7ISitfzXy2KZidzddXVkC1IPtGbMK5BayJjOjIyOO3TsAgCHI53-zACEgrex8hoNaWZUwRlmBlGFkAjwmhdL0thIO0jMlrwz4M_EAfkiibwf5wSYU-AXE8b9_VpcKLgfYhdwljus3yxANQ05wg_F5FpkPeSVOKt3A984cB12xFOVty96_DHe-94YnuzXlaRZ6Rrbsb9bJq81yaKQiPp93v_L"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-white/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Spring Summer 2024 Collection
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Redefining <br />
              <span className="text-primary italic">Brazilian Luxury.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-xl leading-relaxed font-light">
              Experience a world where cutting-edge technology meets timeless designer aesthetics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#/collection" className="px-10 py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center">
                Explore The Gallery <span className="material-symbols-outlined ml-3 text-lg">arrow_forward</span>
              </a>
              <a href="#/" className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all flex items-center justify-center">
                Private Access
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white opacity-60">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: 'local_shipping', title: 'White Glove Delivery', desc: 'Complimentary on orders over R$ 1.000' },
            { icon: 'verified_user', title: 'Global Authentication', desc: 'Guaranteed genuine premium products' },
            { icon: 'history', title: 'Concierge Returns', desc: 'Complimentary 30-day effortless returns' },
            { icon: 'support_agent', title: 'Private Advisor', desc: '24/7 dedicated lifestyle experts' }
          ].map((badge, i) => (
            <div key={badge.icon} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="material-symbols-outlined text-primary text-3xl mb-4">{badge.icon}</span>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{badge.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <section id="collection" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-slate-900 dark:text-white">The Curated Masterpieces</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Our handpicked selection of items that define contemporary excellence.</p>
          </div>
          <a href="#/" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-slate-900 dark:hover:text-white transition-colors">
            View All Selections
            <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {loading ? (
            <div className="col-span-4 text-center py-20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse inline-block"></span>
              <span className="ml-2 text-xs font-bold uppercase tracking-widest text-slate-400">Loading Gallery...</span>
            </div>
          ) : error ? (
            <div className="col-span-4 text-center py-20 text-red-500 bg-red-50/10 rounded-lg border border-red-500/20">
              <p className="font-bold mb-2">⚠ ERROR LOADING PRODUCTS</p>
              <code className="text-sm opacity-80">{error}</code>
            </div>
          ) : (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary mb-8 animate-pulse">Our Philosophy</h3>
          <p className="text-3xl md:text-5xl font-display font-light leading-relaxed max-w-4xl tracking-tight">
            "We believe luxury is not about the price, but the <span className="font-bold text-primary italic">uncompromising fusion</span> of utility and soul."
          </p>
          <div className="mt-16 w-px h-24 bg-primary"></div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
