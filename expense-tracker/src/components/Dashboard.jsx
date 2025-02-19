import BudgetForm from "../components/BudgetForm";
import BudgetComparisonChart from "../components/BudgetComparisonChart";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ transactions = [] }) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  // Calculate total expenses safely
  const totalExpenses = transactions.reduce(
    (sum, txn) => sum + Number(txn.amount || 0),
    0
  );

  // Get latest 5 transactions safely
  const latestTransactions = transactions.slice(-5).reverse();

  // State for spending insights
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/transactions/spending-insights/${currentMonth}`)
      .then((res) => {
        console.log(res.data);
        setInsights(res.data);
      })
      .catch((error) => console.error("Error fetching insights:", error));
  }, [currentMonth]);

  return (
    <>
      <div className="grid mt-2 grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Expenses Box */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-500">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        {/* Recent Transactions Box */}
        <div className="bg-white mt-2 p-4 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <ul>
            {latestTransactions.map((txn) => (
              <li key={txn._id} className="flex justify-between p-2 border-b">
                <p>{txn.description}</p>
                <span className="font-bold">${txn.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Budget Form & Comparison Chart */}
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <BudgetForm />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <BudgetComparisonChart />
        </div>
      </div>
    </>
  );
};

// Fix: Use a default export
export default Dashboard;
