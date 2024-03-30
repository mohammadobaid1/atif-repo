const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
  userId: { type: String, required: true, min: 1000, max: 9999 },
  // Other fields as needed
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;

