const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

console.log("ENV LOADED:", process.env.MONGO_CONNECTION_STRING ? "YES" : "NO");

const { MONGO_CONNECTION_STRING } = process.env;

mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MONGO ERROR:", err.message));

const User = require("./models/user");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// basic routes
app.get("/", (req, res) => {
  res.send("Hello from Express backend!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello API", status: "ok" });
});

/**
 * GET /users
 * Optional query params:
 *   /users?name=Mac
 *   /users?job=Professor
 *   /users?name=Mac&job=Professor
 */
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;

    const filter = {};
    if (name) filter.name = name;
    if (job) filter.job = job;

    const users = await User.find(filter);
    res.json({ users_list: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one user by Mongo _id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    // invalid ObjectId, etc.
    res.status(400).json({ error: err.message });
  }
});

// POST create user in MongoDB
app.post("/users", async (req, res) => {
  try {
    const { name, job } = req.body;

    if (!name || !job) {
      return res.status(400).json({ error: "name and job are required" });
    }

    const newUser = await User.create({ name, job });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user by Mongo _id
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
