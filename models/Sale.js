const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
  channel: { type: String, enum: ['Amazon', 'Walmart'], required: true }
});

module.exports = mongoose.model('Sale', saleSchema);
