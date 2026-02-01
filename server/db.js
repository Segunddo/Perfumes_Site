const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
const path = require('path');

// Determine if we are using Postgres or SQLite
const isPostgres = !!process.env.DATABASE_URL;

let db;
let pool;

// Helper to convert SQLite '?' params to Postgres '$1, $2' params
const convertSql = (sql) => {
    if (!isPostgres) return sql;
    let index = 1;
    return sql.replace(/\?/g, () => `$${index++}`);
};

if (isPostgres) {
    console.log("Using PostgreSQL Database");
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    // Test connection
    pool.query('SELECT NOW()', (err, res) => {
        if (err) console.error("Postgres connection error", err);
        else console.log("Connected to PostgreSQL");
    });

} else {
    console.log("Using SQLite Database (Local)");
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) console.error('Error opening database ' + dbPath, err.message);
        else console.log('Connected to the SQLite database.');
    });
}

const initDb = async () => {
    const tableSchema = `
        CREATE TABLE IF NOT EXISTS products (
            id ${isPostgres ? 'SERIAL' : 'INTEGER'} PRIMARY KEY ${isPostgres ? '' : 'AUTOINCREMENT'},
            name TEXT NOT NULL,
            price TEXT NOT NULL,
            category TEXT NOT NULL,
            rating REAL DEFAULT 0,
            reviews INTEGER DEFAULT 0,
            img TEXT,
            description TEXT,
            tag TEXT,
            oldPrice TEXT
        )
    `;

    try {
        await run("DROP TABLE IF EXISTS product_temp_fix"); // Cleanup if needed
        if (isPostgres) {
            await pool.query(tableSchema);
        } else {
            db.serialize(() => {
                db.run(tableSchema);
            });
        }
        console.log("Products table ready.");
    } catch (err) {
        console.error("Error initializing DB:", err);
    }
};

const run = (sql, params = []) => {
    const finalSql = convertSql(sql);
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            pool.query(finalSql, params, (err, res) => {
                if (err) reject(err);
                else {
                    // Normalize return for INSERTs
                    const id = res.rows[0]?.id; // Ensure RETURNING id is used in SQL if needed
                    resolve({ id, changes: res.rowCount });
                }
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        }
    });
};

const get = (sql, params = []) => {
    const finalSql = convertSql(sql);
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            // Limit 1 for get
            pool.query(finalSql, params, (err, res) => {
                if (err) reject(err);
                else resolve(res.rows[0]);
            });
        } else {
            db.get(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        }
    });
};

const all = (sql, params = []) => {
    const finalSql = convertSql(sql);
    return new Promise((resolve, reject) => {
        if (isPostgres) {
            pool.query(finalSql, params, (err, res) => {
                if (err) reject(err);
                else resolve(res.rows);
            });
        } else {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }
    });
};

module.exports = {
    initDb,
    run,
    get,
    all,
    isPostgres
};
