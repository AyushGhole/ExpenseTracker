import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const MonthlyExpensesChart = ({ transactions }) => {
  // Ensure transactions is always an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const groupedData = safeTransactions.reduce((acc, txn) => {
    if (!txn || !txn.date || isNaN(txn.amount)) return acc; // Skip invalid transactions
    const month = new Date(txn.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + Number(txn.amount);
    return acc;
  }, {});

  // Convert grouped data to chart format
  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(groupedData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Make sure `data` is defined
  console.log("Chart Data:", chartData);

  return (
    <div className="bg-white p-4 mb-3 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Monthly Expenses</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyExpensesChart;
