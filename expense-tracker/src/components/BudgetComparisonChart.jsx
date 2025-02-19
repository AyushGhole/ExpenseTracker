import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; // Green for Budget, Red for Spent

const BudgetComparisonChart = () => {
  const [chartData, setChartData] = useState([]);
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch budgeted amounts
        const budgetRes = await axios.get("http://localhost:5000/api/budgets");
        const budgets = budgetRes.data;

        // ✅ Fetch actual spending
        const spendingRes = await axios.get(
          `http://localhost:5000/api/transactions/spending/${currentMonth}`
        );
        const spending = spendingRes.data;

        console.log("Budgets:", budgets);
        console.log("Actual Spending:", spending);

        // ✅ Summing up total budget and total spent
        const totalBudget = budgets.reduce(
          (sum, budget) => sum + Number(budget.amount),
          0
        );

        const totalSpent = spending.reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );

        const formattedData = [
          { name: "Budget", value: totalBudget },
          { name: "Spent", value: totalSpent },
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching budget/spending data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2 text-center">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
