
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight block mb-6">
              ize<span className="text-primary">shop</span>.com.br
            </span>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              Elevating the Brazilian retail landscape with globally curated premium electronics, fashion, and lifestyle essentials. Quality meets sophistication.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-xl">share</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-900 dark:text-white">Experience</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">New Season</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Most Wanted</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Curated Lists</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Exclusives</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-900 dark:text-white">Care</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Contact Expert</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 uppercase tracking-widest font-medium">
          <p>© 2024 IZESHOP.COM.BR. Premium Retail Worldwide.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span>Brazil Edition</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
