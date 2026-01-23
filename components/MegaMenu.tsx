
import React from 'react';
import { CATEGORIES } from '../constants';

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[800px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <header className="flex items-center justify-between px-10 py-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white">grid_view</span>
            </div>
            <div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight uppercase">Ize Collection</h2>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Select your department</p>
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
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Main Departments</h3>
            <nav className="space-y-2">
              {['Electronics', 'Fashion', 'Home Decor', 'Accessories', 'Sports'].map((dept, i) => (
                <button 
                  key={dept} 
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${i === 0 ? 'bg-primary/10 text-primary font-bold' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-2xl">{['devices', 'apparel', 'chair', 'watch', 'fitness_center'][i]}</span>
                    <span className="text-[15px]">{dept}</span>
                  </div>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">PRO Membership</p>
                  <p className="text-sm font-semibold mb-5 leading-tight">Unlock free express shipping on all premium items.</p>
                  <button className="w-full py-3 bg-white text-primary text-xs font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all">Upgrade Now</button>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-10 bg-white dark:bg-slate-900 custom-scrollbar">
            <div className="mb-10">
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Tech & Lifestyle</h1>
              <p className="text-slate-400 mt-2">Discover our most innovative collection yet.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((cat) => (
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
                  <p className="text-xs text-slate-400 mt-1">Explore our premium {cat.title.toLowerCase()} collection.</p>
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
