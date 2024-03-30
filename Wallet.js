const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, min: 1000, max: 9999 }, // 4-digit number validation
  currency: { type: String, required: true },
  balance: { type: Number, default: 0 },
  // Other fields as needed
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

