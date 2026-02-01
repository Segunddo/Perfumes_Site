import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts('', page, ITEMS_PER_PAGE);
        // If empty and page > 1, maybe go back? For now just show empty or handle gracefully.
        if (data.length === 0 && page === 1) throw new Error("Nenhum produto encontrado (Falha na conexão?)");
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Erro Desconhecido");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const handleNextPage = () => {
    setPage(p => p + 1);
  };

  const handlePrevPage = () => {
    setPage(p => Math.max(1, p - 1));
  };

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Carousel Backgrounds */}
        {[
          banner1,
          banner2,
          banner3,
          banner4
        ].map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <img
              alt={`Hero Slide ${index + 1}`}
              className="w-full h-full object-cover"
              src={img}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentHeroSlide === idx
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>
      {/* Trust Badges */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: 'local_shipping', title: 'Frete Grátis', desc: 'Para retirada em João Pessoa - PB' },
            { icon: 'payment', title: 'Pagamento Facilitado', desc: 'Combine diretamente no WhatsApp' },
            { icon: 'verified_user', title: 'Qualidade', desc: 'Produtos de qualidade' },
            { icon: 'support_agent', title: 'Atendimento', desc: 'Atendimento rápido e eficiente' }
          ].map((badge, i) => (
            <div key={badge.icon} className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">{badge.icon}</span>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{badge.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <section id="collection" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/5 rounded-full border border-primary/10">
              Em Destaque
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                NOVIDADES
              </span>
            </h2>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-12 bg-primary"></div>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Nossos itens mais recentes
              </p>
            </div>
          </div>
          <a href="#/collection" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-slate-900 dark:hover:text-white transition-colors">
            Ver todos
            <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </a>
        </div>

        <div className="relative group">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 transition-opacity duration-300 ${loading && products.length > 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            {loading && products.length === 0 ? (
              <div className="col-span-4 text-center py-20">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse inline-block"></span>
                <span className="ml-2 text-xs font-bold uppercase tracking-widest text-slate-400">Carregando Galeria...</span>
              </div>
            ) : error ? (
              <div className="col-span-4 text-center py-20 text-red-500 bg-red-50/10 rounded-lg border border-red-500/20">
                <p className="font-bold mb-2">⚠ ERRO AO CARREGAR PRODUTOS</p>
                <code className="text-sm opacity-80">{error}</code>
              </div>
            ) : (
              <>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
                {products.length === 0 && (
                  <div className="col-span-4 text-center py-20">
                    <p className="text-slate-500 text-sm uppercase tracking-widest">Fim da coleção</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Side Navigation Arrows */}
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || loading}
            className="absolute top-1/2 -left-20 -translate-y-1/2 w-14 h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white flex items-center justify-center hover:bg-white/50 dark:hover:bg-black/50 hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed transition-all shadow-2xl z-10 opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
          </button>

          <button
            onClick={handleNextPage}
            disabled={products.length < ITEMS_PER_PAGE || loading}
            className="absolute top-1/2 -right-20 -translate-y-1/2 w-14 h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-white flex items-center justify-center hover:bg-white/50 dark:hover:bg-black/50 hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed transition-all shadow-2xl z-10 opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
        </div>

        {/* Page Indicator (Bottom) */}
        <div className="flex justify-center mt-12">
          <span className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">Página {page}</span>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary mb-8 animate-pulse">Qualidade</h3>
          <p className="text-3xl md:text-5xl font-display font-light leading-relaxed max-w-4xl tracking-tight">
            Os melhores produtos para você <span className="font-bold text-primary italic">com qualidade</span>.
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
