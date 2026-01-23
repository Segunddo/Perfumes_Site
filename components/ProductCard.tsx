
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a 
      href={`#/product/${product.id}`}
      className="group relative block animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-6 relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {product.tag && (
          <span className="absolute top-5 left-5 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md uppercase tracking-widest">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-5 left-5 right-5 bg-white/95 dark:bg-slate-900/95 py-4 rounded-2xl font-bold text-center text-xs uppercase tracking-widest shadow-2xl backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          View Masterpiece
        </div>
      </div>
      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
            {product.name}
          </h3>
          <span className="font-bold text-lg text-slate-900 dark:text-white">{product.price}</span>
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{product.category}</p>
        <div className="flex items-center mt-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`material-symbols-outlined text-[14px] ${i < Math.floor(product.rating) ? 'text-primary fill-1' : 'text-slate-300'}`}>star</span>
          ))}
          <span className="text-[10px] text-slate-400 ml-1">({product.reviews})</span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
