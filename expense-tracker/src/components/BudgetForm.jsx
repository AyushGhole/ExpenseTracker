import { useState, useEffect } from "react";
import axios from "axios";

const BudgetForm = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get("https://expense-tracker-backend-fm7r.vercel.app/api/budgets");
        console.log("Budgets Response:", res.data); // Debugging

        if (!Array.isArray(res.data)) {
          throw new Error("API response is not an array");
        }

        setBudgets(res.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setBudgets([]); // Fallback to empty array
      }
    };

    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://expense-tracker-backend-fm7r.vercel.app/api/budgets/set-budgets",
        {
          category,
          amount,
          month: currentMonth,
        }
      );

      // Update state instead of refreshing
      setBudgets([...budgets, response.data]);
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Set Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-1/3"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Set Budget
        </button>
      </form>

      <h3 className="mt-4 text-lg font-semibold">Budgets</h3>
      <ul className="mt-2">
        {budgets.map((b) => (
          <li key={b._id} className="p-2 bg-gray-100 rounded my-1">
            {b.category}: ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetForm;
