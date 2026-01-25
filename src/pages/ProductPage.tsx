
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart({ ...product, quantity });
      navigate('/cart'); // Leva pro carrinho
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse inline-block"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-20">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <a href="#/" className="px-6 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs">Return to Store</a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex-grow">
        <a
          href="#/"
          className="mb-12 inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-primary transition-all group"
        >
          <span className="material-symbols-outlined mr-3 text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Selection
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Gallery */}
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-700">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl group">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-primary cursor-pointer transition-all overflow-hidden group">
                  <img src={product.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col animate-in slide-in-from-right-10 duration-700">
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-8">
                <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{product.price}</div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-primary fill-1 text-base">star</span>
                    <span className="ml-2 font-bold text-sm">{product.rating}</span>
                  </div>
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-widest ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12 font-medium">
              {product.description || "Designed for those who appreciate the finer details. Each piece in our collection is meticulously crafted to offer not just a product, but an experience. Elevate your daily routine with IzeShop excellence."}
            </p>

            <div className="space-y-10 mb-12">
              <div className="flex items-center gap-8">
                <span className="font-bold text-[10px] uppercase tracking-[0.2em] w-24 text-slate-400">Quantity</span>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full p-1.5 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm flex items-center justify-center transition-all"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 rounded-full hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm flex items-center justify-center transition-all"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-6 bg-primary text-white rounded-[1.5rem] font-bold text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group"
              >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">shopping_bag</span> Add to Bag
              </button>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-12">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1">Express Delivery</p>
                  <p className="text-[11px] text-slate-500 font-medium">24-48 hours premium courier</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest mb-1">Global Warranty</p>
                  <p className="text-[11px] text-slate-500 font-medium">3-year comprehensive plan</p>
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

export default ProductPage;
