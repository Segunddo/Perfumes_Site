const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');

// Configure dotenv to read from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const CART = [];

app.use(cors());
app.use(express.json());



// Product Context - Source of Truth
const PRODUCTS = [
    {
        id: 1,
        name: "Acoustic Pro Max Teste",
        price: "R$299.00",
        category: "Eletrônicos, Áudio e Vídeo",
        rating: 4.5,
        reviews: 128,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNwH07NL66abeGEOptCCYkCsqjxacnaB2XepBRgsqZc9UpLi9Xw-Bmy8i8SCnQRJx61FVKSl-QPy30X5m42OBSDdDzWAdw2AYGWcZ6ZuAFqGwns455nEWKVuHdjjgj9V_f5SaoWw45MW4pT-xdVwC2hScCe4btBHfZmfuPr3Lkj_pIJtFuuz5p_0lI85DxDV7IYWgNLbVnzoCwfguxBRXiaByNyiBsNgo6Q89nNvPCRbXeA-aaRx3tXDF7xolmz1oJkFdpHVA9Xtv",
        description: "Experience high-fidelity audio with active noise cancellation and ergonomic comfort for all-day listening sessions."
    },
    {
        id: 2,
        name: "SleekTime V2",
        price: "R$149.00",
        category: "Saúde e Bem-estar",
        rating: 5,
        tag: "NEW",
        reviews: 84,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfHsjNvf5wu5RntGHl503rOIv5cYsV6DjOeXHJtKcFRh5r9iBbBDEvN18btm6LiWBgFUe8Cg0J_WEaParwAxFStiXZojoSyBSTV3dJ7yziqqk4wgaK4muxHB_Aa16rPkoupzegLS9UNGB00puVwnVB3Lr0S2AW4pxRHjWfnzPmJYjzLufYUD_5GdtiLYil7iosggn_58RmpMoKJpgRqSz9O-NMKGfbrgcg4676CpQz-43DNp_nqwLKm5W6rzLQdjCZsTgVeVKQdto",
        description: "A smartwatch that blends elegance with performance. Track your health, notifications, and goals with a stunning AMOLED display."
    },
    {
        id: 3,
        name: "Nitro Run Red",
        price: "R$89.00",
        oldPrice: "R$110.00",
        category: "Esportes e Fitness",
        rating: 5,
        tag: "20% OFF",
        reviews: 210,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmuFiA__nNmNKcmw4Zea1olTJOPS4hpP5wRiYzJ4wf8OThWIOaB4CoEcja6grL3myesnxNdWa_JBGI9yIwaQghHCBgQcuLXUhl3NTb-ubTisLlyIJY5ZYs9p5Zmx5ciflBTKd-WiqbJ5gozKC5dRJNz1JbSR2Rzzx6SExfYhYTL2k8k4maYjkdeLSDvHnJZhnvPB3Oeiz-xXybNO3FxvzXTnNhRwCluOz-Y4EQ8aTz0jspcnENNdemrjD7aawVzXkrVZ9a8T0orFXU",
        description: "Lightweight performance running shoes designed for maximum energy return and breathability."
    },
    {
        id: 4,
        name: "Urban Nomad Bag",
        price: "R$75.00",
        category: "Bolsas e Acessórios",
        rating: 4,
        reviews: 45,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQxi2KsB5akxo0x-vYfwXyCYeVsSp3kuoVrHm-CZwWvJitECFAvkK9xjHeWXWysNdU-wfGbqST3E2mxey25wxXF8NqCGP-J3TEJCELqrdKHV5ehRetdriSmi7VPOBahM2AGvrPvlZPnA_dh8Dk81iimzcis8At4zhfJgFn8NN8a8OEzEng9-5ZXRr-T3YCSTqsc1K4ysG_FwhixjzMuZMXO_9ITXueAB6P6GLErKfdCDOBesZul98pxm3J9_4yq0PoWJKbCQU5DXZ6",
        description: "Versatile, waterproof, and stylish. The perfect companion for your daily city commute or weekend adventures."
    },
    {
        id: 5,
        name: "IZ Laptop Pro",
        price: "R$2,499.00",
        category: "Eletrônicos, Áudio e Vídeo",
        rating: 5,
        reviews: 320,
        tag: "PRO",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwf0vLtP9hdx8wU6pdm9r7K_2a2D4r6vpgXGdSyiTdIwL_IhVVikamrPQpOc74CUk1Q4EicPLBq4by0w1NR57b7EbY_PdS8MXYNmDPWvd9gkgEtGOGnTjPvN_6iPSf6uPT5nttJpoiyaS_7FayhL43Pfo52VBlQcNulNV4s9GpXIaqm9AlL0Ea2Id0UpqhvhJg6kVEDkuvGTI4FRY7GXtBN-k6vz34rYL5zEaF_GP6oXIA17iJqwcZa43Lpq4vVBUwwfi6atZobCzl",
        description: "The ultimate power tool for creatives. 32GB RAM, 1TB SSD, and a stunning 16-inch liquid retina display."
    },
    {
        id: 6,
        name: "Modern Vase Set",
        price: "R$45.00",
        category: "Casa e Jardim",
        rating: 4.5,
        reviews: 20,
        img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000",
        description: "Elegant vase set for modern home interiors."
    },
    {
        id: 7,
        name: "Organic Face Oil",
        price: "R$32.00",
        category: "Beleza e Cuidados Pessoais",
        rating: 4.8,
        reviews: 55,
        img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=1000",
        description: "Rejuvenating face oil made with 100% organic ingredients."
    },
    {
        id: 8,
        name: "Chef's Knife",
        price: "R$85.00",
        category: "Cozinha e Utilidades",
        rating: 5,
        reviews: 90,
        img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=1000",
        description: "Precision forged chef's knife for professional results."
    },
    {
        id: 9,
        name: "Plush Dog Bed",
        price: "R$60.00",
        category: "Pets e Animais de Estimação",
        rating: 4.7,
        reviews: 40,
        img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=1000",
        description: "Ultra-soft and supportive bed for your furry friends."
    },
    {
        id: 10,
        name: "Smart Home Cam",
        price: "R$50.00",
        category: "Segurança",
        rating: 4.2,
        reviews: 30,
        img: "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=1000",
        description: "Keep an eye on what matters most with HD security camera."
    },
    {
        id: 11,
        name: "Building Blocks",
        price: "R$25.00",
        category: "Brinquedos, Crianças e Bebês",
        rating: 4.9,
        reviews: 150,
        img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000",
        description: "Creative building blocks to spark imagination in kids."
    }
];

