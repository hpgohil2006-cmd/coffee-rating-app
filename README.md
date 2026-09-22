# ☕ Coffee Rating Application

A full-stack interactive coffee voting application that allows users to explore coffee blends, vote for their favourites, and view a live top-rated leaderboard.

## 🚀 Features

* Responsive coffee product grid
* Interactive voting system
* Persistent vote storage using SQLite
* REST API with Node.js and Express
* Live vote count updates without page refresh
* Top-rated coffee leaderboard
* API validation and error handling
* Mobile-friendly responsive interface

## 🛠️ Technologies

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* SQLite
* Better-SQLite3
* REST API

## 📡 API Endpoints

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/coffees`          | Get all coffee blends |
| POST   | `/api/coffees/:id/vote` | Add one vote          |
| GET    | `/api/coffees/top`      | Get top-rated coffees |
| GET    | `/api/health`           | Check API status      |

## ▶️ Run Locally

```bash
cd backend
npm install
npm run seed
npm start
```

Open:

```text
http://localhost:5000
```

## 📂 Project Structure

```text
coffee-rating-app/
├── backend/
│   ├── database.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## 🎯 Project Objective

The application demonstrates stateful voting mechanisms, backend API persistence, database count increments, dynamic UI updates, and leaderboard functionality.

## 📌 Submission

**GitHub Repository:** Add your GitHub repository URL here.

**Live Web URL:** Add your deployed application URL here.
