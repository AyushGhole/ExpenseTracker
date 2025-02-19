const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Example: "2025-02"
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
