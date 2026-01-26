
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div>
              <span className="text-3xl font-display font-bold text-white tracking-tight italic block mb-4">
                IZE<span className="font-normal">SHOP</span>
              </span>
              <div className="space-y-2 text-sm text-slate-300">
                <p>FLEXCON COMÉRCIO LTDA CNPJ:</p>
                <p>36.607.684/0001-31</p>
                <p>Av. Piracema, 1411, Tamboré, Barueri – SP</p>
                <p>CEP: 06460-030</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
                <span className="material-symbols-outlined text-green-500 text-lg">verified_user</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-slate-400">Google</span>
                  <span className="text-xs font-bold">Safe Browsing</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-md border border-slate-700">
                <span className="material-symbols-outlined text-blue-500 text-lg">security</span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-slate-400">Norton</span>
                  <span className="text-xs font-bold">SECURED</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-2">
              {[
                { name: 'facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg' },
                { name: 'youtube', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' },
                { name: 'linkedin', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
                { name: 'instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
                { name: 'pinterest', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png' },
                { name: 'tiktok', icon: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg' }
              ].map(social => (
                <a key={social.name} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                  <img src={social.icon} alt={social.name} className="w-4 h-4 object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">ATENDIMENTO AO CLIENTE</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <p>SAC (Serviço de Atendimento ao Consumidor)</p>
              <p>Whatsapp: +55 (11) 91605-2870</p>
              <p>E-mail: <a href="mailto:contato@izeshop.com.br" className="text-white hover:text-primary transition-colors">contato@izeshop.com.br</a></p>

              <div className="pt-4 space-y-2">
                <p className="font-bold text-white">Horário de atendimento:</p>
                <p>Segunda à sex: 08:00 às 22:00</p>
                <p>Sabados, Domingos e Feriados: 10:00 às 18:00</p>
              </div>
            </div>
          </div>

          {/* Column 3: Help & Useful Info */}
          <div>
            <div className="mb-10">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">PRECISA DE AJUDA?</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><Link to="/" className="hover:text-primary transition-colors">Sua Conta</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Rastrear Pedido</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-white">INFORMAÇÕES ÚTEIS</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><Link to="/" className="hover:text-primary transition-colors">Garantia de Compra Segura</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Fretes e Prazos de Entrega</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Devolução e Reembolso</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <p className="text-xs text-slate-400 leading-relaxed text-center md:text-left">
            Preços e condições de pagamento exclusivos para compras via internet. Ofertas válidas na compra de até 5 peças de cada produto por cliente, até o término dos nossos estoques para internet. ® IZESHOP – Todos os direitos reservados. Endereço eletrônico: https://izeshop.com.br
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-white transition-colors">Aviso Legal</Link>
              <Link to="/" className="hover:text-white transition-colors">Termos de Uso</Link>
              <Link to="/" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <Link to="/" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
