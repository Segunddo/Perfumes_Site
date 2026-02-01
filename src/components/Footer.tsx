
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">

          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div>
              <span className="text-3xl font-display font-bold text-white tracking-tight italic block mb-4">
                MARTA<span className="font-normal">PERFUMES</span>
              </span>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Marta Perfumes</p>
                <p>Rua maria clotilde costa tavares de albuquerque, 36</p>
                <p>Telefone: +55 83 99639-4713</p>
                <p>Email: jvjabuge@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
                <span className="material-symbols-outlined text-green-500 text-lg">verified_user</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-slate-400">Google</span>
                  <span className="text-xs font-bold">Navegação Segura</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
                <span className="material-symbols-outlined text-blue-500 text-lg">security</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-slate-400">SSL</span>
                  <span className="text-xs font-bold">SEGURO</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-2 justify-center">
              {[
                { name: 'instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
                { name: 'tiktok', icon: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg' }
              ].map(social => (
                <a key={social.name} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                  <img src={social.icon} alt={social.name} className="w-4 h-4 object-contain" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <p className="text-xs text-slate-400 leading-relaxed text-center">
            Preços e condições de pagamento exclusivos para compras via internet. Ofertas válidas enquanto durarem os estoques. © 2024 Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
