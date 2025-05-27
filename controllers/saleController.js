const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.addSale = async (req, res) => {
  try {
    const { productId, quantity, totalAmount, channel } = req.body;

    const sale = new Sale({
      product: productId,
      quantity,
      totalAmount,
      channel
    });

    await sale.save();

    // Reduce stock after sale
    const product = await Product.findById(productId);
    product.stock -= quantity;
    await product.save();

    res.status(201).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const { start, end, productId, category } = req.query;

    const query = {};

    if (start && end) {
      query.saleDate = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }

    if (productId) {
      query.product = productId;
    }

    if (category) {
      const products = await Product.find({ category: { $regex: new RegExp(category, 'i') } });

      query.product = { $in: products.map(p => p._id) };
    }

    const sales = await Sale.find(query).populate('product');
    res.json({ success: true, data: sales });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRevenueSummary = async (req, res) => {
  try {
    const { period } = req.query; // daily, monthly, yearly

    const groupBy =
      period === 'daily' ? { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } } :
      period === 'monthly' ? { $dateToString: { format: "%Y-%m", date: "$saleDate" } } :
      { $year: "$saleDate" };

    const summary = await Sale.aggregate([
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
