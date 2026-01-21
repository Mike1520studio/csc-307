const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ],
};

app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API", status: "ok" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.users_list.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = req.body;

  users.users_list.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const index = users.users_list.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.users_list.splice(index, 1);
  res.json(deletedUser);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
