import { useState } from "react";
import api from "../api";

export default function EditModal({ task, close, refresh }) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const update = () => {
    api.put(`/tasks/${task.id}`, {
      ...task,
      title,
      status
    }).then(() => {
      refresh();
      close();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="font-semibold mb-4">Edit Task</h2>

        <input
          className="border w-full p-2 rounded mb-3"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          className="border w-full p-2 rounded mb-4"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Done</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={close}>Cancel</button>
          <button onClick={update} className="text-indigo-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
