var express = require("express");
var router = express.Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deteleCategory,
} = require("../model/Category");

router.get("/", async (req, res) => {
  const list = await getCategory();
  return res.render("category", { title: "Category", data: list });
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  await createCategory(name);
  return res.redirect("/category");
});

router.post("/edit/:id", async (req, res) => {
  const data = await updateCategory(req.body.name, req.params.id);
  console.log(data);
  return res.redirect("/category");
});

router.delete("/:id", async (req, res) => {
  await deteleCategory(req.params.id);
  return res.json({
    status: true,
  });
});
module.exports = router;
