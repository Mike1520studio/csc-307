const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// in-memory "database"
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};

// basic routes
app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API", status: "ok" });
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET one user by id
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.users_list.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// POST create user (server generates id)
app.post("/users", (req, res) => {
  const { name, job } = req.body;

  const newUser = {
    id: Math.random().toString(16).slice(2),
    name,
    job,
  };

  users.users_list.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user by id
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const index = users.users_list.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.users_list.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
