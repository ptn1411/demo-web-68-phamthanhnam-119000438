var express = require("express");
var router = express.Router();
const {createComment,getAllComment,    deleteComment,
    updateComment} = require('../model/Comment');

/* GET home page. */
router.get("/", async function (req, res, next) {
    const comments = await getAllComment();

    res.render("comment", {title: "Comment",comments:comments});

});
router.post("/:id", async function (req, res, next) {
    const id = req.params.id;
    const comment = req.body.comment;
    const data = await createComment(id, comment);
    res.json(data);
});



router.post("/edit/:id", async (req, res) => {
    const data = await updateComment(req.params.id,req.body.comment);

    return res.redirect("/comment");
});

router.delete("/:id", async (req, res) => {
    await deleteComment(req.params.id);
    return res.json({
        status: true,
    });
});
module.exports = router;
