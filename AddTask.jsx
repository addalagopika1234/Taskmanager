import { useState } from "react";
import api from "../api";

export default function AddTask({ refresh }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = () => {
    if (!title) return;
    api.post("/tasks", {
      title,
      description: desc
    }).then(() => {
      setTitle("");
      setDesc("");
      refresh();
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>
      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded mb-3"
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Add Task
      </button>
    </div>
  );
}
