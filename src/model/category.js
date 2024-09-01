const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

const categoryValidate = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

module.exports = { Category, categoryValidate };
