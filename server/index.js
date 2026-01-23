const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');
const path = require('path');

// Configure dotenv to read from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;
const CART = [];

app.use(cors());
app.use(express.json());

// Initialize Gemini
let ai = null;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} else {
    console.warn("Warning: GEMINI_API_KEY not found in environment variables.");
}

// Product Context - Source of Truth
const PRODUCTS = [
    {
        id: 1,
        name: "Acoustic Pro Max Teste",
        price: "$299.00",
        category: "Audio Electronics",
        rating: 4.5,
        reviews: 128,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNwH07NL66abeGEOptCCYkCsqjxacnaB2XepBRgsqZc9UpLi9Xw-Bmy8i8SCnQRJx61FVKSl-QPy30X5m42OBSDdDzWAdw2AYGWcZ6ZuAFqGwns455nEWKVuHdjjgj9V_f5SaoWw45MW4pT-xdVwC2hScCe4btBHfZmfuPr3Lkj_pIJtFuuz5p_0lI85DxDV7IYWgNLbVnzoCwfguxBRXiaByNyiBsNgo6Q89nNvPCRbXeA-aaRx3tXDF7xolmz1oJkFdpfHVA9Xtv",
        description: "Experience high-fidelity audio with active noise cancellation and ergonomic comfort for all-day listening sessions."
    },
    {
        id: 2,
        name: "SleekTime V2",
        price: "$149.00",
        category: "Wearables",
        rating: 5,
        tag: "NEW",
        reviews: 84,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfHsjNvf5wu5RntGHl503rOIv5cYsV6DjOeXHJtKcFRh5r9iBbBDEvN18btm6LiWBgFUe8Cg0J_WEaParwAxFStiXZojoSyBSTV3dJ7yziqqk4wgaK4muxHB_Aa16rPkoupzegLS9UNGB00puVwnVB3Lr0S2AW4pxRHjWfnzPmJYjzLufYUD_5GdtiLYil7iosggn_58RmpMoKJpgRqSz9O-NMKGfbrgcg4676CpQz-43DNp_nqwLKm5W6rzLQdjCZsTgVeVKQdto",
        description: "A smartwatch that blends elegance with performance. Track your health, notifications, and goals with a stunning AMOLED display."
    },
    {
        id: 3,
        name: "Nitro Run Red",
        price: "$89.00",
        oldPrice: "$110.00",
        category: "Fashion Footwear",
        rating: 5,
        tag: "20% OFF",
        reviews: 210,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmuFiA__nNmNKcmw4Zea1olTJOPS4hpP5wRiYzJ4wf8OThWIOaB4CoEcja6grL3myesnxNdWa_JBGI9yIwaQghHCBgQcuLXUhl3NTb-ubTisLlyIJY5ZYs9p5Zmx5ciflBTKd-WiqbJ5gozKC5dRJNz1JbSR2Rzzx6SExfYhYTL2k8k4maYjkdeLSDvHnJZhnvPB8Oeiz-xXybNO3FxvzXTnNhRwCluOz-Y4EQ8aTz0jspcnENNdemrjD7aawVzXkrVZ9a8T0orFXU",
        description: "Lightweight performance running shoes designed for maximum energy return and breathability."
    },
    {
        id: 4,
        name: "Urban Nomad Bag",
        price: "$75.00",
        category: "Accessories",
        rating: 4,
        reviews: 45,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQxi2KsB5akxo0x-vYfwXyCYeVsSp3kuoVrHm-CZwWvJitECFAvkK9xjHeWXWysNdU-wfGbqST3E2mxey25wxXF8NqCGP-J3TEJCELqrdKHV5ehRetdriSmi7VPOBahM2AGvrPvlZPnA_dh8Dk81iimzcis8At4zhfJgFn8NN8a8OEzEng9-5ZXRr-T3YCSTqsc1K4ysG_FwhixjzMuZMXO_9ITXueAB6P6GLErKfdCDOBesZul98pxm3J9_4yq0PoWJKbCQU5DXZ6",
        description: "Versatile, waterproof, and stylish. The perfect companion for your daily city commute or weekend adventures."
    },
    {
        id: 5,
        name: "IZ Laptop Pro",
        price: "$2,499.00",
        category: "Electronics",
        rating: 5,
        reviews: 320,
        tag: "PRO",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwf0vLtP9hdx8wU6pdm9r7K_2a2D4r6vpgXGdSyiTdIwL_IhVVikamrPQpOc74CUk1Q4EicPLBq4by0w1NR57b7EbY_PdS8MXYNmDPWvd9gkgEtGOGnTjPvN_6iPSf6uPT5nttJpoiyaS_7FayhL43Pfo52VBlQcNulNV4s9GpXIaqm9AlL0Ea2Id0UpqhvhJg6kVEDkuvGTI4FRY7GXtBN-k6vz34rYL5zEaF_GP6oXIA17iJqwcZa43Lpq4vVBUwwfi6atZobCzl",
        description: "The ultimate power tool for creatives. 32GB RAM, 1TB SSD, and a stunning 16-inch liquid retina display."
    }
];

app.get('/api/products', (req, res) => {
    console.log('GET /api/products request received');
    res.json(PRODUCTS);
});

app.post('/api/chat', async (req, res) => {
    console.log('POST /api/chat request received');
    const { message } = req.body;

    if (!ai) {
        return res.status(503).json({
            response: "I am currently in demo mode. Please configure the GEMINI_API_KEY to enable my full capabilities."
        });
    }

    try {
        const productsContext = PRODUCTS.map(p => `${p.name} (${p.category}): ${p.price}`).join(', ');
        const systemInstruction = `
      You are a helpful and premium-style personal shopping assistant for "IzeShop", an elite online retailer.
      Your tone should be sophisticated, professional, and helpful.
      Available products are: ${productsContext}.
      If the user asks for recommendations, mention these specific products.
      Keep responses concise and elegant.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: message,
            config: {
                systemInstruction,
                temperature: 0.7,
            }
        });

        res.json({ response: response.text() });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            response: "Our systems are experiencing a brief delay. I am here to help as soon as possible."
        });
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
