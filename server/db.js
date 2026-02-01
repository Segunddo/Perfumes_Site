const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the database file is stored in the server directory
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize Database Schema
const initDb = () => {
    db.serialize(() => {
        // Create Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price TEXT NOT NULL,
            category TEXT NOT NULL,
            rating REAL DEFAULT 0,
            reviews INTEGER DEFAULT 0,
            img TEXT,
            description TEXT,
            tag TEXT,
            oldPrice TEXT
        )`, (err) => {
            if (err) {
                console.error("Error creating products table:", err.message);
            } else {
                console.log("Products table ready.");
            }
        });
    });
};

// Promisified Helper Functions
const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const all = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = {
    db,
    initDb,
    run,
    get,
    all
};
