const db = require("../model/db");


let createComment = (id, comment) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO `Comments` (Author,Content,CreatedAt) VALUES(?, ?,?)",
            ['Pham Thanh Nam', comment, Date.now()],
            (err) => {
                if (err) {
                    reject(err.message);
                }
                db.get(
                    "SELECT * FROM `Comments` ORDER BY id DESC LIMIT 1",
                    (err2, row2) => {
                        console.log(
                            "Row was added to the table: " + JSON.stringify(row2.id)
                        );
                        db.run(
                            "INSERT INTO `comment_new_id` (new_id,comment_id) VALUES(?, ?)",
                            [id, row2.id],
                            (err3) => {
                                if (err3) {
                                    reject(err3.message);
                                }
                                db.get(
                                    "SELECT * FROM `Comments` WHERE id = ?",
                                    [row2.id],
                                    (err4, row4) => {
                                        if (err4) {
                                            reject(err4.message);
                                        }
                                        resolve(row4);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
};

let getComment = (id) => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM `Comments` WHERE id IN (SELECT comment_id FROM comment_new_id WHERE new_id = ?)",
            [id],
            (err, rows) => {
                if (err) {
                    reject(err.message);
                }
                resolve(rows);
            }
        );
    });
};
let getAllComment = () => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM `Comments`",
            (err, rows) => {
                if (err) {
                    reject(err.message);
                }
                db.all(
                    "SELECT * FROM `comment_new_id`",
                    (err2, rows2) => {
                        if (err2) {
                            reject(err2.message);
                        }
                        db.all(
                            "SELECT * FROM `News`",
                            (err3, rows3) => {
                                if (err3) {
                                    reject(err3.message);
                                }
                                let result = [];
                                rows3.forEach(val => {
                                        rows2.forEach(val2 => {
                                            if (val.id === val2.new_id) {
                                                rows.forEach(val3 => {
                                                    if (val2.comment_id === val3.id) {

                                                        result.push({
                                                            id: val3.id,
                                                            title: val.Title,
                                                            content: val3.Content,
                                                            author: val3.Author,

                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                )
                                resolve(result);
                            }
                            );

                    }
                );
            }
        );
    });
};
let updateComment = (id, comment) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE `Comments` SET Content = ? WHERE id = ?",
            [comment, id],
            (err) => {
                if (err) {
                    reject(err.message);
                }
                db.get(
                    "SELECT * FROM `Comments` WHERE id = ?",
                    [id],
                    (err2, row2) => {
                        if (err2) {
                            reject(err2.message);
                        }
                        resolve(row2);
                    }
                );
            }
        );
    });
};
let deleteComment = (id) => {
    return new Promise((resolve, reject) => {
        db.run(
            "DELETE FROM `Comments` WHERE id = ?",
            [id],
            (err) => {
                if (err) {
                    reject(err.message);
                }
                db.run(
                    "DELETE FROM `comment_new_id` WHERE comment_id = ?",
                    [id],
                    (err2) => {
                        if (err2) {
                            reject(err2.message);
                        }
                        resolve(true);
                    }
                );

            }
        );

    });
};
module.exports = {
    createComment,
    getComment,
    getAllComment,
    deleteComment,
    updateComment
};