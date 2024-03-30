const express = require("express");
const router = express.Router();
const Portfolio = require("./Portfolio");
const Wallet = require("./wallet"); // Corrected import path for Wallet model
// Corrected import path for Wallet model
//  const mongoose = require('mongoose');
//  const ObjectId = mongoose.Types.ObjectId;

// POST /api/wallets - Create a new wallet
router.post("/", async (req, res) => {
  try {
    const { userId, quantity, type, cruentValue,name } = req.body;
    const total = quantity * cruentValue;
    const newPortfolio = new Portfolio({
      userId,
      quantity,
      type,
      name,
      avgCost: cruentValue,
      totalCost: total,
      change: 0,
      cruentValue,
      marketValue: total,
    });
    // const wallet = await Wallet.findByIdAndUpdate({userId:userId} ,{ balance: +total }, { new: true });
    if (type == "Buy") {
        const wallet = await Wallet.findOne({ userId: userId });
        console.log(wallet) ;// Fixed query
        if (!wallet || wallet.balance < total) {
          return res.status(400).json({ message: "Insufficient Balance" });
        }
        await newPortfolio.save();
        await Wallet.findOneAndUpdate({ userId: userId }, { $inc: { balance: -total } },{ new: true })
          return res.status(201).json(newPortfolio);
      }
    const wallet = await Wallet.findOneAndUpdate(
      { userId: userId },
      { $inc: { balance: +total } },
      { new: true }
    );
    await newPortfolio.save();
    return res.status(201).json(newPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/wallets - Get all wallets
router.get("/", async (req, res) => {
  // Fixed the function signature to include req
  try {
    const portfolio = await Portfolio.find(); // Changed variable name to wallets
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/wallets/:id - Get wallet details by ID
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /api/wallets/:id - Update wallet balance by ID
router.put("/:id", async (req, res) => {
  try {
    const { balance } = req.body;
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { balance },
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
