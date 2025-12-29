import { useEffect, useState } from "react";
import api from "../api";
import TaskCard from "../components/TaskCard";
import AddTask from "./AddTask";
import EditModal from "../components/EditModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const load = () =>
    api.get("/tasks").then(res => setTasks(res.data));

  useEffect(load, []);

  const remove = id =>
    api.delete(`/tasks/${id}`).then(load);

  return (
    <div className="max-w-4xl mx-auto">
      <AddTask refresh={load} />

      <div className="grid gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={setEditTask}
            onDelete={remove}
          />
        ))}
      </div>

      {editTask && (
        <EditModal
          task={editTask}
          close={() => setEditTask(null)}
          refresh={load}
        />
      )}
    </div>
  );
}
