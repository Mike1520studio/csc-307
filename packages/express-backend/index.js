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
    { id: "zap555", name: "Dennis", job: "Bartender" },
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

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
