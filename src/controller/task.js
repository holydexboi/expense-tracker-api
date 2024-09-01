const express = require("express");
const { Task, taskValidate, updateValidate } = require("../model/task");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  const validate = taskValidate.validate(req.body);
  if (validate.error) {
    return res.status(400).send(validate?.error?.details[0]?.message);
  }

  const user = req.user.id;
  const { name, description, category } = req.body;

  const task = new Task({ name, description, category, user });

  await task.save();

  res.send(task);
});

router.get("/tasks", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.send(tasks);
});

router.get("/task-by-id/:id", auth, async (req, res) => {
  const task = await Task.findById({ _id: req.params.id });

  if (!task) {
    return res.status(400).send("No task with the given Id");
  }

  if (task.user !== new mongoose.Schema.ObjectId(req.user.id)) {
    return res.status(403).send("Unathorized access");
  }

  res.send(task);
});

router.put("/update/:id", async (req, res) => {
  const validate = updateValidate.validate(req.body);

  if (validate.error) {
    return res.status(400).send(validate?.error?.details[0]?.message);
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(400).send("No task with the given Id");
  }

  let { name, description, category } = req.body;

  name = name ? name : task.name;
  description = description ? description : task.description;
  category = category ? category : task.category;

  const newTask = await Task.findByIdAndUpdate(req.params.id, {
    name,
    description,
    category,
    updated_at: Date.now(),
  });

  res.send(newTask);
});

module.exports = router;
