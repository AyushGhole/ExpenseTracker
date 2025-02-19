require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error:", err));

// Routes
app.use("/api/transactions/", require("./routes/transactionRoutes"));
app.use("/api/budgets/", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
