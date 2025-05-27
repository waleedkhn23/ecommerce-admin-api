const Product = require('../models/Product');
const InventoryChange = require('../models/InventoryChange');

exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const products = await Product.find({ stock: { $lt: threshold } });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { newStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const change = new InventoryChange({
      product: product._id,
      previousStock: product.stock,
      newStock
    });

    product.stock = newStock;

    await product.save();
    await change.save();

    res.json({ success: true, message: "Stock updated", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
