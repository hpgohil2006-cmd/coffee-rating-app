const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./database");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
    GET ALL COFFEES
*/
app.get("/api/coffees", (req, res) => {
    try {
        const coffees = db
            .prepare(`
                SELECT id, name, description, category, votes
                FROM coffees
                ORDER BY votes DESC, id ASC
            `)
            .all();

        res.json({
            success: true,
            data: coffees
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to load coffees."
        });
    }
});

/*
    VOTE FOR COFFEE
*/
app.post("/api/coffees/:id/vote", (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid coffee ID."
            });
        }

        const coffee = db
            .prepare("SELECT * FROM coffees WHERE id = ?")
            .get(id);

        if (!coffee) {
            return res.status(404).json({
                success: false,
                message: "Coffee not found."
            });
        }

        db.prepare(`
            UPDATE coffees
            SET votes = votes + 1
            WHERE id = ?
        `).run(id);

        const updatedCoffee = db
            .prepare(`
                SELECT id, name, description, category, votes
                FROM coffees
                WHERE id = ?
            `)
            .get(id);

        res.json({
            success: true,
            message: "Vote recorded successfully.",
            data: updatedCoffee
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to record vote."
        });
    }
});

/*
    TOP RATED COFFEES
*/
app.get("/api/coffees/top", (req, res) => {
    try {
        const coffees = db
            .prepare(`
                SELECT id, name, description, category, votes
                FROM coffees
                ORDER BY votes DESC, id ASC
                LIMIT 5
            `)
            .all();

        res.json({
            success: true,
            data: coffees
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to load leaderboard."
        });
    }
});

/*
    HEALTH CHECK
*/
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Coffee Rating API is running."
    });
});

/*
    SERVE FRONTEND
*/
app.use(express.static(path.join(__dirname, "../frontend")));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log(`Coffee Rating App running on port ${PORT}`);
});