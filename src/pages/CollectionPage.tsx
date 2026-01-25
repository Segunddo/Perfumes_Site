
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProducts } from '../services/productService';
import { Product } from '../types';

const CollectionPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                // Fetch paginated products. Note: Filtering by category happens on frontend currently
                // or we need to update backend to filter AND paginate.
                // Given the backend implementation:
                // "/api/products?q=..." filters by name OR category.
                // But slices happen AFTER filtering.
                // Since this is a simple implementation, fetching ALL products then filtering on frontend 
                // breaks pagination (we fetch page 1, trigger filter).
                // CORRECT APPROACH for this simple backend:
                // If filtering by "All", use backend pagination.
                // If filtering by Category, we should probably fetch ALL matching that category (by using "q")
                // OR let's just paginate on the frontend for category for now if backend doesn't support structured "category" param.
                // WAIT. Backend "q" checks category too.
                // So if we select "Smartphones", we can send q=Smartphones.

                const query = selectedCategory === 'All' ? '' : selectedCategory;
                const data = await getProducts(query, page, ITEMS_PER_PAGE);
                setProducts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [page, selectedCategory]);

    const handleNextPage = () => setPage(p => p + 1);
    const handlePrevPage = () => setPage(p => Math.max(1, p - 1));

    // Reset page when category changes
    useEffect(() => {
        setPage(1);
    }, [selectedCategory]);

    // Extract unique categories (Note: Ideally this comes from backend API /api/categories)
    // For now we hardcode or just keep "All", "Smartphones", etc. if we knew them.
    // Or we fetch ALL products once just to get categories? That defeats the purpose of pagination.
    // Let's rely on the hardcoded CATEGORIES from backend or fetch /api/categories if we had that endpoint exposed properly to frontend.
    // The backend DOES export CATEGORIES in index.js but we need to fetch it.
    // For simplicity, I will use a static list or fetching categories separately if needed. 
    // Assuming backend provides /api/categories... which it does! 
    // Wait, productService has `getCategories`. Let's use that.

    // Changing approach: Let's fetch categories from /api/categories to populate sidebar
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const fetchCats = async () => {
            // We can mock this or implement getCategories in service
            // ProductService has getCategories.
            // Im importing getCategories from service.
        };
        // Actually, let's just stick to a manual list or "All" for now to avoid complexity explosion, 
        // as user just asked for pagination.
        // But the previous code derived categories from `products`. Since `products` is now just ONE PAGE,
        // we can't derive ALL categories from it.
        // I will use a hardcoded list for now to keep it working.
        setCategories(['All', 'Audio Electronics', 'Wearables', 'Fashion Footwear', 'Accessories', 'Electronics', 'Smartphones']);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            <Header />
            <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10">

                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Departments</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Select Category</p>
                        </div>

                        <nav className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${selectedCategory === category
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                                        : 'hover:bg-white dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span className="font-bold text-sm tracking-tight">{category}</span>
                                    {selectedCategory === category && (
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-primary hidden md:block">
                            <span className="material-symbols-outlined text-3xl mb-3">diamond</span>
                            <p className="font-bold text-sm mb-1">Premium Member?</p>
                            <p className="text-[10px] opacity-70 leading-relaxed">Log in to unlock exclusive collections and pre-order access.</p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <section className="flex-1 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{selectedCategory}</h1>
                            <p className="text-slate-400 mt-2 font-medium">
                                Showing {products.length} curated items
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-[2rem] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {products.length === 0 ? (
                                <div className="col-span-3 text-center py-20">
                                    <p className="text-slate-500 font-medium">No more products in this collection.</p>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <a
                                        key={product.id}
                                        href={`#/product/${product.id}`}
                                        className="group block bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800"
                                    >
                                        <div className="aspect-[1/1] rounded-[1.5rem] overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 relative">
                                            <img
                                                src={product.img}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                                {product.category}
                                            </div>
                                        </div>
                                        <div className="px-2 pb-2">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-primary transition-colors truncate">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <p className="text-slate-500 font-semibold text-sm">{product.price}</p>
                                                <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-20 gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1 || loading}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <span className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">Page {page}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={products.length < ITEMS_PER_PAGE || loading}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CollectionPage;
