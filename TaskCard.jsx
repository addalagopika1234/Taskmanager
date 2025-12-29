export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-gray-500 text-sm">{task.description}</p>
        <span className={`text-xs px-2 py-1 rounded mt-2 inline-block
          ${task.status === "Done"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"}`}>
          {task.status}
        </span>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onEdit(task)} className="text-blue-600">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
