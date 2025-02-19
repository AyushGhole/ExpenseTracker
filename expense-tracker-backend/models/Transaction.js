const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Other"],
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
