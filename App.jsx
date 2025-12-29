import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (!text) return;
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text }]);
    }
    setText("");
  };

  const editTask = (task) => {
    setText(task.text);
    setEditId(task.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Enter task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-4 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between bg-gray-100 p-2 rounded">
              <span>{task.text}</span>
              <div className="space-x-2">
                <button onClick={() => editTask(task)} className="text-blue-600">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

