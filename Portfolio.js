const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  quantity: { type: Number, default: 0 }, // 4-digit number validation
  type: { type: String, required: true },
  name: { type: String, required: true },
  avgCost: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 },
  change: { type: Number, default: 0 },
  cruentValue: { type: Number, default: 0 },
  marketValue: { type: Number, default: 0 },
  userId: { type: String, required: true, min: 1000, max: 9999 },
  // Other fields as needed
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;

