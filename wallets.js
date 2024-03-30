const express = require('express');
const router = express.Router();
const Wallet = require('./wallet'); // Corrected import path for Wallet model

// POST /api/wallets - Create a new wallet
router.post('/', async (req, res) => {
  try {
    const { userId, currency,balance } = req.body;
    const newWallet = new Wallet({ userId, currency,balance });
    await newWallet.save();
    res.status(201).json(newWallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/wallets - Get all wallets
router.get('/', async (req, res) => { // Fixed the function signature to include req
  try {
    const wallets = await Wallet.find(); // Changed variable name to wallets
    res.status(200).json(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /api/wallets/:id - Get wallet details by ID
router.get('/:id', async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/wallets/:id - Update wallet balance by ID
router.put('/:id', async (req, res) => {
  try {
    const { balance } = req.body;
    const wallet = await Wallet.findByIdAndUpdate(req.params.id, { balance }, { new: true });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
