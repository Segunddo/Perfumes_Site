import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types';

const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    // Product Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        img: '',
        description: '',
        tag: '',
        oldPrice: ''
    });

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products?_limit=1000'); // Fetch all
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });

            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                alert('Senha Incorreta');
            }
        } catch (err) {
            console.error(err);
            alert('Falha no login');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert('Falha ao excluir');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            img: product.img,
            description: product.description || '',
            tag: product.tag || '',
            oldPrice: product.oldPrice || ''
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setSelectedFile(null);
        setFormData({
            name: '',
            price: '',
            category: '',
            img: '',
            description: '',
            tag: '',
            oldPrice: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
            const method = editingProduct ? 'PUT' : 'POST';

            // Auto-format currency
            let formattedPrice = formData.price.trim();
            if (formattedPrice && !formattedPrice.startsWith('R$')) {
                formattedPrice = `R$${formattedPrice}`;
            }

            let formattedOldPrice = formData.oldPrice ? formData.oldPrice.trim() : '';
            if (formattedOldPrice && !formattedOldPrice.startsWith('R$')) {
                formattedOldPrice = `R$${formattedOldPrice}`;
            }

            // Use FormData for file upload
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formattedPrice);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('tag', formData.tag || '');
            data.append('oldPrice', formattedOldPrice);
            data.append('img', formData.img); // Keep existing URL/Path if no file

            if (selectedFile) {
                data.append('image', selectedFile);
            }

            const res = await fetch(url, {
                method,
                if(!res.ok) {
                    const text = await res.text();
            try {
                const errorData = JSON.parse(text);
                throw new Error(errorData.error || 'Falha ao salvar');
            } catch (e) {
                throw new Error(`Erro do servidor (${res.status}): ${text.substring(0, 200)}`);
            }
        }

            setIsModalOpen(false);
        fetchProducts(); // Refresh list
    } catch (err: any) {
        console.error(err);
        alert(`Erro ao salvar produto: ${err.message}`);
    }
};

if (!isAuthenticated) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black">
            <Header />
            <main className="flex-1 flex justify-center px-4 pt-32 pb-12">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-8">
                        <span className="material-symbols-outlined text-4xl text-primary mb-4">lock</span>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Acesso Admin</h1>
                        <p className="text-slate-500 text-sm mt-2">Digite a senha para gerenciar produtos</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all text-center tracking-widest"
                        />
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-32">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Painel Administrativo</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                    >
                        Sair
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Adicionar Produto
                    </button>
                </div>
            </div>

            {/* Product List */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100 dark:border-slate-800">
                                <th className="p-6">Imagem</th>
                                <th className="p-6">Nome</th>
                                <th className="p-6">Categoria</th>
                                <th className="p-6">Preço</th>
                                <th className="p-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="p-6">
                                        <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden">
                                            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-6 font-bold text-slate-900 dark:text-white">{product.name}</td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-6 font-medium text-slate-600 dark:text-slate-300">{product.price}</td>
                                    <td className="p-6">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                        {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Categoria</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Unissex">Unissex</option>
                                    <option value="Kits">Kits</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preço (ex: R$200.00)</label>
                                <input
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preço Antigo (Opcional)</label>
                                <input
                                    value={formData.oldPrice}
                                    onChange={e => setFormData({ ...formData, oldPrice: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Imagem do Produto</label>

                            {/* Preview */}
                            {(selectedFile || formData.img) && (
                                <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden mb-2">
                                    <img
                                        src={selectedFile ? URL.createObjectURL(selectedFile) : formData.img}
                                        alt="Prévia"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}

                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setSelectedFile(e.target.files[0]);
                                        }
                                    }}
                                    className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-xs file:font-semibold
                                            file:bg-primary file:text-white
                                            hover:file:opacity-90 transition-all font-mono"
                                />
                            </div>
                            {/* Hidden input to store existing URL if needed logic */}
                            <input type="hidden" value={formData.img} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Descrição</label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tag (ex: NOVIDADE, PROMOÇÃO)</label>
                            <input
                                value={formData.tag}
                                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary transition-all"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs bg-primary text-white hover:opacity-90 transition-opacity"
                            >
                                Salvar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        <Footer />
    </div>
);
};

export default AdminPage;
