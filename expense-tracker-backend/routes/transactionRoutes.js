const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Create Transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    console.log(transaction);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// Get Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Sort by latest date
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});
// Update Transaction
router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// Delete Transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// ✅ GET total spending for the month
router.get("/spending/:month", async (req, res) => {
  try {
    const { month } = req.params; // Get "YYYY-MM" from URL

    console.log("Fetching transactions for month:", month);

    const transactions = await Transaction.find();

    if (!transactions.length) {
      return res
        .status(404)
        .json({ message: "No transactions found for this month" });
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
