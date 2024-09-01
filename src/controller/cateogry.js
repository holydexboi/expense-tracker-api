const express = require("express");
const { Category, categoryValidate } = require("../model/category");
const { route } = require("./user");

const router = express.Router();

router.post("/create", async (req, res) => {
  const validate = categoryValidate.validate(req.body);

  if (validate.error) {
    return res.status(400).send(validate?.error?.details[0]?.message);
  }

  const { name, description } = req.body;

  const category = new Category({ name, description });

  await category.save();

  res.send(category);
});

router.get("/all-category", async (req, res) => {
  const category = await Category.find({});

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id).catch((err) =>
    console.log(err)
  );

  if (!category) {
    return res.status(400).send("Category with the given Id does not exist");
  }

  res.send(category);
});

module.exports = router;
