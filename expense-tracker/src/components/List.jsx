const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="bg-white mt-2 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-center">Transactions</h2>
      <ul className="divide-y divide-gray-300">
        {transactions.map((txn) => (
          <li key={txn._id} className="flex justify-between items-center py-2">
            <span>
              {txn.description} -{" "}
              <strong className="text-black">${txn.amount}</strong>
            </span>
            <div>
              <button
                onClick={() => onEdit(txn)}
                className="text-blue-500 mr-2">
                Edit
              </button>
              <button
                onClick={() => onDelete(txn._id)}
                className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
