const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err.message));

const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  summary: String
}));

app.post("/tasks", async (req, res) => {
  res.json(await Task.create(req.body));
});

app.get("/tasks", async (req, res) => {
  res.json(await Task.find());
});

app.put("/tasks/:id", async (req, res) => {
  res.json(await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ));
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});