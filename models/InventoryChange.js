const mongoose = require('mongoose');

const inventoryChangeSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  previousStock: Number,
  newStock: Number,
  changeDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InventoryChange', inventoryChangeSchema);
