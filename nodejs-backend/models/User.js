const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

class User {
    static async findById(id) {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id]
        };

        try {
            const { rows } = await pool.query(query);
            if (rows.length > 0) {
                return rows[0];  // Return the user
            } else {
                return null;  // User not found
            }
        } catch (err) {
            console.error('Error executing query', err.stack);
            throw err;
        }
    }

    static async findOrCreate({ googleId, name, email }) {
        const queryFind = {
            text: 'SELECT * FROM users WHERE google_id = $1',
            values: [googleId]
        };

        try {
            const res = await pool.query(queryFind);
            if (res.rows.length) {
                return res.rows[0];  // User found
            } else {
                // User not found, create new
                const queryCreate = {
                    text: 'INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING *',
                    values: [googleId, name, email]
                };
                const result = await pool.query(queryCreate);
                return result.rows[0];  // Return new user
            }
        } catch (err) {
            console.error('Error executing query', err.stack);
            throw err;
        }
    }
}

module.exports = User;
