const db = require("./database");

const coffees = [
    {
        name: "Classic Espresso",
        description: "Rich, bold and perfectly roasted espresso.",
        category: "Espresso"
    },
    {
        name: "Mocha Delight",
        description: "Smooth coffee with a delicious chocolate flavour.",
        category: "Mocha"
    },
    {
        name: "Cold Brew",
        description: "Smooth and refreshing cold brewed coffee.",
        category: "Cold Brew"
    },
    {
        name: "Cappuccino",
        description: "Creamy coffee topped with rich milk foam.",
        category: "Milk Coffee"
    },
    {
        name: "Caramel Latte",
        description: "A smooth latte with sweet caramel flavour.",
        category: "Latte"
    },
    {
        name: "French Vanilla",
        description: "Aromatic coffee with a soft vanilla taste.",
        category: "Flavoured"
    }
];

const insert = db.prepare(`
    INSERT INTO coffees (name, description, category, votes)
    VALUES (?, ?, ?, ?)
`);

const existing = db
    .prepare("SELECT COUNT(*) AS count FROM coffees")
    .get();

if (existing.count === 0) {
    const insertMany = db.transaction((items) => {
        for (const coffee of items) {
            insert.run(
                coffee.name,
                coffee.description,
                coffee.category,
                0
            );
        }
    });

    insertMany(coffees);

    console.log("Coffee data inserted successfully.");
} else {
    console.log("Coffee data already exists.");
}

db.close();