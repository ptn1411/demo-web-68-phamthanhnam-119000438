var express = require("express");
var router = express.Router();
/* GET home page. */
const { getCategory } = require("../model/Category");
const { createNews, getNews } = require("../model/News");

router.get("/", async function (req, res, next) {
  const data = await getNews();
  res.render("index", { title: "News", data: data });
});
router.get("/create", async function (req, res, next) {
  const category = await getCategory();
  res.render("createNew", { title: "Create new", category: category });
});
router.post("/create", async function (req, res, next) {
  const { title, image, content, author, category } = req.body;
  createNews(title, image, content, author, category);
  return res.redirect("/");
});


module.exports = router;
