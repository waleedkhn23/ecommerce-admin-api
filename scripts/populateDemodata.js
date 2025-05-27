const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Sale = require('../models/Sale');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

async function seedData() {
  try {
    await Product.deleteMany();
    await Sale.deleteMany();

    const categories = ['Electronics', 'Clothing', 'Books', 'Beauty'];
    const products = [];

    for (let i = 0; i < 10; i++) {
      const product = await Product.create({
        name: `Sample Product ${i + 1}`,
        category: categories[i % categories.length],
        price: Math.floor(Math.random() * 10000) + 500,
        stock: Math.floor(Math.random() * 100) + 10
      });
      products.push(product);
    }

    for (let i = 0; i < 50; i++) {
      const p = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;

      await Sale.create({
        product: p._id,
        quantity,
        totalAmount: quantity * p.price,
        saleDate: randomDate(new Date(2024, 0, 1), new Date(2025, 4, 27)),
        channel: Math.random() < 0.5 ? 'Amazon' : 'Walmart'
      });

      p.stock -= quantity;
      await p.save();
    }

    console.log("Demo data inserted.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

seedData();
