import { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/Form";
import TransactionList from "./components/List";
import ExpenseChart from "./components/Chart";
import CategoryPieChart from "./components/CategoryPieChart";
import Dashboard from "./components/Dashboard";

const API_URL = "http://localhost:5000/api/transactions";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched transactions:", data);
        setTransactions(data || []); // Ensure it's an array
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const handleAddTransaction = async (data) => {
    if (editData) {
      const res = await axios.put(`${API_URL}/${editData._id}`, data);
      setTransactions(
        transactions.map((txn) => (txn._id === editData._id ? res.data : txn))
      );
    } else {
      const res = await axios.post(API_URL, data);
      setTransactions([...transactions, res.data]);
    }
    setEditData(null);
  };

  const handleDeleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTransactions(transactions.filter((txn) => txn._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
        <Dashboard transactions={transactions} />
        <TransactionForm
          onSubmit={handleAddTransaction}
          initialData={editData}
        />
        <TransactionList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={setEditData}
        />
        {/* <ExpenseChart data={transactions} /> */}
        <CategoryPieChart transactions={transactions} />
      </div>
    </div>
  );
};

export default App;