app.get('/api/categories', (req, res) => {
    console.log('GET /api/categories request received');

    // Dynamic Category Aggregation
    const categoryMap = {};

    PRODUCTS.forEach(product => {
        if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
                title: product.category,
                count: 0,
                img: product.img, // Use first product image as category image
                icon: 'category' // Default icon
            };
        }
        categoryMap[product.category].count += 1;
    });

    // Simple icon mapping helper
    const getIconForCategory = (cat) => {
        const lower = cat.toLowerCase();
        if (lower.includes('eletrônicos') || lower.includes('áudio') || lower.includes('vídeo')) return 'devices';
        if (lower.includes('saúde') || lower.includes('bem-estar')) return 'spa';
        if (lower.includes('esportes') || lower.includes('fitness')) return 'fitness_center';
        if (lower.includes('casa') || lower.includes('jardim')) return 'yard';
        if (lower.includes('beleza') || lower.includes('cuidados')) return 'face';
        if (lower.includes('cozinha') || lower.includes('utilidades')) return 'kitchen';
        if (lower.includes('pets') || lower.includes('animais')) return 'pets';
        if (lower.includes('segurança')) return 'security';
        if (lower.includes('brinquedos') || lower.includes('crianças') || lower.includes('bebês')) return 'child_care';
        if (lower.includes('bolsas') || lower.includes('acessórios')) return 'shopping_bag';

        return 'grid_view';
    };

    const categories = Object.values(categoryMap).map(cat => ({
        ...cat,
        icon: getIconForCategory(cat.title)
    }));

    res.json(categories);
});

app.get('/api/products', (req, res) => {
    console.log('GET /api/products request received');
    const { q, _page, _limit } = req.query;

    let results = PRODUCTS;

    // 1. Filter by Query
    if (q) {
        const lowerQ = q.toLowerCase();
        results = results.filter(p =>
            p.name.toLowerCase().includes(lowerQ) ||
            p.category.toLowerCase().includes(lowerQ)
        );
    }

    // Reverse order (Newest first / LIFO)
    results = [...results].reverse();

    // 2. Pagination
    if (_page && _limit) {
        const page = parseInt(_page);
        const limit = parseInt(_limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        results = results.slice(startIndex, endIndex);
    }

    res.json(results);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});



app.get('/api/cart', (req, res) => {
    res.json(CART);
});

app.post('/api/cart', (req, res) => {
    const product = req.body;
    CART.push(product);
    res.json({ message: 'Product added to cart' });
});

app.delete('/api/cart/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < CART.length) {
        CART.splice(index, 1); // Remove 1 item nessa posição
        res.json({ message: 'Item removed' });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.put('/api/cart/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { quantity } = req.body;

    if (index >= 0 && index < CART.length) {
        CART[index].quantity = quantity;
        res.json({ message: 'Cart updated' });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
