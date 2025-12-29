const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT
  )
`);

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  db.run(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, "Pending"],
    () => res.json({ message: "Task Added" })
  );
});

app.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;
  db.run(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, req.params.id],
    () => res.json({ message: "Task Updated" })
  );
});

app.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id=?", req.params.id, () =>
    res.json({ message: "Task Deleted" })
  );
});

app.listen(5000, () =>
  console.log("✅ Backend running at http://localhost:5000")
);
