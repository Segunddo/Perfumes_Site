const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { initDb, run, get, all } = require('./db');

const fs = require('fs');
const multer = require('multer');

// Configure dotenv to read from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Sanitize: remove special chars and spaces, lower case extension
        const sanitized = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_').toLowerCase();
        cb(null, Date.now() + '-' + sanitized);
    }
});
const upload = multer({ storage });

const CART = [];

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize DB
initDb();

// Product Context - Source of Truth (For Seeding Only)
const SEED_PRODUCTS = [];

// Seed Database function
const seedDatabase = async () => {
    try {
        const count = await get("SELECT count(*) as count FROM products");
        if (count.count === 0) {
            console.log("Seeding database...");
            for (const p of SEED_PRODUCTS) {
                await run(
                    `INSERT INTO products (name, price, category, rating, reviews, img, description, tag, oldPrice) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [p.name, p.price, p.category, p.rating, p.reviews, p.img, p.description, p.tag, p.oldPrice]
                );
            }
            console.log("Database seeded successfully.");
        }
    } catch (err) {
        console.error("Error seeding database:", err);
    }
};

// Start seeding a few seconds after startup to ensure table exists
setTimeout(seedDatabase, 2000);

// Helper for icons
const getIconForCategory = (cat) => {
    const lower = cat.toLowerCase();
    if (lower === 'masculino') return 'man';
    if (lower === 'feminino') return 'woman';
    if (lower === 'unissex') return 'wc';
    if (lower === 'kits') return 'redeem';
    if (lower === 'marcas') return 'verified';
    return 'star';
};

// ROUTES
app.get('/api/categories', async (req, res) => {
    try {
        const rows = await all("SELECT category as title, count(*) as count, min(img) as img FROM products GROUP BY category");
        const categories = rows.map(r => ({
            ...r,
            title: r.title,
            count: r.count + ' Items', // Format strictly for frontend compatibility
            icon: getIconForCategory(r.title)
        }));
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    const { q, _page, _limit } = req.query;
    try {
        let sql = "SELECT * FROM products WHERE 1=1";
        const params = [];

        if (q) {
            sql += " AND (name LIKE ? OR category LIKE ?)";
            params.push(`%${q}%`, `%${q}%`);
        }

        // Default sort: ID desc (newest first)
        sql += " ORDER BY id DESC";

        if (_page && _limit) {
            const limit = parseInt(_limit);
            const offset = (parseInt(_page) - 1) * limit;
            sql += " LIMIT ? OFFSET ?";
            params.push(limit, offset);
        }

        const rows = await all(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const row = await get("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE Product
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price, category, description, tag, oldPrice, img: valImg } = req.body;
    let img = valImg;

    if (req.file) {
        // Force localhost for development
        img = `http://localhost:5001/uploads/${req.file.filename}`;
        console.log("Image uploaded:", img);
    }

    try {
        const result = await run(
            `INSERT INTO products (name, price, category, img, description, tag, oldPrice, rating, reviews) 
             VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)`,
            [name, price, category, img, description, tag, oldPrice]
        );
        res.json({ id: result.id, message: 'Product created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE Product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const { name, price, category, description, tag, oldPrice, img: valImg } = req.body;
    let img = valImg; // Default to existing URL or hidden input

    if (req.file) {
        // Force localhost for development
        img = `http://localhost:5001/uploads/${req.file.filename}`;
        console.log("Image updated:", img);
    }

    try {
        await run(
            `UPDATE products SET name = ?, price = ?, category = ?, img = ?, description = ?, tag = ?, oldPrice = ? 
             WHERE id = ?`,
            [name, price, category, img, description, tag, oldPrice, req.params.id]
        );
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await run("DELETE FROM products WHERE id = ?", [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cart Routes (Still In-Memory for now)
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
        CART.splice(index, 1);
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

// LOGIN
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) { // In production, use env var
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Senha Incorreta' });
    }
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
