var express = require("express");
var router = express.Router();
/* GET home page. */
const {getCategory, getCategoryByNewId} = require("../model/Category");
const {createNews, getNews, getNewsById, deteleNews, updateNews} = require("../model/News");
const {getComment} = require("../model/Comment");
router.get("/", async function (req, res, next) {
    const data = await getNews();
    res.render("index", {title: "News", data: data});
});
router.get("/create", async function (req, res, next) {
    const category = await getCategory();
    res.render("createNew", {title: "Create new", category: category});
});
router.post("/create", async function (req, res, next) {
    const {title, image, content, author, category} = req.body;
    createNews(title, image, content, author, category);
    return res.redirect("/");
});
router.get("/post/:id", async function (req, res, next) {
    const post = await getNewsById(req.params.id)
    if (post === undefined) {
        return res.redirect("/");
    }
    const category = await getCategoryByNewId(req.params.id);
    const comment = await getComment(req.params.id);
    return res.render("post", {post: post, comment: comment, category: category});
});
router.delete("/post/:id", async function (req, res, next) {
    const post = await deteleNews(req.params.id);
    return res.json({
        status: "success",
        message: "Delete success",
    });
});
router.get("/post/edit/:id", async function (req, res, next) {
    const post = await getNewsById(req.params.id);
    if (post === undefined) {
        return res.redirect("/");
    }
    const category = await getCategory();
    return res.render("editPost", {title: 'Edit New', post: post, category: category});
});
router.post("/post/edit/:id", async function (req, res, next) {
    const {title, image, content, author, category} = req.body;
    const post = await updateNews(title, image, content, author, category, req.params.id);
    return res.redirect("/");
});
module.exports = router;
