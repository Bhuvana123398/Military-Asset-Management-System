const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  assetType: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['PURCHASE', 'TRANSFER_IN', 'TRANSFER_OUT', 'ASSIGNMENT', 'EXPENDITURE'], 
    required: true 
  },
  quantity: { type: Number, required: true },
  fromBase: { type: String, default: 'External' },
  toBase: { type: String, required: true },
  performedBy: { type: String }, 
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);