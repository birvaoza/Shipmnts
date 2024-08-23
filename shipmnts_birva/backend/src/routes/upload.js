const express = require('express');
const { pool } = require('../database');
const validateRow = require('../validation');

const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        for (const row of data) {
            const error = validateRow(row);
            if (error) {
                return res.status(400).send(error);
            }

            const authorQuery = `
                INSERT INTO Authors (name, email, date_of_birth)
                VALUES ($1, $2, $3) RETURNING id`;
            const authorValues = [row['Author Name'], row['Email'], row['Date of Birth']];
            const authorResult = await pool.query(authorQuery, authorValues);

            const bookQuery = `
                INSERT INTO Books (name, isbn_code, author_id)
                VALUES ($1, $2, $3)`;
            const bookValues = [row['Book Name'], row['ISBN Code'], authorResult.rows[0].id];
            await pool.query(bookQuery, bookValues);
        }

        res.status(200).send('Data successfully uploaded');
    } catch (error) {
        res.status(500).send('Server error during upload');
    }
});

module.exports = router;
