import { useForm } from "react-hook-form";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Other",
];

const TransactionForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      description: "",
      amount: "",
      date: "",
      category: "Food",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 mt-2 rounded-lg shadow-md space-y-4">
      <input
        {...register("description", { required: "Description is required" })}
        className="w-full p-2 border rounded"
        placeholder="Description"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <input
        {...register("amount", {
          required: "Amount is required",
          valueAsNumber: true,
        })}
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Amount"
      />
      {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

      <input
        {...register("date", { required: "Date is required" })}
        type="date"
        className="w-full p-2 border rounded"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <select {...register("category")} className="w-full p-2 border rounded">
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button className="bg-blue-500 text-white p-2 rounded w-full">
        Save
      </button>
    </form>
  );
};

export default TransactionForm;
