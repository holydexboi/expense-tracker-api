const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: mongoose.Schema.ObjectId,
  category: mongoose.Schema.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Task = mongoose.model("Tasks", taskSchema);

const taskValidate = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  user: Joi.string().required(),
  category: Joi.string().required(),
});

module.exports = { Task, taskValidate };
