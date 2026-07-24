const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
    user: "u0_a352",      // Change if your PostgreSQL username is different
    host: "localhost",
    database: "clickdb",
    password: "",          // Add your password if you have one
    port: 5432,
});

app.use(express.json());
app.use(express.static("public"));

app.post("/save", async (req, res) => {
    try {
        const { text } = req.body;

        await pool.query(
            "INSERT INTO clicks(text) VALUES($1)",
            [text]
        );

        res.json({
            success: true,
            message: "Saved successfully."
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
