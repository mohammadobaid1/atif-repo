const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const walletsRouter = require('./wallets');
const PortfoliosRouter = require('./portfolios');
const WishlistsRouter = require('./wishlists');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(MONGODB_URI);


app.use(express.json());

// API routes
app.use('/api/wallets', walletsRouter);
app.use('/api/portfolio', PortfoliosRouter);
app.use('/api/wishlist', WishlistsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
