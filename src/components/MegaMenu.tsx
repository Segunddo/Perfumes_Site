
import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/productService';
import { Category } from '../types';

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[800px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <header className="flex items-center justify-between px-10 py-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white">grid_view</span>
            </div>
            <div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight uppercase">Ize Parfums</h2>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Selecione a Categoria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-80 border-r border-gray-100 dark:border-gray-800 flex flex-col bg-gray-50/30 dark:bg-gray-950/40 p-8 shrink-0">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Departamentos</h3>
            <nav className="space-y-2">
              {categories.slice(0, 5).map((cat, i) => (
                <button
                  key={cat.title}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${i === 0 ? 'bg-primary/10 text-primary font-bold' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                    <span className="text-[15px]">{cat.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Clube VIP</p>
                  <p className="text-sm font-semibold mb-5 leading-tight">Frete grátis em todos os itens premium.</p>
                  <button className="w-full py-3 bg-white text-primary text-xs font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all">Assinar Agora</button>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-10 bg-white dark:bg-slate-900 custom-scrollbar">
            <div className="mb-10">
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Perfumes Exclusivos</h1>
              <p className="text-slate-400 mt-2">Descubra a sua nova assinatura olfativa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  onClick={onClose}
                  className="group block p-6 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer"
                >
                  <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6 overflow-hidden relative shadow-sm">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-lg">{cat.icon}</span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{cat.count} Items</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">{cat.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Explore a coleção {cat.title.toLowerCase()}.</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
