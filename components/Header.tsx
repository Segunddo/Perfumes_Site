
import React, { useState, useEffect, useRef } from 'react';
import MegaMenu from './MegaMenu';
import { PRODUCTS } from '../constants';

import { getCart } from '../services/cartService';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCartCount = async () => {
      const items = await getCart();
      setCartCount(items.length);
    };
    fetchCartCount();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredProducts = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex-shrink-0 flex items-center transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <a href="#/" className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              ize<span className="text-primary">shop</span>.com.br
            </a>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex space-x-10 items-center transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-sm font-semibold hover:text-primary transition-colors focus:outline-none uppercase tracking-widest text-slate-900 dark:text-white"
            >
              Collection
            </button>
            <a href="#/" className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest text-slate-900 dark:text-white">New Arrivals</a>
            <a href="#/" className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest text-slate-900 dark:text-white">Deals</a>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300 text-slate-900 dark:text-white ${isSearchOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>

            <a href="#/cart" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </a>

            <button
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-white"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <span className="material-symbols-outlined dark:hidden">dark_mode</span>
              <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
          </div>
        </div>

        {/* Search Overlay Container - Adjusted for visibility */}
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-1 z-[60] px-4">
            {/* Search Bar */}
            <div className="w-full max-w-2xl flex items-center gap-4 bg-white dark:bg-slate-800 px-6 py-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl transition-all duration-300">
              <span className="material-symbols-outlined text-primary">search</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Searching for excellence..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 font-medium text-lg outline-none"
                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              />
              <button
                onClick={closeSearch}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Results Dropdown - Now explicitly below the bar */}
            {searchQuery.trim() !== '' && (
              <div className="w-full max-w-2xl mt-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">
                {filteredProducts.length > 0 ? (
                  <div className="p-4">
                    <p className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Curated Results</p>
                    <div className="space-y-1">
                      {filteredProducts.map(product => (
                        <a
                          key={product.id}
                          href={`#/product/${product.id}`}
                          onClick={closeSearch}
                          className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 block"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">{product.name}</h4>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{product.price}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-200 mb-4">search_off</span>
                    <p className="text-slate-500 font-medium">No masterpieces found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {isMenuOpen && <MegaMenu onClose={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Header;
