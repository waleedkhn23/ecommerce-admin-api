const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const product = new Product({ name, category, price, stock });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
