const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// ✅ POST new budget
router.post("/set-budgets", async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    const newBudget = new Budget({ category, amount, month });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Error saving budget", error });
  }
});

// ✅ GET all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
